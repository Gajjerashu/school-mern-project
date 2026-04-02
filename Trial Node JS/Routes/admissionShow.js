// Routes/admissionShow.js - Admission Dashboard Route

const express = require("express");
const router = express.Router();
const Admission = require("../Models/Admission");

// ==========================================
// 1. GET ALL ADMISSIONS WITH FILTERS
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
                { parentPhone: { $regex: search, $options: "i" } }
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

        // Section filter (Primary/Middle/High)
        if (section && section !== "all") {
            const sectionClasses = {
                primary: ["1th", "2th", "3th", "4th", "5th"],
                middle: ["6th", "7th", "8th"],
                high: ["9th", "10th", "11th Science", "11th Commerce", "12th Science", "12th Commerce"]
            };

            if (sectionClasses[section]) {
                query.applyClass = { $in: sectionClasses[section] };
            }
        }

        const admissions = await Admission.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: admissions.length,
            admissions
        });

    } catch (err) {
        console.error("❌ Admission Fetch Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. GET ADMISSION STATISTICS
// ==========================================
router.get("/stats", async (req, res) => {
    try {
        // Total admissions
        const totalAdmissions = await Admission.countDocuments();

        // Section-wise count
        const primaryClasses = ["1th", "2th", "3th", "4th", "5th"];
        const middleClasses = ["6th", "7th", "8th"];
        const highClasses = ["9th", "10th", "11th Science", "11th Commerce", "12th Science", "12th Commerce"];

        const primaryCount = await Admission.countDocuments({ applyClass: { $in: primaryClasses } });
        const middleCount = await Admission.countDocuments({ applyClass: { $in: middleClasses } });
        const highCount = await Admission.countDocuments({ applyClass: { $in: highClasses } });

        // Language-wise breakdown
        const languageStats = await Admission.aggregate([
            {
                $group: {
                    _id: "$language",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Class-wise breakdown
        const classStats = await Admission.aggregate([
            {
                $group: {
                    _id: "$applyClass",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Gender-wise breakdown
        const genderStats = await Admission.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            statistics: {
                total: totalAdmissions,
                sections: {
                    primary: primaryCount,
                    middle: middleCount,
                    high: highCount
                },
                byLanguage: languageStats,
                byClass: classStats,
                byGender: genderStats
            }
        });

    } catch (err) {
        console.error("❌ Stats Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 3. GET SINGLE ADMISSION DETAILS
// ==========================================
router.get("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const admission = await Admission.findOne({ studentId });

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
        console.error("❌ Get Admission Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 4. UPDATE ADMISSION
// ==========================================
router.put("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const admission = await Admission.findOneAndUpdate(
            { studentId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admission updated successfully",
            admission
        });

    } catch (err) {
        console.error("❌ Update Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 5. DELETE ADMISSION
// ==========================================
router.delete("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const admission = await Admission.findOneAndDelete({ studentId });

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admission deleted successfully"
        });

    } catch (err) {
        console.error("❌ Delete Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;