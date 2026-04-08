// Routes/admissionShow.js - FIXED & OPTIMIZED
const express = require("express");
const router = express.Router();
const Admission = require("../Models/Admission");

// ==========================================
// 1. GET ADMISSION STATISTICS
// ==========================================
router.get("/stats", async (req, res) => {
    try {
        const total = await Admission.countDocuments();

        const primaryCount = await Admission.countDocuments({
            applyClass: { $in: ["1th", "2th", "3th", "4th", "5th"] }
        });

        const middleCount = await Admission.countDocuments({
            applyClass: { $in: ["6th", "7th", "8th"] }
        });

        const highCount = await Admission.countDocuments({
            applyClass: { $in: ["9th", "10th", "11th Science", "11th Commerce", "12th Science", "12th Commerce"] }
        });

        res.status(200).json({
            success: true,
            statistics: {
                total,
                sections: {
                    primary: primaryCount,
                    middle: middleCount,
                    high: highCount
                }
            }
        });
    } catch (err) {
        console.error("❌ Stats Error:", err);
        res.status(500).json({ success: false, error: "Failed to fetch statistics" });
    }
});

// ==========================================
// 2. GET ALL ADMISSIONS WITH FILTERS
// ==========================================
router.get("/", async (req, res) => {
    try {
        const { search, applyClass, language, section } = req.query;

        let query = {};

        // Search filter
        if (search) {
            query.$or = [
                { studentId: { $regex: search, $options: "i" } },
                { studentName: { $regex: search, $options: "i" } },
                { parentPhone: { $regex: search, $options: "i" } },
                { fatherName: { $regex: search, $options: "i" } }
            ];
        }

        // Class filter
        if (applyClass && applyClass !== "all") {
            query.applyClass = applyClass;
        }

        // Language filter
        if (language && language !== "all") {
            query.language = language;
        }

        // Section filter (Primary / Middle / High)
        if (section && section !== "all") {
            const sectionMap = {
                primary: ["1th", "2th", "3th", "4th", "5th"],
                middle: ["6th", "7th", "8th"],
                high: ["9th", "10th", "11th Science", "11th Commerce", "12th Science", "12th Commerce"]
            };

            if (sectionMap[section]) {
                query.applyClass = { $in: sectionMap[section] };
            }
        }

        const admissions = await Admission.find(query)
            .sort({ createdAt: -1 })
            .lean();   // .lean() makes it faster

        res.status(200).json({
            success: true,
            count: admissions.length,
            admissions
        });
    } catch (err) {
        console.error("❌ Admission Fetch Error:", err);
        res.status(500).json({ 
            success: false, 
            error: "Failed to fetch admissions" 
        });
    }
});

// ==========================================
// 3. GET SINGLE STUDENT (Optional)
// ==========================================
router.get("/:studentId", async (req, res) => {
    try {
        const admission = await Admission.findOne({ studentId: req.params.studentId });
        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            admission
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
