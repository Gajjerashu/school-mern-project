// Routes/admin.js - Admin Dashboard (GET, PUT, DELETE)
const express = require("express");
const router = express.Router();
const Inquiry = require("../Models/Inquiry");

// Routes/admin.js ma aa add karo
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Simple admin check
        if (username === "Admin" && password === "Admin123") {
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token: "admin-token-" + Date.now()
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ GET: Fetch all inquiries with optional search
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim()) {
            const searchTerm = search.trim();
            query = {
                $or: [
                    { inquiryId: { $regex: searchTerm, $options: "i" } },
                    { studentName: { $regex: searchTerm, $options: "i" } },
                    { parentName: { $regex: searchTerm, $options: "i" } },
                ]
            };
        }

        const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

        console.log("✅ Admin fetched inquiries:", inquiries.length);

        res.status(200).json(inquiries);
    } catch (error) {
        console.error("❌ Error fetching inquiries:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch inquiries." 
        });
    }
});

// ✅ PUT: Approve/Revoke inquiry
router.put("/approve/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        const inquiry = await Inquiry.findById(id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                error: "Inquiry not found."
            });
        }

        // ✅ Update approval status
        inquiry.isApproved = isApproved;
        inquiry.approved = isApproved;
        inquiry.approvedAt = isApproved ? new Date() : null;

        await inquiry.save();

        console.log("✅ Inquiry approval updated:", {
            inquiryId: inquiry.inquiryId,
            studentName: inquiry.studentName,
            isApproved: isApproved
        });

        res.status(200).json({
            success: true,
            message: isApproved ? "Inquiry approved successfully!" : "Approval revoked successfully!",
            inquiry: inquiry
        });
    } catch (error) {
        console.error("❌ Error updating approval status:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update approval status."
        });
    }
});

// ✅ DELETE: Delete inquiry by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const inquiry = await Inquiry.findByIdAndDelete(id);

        if (!inquiry) {
            return res.status(404).json({ 
                success: false,
                error: "Inquiry not found." 
            });
        }

        console.log("✅ Inquiry deleted:", inquiry.inquiryId);

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully!",
            inquiry
        });
    } catch (error) {
        console.error("❌ Error deleting inquiry:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to delete inquiry." 
        });
    }
});

module.exports = router;
