const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    parentName: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    parentPhone: {
        type: String,
        required: true,
        trim: true
    },
    applyClass: {
        type: String,
        required: true
    },
     language: {
        type: String,
        enum: ['English', 'Gujarati'],
        default: 'English',
        required: true
    },
    totalFees: {
        type: Number,
        required: true,
        min: 0
    },
    paidAmount: {
        type: Number,
        required: true,
        min: 0
    },
    pendingAmount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentType: {
        type: String,
        required: true,
        enum: [
            "GPay",
            "PhonePe",
            "Paytm",
            "UPI",
            "Net Banking",
            "Debit Card",
            "Credit Card",
            "Cash",
            "Cheque"
        ]
    },
    paymentMethod: {
        type: String,
        default: "Online"
    },
    paidAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Paid", "Partial", "Pending", "Failed"],
        default: "Paid"
    },
    academicYear: {
        type: String,
        default: function () {
            const currentYear = new Date().getFullYear();
            return `${currentYear}-${currentYear + 1}`;
        }
    },
    remarks: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    }
}, {
    timestamps: true
});

// Indexes for faster queries
PaymentSchema.index({ transactionId: 1 });
PaymentSchema.index({ studentId: 1 });
PaymentSchema.index({ studentName: 1, email: 1 });
PaymentSchema.index({ paidAt: -1 });

module.exports = mongoose.model("Payment", PaymentSchema);