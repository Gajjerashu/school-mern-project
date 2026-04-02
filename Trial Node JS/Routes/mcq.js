// Routes/mcq.js - FINAL FIXED VERSION ALIGNED WITH MONGODB JSON STRUCTURE
const express = require('express');
const router = express.Router();
const Admission = require('../Models/Admission');
const McqResult = require('../Models/Mcq');
const mongoose = require('mongoose');

// ✅ Helper: Normalize class format
const normalizeStd = (std) => {
    if (!std) return std;
    std = std.trim();
    // Already has 'th'? Keep it
    if (std.includes('th')) return std;
    // Add 'th' for numbers
    if (/^\d+$/.test(std)) return std + 'th';
    return std;
};

// ──────────────────────────────────────────
// 1. VERIFY STUDENT
// ──────────────────────────────────────────
router.post('/verify', async (req, res) => {
    try {
        console.log('📥 Verify request:', req.body);
        
        const { studentName, studentId } = req.body;
        if (!studentName || !studentId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide both student name and ID' 
            });
        }

        const student = await Admission.findOne({
            studentId: studentId.trim(),
            studentName: { $regex: new RegExp(`^${studentName.trim()}$`, 'i') }
        });

        if (!student) {
            console.log('❌ Student not found:', { studentName, studentId });
            return res.status(404).json({ 
                success: false, 
                message: 'Invalid student name or ID' 
            });
        }

        console.log('✅ Student verified:', student.studentName);

        res.status(200).json({
            success: true,
            student: {
                studentId: student.studentId,
                studentName: student.studentName,
                applyClass: student.applyClass,
                language: student.language || 'English'
            }
        });
    } catch (err) {
        console.error('❌ Verify error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during verification',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 2. GET QUESTIONS
// ──────────────────────────────────────────
router.post('/questions', async (req, res) => {
    try {
        console.log('📥 Questions request:', req.body);
        
        const { std, medium } = req.body;
        if (!std || !medium) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide class and medium' 
            });
        }

        const Mcqdata = mongoose.connection.collection('mcqdata');
        
        let normalizedStd = std;
        let primarySearchMedium = null;
        let secondarySearchMedium = null;

        // ✅ ALIGNED WITH MONGODB JSON STRUCTURE:
        // Classes 1-10: { "English": [...], "Gujarati": [...] }
        // Class 11: { "Commerce English": [...], "Commerce Gujarati": [...], "Science": [...], "English": [...], "Gujarati": [...] }
        // Class 12: { "Commerce English": [...], "Commerce Gujarati": [...], "Science": [...], "English": [...], "Gujarati": [...] }

        if (std.includes('Commerce')) {
            // Commerce: "Commerce English" or "Commerce Gujarati"
            normalizedStd = std.match(/\d+/)[0];
            primarySearchMedium = `Commerce ${medium}`;
            console.log('📌 Commerce class detected:', { normalizedStd, searchMedium: primarySearchMedium });
        } else if (std.includes('Science')) {
            // Science: Try "Science English"/"Science Gujarati" first, fallback to "English"/"Gujarati"
            normalizedStd = std.match(/\d+/)[0];
            primarySearchMedium = `Science ${medium}`;      // Try: "Science English"
            secondarySearchMedium = medium;                  // Fallback: "English" or "Gujarati"
            console.log('📌 Science class detected:', { normalizedStd, primarySearchMedium, secondarySearchMedium });
        } else {
            // Regular classes (1-10): "English" or "Gujarati"
            normalizedStd = normalizedStd.replace(/th|st|nd|rd/g, '').trim();
            primarySearchMedium = medium;
            console.log('📌 Regular class detected:', { normalizedStd, searchMedium: primarySearchMedium });
        }

        const query = {};
        query[normalizedStd] = { $exists: true };
        
        console.log('🔍 MongoDB Query:', query);
        
        const doc = await Mcqdata.findOne(query);
        if (!doc) {
            console.log('❌ No questions found for class:', normalizedStd);
            return res.status(404).json({ 
                success: false, 
                message: `No questions available for Class ${std}` 
            });
        }

        const stdData = doc[normalizedStd];
        const availableKeys = Object.keys(stdData);
        console.log('📚 Available subjects for class:', availableKeys);
        
        let questions = null;

        // ✅ SMART LOOKUP WITH FALLBACK FOR SCIENCE
        if (std.includes('Science') && secondarySearchMedium) {
            // Try primary first: "Science English"/"Science Gujarati"
            questions = stdData[primarySearchMedium] || null;
            
            if (!questions) {
                // Fallback to secondary: "English"/"Gujarati"
                console.log(`⚠️ ${primarySearchMedium} not found, trying fallback: ${secondarySearchMedium}`);
                questions = stdData[secondarySearchMedium] || null;
                if (questions) {
                    primarySearchMedium = secondarySearchMedium;  // Update for logging
                    console.log(`✅ Fallback successful: Using ${secondarySearchMedium}`);
                }
            } else {
                console.log(`✅ Found: ${primarySearchMedium}`);
            }
        } else {
            // Commerce or Regular classes: Direct lookup
            questions = stdData[primarySearchMedium] || null;
            if (questions) {
                console.log(`✅ Found: ${primarySearchMedium}`);
            }
        }

        if (!questions || questions.length === 0) {
            console.log(`❌ No questions for this medium: ${primarySearchMedium}`);
            console.log(`📚 Available options: ${availableKeys.join(", ")}`);
            return res.status(404).json({ 
                success: false, 
                message: `No questions for ${std} (${medium})`,
                available: availableKeys
            });
        }

        // Convert questions array to array format (handle both array and object formats)
        let questionsArray = Array.isArray(questions) ? questions : Object.values(questions);
        
        // Shuffle questions
        const shuffled = questionsArray.sort(() => Math.random() - 0.5);
        console.log(`✅ Questions loaded: ${shuffled.length} questions for ${primarySearchMedium}`);

        res.status(200).json({ 
            success: true, 
            questions: shuffled.slice(0, 50), 
            totalQuestions: 50,
            medium: primarySearchMedium 
        });

    } catch (err) {
        console.error('❌ Questions error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error loading questions',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 3. SUBMIT RESULT
// ──────────────────────────────────────────
router.post('/submit', async (req, res) => {
    try {
        console.log('📥 Result submission:', req.body);

        const {
            studentId, studentName, std, medium,
            totalQuestions, correctAnswers, wrongAnswers, skippedAnswers,
            percentage, passed, timeTaken
        } = req.body;

        // Validation
        if (!studentId || !studentName || !std || !medium) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: studentId, studentName, std, medium' 
            });
        }

        if (correctAnswers === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing correctAnswers field' 
            });
        }

        // ✅ Normalize std format
        const normalizedStd = normalizeStd(std);

        // Create result document
        const result = new McqResult({
            studentId: studentId.trim(),
            studentName: studentName.trim(),
            std: normalizedStd,
            medium: medium.trim(),
            totalQuestions: totalQuestions || 50,
            correctAnswers: parseInt(correctAnswers) || 0,
            wrongAnswers: parseInt(wrongAnswers) || 0,
            skippedAnswers: parseInt(skippedAnswers) || 0,
            percentage: parseFloat(percentage) || 0,
            passed: Boolean(passed),
            timeTaken: parseInt(timeTaken) || 0
        });

        // Save to database
        const saved = await result.save();
        console.log('✅ Result saved:', {
            id: saved._id,
            student: saved.studentName,
            std: saved.std,
            medium: saved.medium,
            passed: saved.passed,
            percentage: saved.percentage.toFixed(2) + '%'
        });

        res.status(201).json({ 
            success: true, 
            message: 'Result saved successfully',
            data: saved 
        });

    } catch (err) {
        console.error('❌ Submit error:', err.message);
        
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed',
                errors: messages
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Error saving result',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 4. GET ALL RESULTS FOR A STUDENT
// ──────────────────────────────────────────
router.get('/results/:studentId', async (req, res) => {
    try {
        console.log('📥 Get results request:', req.params.studentId);

        const results = await McqResult.find({ 
            studentId: req.params.studentId 
        }).sort({ createdAt: -1 });

        console.log('✅ Found results:', results.length);

        res.status(200).json({ 
            success: true, 
            count: results.length, 
            data: results 
        });

    } catch (err) {
        console.error('❌ Get results error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving results',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 5. GET LATEST RESULT FOR A STUDENT
// ──────────────────────────────────────────
router.get('/results/:studentId/latest', async (req, res) => {
    try {
        console.log('📥 Get latest result request:', req.params.studentId);

        const result = await McqResult.findOne({ 
            studentId: req.params.studentId 
        }).sort({ createdAt: -1 });

        if (!result) {
            console.log('⚠️ No results found for student:', req.params.studentId);
            return res.status(404).json({ 
                success: false, 
                message: 'No mock test results found for this student' 
            });
        }

        console.log('✅ Latest result retrieved:', {
            student: result.studentName,
            std: result.std,
            medium: result.medium,
            percentage: result.percentage.toFixed(2) + '%'
        });

        res.status(200).json({ 
            success: true, 
            data: result 
        });

    } catch (err) {
        console.error('❌ Get latest error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving latest result',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 6. GET OVERALL STATISTICS
// ──────────────────────────────────────────
router.get('/stats/overall', async (req, res) => {
    try {
        const total = await McqResult.countDocuments();
        const passed = await McqResult.countDocuments({ passed: true });
        
        const [avgData] = await McqResult.aggregate([
            { $group: { _id: null, avg: { $avg: '$percentage' } } }
        ]);

        const top = await McqResult.find()
            .sort({ percentage: -1, timeTaken: 1 })
            .limit(10)
            .select('studentId studentName std medium percentage passed createdAt');

        res.status(200).json({
            success: true,
            data: {
                total,
                passed,
                failed: total - passed,
                passRate: total ? ((passed / total) * 100).toFixed(2) : 0,
                avgPercentage: avgData?.avg?.toFixed(2) || 0,
                top
            }
        });
    } catch (err) {
        console.error('❌ Stats error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving statistics' 
        });
    }
});

// ──────────────────────────────────────────
// 7. GET ALL RESULTS (FOR ADMIN PANEL)
// ──────────────────────────────────────────
router.get('/results', async (req, res) => {
    try {
        console.log('📥 Get all mock test results request (Admin Panel)');

        const results = await McqResult.find({})
            .sort({ createdAt: -1 })
            .limit(200);

        console.log('✅ Found total results:', results.length);

        res.status(200).json({ 
            success: true, 
            count: results.length, 
            data: results 
        });

    } catch (err) {
        console.error('❌ Get all results error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving all results',
            error: err.message 
        });
    }
});

// ──────────────────────────────────────────
// 8. DELETE RESULT (Optional)
// ──────────────────────────────────────────
router.delete('/results/:id', async (req, res) => {
    try {
        const result = await McqResult.findById(req.params.id);
        
        if (!result) {
            return res.status(404).json({ 
                success: false, 
                message: 'Result not found' 
            });
        }

        await result.deleteOne();
        console.log('✅ Result deleted:', req.params.id);

        res.status(200).json({ 
            success: true, 
            message: 'Result deleted successfully' 
        });

    } catch (err) {
        console.error('❌ Delete error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting result' 
        });
    }
});

module.exports = router;