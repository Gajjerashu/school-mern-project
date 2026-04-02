const express = require("express");
const router = express.Router();
const Admission = require("../Models/Admission");

// ✅ GET: Fetch all admissions with optional search
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim()) {
            const searchTerm = search.trim();
            query = {
                $or: [
                    { studentId: { $regex: searchTerm, $options: "i" } },
                    { studentName: { $regex: searchTerm, $options: "i" } },
                    { fatherName: { $regex: searchTerm, $options: "i" } },
                    { parentEmail: { $regex: searchTerm, $options: "i" } },
                    { inquiryId: { $regex: searchTerm, $options: "i" } }
                ]
            };
        }

        const admissions = await Admission.find(query).sort({ createdAt: -1 });

        // Normalize language field in response
        const normalizedAdmissions = admissions.map(adm => {
            const admObj = adm.toObject();
            if (admObj.language) {
                if (admObj.language.toLowerCase().includes('english')) {
                    admObj.language = "English Medium";
                } else if (admObj.language.toLowerCase().includes('gujarati') || admObj.language.includes('ગુજરાતી')) {
                    admObj.language = "Gujarati Medium";
                }
            }
            return admObj;
        });

        res.status(200).json({
            success: true,
            count: normalizedAdmissions.length,
            admissions: normalizedAdmissions
        });
    } catch (error) {
        console.error("❌ Error fetching admissions:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch admissions."
        });
    }
});

// ✅ GET: Fetch admission statistics
router.get("/stats", async (req, res) => {
    try {
        const total = await Admission.countDocuments();

        const approved = await Admission.countDocuments({
            $or: [{ approved: true }, { isApproved: true }]
        });

        const pending = await Admission.countDocuments({
            $and: [
                { $or: [{ approved: false }, { approved: { $exists: false } }] },
                { $or: [{ isApproved: false }, { isApproved: { $exists: false } }] }
            ]
        });

        res.status(200).json({
            success: true,
            stats: { total, approved, pending }
        });
    } catch (error) {
        console.error("❌ Error fetching statistics:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch statistics."
        });
    }
});

// ✅ GET: Fetch single admission by ID
router.get("/:id", async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Admission not found."
            });
        }

        const admObj = admission.toObject();
        if (admObj.language) {
            if (admObj.language.toLowerCase().includes('english')) {
                admObj.language = "English Medium";
            } else if (admObj.language.toLowerCase().includes('gujarati') || admObj.language.includes('ગુજરાતી')) {
                admObj.language = "Gujarati Medium";
            }
        }

        res.status(200).json({
            success: true,
            admission: admObj
        });
    } catch (error) {
        console.error("❌ Error fetching admission:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch admission."
        });
    }
});

module.exports = router;