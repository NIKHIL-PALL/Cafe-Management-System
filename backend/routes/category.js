import express from "express";
import authenticateToken from "../services/authentication.js";
import checkRole from "../services/checkRole.js";
import db from "../connection.js";
const router = express.Router();

router.post("/add", authenticateToken, checkRole, (req, res) => {
  let category = req.body;
  let query = `INSERT INTO category (name) VALUES(?)`;
  db.query(query, [category.name], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: "Category added successfully." });
  });
});

router.get("/get", authenticateToken, (req, res) => {
  let query = `SELECT * FROM category ORDER BY name;`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(results);
  });
});

router.patch("/update", authenticateToken, checkRole, (req, res) => {
  let product = req.body;
  let query = `UPDATE category SET name = ? WHERE id  = ? ;`;
  db.query(query, [product.name, product.id], (err, results) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    } else {
      if (results.affectedRows == 0) {
        return res.status(500).json({ message: "Unable to update" });
      }
      return res
        .status(200)
        .json({ message: "Category updated successfully." });
    }
  });
});

export default router;
