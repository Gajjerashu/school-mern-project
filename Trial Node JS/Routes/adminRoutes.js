const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminController = require("../Controllers/adminExamController");
const Result = require("../Models/ResultModel");

// Multer setup: File ne temporary 'uploads/' folder ma save karva mate
const upload = multer({ dest: "uploads/" });

// 1. Route: Word File Upload ane Parsing
// Frontend thi 'wordFile' key ma file aavse
router.post("/upload-word", upload.single("wordFile"), adminController.uploadAndParseExam);

// 2. Route: Get All Pending Results (Approval mate)
router.get("/pending-results", async (req, res) => {
    try {
        // Jyare isApproved false hoy teva badha results fetch karo
        const pendingResults = await Result.find({ isApproved: false }).sort({ createdAt: -1 });
        res.status(200).json(pendingResults);
    } catch (error) {
        res.status(500).json({ error: "Pending results fetch karva ma bhul thai." });
    }
});

// 3. Route: Approve Student Result
router.patch("/approve-result/:id", async (req, res) => {
    try {
        const resultId = req.params.id;

        // Result ne update karo: isApproved true set karo
        const updatedResult = await Result.findByIdAndUpdate(
            resultId,
            { isApproved: true },
            { new: true }
        );

        if (!updatedResult) {
            return res.status(404).json({ message: "Result malyu nahi." });
        }

        res.status(200).json({ message: "Result Approved Successfully!", data: updatedResult });
    } catch (error) {
        res.status(500).json({ error: "Approval process ma bhul thai." });
    }
});

module.exports = router;