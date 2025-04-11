const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  pass: '',
  database: 'users',
})

app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});

// register user

app.post('/register_user', (req, res) => {
  const sql = 'INSERT INTO user_details (`username`,`email`,`password`) VALUES (?, ?, ?)';
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) return res.json({ message: "Error hashing password" });
    const values = [req.body.username, req.body.email, hash];
    db.query(sql, values, (err, result) => {
      if (err) return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "User registered successfully" });
    });
  });
})

// login user

app.post('/validate_user', (req, res) => {
  const sql = 'SELECT * FROM user_details WHERE `email` = ?';
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ message: "Server error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found!" });

    const hashedPassword = result[0].password;
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) return res.json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ message: "Wrong Password!" });

      return res.json({ success: "Login successful!", user: result[0] });
    });
  });
});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})