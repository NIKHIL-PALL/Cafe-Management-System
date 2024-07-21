import express from "express";
import authenticateToken from "../services/authentication.js";
import checkRole from "../services/checkRole.js";
import db from "../connection.js";
const router = express.Router();

router.post("/add", authenticateToken, checkRole, (req, res) => {
  let product = req.body;
  let query = `INSERT INTO product (name, categoryId, price, status, description) VALUES(?, ?, ?, true, ?)`;
  db.query(
    query,
    [product.name, product.categoryId, product.price, product.description],
    (err, results) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(200).json({ message: "Product added successfully." });
    }
  );
});

router.get("/get", authenticateToken, (req, res) => {
  let query = `SELECT p.id, p.name, p.categoryId,p.status, c.name as categoryName, p.price, p.description
FROM product as p
INNER JOIN category as c ON p.categoryId = c.id
ORDER BY p.name ASC;
`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json(results);
    }
  });
});

router.get("/getProductByCategory/:id", authenticateToken, (req, res) => {
  let { id } = req.params;
  let query = `SELECT id, name FROM product WHERE categoryId = ? and status = true;`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(results);
  });
});

router.get("/getProduct/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM product WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }

    return res.status(200).json(results[0]);
  });
});

router.patch("/update", authenticateToken, checkRole, (req, res) => {
  let product = req.body;
  console.log(product.id);
  let query = `UPDATE product SET name = ?, categoryId = ?, price = ? , description = ? , status = ? WHERE id = ? `;
  db.query(
    query,
    [
      product.name,
      product.categoryId,
      product.price,
      product.description,
      product.status,
      product.id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        console.log(results);
        if (results.affectedRows <= 0) {
          return res.status(500).json({ message: "Unable to update" });
        } else {
          return res
            .status(200)
            .json({ message: "Product updated successfully." });
        }
      }
    }
  );
});

router.delete("/delete/:id", authenticateToken, checkRole, (req, res) => {
  const { id } = req.params;
  let query = `DELETE FROM product WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else if (results.affectedRows == 0) {
      return res.status(404).json({ message: "Product id not found!" });
    }
    return res.status(200).json({ message: "Producted Deleted successfully." });
  });
});

router.patch("/updateStatus", authenticateToken, checkRole, (req, res) => {
  let product = req.body;
  let query = `UPDATE product SET status = ? WHERE id = ? ; `;
  db.query(query, [product.status, product.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Product id not found. " });
      }
      return res
        .status(200)
        .json({ message: "Product status updated successfully." });
    }
  });
});

export default router;
