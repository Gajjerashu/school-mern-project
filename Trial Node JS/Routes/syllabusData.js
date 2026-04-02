const express = require("express");
const router = express.Router();
const SyllabusData = require("../Models/SyllabusData");

// ✅ GET: Syllabus by standard, medium, stream
router.get("/", async (req, res) => {
    try {
        const { standard, medium, stream } = req.query;

        console.log("🔍 Query received:", { standard, medium, stream });

        if (!standard || !medium) {
            return res.status(400).json({
                success: false,
                error: "standard and medium are required"
            });
        }

        // ✅ String thi number banavo
        const stdNum = parseInt(standard.toString().replace(/\D/g, ""));

        if (isNaN(stdNum)) {
            return res.status(400).json({
                success: false,
                error: "Invalid standard number"
            });
        }

        // ✅ Query build karo
        const query = {
            standard: stdNum,
            medium: medium.trim()
        };

        // ✅ Std 11-12 maate stream add karo
        if (stdNum >= 11) {
            query.stream = (stream && stream !== "NA") ? stream.trim() : "Science";
        } else {
            // ✅ Std 1-10 maate stream "NA" j hoy
            query.stream = "NA";
        }

        console.log("🔍 MongoDB Query:", query);

        const syllabus = await SyllabusData.findOne(query);

        if (!syllabus) {
            console.log("❌ No syllabus found for:", query);
            return res.status(404).json({
                success: false,
                error: `Syllabus not found for Std ${stdNum} - ${medium} Medium`
            });
        }

        console.log("✅ Syllabus found:", syllabus.standard, syllabus.medium, syllabus.stream);

        res.status(200).json({
            success: true,
            data: syllabus
        });

    } catch (error) {
        console.error("❌ Error fetching syllabus:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ POST: Add syllabus
router.post("/", async (req, res) => {
    try {
        const existing = await SyllabusData.findOne({
            standard: req.body.standard,
            medium: req.body.medium,
            stream: req.body.stream || "NA"
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                error: "Syllabus already exists for this standard/medium/stream"
            });
        }

        const syllabus = new SyllabusData(req.body);
        await syllabus.save();

        res.status(201).json({
            success: true,
            message: "Syllabus saved!",
            data: syllabus
        });

    } catch (error) {
        console.error("❌ Error saving syllabus:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;