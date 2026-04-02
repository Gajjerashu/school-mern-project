const express = require("express");
const router = express.Router();
const Inquiry = require("../Models/Inquiry");

// Middleware to verify token (simple version)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Please Login Your A/C" });
    }

    // In production, verify JWT token here
    // For now, just check if token exists
    next();
};

// ✅ POST: Check inquiry by Student Name and Parent Email (Login Required)
router.post("/check", verifyToken, async (req, res) => {
    try {
        const { studentName, parentEmail } = req.body;

        if (!studentName || !parentEmail) {
            return res.status(400).json({
                error: "Please provide both Student Name and Parent Email."
            });
        }

        // Find inquiry by matching student name and parent email
        const inquiry = await Inquiry.findOne({
            studentName: { $regex: new RegExp(`^${studentName.trim()}$`, "i") },
            parentEmail: parentEmail.trim().toLowerCase()
        });

        if (!inquiry) {
            return res.status(404).json({
                error: "No inquiry found with the provided details."
            });
        }

        // Return inquiry details
        res.status(200).json({
            inquiryId: inquiry.inquiryId,
            studentName: inquiry.studentName,
            parentName: inquiry.parentName,
            parentEmail: inquiry.parentEmail,
            applyClass: inquiry.applyClass,
            language: inquiry.language,
            approved: inquiry.approved || inquiry.isApproved || false,
            createdAt: inquiry.createdAt,
            approvedAt: inquiry.approvedAt
        });

    } catch (error) {
        console.error("❌ Error checking inquiry:", error);
        res.status(500).json({
            error: "Failed to check inquiry status. Please try again later."
        });
    }
});

module.exports = router;