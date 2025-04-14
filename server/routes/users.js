const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');

router.get('/me', verifyToken, (req, res) => {
  const sql = 'SELECT username, email, phone, address FROM user_details WHERE id = ?';
  db.query(sql, [req.userId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json({ user: result[0] });
  });
});

router.post('/update', verifyToken, (req, res) => {
  const { username, email, password, phone, address } = req.body;

  if (password && password.trim() !== "") {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      const sql = `UPDATE user_details SET username = ?, email = ?, password = ?, phone = ?, address = ? WHERE id = ?`;
      db.query(sql, [username, email, hashedPassword, phone, address, req.userId], (err) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json({ success: "Updated successfully" });
      });
    });
  } else {
    const sql = `UPDATE user_details SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?`;
    db.query(sql, [username, email, phone, address, req.userId], (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ success: "Updated successfully" });
    });
  }
});

module.exports = router;
