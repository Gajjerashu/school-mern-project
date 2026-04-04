import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios ઉપયોગ કરવો વધુ સરળ છે
import './Mcq.css';
import { FaUser, FaIdCard, FaCheckCircle, FaTimesCircle, FaClock, FaTrophy, FaForward } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
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
    const [questionCount, setQuestionCount] = useState(50);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [justSelected, setJustSelected] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [qTimer, setQTimer] = useState(30);
    const [resultData, setResultData] = useState(null);

    // -- Refs for logic synchronization --
    const questionsRef = useRef([]);
    const selectedRef = useRef({});
    const currentIdxRef = useRef(0);
    const submittedRef = useRef(false);
    const qTimerIntervalRef = useRef(null);
    const studentInfoRef = useRef(null);
    const totalTimeRef = useRef(0);

    // Sync Refs with State
    useEffect(() => { questionsRef.current = questions; }, [questions]);
    useEffect(() => { selectedRef.current = selectedAnswers; }, [selectedAnswers]);
    useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
    useEffect(() => { studentInfoRef.current = studentInfo; }, [studentInfo]);
    useEffect(() => { totalTimeRef.current = totalTime; }, [totalTime]);

    // Check for reattempt/auto-login
    useEffect(() => {
        if (location.state?.studentInfo) {
            const info = location.state.studentInfo;
            setStudentInfo(info);
            setLoginData({ studentName: info.studentName, studentId: info.studentId });
            setScreen('modal');
        }
    }, [location.state]);

    // Global Exam Timer
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

    // Question Timer
    useEffect(() => {
        if (screen !== 'exam') return;
        clearInterval(qTimerIntervalRef.current);
        setQTimer(30);

        qTimerIntervalRef.current = setInterval(() => {
            setQTimer(prev => {
                if (prev <= 1) {
                    advanceQuestion();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(qTimerIntervalRef.current);
    }, [currentIdx, screen]);

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
        const passed = correct >= (PASS_MARKS[qs.length] || 23);

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
            console.log("✅ Result saved to database");
        } catch (err) {
            console.error("❌ Failed to save result:", err);
        }

        setResultData({ correct, wrong, skipped, pct, passed, total: qs.length });
        setScreen('result');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                setQuestionCount(count);
                setTotalTime(count * 60);
                setCurrentIdx(0);
                setSelectedAnswers({});
                submittedRef.current = false;
                setScreen('exam');
            }
        } catch (err) {
            setLoginMsg({ type: 'error', text: 'Could not load questions.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (qId, optIdx) => {
        if (justSelected) return;
        setJustSelected(true);
        
        const newAns = { ...selectedAnswers, [qId]: optIdx };
        setSelectedAnswers(newAns);
        
        setTimeout(() => {
            setJustSelected(false);
            advanceQuestion();
        }, 500);
    };

    const fmtTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // Render Logic... (તમારો હાલનો UI કોડ અહીં આવશે, બસ `fmt` ની જગ્યાએ `fmtTime` વાપરજો)
    // ...
    return (
        <div className="mcq-container">
            {screen === 'login' && renderLogin()}
            {screen === 'modal' && renderModal()}
            {screen === 'exam' && renderExam()}
            {screen === 'result' && renderResult()}
        </div>
    );
};

export default Mcq;
