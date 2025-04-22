const db = require("../config/connectDB");
const path = require("path");

exports.submitBooking = (req, res) => {
  const {
    resortId,
    fullName,
    email,
    mobile,
    address,
    checkIn,
    checkOut,
    adults,
    children,
  } = req.body;

  const userId = req.userId;

  const sql = `
    INSERT INTO bookings 
    (user_id, resort_id, full_name, email, mobile, address, check_in, check_out, adults, children) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userId,
    resortId,
    fullName,
    email,
    mobile,
    address,
    checkIn,
    checkOut,
    adults,
    children,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Booking insert error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // ✅ Return the inserted booking ID
    res.status(201).json({
      message: "Booking submitted successfully",
      bookingId: result.insertId
    });
  });
};


exports.getAllBookings = (req, res) => {
  const sql = `
    SELECT 
      bookings.id AS booking_id,
      user_details.username,
      user_details.email,
      resorts.name AS resort_name,
      bookings.check_in,
      bookings.check_out,
      bookings.status
    FROM bookings
    JOIN user_details ON bookings.user_id = user_details.id
    JOIN resorts ON bookings.resort_id = resorts.id
    ORDER BY bookings.created_at ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

exports.uploadPaymentReceipt = (req, res) => {
  const { bookingId } = req.body;
  const receiptImage = req.file ? req.file.filename : null;

  if (!bookingId || !receiptImage) {
    return res.status(400).json({ message: "Missing bookingId or receipt file." });
  }

  const sql = "UPDATE bookings SET receipt = ? WHERE id = ?";

  db.query(sql, [receiptImage, bookingId], (err, result) => {
    if (err) {
      console.error("Receipt upload error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    return res.status(200).json({ message: "Receipt uploaded successfully!" });
  });
};