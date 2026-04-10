const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Please provide student name'],
        trim: true,
        maxlength: [100, 'Student name cannot be more than 100 characters']
    },
    studentId: {
        type: String,
        required: [true, 'Please provide student ID'],
        trim: true,
        maxlength: [50, 'Student ID cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    goodPoints: {
        type: [String],
        required: [true, 'Please select good points'],
        validate: {
            validator: function(v) {
                return v.length === 5;
            },
            message: 'Must select exactly 5 good points'
        }
    },
    badPoints: {
        type: [String],
        required: [true, 'Please select bad points'],
        validate: {
            validator: function(v) {
                return v.length === 5;
            },
            message: 'Must select exactly 5 bad points'
        }
    },
    comment: {
        type: String,
        trim: true,
        default: '',
        maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'feeds'   // ← Force exact collection name
});

// Indexes
FeedSchema.index({ createdAt: -1 });
FeedSchema.index({ studentId: 1 });
FeedSchema.index({ email: 1 });
FeedSchema.index({ status: 1 });

module.exports = mongoose.model('Feed', FeedSchema);
