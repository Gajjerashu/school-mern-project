const express = require("express");
const router = express.Router();
const Admission = require("../Models/Admission");

// ✅ POST: Create new admission
router.post("/", async (req, res) => {
    try {
        const admission = new Admission(req.body);
        await admission.save();

        console.log("✅ Admission saved:", {
            studentId: admission.studentId,
            studentName: admission.studentName,
            applyClass: admission.applyClass
        });

        res.status(201).json({
            success: true,
            message: "Admission Saved!",
            studentId: admission.studentId,
            data: admission
        });
    } catch (error) {
        console.error("❌ Error saving admission:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// ✅ GET: Fetch student by Student ID (for StudentSyllabus form)
router.get("/student/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        console.log("🔍 Searching for student ID:", studentId);

        // Find admission record by student ID
        const admission = await Admission.findOne({ studentId: studentId });

        if (!admission) {
            console.log("❌ Student ID not found:", studentId);
            return res.status(404).json({
                success: false,
                error: `Student ID ${studentId} not found in admission records`
            });
        }

        console.log("✅ Student details fetched:", {
            studentId: admission.studentId,
            studentName: admission.studentName,
            applyClass: admission.applyClass,
            language: admission.language
        });

        res.status(200).json({
            success: true,
            message: "Student details found",
            data: {
                studentId: admission.studentId,
                studentName: admission.studentName,
                applyClass: admission.applyClass,
                language: admission.language,
                aadharNumber: admission.aadharNumber,
                parentEmail: admission.parentEmail,
                parentPhone: admission.parentPhone,
                fatherName: admission.fatherName,
                motherName: admission.motherName
            }
        });

    } catch (error) {
        console.error("❌ Error fetching student:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ✅ GET: Fetch all admissions
router.get("/", async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });

        console.log("✅ Admissions fetched:", admissions.length);

        res.status(200).json({
            success: true,
            count: admissions.length,
            data: admissions
        });

    } catch (error) {
        console.error("❌ Error fetching admissions:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ✅ GET: Fetch admission by MongoDB ID
router.get("/:id", async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Admission record not found"
            });
        }

        res.status(200).json({
            success: true,
            data: admission
        });

    } catch (error) {
        console.error("❌ Error fetching admission:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ✅ PUT: Update admission
router.put("/:id", async (req, res) => {
    try {
        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Admission record not found"
            });
        }

        console.log("✅ Admission updated:", admission.studentId);

        res.status(200).json({
            success: true,
            message: "Admission updated successfully",
            data: admission
        });

    } catch (error) {
        console.error("❌ Error updating admission:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ✅ DELETE: Delete admission
router.delete("/:id", async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id);

        if (!admission) {
            return res.status(404).json({
                success: false,
                error: "Admission record not found"
            });
        }

        console.log("✅ Admission deleted:", admission.studentId);

        res.status(200).json({
            success: true,
            message: "Admission deleted successfully",
            data: admission
        });

    } catch (error) {
        console.error("❌ Error deleting admission:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;