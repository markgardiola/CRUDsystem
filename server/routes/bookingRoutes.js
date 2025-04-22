const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const path = require("path");
const bookingController = require("../controllers/bookingController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/receipts/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;

router.post("/book", verifyToken, bookingController.submitBooking);
router.get("/bookings", bookingController.getAllBookings);
router.post("/upload_receipt", upload.single("receipt"), bookingController.uploadPaymentReceipt);


module.exports = router;
