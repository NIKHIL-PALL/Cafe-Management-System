import db from "../connection.js";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import authenticateToken from "../services/authentication.js";
import checkRole from "../services/checkRole.js";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

router.post("/signup", (req, res) => {
  let user = req.body;
  let query = "SELECT * FROM user where email = ?";

  db.query(query, [user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if (results.length <= 0) {
        query =
          "INSERT INTO user(name, contactNumber, email, password, status, role) VALUES (?, ?, ?, ?, false, ?);";
        db.query(
          query,
          [user.name, user.contactNumber, user.email, user.password, user.role],
          (err, results) => {
            if (err) {
              return res.status(500).json({ message: "Failed to register" });
            } else {
              return res
                .status(200)
                .json({ message: "Successfully registered." });
            }
          }
        );
      } else {
        return res.status(409).json({ message: "Email already exists." });
      }
    }
  });
});

router.post("/login", (req, res) => {
  let user = req.body;
  let query = "SELECT email, password,role, status FROM user WHERE email = ?;";
  db.query(query, [user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({ message: "Incorrect email or password" });
      } else if (results[0].status === "0") {
        return res.status(401).json({ message: "Wait for admin approval." });
      } else if (results[0].password == user.password) {
        console.log(results)
        const response = {
          email: results[0].email,
          password: results[0].password,
          role : results[0].role
        };
        console.log(response)
        const token = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        res.status(200).json({ token: token , message : "Succesfully logged in."});
      } else {
        return res.status(500).json({ message: "Something went wrong." });
      }
    }
  });
});

router.post("/forgotPassword", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let user = req.body;
  let query = "SELECT email, password FROM user WHERE email = ?";

  db.query(query, [user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      if (results.length <= 0) {
        return res
          .status(404)
          .json({ message: "Email does not exist." });
      } else {
        let mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "Login details",
          html:
            "<p>Login details for Cafe Management System</p><br/> Email : " +
            results[0].email +
            "<br/>" +
            "Password : " +
            results[0].password +
            '<a href = "http:localhost:8000/user/login">Click here to Login</a>',
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Email sent : " + info);
          }
        });
        return res
          .status(200)
          .json({ message: "Password has been sent to your mail." });
      }
    }
  });
});

router.get('/get/:id', (req, res) => {
  let user = req.params;
  let query = `SELECT id, name, contactNumber, email, status, role FROM user WHERE role = 'user' and id = ?`;
  db.query(query, [user.id], (err, results) => {
    console.log(query)
    if(err) {
      
      return res.status(404).json({message : "User not found.", err : err.message});
    }
    return res.status(200).json(results);
  })
})

router.get('/get',authenticateToken, checkRole, (req, res) => {
  let query = `SELECT id, name , contactNumber, email, password, status, role FROM user WHERE role = 'user'`;
  db.query(query, (err, results) => {
    if(err) {
      return res.status(500).json({message : err.message});
    }
    return res.status(200).json(results);
  })
})

router.patch('/update',authenticateToken, checkRole, (req, res) => {
  let user = req.body;
  let query = 'UPDATE user set status = ? WHERE id = ?';

  db.query(query, [user.status, user.id] , (err, results) => {
    if(err) {
      return res.status(500).json({message : err.message});
    }
    else{
      if(results.affectedRows === 0) {
        return res.status(500).json({message : `Unable to update`});
      }
      else {
        return res.status(200).json({message : "Updated Successfully."});
      }
    }
  })
})

router.patch('/changePassword',authenticateToken, (req, res) => {
  let user = req.body;
  let email = res.locals.email;
  let query = `SELECT * FROM user WHERE email = ? AND password = ? `;
  db.query(query, [email, user.oldPassword], (err, results) => {
    if(err) {
      return res.status(500).json({message : err.message});
    }
    else {
      if(results.length <= 0 ) {
        return res.status(404).json({message : "Incorrect Old Password"});
      }
      else if(results[0].password == user.oldPassword) {
        query = `UPDATE user SET password = ? WHERE email = ?`;
        db.query(query, [user.newPassword, email], (err, results ) => {
          if(err)  {
            return res.status(400).json({message : err.message});
          }
          else {
            if(results.length  <= 0) {
              return res.status(500).json({message : "Unable to change password."});
            }
            else {
              return res.status(200).json({message : "Password updated successfully."})
            }
          }
        })
      }
      else{
        return res.status(500).json({message : "Something went wrong."})
      }
    }
  })
})

export default router;
