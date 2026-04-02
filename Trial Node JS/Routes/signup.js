const express = require("express");
const router = express.Router();
const Signup = require("../Models/Signup");

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        // Check required fields
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // Check for existing user
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = new Signup({ fullname, email, phone, password });
        await newUser.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ message: "Server error during signup." });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await Signup.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // ✅ Simple version (without JWT)
        res.status(200).json({
            message: "Login successful",
            token: "dummy-token",
            user: {
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

module.exports = router;
