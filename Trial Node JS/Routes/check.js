// Routes/check.js - Student Fee Check Route (FIXED WITH LANGUAGE)

const express = require("express");
const router = express.Router();
const Payment = require("../Models/Payment");

// ==========================================
// GET STUDENT FEE STATUS
// ==========================================
router.post("/student-fee", async (req, res) => {
    try {
        const { studentName, studentId } = req.body;

        console.log("📥 Fee Check Request:", { studentName, studentId });

        // Validation
        if (!studentName || !studentId) {
            return res.status(400).json({
                success: false,
                error: "Student Name and Student ID are required"
            });
        }

        // Find all payments for this student
        const payments = await Payment.find({
            studentId: { $regex: new RegExp(studentId, 'i') },
            studentName: { $regex: new RegExp(studentName, 'i') }
        }).sort({ paidAt: -1 });

        if (payments.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No payment records found for this student"
            });
        }

        // Calculate totals
        const totalFees = payments[0].totalFees;
        const totalPaid = payments.reduce((sum, p) => sum + p.paidAmount, 0);
        const pendingAmount = Math.max(0, totalFees - totalPaid);

        // Get payment history with all details
        const paymentHistory = payments.map(p => ({
            transactionId: p.transactionId,
            paidAmount: p.paidAmount,
            paymentType: p.paymentType,
            paidAt: p.paidAt,
            status: p.status,
            pendingAmount: p.pendingAmount // Individual payment's pending amount
        }));

        // ✅ FIXED: Include language in studentInfo
        res.status(200).json({
            success: true,
            studentInfo: {
                studentId: payments[0].studentId,
                studentName: payments[0].studentName,
                applyClass: payments[0].applyClass,
                email: payments[0].email,
                parentPhone: payments[0].parentPhone,
                parentName: payments[0].parentName,
                language: payments[0].language || 'English'  // ✅ ADD THIS
            },
            feeDetails: {
                totalFees,
                totalPaid,        // ✅ This shows cumulative paid amount
                pendingAmount,    // ✅ This shows remaining balance
                status: pendingAmount === 0 ? "Paid" : "Partial",
                paymentCount: payments.length
            },
            paymentHistory
        });

    } catch (err) {
        console.error("❌ Fee Check Error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch fee details"
        });
    }
});

module.exports = router;
