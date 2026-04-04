const Inquiry = require('../Models/Inquiry');

// ✅ Middleware: check if inquiry with same parent email already exists
const verifyStudentEmail = async (req, res, next) => {
    try {
        let { parentEmail } = req.body;

        // 1. Basic validation: Email chhe ke nahi?
        if (!parentEmail) {
            return res.status(400).json({ error: "Parent email is required." });
        }

        // 2. Email format validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(parentEmail)) {
            return res.status(400).json({ error: "Please enter a valid email address." });
        }

        // 3. Normalize email (Trim ane Lowercase)
        const normalizedEmail = parentEmail.toLowerCase().trim();

        // 4. Database check for duplicate
        const existingInquiry = await Inquiry.findOne({ parentEmail: normalizedEmail });

        if (existingInquiry) {
            return res.status(400).json({ 
                error: "An inquiry with this email already exists. Please use a different email." 
            });
        }

        // Optional: req object ma normalized email pass karo jethi controller ma pachu trim na karvu pade
        req.body.parentEmail = normalizedEmail;

        next();
    } catch (error) {
        console.error("❌ verifyStudentEmail error:", error);
        res.status(500).json({ error: "Internal server error during email verification." });
    }
};

// ✅ Generate unique student ID (Professional Way)
const generateStudentId = () => {
    const year = new Date().getFullYear().toString().slice(-2); // e.g., '24' for 2024
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 digits random
    const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
    
    // Format: STU + Year + Random + TS (e.g., STU2490123456)
    return `STU${year}${randomPart}${timestamp}`;
};

module.exports = { verifyStudentEmail, generateStudentId };
