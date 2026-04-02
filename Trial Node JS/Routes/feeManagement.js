// Routes/feeManagement.js - Admin Fee Management Dashboard

const express = require("express");
const router = express.Router();
const Payment = require("../Models/Payment");

// ==========================================
// 1. GET ALL PAYMENTS WITH FILTERS
// ==========================================
router.get("/", async (req, res) => {
    try {
        const { search, status, paymentType, sortBy } = req.query;

        let query = {};

        // Search filter
        if (search) {
            query.$or = [
                { studentId: { $regex: search, $options: "i" } },
                { studentName: { $regex: search, $options: "i" } },
                { transactionId: { $regex: search, $options: "i" } }
            ];
        }

        // Status filter
        if (status && status !== "all") {
            query.status = status;
        }

        // Payment type filter
        if (paymentType && paymentType !== "all") {
            query.paymentType = paymentType;
        }

        // Sorting
        let sortOption = { paidAt: -1 }; // Default: newest first
        if (sortBy === "oldest") sortOption = { paidAt: 1 };
        if (sortBy === "amount_high") sortOption = { paidAmount: -1 };
        if (sortBy === "amount_low") sortOption = { paidAmount: 1 };

        const payments = await Payment.find(query).sort(sortOption);

        res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });

    } catch (err) {
        console.error("❌ Admin Fees Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. GET FEE STATISTICS
// ==========================================
router.get("/stats", async (req, res) => {
    try {
        // Total collections
        const totalStats = await Payment.aggregate([
            {
                $group: {
                    _id: null,
                    totalCollected: { $sum: "$paidAmount" },
                    totalPending: { $sum: "$pendingAmount" },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Status-wise breakdown
        const statusStats = await Payment.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    amount: { $sum: "$paidAmount" }
                }
            }
        ]);

        // Payment method breakdown
        const methodStats = await Payment.aggregate([
            {
                $group: {
                    _id: "$paymentType",
                    count: { $sum: 1 },
                    amount: { $sum: "$paidAmount" }
                }
            },
            { $sort: { amount: -1 } }
        ]);

        // Class-wise breakdown
        const classStats = await Payment.aggregate([
            {
                $group: {
                    _id: "$applyClass",
                    count: { $sum: 1 },
                    totalCollected: { $sum: "$paidAmount" },
                    totalPending: { $sum: "$pendingAmount" }
                }
            },
            { $sort: { totalCollected: -1 } }
        ]);

        // Recent 7 days trend
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentTrend = await Payment.aggregate([
            {
                $match: {
                    paidAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
                    amount: { $sum: "$paidAmount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            statistics: {
                total: totalStats[0] || { totalCollected: 0, totalPending: 0, count: 0 },
                byStatus: statusStats,
                byMethod: methodStats,
                byClass: classStats,
                recentTrend
            }
        });

    } catch (err) {
        console.error("❌ Stats Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 3. GET SINGLE PAYMENT DETAILS
// ==========================================
router.get("/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return res.status(404).json({
                success: false,
                error: "Payment not found"
            });
        }

        res.status(200).json({
            success: true,
            payment
        });

    } catch (err) {
        console.error("❌ Get Payment Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 4. UPDATE PAYMENT STATUS (Admin only)
// ==========================================
router.put("/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status, remarks } = req.body;

        const payment = await Payment.findOneAndUpdate(
            { transactionId },
            { status, remarks },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({
                success: false,
                error: "Payment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            payment
        });

    } catch (err) {
        console.error("❌ Update Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 5. DELETE PAYMENT (Admin only)
// ==========================================
router.delete("/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;

        const payment = await Payment.findOneAndDelete({ transactionId });

        if (!payment) {
            return res.status(404).json({
                success: false,
                error: "Payment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully"
        });

    } catch (err) {
        console.error("❌ Delete Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 6. EXPORT PAYMENTS DATA
// ==========================================
router.get("/export/data", async (req, res) => {
    try {
        const payments = await Payment.find().sort({ paidAt: -1 });

        const exportData = payments.map(p => ({
            "Transaction ID": p.transactionId,
            "Student ID": p.studentId,
            "Student Name": p.studentName,
            "Class": p.applyClass,
            "Total Fees": p.totalFees,
            "Paid Amount": p.paidAmount,
            "Pending": p.pendingAmount,
            "Payment Method": p.paymentType,
            "Status": p.status,
            "Date": new Date(p.paidAt).toLocaleDateString("en-IN"),
            "Academic Year": p.academicYear
        }));

        res.status(200).json({
            success: true,
            data: exportData
        });

    } catch (err) {
        console.error("❌ Export Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;