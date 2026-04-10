const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/schoolDB";

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://school-mern-project.vercel.app",
  /^https:\/\/school-mern-project.*\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    );
    if (isAllowed) callback(null, true);
    else callback(new Error(`CORS blocked: ${origin}`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

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

// Routes - Order matters, specific first
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
app.use('/api/feedback', feedbackRoutes);   // Changed from /api to /api/feedback to avoid conflict
app.use('/api/mocktest', mcqRoutes);        // ← MUST be here
app.use('/api/syllabus-data', syllabusDataRoutes);

// Base
app.get("/", (req, res) => res.json({ message: "InspireEdge School Server is running!" }));

// Global Error
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app; // Optional for testing
