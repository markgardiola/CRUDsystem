const db = require("../config/connectDB");

exports.getTotalBookings = (req, res) => {
  const query = 'SELECT COUNT(*) AS totalBookings FROM bookings WHERE status = "Confirmed"';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total resorts:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ totalBookings: results[0].totalBookings });
  });
};

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
      resorts.name AS resort_name,
      bookings.check_in,
      bookings.check_out,
      bookings.status
    FROM bookings
    JOIN user_details ON bookings.user_id = user_details.id
    JOIN resorts ON bookings.resort_id = resorts.id
    ORDER BY bookings.created_at DESC
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

exports.getBookingById = (req, res) => {
  const bookingId = req.params.id;

  const sql = `
    SELECT 
      b.*, 
      r.name AS resort_name 
    FROM bookings b
    JOIN resorts r ON b.resort_id = r.id
    WHERE b.id = ?
  `;

  db.query(sql, [bookingId], (err, results) => {
    if (err) {
      console.error("Error fetching booking:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(results[0]);
  });
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query("UPDATE bookings SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    res.json({ message: "Booking status updated successfully" });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

// exports.updateBookingStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const updateQuery = 'UPDATE bookings SET status = ? WHERE id = ?';

//   try {
//     await db.query(updateQuery, [status, id]);

//     if (status === "Confirmed") {
//       const getUserInfoQuery = `
//         SELECT ud.email,
//          ud.username,
//          r.name AS resort_name
//         FROM   bookings      AS b
//         JOIN   user_details  AS ud ON b.user_id   = ud.id
//         JOIN   resorts        AS r  ON b.resort_id = r.id
//         WHERE  b.id = ?
//       `;

//       const [result] = await db.query(getUserInfoQuery, [id]);
//       if (result.length > 0) {
//         const { email, username, resort_name } = result[0];
//         const subject = "Your Booking is Confirmed!";
//         const html = `
//           <p>Hi ${username},</p>
//           <p>Your payment for booking at <strong>${resort_name}</strong> has been <strong>confirmed</strong>!</p>
//           <p>Thank you for using Ala-Eh-scape. We look forward to your stay!</p>
//         `;

//         await sendEmail(email, subject, html);
//         console.log(`Confirmation email sent to ${email}`);
//       }
//     }

//     res.json({ message: "Booking status updated successfully" });
//   } catch (error) {
//     console.error("Error updating booking status:", error);
//     res.status(500).json({ error: "Failed to update booking status" });
//   }
// };

