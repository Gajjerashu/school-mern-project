const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    studentId: { type: String, unique: true }, // Auto-generated
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentEmail: { type: String, required: true },
    applyClass: { type: String, required: true },
    language: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    inquiryId: { type: String, required: true, unique: true },
}, { timestamps: true });

// Auto-generate Student ID before saving
admissionSchema.pre("save", async function (next) {
    if (!this.studentId) {
        const year = new Date().getFullYear();
        const count = await mongoose.model("Admission").countDocuments();
        this.studentId = `STU${year}${String(count + 1).padStart(4, "0")}`;
    }
    next();
});

module.exports = mongoose.model("Admission", admissionSchema);