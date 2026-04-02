// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Import Routes
const inquiryRouter = require('./Routes/inquiry');
const signupRouter = require("./Routes/signup");
const adminRoutes = require("./Routes/admin");
const validRouter = require("./Routes/valid");
const addDashRoutes = require("./Routes/addDash");
const admissionRoutes = require("./Routes/admission");
const paymentRoutes = require("./Routes/payment");
const feeManagementRoutes = require("./Routes/feeManagement");
const checkRoutes = require("./Routes/check");
const admissionShowRoutes = require("./Routes/admissionShow");
const feedbackRoutes = require('./Routes/feed');
const mcqRoutes = require('./Routes/mcq');
const syllabusDataRoutes = require('./Routes/syllabusData');

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/schoolDB";


// Middleware
app.use(cors({
    origin: "http://localhost:5173", // React app
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", signupRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/valid", validRouter);
app.use("/api/addDash", addDashRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/fee-management", feeManagementRoutes);
app.use("/api/check", checkRoutes);
app.use("/api/admission-dash", admissionShowRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/mocktest', mcqRoutes);
app.use('/api/syllabus-data', syllabusDataRoutes);


// Test Route
app.get("/", (req, res) => res.send("Server running successfully!"));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Global Error:", err.stack);
    res.status(500).json({ error: "Something went wrong on the server", details: err.message });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

