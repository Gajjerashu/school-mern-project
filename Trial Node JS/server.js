const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ---------- Configurations ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/schoolDB";

// ---------- Middleware & CORS Fix ----------
// Aa list ma tamari badhi frontend URLs hovi joie
const allowedOrigins = [
    "http://localhost:5173", 
    "https://school-mern-project.vercel.app" // ✅ Vercel URL added to fix CORS
];

app.use(cors({
    origin: function (origin, callback) {
        // origin vagar ni request (jem ke Postman) ne allow karva mate
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy: This origin is not allowed'), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Body Parser & Static Files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- MongoDB Connection ----------
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// ---------- Import Routes ----------
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

// ---------- Routes Middleware ----------
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

// Base Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "InspireEdge School Server is running!" });
});

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
    console.error("❌ Global Error:", err.stack);
    res.status(500).json({ 
        error: "Internal Server Error", 
        details: err.message 
    });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
