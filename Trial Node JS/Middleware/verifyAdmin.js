const Inquiry = require('../Models/Inquiry');

// ✅ Middleware: check if inquiry with same parent email already exists
const verifyStudentEmail = async (req, res, next) => {
    try {
        const { parentEmail } = req.body;

        // Validate input
        if (!parentEmail || !/^\S+@\S+\.\S+$/.test(parentEmail)) {
            return res.status(400).json({ error: "A valid parent email is required." });
        }

        // Check for duplicate
        const existingInquiry = await Inquiry.findOne({ parentEmail: parentEmail.toLowerCase().trim() });

        if (existingInquiry) {
            return res.status(400).json({ error: "An inquiry already exists for this email." });
        }

        next();
    } catch (error) {
        console.error("verifyStudentEmail error:", error);
        res.status(500).json({ error: "Internal server error in email verification." });
    }
};

// ✅ Generate unique student ID (e.g., STU240123)
const generateStudentId = () => {
    const timestamp = Date.now().toString().slice(-6); // last 6 digits of timestamp
    const randomPart = Math.floor(100 + Math.random() * 900); // 3 random digits
    return `STU${timestamp}${randomPart}`; // e.g. STU456789123
};

module.exports = { verifyStudentEmail, generateStudentId };
