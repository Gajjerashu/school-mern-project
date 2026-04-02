// Routes/inquiries.js - Student Inquiry Submission (POST ONLY)
const express = require("express");
const router = express.Router();
const Inquiry = require("../Models/Inquiry");

// ✅ POST: Create new inquiry (ONLY THIS ROUTE)
router.post("/", async (req, res) => {
    try {
        const {
            studentName,
            parentName,
            parentPhone,
            parentEmail,
            applyClass,
            language,
            previousSchool,
            message,
        } = req.body;

        // ✅ Validation
        if (!studentName || !parentName || !parentPhone || !parentEmail || !applyClass || !language) {
            return res.status(400).json({ 
                success: false,
                error: "All required fields must be filled." 
            });
        }

        // ✅ Convert language to proper format
        // Frontend sends "English" or "Gujarati"
        // Save as "English Medium" or "Gujarati Medium"
        const languageFormat = language === "Gujarati" ? "Gujarati Medium" : "English Medium";

        // ✅ Check for duplicate submission (same student + email within 1 minute)
        const recentInquiry = await Inquiry.findOne({
            studentName: studentName.trim(),
            parentEmail: parentEmail.trim(),
            createdAt: {
                $gte: new Date(Date.now() - 60000) // Last 1 minute
            }
        });

        if (recentInquiry) {
            return res.status(400).json({
                success: false,
                error: "An inquiry with this information was just submitted. Please wait a moment before submitting again."
            });
        }

        // ✅ Create new inquiry
        const newInquiry = new Inquiry({
            studentName: studentName.trim(),
            parentName: parentName.trim(),
            parentPhone: parentPhone.trim(),
            parentEmail: parentEmail.trim().toLowerCase(),
            applyClass,
            language: languageFormat, // ✅ FIXED: Save with "Medium" suffix
            previousSchool: previousSchool?.trim() || "",
            message: message?.trim() || "",
        });

        await newInquiry.save();

        console.log("✅ Inquiry submitted successfully:", {
            inquiryId: newInquiry.inquiryId,
            studentName: newInquiry.studentName,
            language: newInquiry.language
        });

        // ✅ Return inquiryId and confirmation
        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully!",
            inquiryId: newInquiry.inquiryId,
            inquiry: newInquiry,
        });

    } catch (error) {
        console.error("❌ Error creating inquiry:", error);
        res.status(500).json({ 
            success: false,
            error: error.message || "Failed to submit inquiry. Please try again." 
        });
    }
});

module.exports = router;