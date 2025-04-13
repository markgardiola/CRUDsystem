const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'alaehscape2025'

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

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    next();
  });
};

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

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ message: "Wrong Password!" });

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.json({
        success: "Login successful!",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    });
  });
});

// Assuming you have a route to fetch user info
app.get("/get_user_info", verifyToken, (req, res) => {
  const userId = req.userId;

  // Query the database to get user info
  const sql = "SELECT username, email, phone, address FROM user_details WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error." });
    }

    if (result.length > 0) {
      res.json({ user: result[0] });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  });
});

// Update user details

app.post("/update_user", verifyToken, (req, res) => {
  const { username, email, phone, address } = req.body; // Change 'mobile' to 'phone'

  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required." });
  }

  const userId = req.userId;

  const sql = "UPDATE user_details SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?";
  db.query(sql, [username, email, phone, address, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error." });
    }

    return res.json({
      success: "Profile updated successfully!",
      user: { id: userId, username, email, phone, address },
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