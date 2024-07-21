import express from "express";
import authenticateToken from "../services/authentication.js";
import db from "../connection.js";
import fs from "fs";
import { v1 } from "uuid";
import ejs from "ejs";
import path from "path";
import pdf from "html-pdf";
import { fileURLToPath } from "url";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.post("/generateBill", authenticateToken, (req, res) => {
  const generatedUuid = v1();
  let orderDetails = req.body;
  console.log(orderDetails.productDetails)
  let productDetailsReport = orderDetails.productDetails;
  let query = `INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total,createdBy, product_details ) VALUES(?, ?, ?,?,?,?,?,?)`;
  db.query(
    query,
    [
      orderDetails.name,
      generatedUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.totalAmount,
      res.locals.email, 
      JSON.stringify(productDetailsReport),
    ],
    (err, results) => {
      if (err) {
        console.log("database error : " + err);
        return res.status(500).json({ err });
      } else {
        ejs.renderFile(
          path.join(__dirname, "", "report.ejs"),
          {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount,
          },
          (err, results) => {
            if (err) {
              console.log("rendering file error : " + err);
              return res.status(500).json({ err });
            } else {
              pdf
                .create(results)
                .toFile(
                  "./generated_pdf/" + generatedUuid + ".pdf",
                  (err, results) => {
                    if (err) {
                      console.log("folder error " + err);
                      return res.status(500).json({ err });
                    } else {
                      return res.status(200).json({ uuid: generatedUuid });
                    }
                  }
                );
            }
          }
        );
      }
    }
  );
});

router.post("/getPdf", authenticateToken, (req, res) => {
  let orderDetails = req.body;
  let pdfPath = "./generated_pdf/" + orderDetails.uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    let productDetailsReport = orderDetails.productDetails;
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        totalAmount: orderDetails.totalAmount,
      },
      (err, results) => {
        if (err) {
          console.log("rendering file error : " + err);
          return res.status(500).json({ err });
        } else {
          pdf
            .create(results)
            .toFile(
              "./generated_pdf/" + orderDetails.uuid + ".pdf",
              (err, results) => {
                if (err) {
                  console.log("folder error " + err);
                  return res.status(500).json({ err });
                } else {
                  res.contentType("application/pdf");
                  fs.createReadStream(pdfPath).pipe(res);
                }
              }
            );
        }
      }
    );
  }
});

router.get('/getBills', authenticateToken, (req, res) => {
    let query = `SELECT * FROM bill`;
    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }
        else{
            return res.status(200).json(results);
        }
    })
})

router.delete('/deleteBill/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    let query =     `DELETE FROM bill WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }
        else {
            if(results.affectedRows == 0) {
                return res.status(404).json({message : "Bill id does not found."});
            }
            else {
                return res.status(200).json({message : "Bill record has been deleted."});
            }
        }
    })
})

export default router;
