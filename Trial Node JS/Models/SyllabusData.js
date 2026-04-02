const mongoose = require("mongoose");

const syllabusDataSchema = new mongoose.Schema({
    standard: {
        type: Number,
        required: true
    },
    medium: {
        type: String,
        enum: ["English", "Gujarati"],
        required: true
    },
    stream: {
        type: String,
        enum: ["NA", "Science", "Commerce"],
        default: "NA"
    },
    subjects: [
        {
            subjectName: { type: String, required: true },
            topics: [{ type: String }]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("SyllabusData", syllabusDataSchema);