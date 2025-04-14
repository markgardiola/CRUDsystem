const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/verifyToken');

router.get('/list', (req, res) => {
  db.query('SELECT * FROM resorts', (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ resorts: result });
  });
});

router.post('/book', verifyToken, (req, res) => {
  const { resort_id, check_in, check_out } = req.body;
  const sql = 'INSERT INTO bookings (user_id, resort_id, check_in, check_out, status) VALUES (?, ?, ?, ?, "pending")';
  db.query(sql, [req.userId, resort_id, check_in, check_out], (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ success: "Booking requested" });
  });
});

module.exports = router;
