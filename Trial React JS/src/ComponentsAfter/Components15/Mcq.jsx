import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mcq.css';
import { FaUser, FaClock, FaCheckCircle, FaTimesCircle, FaTrophy } from 'react-icons/fa';

// Tamara Backend URL mujab badli sako cho
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://school-backend-drm6.onrender.com';
const PASS_MARKS = { 25: 12, 50: 23 };

const Mcq = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // -- App States --
    const [screen, setScreen] = useState('login'); 
    const [loginData, setLoginData] = useState({ studentName: '', studentId: '' });
    const [studentInfo, setStudentInfo] = useState(null);
    const [loginMsg, setLoginMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // -- Exam States --
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [justSelected, setJustSelected] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [qTimer, setQTimer] = useState(30);
    const [resultData, setResultData] = useState(null);

    // -- Refs --
    const questionsRef = useRef([]);
    const selectedRef = useRef({});
    const currentIdxRef = useRef(0);
    const submittedRef = useRef(false);
    const qTimerIntervalRef = useRef(null);
    const studentInfoRef = useRef(null);
    const totalTimeRef = useRef(0);

    useEffect(() => { questionsRef.current = questions; }, [questions]);
    useEffect(() => { selectedRef.current = selectedAnswers; }, [selectedAnswers]);
    useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
    useEffect(() => { studentInfoRef.current = studentInfo; }, [studentInfo]);
    useEffect(() => { totalTimeRef.current = totalTime; }, [totalTime]);

    // Exam Timer Logic
    useEffect(() => {
        if (screen !== 'exam') return;
        const mainTimer = setInterval(() => {
            setTotalTime(prev => {
                if (prev <= 1) {
                    clearInterval(mainTimer);
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(mainTimer);
    }, [screen]);

    const advanceQuestion = useCallback(() => {
        if (currentIdxRef.current + 1 >= questionsRef.current.length) {
            submitExam();
        } else {
            setCurrentIdx(prev => prev + 1);
        }
    }, []);

    const submitExam = useCallback(async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;
        clearInterval(qTimerIntervalRef.current);

        const qs = questionsRef.current;
        const ans = selectedRef.current;
        const info = studentInfoRef.current;
        
        const correct = qs.filter(q => ans[q.id] === q.correctAnswer).length;
        const wrong = qs.filter(q => ans[q.id] !== undefined && ans[q.id] !== q.correctAnswer).length;
        const skipped = qs.length - (correct + wrong);
        const pct = (correct / qs.length) * 100;
        const passed = correct >= (PASS_MARKS[qs.length] || 12);

        const payload = {
            studentId: info.studentId,
            studentName: info.studentName,
            std: info.applyClass,
            medium: info.language,
            totalQuestions: qs.length,
            correctAnswers: correct,
            wrongAnswers: wrong,
            skippedAnswers: skipped,
            percentage: parseFloat(pct.toFixed(2)),
            passed,
            timeTaken: (qs.length * 60) - totalTimeRef.current
        };

        try {
            await axios.post(`${API_BASE_URL}/api/mocktest/submit`, payload);
        } catch (err) {
            console.error("❌ Failed to save result:", err);
        }

        setResultData({ correct, wrong, skipped, pct, passed, total: qs.length });
        setScreen('result');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginMsg({ type: '', text: '' });
        try {
            const res = await axios.post(`${API_BASE_URL}/api/mocktest/verify`, loginData);
            setStudentInfo(res.data.student);
            setScreen('modal');
        } catch (err) {
            setLoginMsg({ type: 'error', text: err.response?.data?.message || 'Login Failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleStartExam = async (count) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/mocktest/questions`, {
                std: studentInfo.applyClass,
                medium: studentInfo.language
            });
            
            if (res.data.questions?.length > 0) {
                const sliced = res.data.questions.slice(0, count);
                setQuestions(sliced);
                setTotalTime(count * 60);
                setCurrentIdx(0);
                setSelectedAnswers({});
                submittedRef.current = false;
                setScreen('exam');
            } else {
                alert("No questions found for your class/medium.");
            }
        } catch (err) {
            alert("Error loading questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (qId, optIdx) => {
        if (justSelected) return;
        setJustSelected(true);
        setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
        
        setTimeout(() => {
            setJustSelected(false);
            advanceQuestion();
        }, 500);
    };

    const fmtTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // --- RENDERING FUNCTIONS (Missing in your code) ---

    const renderLogin = () => (
        <div className="mcq-auth-card">
            <h2><FaUser /> Mock Test Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Student Name</label>
                    <input 
                        type="text" 
                        value={loginData.studentName}
                        onChange={(e) => setLoginData({...loginData, studentName: e.target.value})}
                        placeholder="Enter Full Name" 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Student ID</label>
                    <input 
                        type="text" 
                        value={loginData.studentId}
                        onChange={(e) => setLoginData({...loginData, studentId: e.target.value})}
                        placeholder="Enter ID Number" 
                        required 
                    />
                </div>
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Verifying...' : 'Start Session'}
                </button>
            </form>
            {loginMsg.text && <p className={`msg ${loginMsg.type}`}>{loginMsg.text}</p>}
        </div>
    );

    const renderModal = () => (
        <div className="mcq-modal">
            <div className="modal-content">
                <h3>Welcome, {studentInfo?.studentName}!</h3>
                <p>Standard: {studentInfo?.applyClass} | Medium: {studentInfo?.language}</p>
                <div className="exam-options">
                    <button onClick={() => handleStartExam(25)} className="opt-btn">25 Questions (Quick)</button>
                    <button onClick={() => handleStartExam(50)} className="opt-btn">50 Questions (Full)</button>
                </div>
            </div>
        </div>
    );

    const renderExam = () => {
        const q = questions[currentIdx];
        if (!q) return null;
        return (
            <div className="exam-layout">
                <div className="exam-header">
                    <div className="timer"><FaClock /> {fmtTime(totalTime)}</div>
                    <div className="progress">Question {currentIdx + 1} / {questions.length}</div>
                </div>
                <div className="question-card">
                    <h3 className="q-text">{q.questionText}</h3>
                    <div className="options-grid">
                        {q.options.map((opt, idx) => (
                            <button 
                                key={idx} 
                                className={`opt-choice ${selectedAnswers[q.id] === idx ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(q.id, idx)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => (
        <div className="result-card">
            <FaTrophy className="trophy-icon" />
            <h2>Result Summary</h2>
            <div className="stats">
                <p>Total: {resultData.total}</p>
                <p className="correct">Correct: {resultData.correct}</p>
                <p className="wrong">Wrong: {resultData.wrong}</p>
                <p className="score">Percentage: {resultData.pct}%</p>
            </div>
            <div className={`status-badge ${resultData.passed ? 'pass' : 'fail'}`}>
                {resultData.passed ? 'PASSED' : 'TRY AGAIN'}
            </div>
            <button onClick={() => setScreen('login')} className="retry-btn">Back to Login</button>
        </div>
    );

    return (
        <div className="mcq-wrapper">
            {screen === 'login' && renderLogin()}
            {screen === 'modal' && renderModal()}
            {screen === 'exam' && renderExam()}
            {screen === 'result' && renderResult()}
        </div>
    );
};

export default Mcq;
