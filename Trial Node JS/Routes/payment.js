// Routes/payment.js - SINGLE FILE FOR ALL PAYMENT OPERATIONS WITH LANGUAGE FIX

const express = require("express");
const router = express.Router();
const Payment = require("../Models/Payment");

// Class-wise fee structure (in Rupees)
const CLASS_FEES = {
    "1th": 25000, "2th": 25000, "3th": 26000, "4th": 26000, "5th": 27000,
    "6th": 28000, "7th": 29000, "8th": 30000, "9th": 32000, "10th": 35000,
    "11th Science": 40000, "11th Commerce": 38000,
    "12th Science": 42000, "12th Commerce": 40000
};

// ==========================================
// 1. GET FEE STRUCTURE BY CLASS
// ==========================================
router.get("/fee-structure/:class", (req, res) => {
    try {
        const className = req.params.class;
        const totalFee = CLASS_FEES[className];

        if (!totalFee) {
            return res.status(404).json({
                success: false,
                error: "Fee structure not found for this class"
            });
        }

        res.status(200).json({
            success: true,
            class: className,
            totalFees: totalFee
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. PROCESS PAYMENT
// ==========================================
router.post("/process", async (req, res) => {
    try {
        // ✅ FIXED: Added 'language' to destructuring
        const {
            transactionId, studentId, studentName, parentName, email,
            parentPhone, applyClass, language, paidAmount, paymentType, paymentMethod
        } = req.body;

        console.log("📥 Received Payment Data:", req.body);

        // ✅ FIXED: Added !language validation check
        if (!studentId || !studentName || !email || !parentPhone || !applyClass || !language || !paidAmount || !paymentType) {
            return res.status(400).json({
                success: false,
                error: "All required fields must be provided"
            });
        }

        // ✅ FIXED: Added language enum validation
        if (!['English', 'Gujarati'].includes(language)) {
            return res.status(400).json({
                success: false,
                error: "Invalid language. Must be 'English' or 'Gujarati'"
            });
        }

        // Get total fees for class
        const totalFees = CLASS_FEES[applyClass];
        if (!totalFees) {
            return res.status(400).json({
                success: false,
                error: "Invalid class selected"
            });
        }

        // Check previous payments for this student
        const previousPayments = await Payment.find({
            studentId,
            applyClass,
            status: { $in: ["Paid", "Partial"] }
        });

        const totalPaidBefore = previousPayments.reduce((sum, p) => sum + p.paidAmount, 0);
        const newTotalPaid = totalPaidBefore + parseFloat(paidAmount);
        const pendingAmount = Math.max(0, totalFees - newTotalPaid);

        // Determine status
        let status = "Paid";
        if (newTotalPaid < totalFees) {
            status = "Partial";
        }

        // Create payment record
        const newPayment = new Payment({
            transactionId: transactionId || `TXN_${Date.now()}${Math.floor(Math.random() * 1000)}`,
            studentId,
            studentName,
            parentName: parentName || "",
            email,
            parentPhone,
            applyClass,
            // ✅ FIXED: Added language field
            language: language || 'English',
            totalFees,
            paidAmount: parseFloat(paidAmount),
            pendingAmount,
            paymentType,
            paymentMethod: paymentMethod || "Online",
            paidAt: new Date(),
            status
        });

        await newPayment.save();

        console.log("✅ Payment Saved:", newPayment.transactionId);
        console.log("📊 Payment Details:", {
            studentId: newPayment.studentId,
            language: newPayment.language,
            amount: newPayment.paidAmount,
            status: newPayment.status
        });

        res.status(201).json({
            success: true,
            message: "Payment successful",
            transactionId: newPayment.transactionId,
            totalFees,
            paidAmount: newPayment.paidAmount,
            pendingAmount,
            status
        });

    } catch (err) {
        console.error("❌ Payment Process Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 3. GET RECEIPT BY TRANSACTION ID
// ==========================================
router.get("/receipt/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;
        console.log("📥 Fetching receipt for:", transactionId);

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return res.status(404).json({
                success: false,
                error: "Payment not found"
            });
        }

        console.log("✅ Receipt found:", payment.transactionId);

        res.status(200).json({
            success: true,
            payment: {
                transactionId: payment.transactionId,
                studentId: payment.studentId,
                studentName: payment.studentName,
                parentName: payment.parentName,
                email: payment.email,
                parentPhone: payment.parentPhone,
                applyClass: payment.applyClass,
                language: payment.language,
                totalFees: payment.totalFees,
                paidAmount: payment.paidAmount,
                pendingAmount: payment.pendingAmount,
                paymentType: payment.paymentType,
                paymentMethod: payment.paymentMethod,
                paidAt: payment.paidAt,
                status: payment.status,
                academicYear: payment.academicYear,
                createdAt: payment.createdAt
            }
        });
    } catch (err) {
        console.error("❌ Receipt Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 4. GET STUDENT FEE HISTORY
// ==========================================
router.get("/student-history/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const payments = await Payment.find({ studentId }).sort({ paidAt: -1 });

        if (payments.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No payment history found"
            });
        }

        const totalPaid = payments.reduce((sum, p) => sum + p.paidAmount, 0);
        const totalFees = payments[0].totalFees;
        const pending = totalFees - totalPaid;

        res.status(200).json({
            success: true,
            studentId,
            totalFees,
            totalPaid,
            pendingAmount: Math.max(0, pending),
            payments
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 5. GET ALL PAYMENTS
// ==========================================
router.get("/all", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const payments = await Payment.find()
            .sort({ paidAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Payment.countDocuments();

        res.status(200).json({
            success: true,
            count: payments.length,
            totalPayments: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            payments
        });

    } catch (err) {
        console.error("❌ Get All Error:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;