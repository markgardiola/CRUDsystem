const db = require('../config/connectDB');
const bcrypt = require('bcrypt');

exports.getUserInfo = (req, res) => {
  const sql = "SELECT username, email, phone, address FROM user_details WHERE id = ?";
  db.query(sql, [req.userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json({ user: result[0] });
  });
};

exports.updateUser = (req, res) => {
  const { username, email, password, phone, address } = req.body;

  const update = (hashedPassword = null) => {
    const sql = hashedPassword
      ? "UPDATE user_details SET username=?, email=?, password=?, phone=?, address=? WHERE id=?"
      : "UPDATE user_details SET username=?, email=?, phone=?, address=? WHERE id=?";

    const params = hashedPassword
      ? [username, email, hashedPassword, phone, address, req.userId]
      : [username, email, phone, address, req.userId];

    db.query(sql, params, (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ success: "Profile updated" });
    });
  };

  if (password && password.trim() !== "") {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Password hashing error" });
      update(hash);
    });
  } else {
    update();
  }
};
