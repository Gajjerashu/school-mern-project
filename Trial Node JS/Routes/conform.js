const express = require("express");
const router = express.Router();
const Admission = require("../Models/Admission");

// ✅ GET: Fetch admission by Student ID for confirmation
router.get("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const admission = await Admission.findOne({ studentId: studentId });

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Student ID not found. Please check and try again."
            });
        }

        if (!admission.approved) {
            return res.status(403).json({
                success: false,
                error: "This admission is not approved yet. Please contact admin."
            });
        }

        res.status(200).json({
            success: true,
            ...admission.toObject()
        });
    } catch (error) {
        console.error("❌ Error fetching admission for confirmation:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch student details. Please try again later."
        });
    }
});

module.exports = router;