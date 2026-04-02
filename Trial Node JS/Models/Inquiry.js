// Models/Inquiry.js - Student Inquiry Schema
const mongoose = require("mongoose");

// ✅ Generate Inquiry ID: INQ + 10 digits
const generateInquiryId = () => {
    const timestamp = Date.now().toString().slice(-5); // Last 5 digits of timestamp
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // 5 random digits
    return `INQ${timestamp}${random}`;
};

const inquirySchema = new mongoose.Schema(
    {
        inquiryId: {
            type: String,
            unique: true,
            required: true,
            default: generateInquiryId,
            index: true // Add index for faster queries
        },
        studentName: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            maxlength: [100, "Student name cannot exceed 100 characters"]
        },
        parentName: {
            type: String,
            required: [true, "Parent name is required"],
            trim: true,
            maxlength: [100, "Parent name cannot exceed 100 characters"]
        },
        parentPhone: {
            type: String,
            required: [true, "Parent phone is required"],
            trim: true,
            match: [/^[0-9+\-()\s]{6,20}$/, "Please provide a valid phone number"]
        },
        parentEmail: {
            type: String,
            required: [true, "Parent email is required"],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        applyClass: {
            type: String,
            required: [true, "Class is required"],
            enum: [
                "1th", "2th", "3th", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
                "11th Science", "11th Commerce", "12th Science", "12th Commerce"
            ]
        },
        language: {
            type: String,
            required: [true, "Language medium is required"],
            enum: ["English Medium", "Gujarati Medium"], // ✅ FIXED: Proper format with "Medium"
            default: "English Medium"
        },
        previousSchool: {
            type: String,
            trim: true,
            maxlength: [150, "Previous school name cannot exceed 150 characters"],
            default: ""
        },
        message: {
            type: String,
            trim: true,
            maxlength: [500, "Message cannot exceed 500 characters"],
            default: ""
        },
        isApproved: {
            type: Boolean,
            default: false,
            index: true // Add index for filtering
        },
        approved: {
            type: Boolean,
            default: false
        },
        approvedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true // Adds createdAt and updatedAt
    }
);

// ✅ Pre-save hook to ensure inquiryId is generated and data is clean
inquirySchema.pre("save", function (next) {
    if (!this.inquiryId) {
        this.inquiryId = generateInquiryId();
    }
    
    // Ensure language has proper format
    if (this.language && !this.language.includes("Medium")) {
        this.language = this.language === "Gujarati" ? "Gujarati Medium" : "English Medium";
    }
    
    next();
});

// ✅ Create model with proper naming
const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;