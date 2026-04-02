// Models/Mcq.js - FIXED VERSION
const mongoose = require('mongoose');

const McqResultSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    std: {
        type: String,
        required: true,
        // ✅ FIXED: Added 'th' suffix to match frontend format
        enum: [
            '1th', '2th', '3th', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
            '11th Commerce', '11th Science', '12th Commerce', '12th Science'
        ]
    },
    medium: {
        type: String,
        required: true,
        enum: ['English', 'Gujarati']
    },
    totalQuestions: {
        type: Number,
        required: true,
        default: 50
    },
    correctAnswers: {
        type: Number,
        required: true,
        min: 0
    },
    wrongAnswers: {
        type: Number,
        required: true,
        min: 0
    },
    skippedAnswers: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    passed: {
        type: Boolean,
        required: true
    },
    timeTaken: {
        type: Number,
        required: true,
        default: 0
    },
    attemptNumber: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
});

// ✅ Indexes for faster queries
McqResultSchema.index({ studentId: 1, createdAt: -1 });
McqResultSchema.index({ std: 1 });
McqResultSchema.index({ passed: 1 });
McqResultSchema.index({ createdAt: -1 });

// ✅ Auto-increment attempt number
McqResultSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const prev = await this.constructor.countDocuments({
                studentId: this.studentId
            });
            this.attemptNumber = prev + 1;
        } catch (err) {
            console.error('Error in pre-save hook:', err);
        }
    }
    next();
});

module.exports = mongoose.model('McqResult', McqResultSchema);