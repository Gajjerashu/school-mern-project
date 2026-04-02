// Routes/feed.js - Complete Feedback Routes
const express = require('express');
const router = express.Router();
const Feed = require('../Models/Feed');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post('/feedback', async (req, res) => {
    try {
        const { studentName, studentId, email, goodPoints, badPoints, comment } = req.body;

        // Validation
        if (!studentName || !studentId || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide student name, ID, and email'
            });
        }

        if (!Array.isArray(goodPoints) || goodPoints.length !== 5) {
            return res.status(400).json({
                success: false,
                message: 'Please select exactly 5 good points'
            });
        }

        if (!Array.isArray(badPoints) || badPoints.length !== 5) {
            return res.status(400).json({
                success: false,
                message: 'Please select exactly 5 bad points'
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Create new feedback entry
        const newFeedback = new Feed({
            studentName: studentName.trim(),
            studentId: studentId.trim(),
            email: email.trim().toLowerCase(),
            goodPoints,
            badPoints,
            comment: comment || ''
        });

        await newFeedback.save();

        console.log('✅ Feedback saved successfully:', {
            student: newFeedback.studentName,
            id: newFeedback.studentId,
            email: newFeedback.email
        });

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: newFeedback
        });

    } catch (error) {
        console.error('❌ Error submitting feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// @route   GET /api/feedback
// @desc    Get all feedbacks
// @access  Public
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feed.find().sort({ createdAt: -1 });

        console.log('✅ Feedbacks retrieved:', feedbacks.length);

        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks
        });

    } catch (error) {
        console.error('❌ Error fetching feedbacks:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// @route   GET /api/feedback/:id
// @desc    Get single feedback by ID
// @access  Public
router.get('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feed.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        res.status(200).json({
            success: true,
            data: feedback
        });

    } catch (error) {
        console.error('❌ Error fetching feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback by ID
// @access  Private
router.delete('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feed.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        await feedback.deleteOne();

        console.log('✅ Feedback deleted:', req.params.id);

        res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// @route   GET /api/feedback/stats/summary
// @desc    Get feedback statistics
// @access  Public
router.get('/feedback/stats/summary', async (req, res) => {
    try {
        const totalFeedbacks = await Feed.countDocuments();

        const feedbacks = await Feed.find();

        // Count good and bad points frequency
        const goodPointsFrequency = {};
        const badPointsFrequency = {};

        feedbacks.forEach(feedback => {
            feedback.goodPoints.forEach(point => {
                goodPointsFrequency[point] = (goodPointsFrequency[point] || 0) + 1;
            });
            feedback.badPoints.forEach(point => {
                badPointsFrequency[point] = (badPointsFrequency[point] || 0) + 1;
            });
        });

        res.status(200).json({
            success: true,
            data: {
                totalFeedbacks,
                goodPointsFrequency,
                badPointsFrequency
            }
        });

    } catch (error) {
        console.error('❌ Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

module.exports = router;