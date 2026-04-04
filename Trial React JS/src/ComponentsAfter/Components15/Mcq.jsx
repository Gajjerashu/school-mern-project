import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ ADD: useLocation
import './Mcq.css';
import { FaUser, FaIdCard, FaCheckCircle, FaTimesCircle, FaClock, FaTrophy, FaForward } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PASS_MARKS = { 25: 12, 50: 23 };

const Mcq = () => {
    // ✅ ADD: Get location and navigate
    const location = useLocation();
    const navigate = useNavigate();

    // ── Auth & setup ──
    const [screen, setScreen] = useState('login');  // login | modal | exam | result
    const [loginData, setLoginData] = useState({ studentName: '', studentId: '' });
    const [studentInfo, setStudentInfo] = useState(null);
    const [loginMsg, setLoginMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // ── Exam state ──
    const [questions, setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState(50);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});  // { qId: optionIndex }
    const [justSelected, setJustSelected] = useState(false);

    // ── Timers ──
    const [totalTime, setTotalTime] = useState(0);   // total exam seconds
    const [qTimer, setQTimer] = useState(30);  // per-question

    // ── Result ──
    const [resultData, setResultData] = useState(null);

    // Refs — always hold latest values to avoid stale closures
    const questionsRef = useRef([]);
    const selectedRef = useRef({});
    const currentIdxRef = useRef(0);
    const submittedRef = useRef(false);
    const qTimerIntervalRef = useRef(null);
    const studentInfoRef = useRef(null);
    const questionCountRef = useRef(50);
    const totalTimeRef = useRef(0);

    // ✅ ADD: Check for reattempt on component mount
    useEffect(() => {
        if (location.state?.studentInfo) {
            console.log('✅ Reattempt detected! Auto-logging student:', location.state.studentInfo);
            const studentData = location.state.studentInfo;
            setStudentInfo(studentData);
            studentInfoRef.current = studentData;
            setLoginData({
                studentName: studentData.studentName,
                studentId: studentData.studentId
            });
            // ✅ Auto skip to modal (question count selection)
            setScreen('modal');
        }
    }, [location.state?.studentInfo]);

    // Keep refs in sync with state
    useEffect(() => { questionsRef.current = questions; }, [questions]);
    useEffect(() => { selectedRef.current = selectedAnswers; }, [selectedAnswers]);
    useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
    useEffect(() => { studentInfoRef.current = studentInfo; }, [studentInfo]);
    useEffect(() => { questionCountRef.current = questionCount; }, [questionCount]);
    useEffect(() => { totalTimeRef.current = totalTime; }, [totalTime]);

    // ── Total exam countdown ──
    useEffect(() => {
        if (screen !== 'exam') return;
        const t = setInterval(() => {
            setTotalTime(prev => {
                if (prev <= 1) {
                    clearInterval(t);
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [screen]);

    // ── Per-question 30s timer (reset on question change) ──
    useEffect(() => {
        if (screen !== 'exam') return;
        clearInterval(qTimerIntervalRef.current);
        setQTimer(30);

        qTimerIntervalRef.current = setInterval(() => {
            setQTimer(prev => {
                if (prev <= 1) {
                    clearInterval(qTimerIntervalRef.current);
                    advanceQuestion();   // auto-skip
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(qTimerIntervalRef.current);
    }, [currentIdx, screen]);

    // ── Advance to next question OR submit if last ──
    const advanceQuestion = useCallback(() => {
        const idx = currentIdxRef.current;
        const qs = questionsRef.current;
        if (idx + 1 >= qs.length) {
            submitExam();
        } else {
            setCurrentIdx(idx + 1);
        }
    }, []);

    // ── Central submit (runs once via ref guard) ──
    const submitExam = useCallback(async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;
        clearInterval(qTimerIntervalRef.current);

        const qs = questionsRef.current;
        const answers = selectedRef.current;
        const info = studentInfoRef.current;
        const qCount = questionCountRef.current;
        const tLeft = totalTimeRef.current;

        // Calculate results
        const correct = qs.filter(q => answers[q.id] !== undefined && answers[q.id] === q.correctAnswer).length;
        const wrong = qs.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer).length;
        const skipped = qs.filter(q => answers[q.id] === undefined).length;
        const pct = qs.length > 0 ? (correct / qs.length) * 100 : 0;
        const passed = correct >= (PASS_MARKS[qCount] || 23);

        console.log('🔍 Debug Info:', {
            correct, wrong, skipped,
            percentage: pct.toFixed(2),
            passed,
            studentId: info.studentId,
            std: info.applyClass,
            medium: info.language
        });

        // ✅ Clean and validate payload data
        const payload = {
            studentId: (info.studentId || '').trim(),
            studentName: (info.studentName || '').trim(),
            std: (info.applyClass || '').trim(),
            medium: (info.language || 'English').trim(),
            totalQuestions: parseInt(qs.length) || 0,
            correctAnswers: parseInt(correct) || 0,
            wrongAnswers: parseInt(wrong) || 0,
            skippedAnswers: parseInt(skipped) || 0,
            percentage: parseFloat(pct.toFixed(2)) || 0,
            passed: Boolean(passed),
            timeTaken: parseInt(qs.length * 60 - tLeft) || 0
        };

        console.log('📤 DEBUG: Cleaned Payload:', payload);

        try {
            console.log('📤 Sending result to: http://localhost:5000/api/mocktest/submit');

            const response = await fetch('http://localhost:5000/api/mocktest/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            console.log('📥 Server Response:', {
                status: response.status,
                ok: response.ok,
                data: data
            });

            if (response.ok) {
                console.log('✅✅✅ RESULT SAVED SUCCESSFULLY TO MONGODB!');
                console.log('Saved Result ID:', data.data._id);
            } else {
                console.error('❌ Server rejected result:', data);
            }
        } catch (err) {
            console.error('❌ ERROR sending result to backend:', err);
            console.error('Error Details:', err.message);
        }

        // ✅ Show result page regardless of save success
        setResultData({ correct, wrong, skipped, pct, passed, total: qs.length, qCount });
        setScreen('result');
    }, []);

    // ── Login ──
    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true);
        setLoginMsg({ type: '', text: '' });
        try {
            const res = await fetch('http://localhost:5000/api/mocktest/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            if (res.ok) {
                setStudentInfo(data.student);
                studentInfoRef.current = data.student;
                setScreen('modal');
            } else {
                setLoginMsg({ type: 'error', text: data.message || 'Invalid credentials' });
            }
        } catch {
            setLoginMsg({ type: 'error', text: 'Server error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // ── Start exam ──
    const handleStartExam = async count => {
        setLoading(true);
        setLoginMsg({ type: '', text: '' });
        try {
            const res = await fetch('http://localhost:5000/api/mocktest/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ std: studentInfo.applyClass, medium: studentInfo.language })
            });
            const data = await res.json();

            if (res.ok && Array.isArray(data.questions) && data.questions.length > 0) {
                const sliced = data.questions.slice(0, count);

                // Reset all exam state BEFORE switching screen
                submittedRef.current = false;
                questionsRef.current = sliced;
                selectedRef.current = {};
                currentIdxRef.current = 0;
                questionCountRef.current = count;
                totalTimeRef.current = count * 60;

                setQuestions(sliced);
                setQuestionCount(count);
                setSelectedAnswers({});
                setCurrentIdx(0);
                setTotalTime(count * 60);
                setQTimer(30);
                setResultData(null);
                setScreen('exam');
            } else {
                setLoginMsg({ type: 'error', text: data.message || 'Failed to load questions' });
            }
        } catch {
            setLoginMsg({ type: 'error', text: 'Server error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // ── Select answer → auto advance ──
    const handleAnswerSelect = (questionId, optionIndex) => {
        if (justSelected) return;
        clearInterval(qTimerIntervalRef.current);
        const updated = { ...selectedRef.current, [questionId]: optionIndex };
        selectedRef.current = updated;
        setSelectedAnswers(updated);
        setJustSelected(true);
        setTimeout(() => {
            setJustSelected(false);
            advanceQuestion();
        }, 400);
    };

    const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // ══════════════════════════════════════════════════════════════════════════════════════
    // LOGIN SCREEN
    // ══════════════════════════════════════════════════════════════════════════════════════
    if (screen === 'login') return (
        <div className="mcq-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Mock Test</h1>
                    <p>InspireEdge School</p>
                </div>
                {loginMsg.text && <div className={`alert ${loginMsg.type}`}>{loginMsg.text}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label><FaUser /> Student Name</label>
                        <input type="text" name="studentName" value={loginData.studentName}
                            onChange={e => setLoginData(p => ({ ...p, studentName: e.target.value }))}
                            placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label><FaIdCard /> Student ID</label>
                        <input type="text" name="studentId" value={loginData.studentId}
                            onChange={e => setLoginData(p => ({ ...p, studentId: e.target.value }))}
                            placeholder="Enter your ID" required />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Login & Continue'}
                    </button>
                </form>
            </div>
        </div>
    );

    // ══════════════════════════════════════════════════════════════════════════════════════
    // QUESTION COUNT MODAL
    // ══════════════════════════════════════════════════════════════════════════════════════
    if (screen === 'modal') return (
        <div className="mcq-page">
            <div className="count-modal">
                <div className="count-header">
                    <div className="student-badge">
                        <span className="badge-avatar">👨‍🎓</span>
                        <div>
                            <h3>{studentInfo.studentName}</h3>
                            <p>Std: {studentInfo.applyClass} &nbsp;|&nbsp; {studentInfo.language}</p>
                        </div>
                    </div>
                </div>
                {loginMsg.text && <div className={`alert ${loginMsg.type}`}>{loginMsg.text}</div>}
                <h2>Choose Question Count</h2>
                <p className="count-subtitle">Select number of questions for this mock test</p>
                <div className="count-options">
                    <div className="count-card" onClick={() => !loading && handleStartExam(25)}>
                        <div className="count-num">25</div>
                        <div className="count-label">Questions</div>
                        <div className="count-info">⏱ 25 min &nbsp;|&nbsp; Pass: 12/25</div>
                        <div className="count-btn">{loading ? 'Loading...' : 'Start →'}</div>
                    </div>
                    <div className="count-card featured" onClick={() => !loading && handleStartExam(50)}>
                        <div className="count-badge-tag">Recommended</div>
                        <div className="count-num">50</div>
                        <div className="count-label">Questions</div>
                        <div className="count-info">⏱ 50 min &nbsp;|&nbsp; Pass: 23/50</div>
                        <div className="count-btn">{loading ? 'Loading...' : 'Start →'}</div>
                    </div>
                </div>
                <div className="count-rules">
                    <p>⚡ Each question has <strong>30 seconds</strong> timer</p>
                    <p>⏭ Unanswered questions auto-skip after 30s</p>
                    <p>📊 Skipped questions are <strong>not counted</strong> in score</p>
                </div>
            </div>
        </div>
    );

    // ══════════════════════════════════════════════════════════════════════════════════════
    // RESULT SCREEN
    // ══════════════════════════════════════════════════════════════════════════════════════
    if (screen === 'result' && resultData) {
        const { correct, wrong, skipped, pct, passed, total, qCount } = resultData;
        return (
            <div className="mcq-page">
                <div className="result-card">
                    <div className={`result-header ${passed ? 'passed' : 'failed'}`}>
                        {passed
                            ? <><FaTrophy /><h1>Congratulations! 🎉</h1><p>You have Passed</p></>
                            : <><FaTimesCircle /><h1>Not Qualified</h1><p>Better luck next time</p></>
                        }
                    </div>
                    <div className="result-body">
                        <div className="result-info">
                            <div className="info-row"><span>Student</span><span>{studentInfo.studentName}</span></div>
                            <div className="info-row"><span>ID</span><span>{studentInfo.studentId}</span></div>
                            <div className="info-row"><span>Class</span><span>{studentInfo.applyClass}</span></div>
                            <div className="info-row"><span>Medium</span><span>{studentInfo.language}</span></div>
                            <div className="info-row"><span>Pass Marks</span><span>{PASS_MARKS[qCount]}/{qCount}</span></div>
                        </div>

                        <div className="result-stats">
                            <div className="stat total-stat">
                                <div className="stat-icon">📝</div>
                                <div className="value">{total}</div>
                                <div className="label">Total</div>
                            </div>
                            <div className="stat correct">
                                <FaCheckCircle />
                                <div className="value">{correct}</div>
                                <div className="label">Correct</div>
                            </div>
                            <div className="stat wrong">
                                <FaTimesCircle />
                                <div className="value">{wrong}</div>
                                <div className="label">Wrong</div>
                            </div>
                            <div className="stat skipped">
                                <FaForward />
                                <div className="value">{skipped}</div>
                                <div className="label">Skipped</div>
                            </div>
                        </div>

                        <div className="percent-bar-wrap">
                            <div className="percent-label">
                                <span>Score</span>
                                <span className="pct-val">{pct.toFixed(1)}%</span>
                            </div>
                            <div className="percent-bar">
                                <div className="percent-fill" style={{
                                    width: `${pct}%`,
                                    background: passed ? 'linear-gradient(90deg,#22c55e,#16a34a)' : 'linear-gradient(90deg,#ef4444,#dc2626)'
                                }} />
                            </div>
                        </div>

                        {skipped > 0 && (
                            <div className="skipped-section">
                                <h4>⏭ Skipped Questions — Correct Answers</h4>
                                <div className="skipped-list">
                                    {questions
                                        .filter(q => selectedAnswers[q.id] === undefined)
                                        .map(q => (
                                            <div key={q.id} className="skipped-item">
                                                <div className="skip-qnum">Q{questions.indexOf(q) + 1}</div>
                                                <div className="skip-content">
                                                    <div className="skip-question">{q.question}</div>
                                                    <div className="skip-answer">
                                                        ✅ Correct: <strong>{q.options[q.correctAnswer]}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {!passed && (
                            <div className="retry-msg">
                                <p>📚 Study harder and try again!</p>
                                <p>💪 Need {(PASS_MARKS[qCount] || 23) - correct} more correct answers to pass</p>
                            </div>
                        )}
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            {passed ? '🏠 Exit' : '🔄 Reattempt'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════════════════════
    // EXAM SCREEN — safe guard
    // ══════════════════════════════════════════════════════════════════════════════════════
    if (screen !== 'exam' || questions.length === 0 || currentIdx >= questions.length) {
        return (
            <div className="mcq-page">
                <div className="loading-card">
                    <div className="loading-spinner" />
                    <h2>Preparing Exam...</h2>
                    <p>Please wait</p>
                </div>
            </div>
        );
    }

    const question = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;
    const answeredCount = Object.keys(selectedAnswers).length;
    const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
    const wrongCount = answeredCount - correctCount;
    const qTimerPct = (qTimer / 30) * 100;
    const qTimerColor = qTimer > 15 ? '#22c55e' : qTimer > 7 ? '#f59e0b' : '#ef4444';

    return (
        <div className="exam-page">
            <div className="exam-header">
                <div className="header-left">
                    <h1>Mock Test</h1>
                    <div className="header-meta">
                        <span className="hd-tag">👤 {studentInfo.studentName}</span>
                        <span className="hd-tag">🎓 {studentInfo.applyClass}</span>
                        <span className="hd-tag">🌐 {studentInfo.language}</span>
                    </div>
                </div>
                <div className="header-right">
                    <FaClock />
                    <span>{fmt(totalTime)}</span>
                </div>
            </div>

            <div className="exam-content">
                <div className="question-panel">
                    <div className="q-header">
                        <span className="q-num">Question {currentIdx + 1}</span>
                        <span className="q-total">of {questions.length}</span>
                        <span className="q-hint">⚡ Select to continue</span>
                    </div>

                    <div className="q-timer-bar-wrap">
                        <div className="q-timer-bar" style={{ width: `${qTimerPct}%`, background: qTimerColor }} />
                    </div>
                    <div className="q-timer-label" style={{ color: qTimerColor }}>⏱ {qTimer}s remaining</div>

                    <div className="q-text"><h2>{question.question}</h2></div>

                    <div className="options">
                        {question.options.map((option, index) => (
                            <div
                                key={index}
                                className={`option ${selectedAnswers[question.id] === index ? 'selected' : ''} ${justSelected ? 'locked' : ''}`}
                                onClick={() => handleAnswerSelect(question.id, index)}
                            >
                                <div className="opt-badge">{String.fromCharCode(65 + index)}</div>
                                <div className="opt-text">{option}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stats-panel">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-num">{answeredCount}</div>
                            <div className="stat-lbl">Answered</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-num">{questions.length - answeredCount}</div>
                            <div className="stat-lbl">Remaining</div>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-box correct-box">
                            <FaCheckCircle className="icon" />
                            <div className="stat-num">{correctCount}</div>
                            <div className="stat-lbl">Correct</div>
                        </div>
                        <div className="stat-box wrong-box">
                            <FaTimesCircle className="icon" />
                            <div className="stat-num">{wrongCount}</div>
                            <div className="stat-lbl">Wrong</div>
                        </div>
                    </div>
                    <div className="progress-circle">
                        <svg width="140" height="140">
                            <circle className="bg" cx="70" cy="70" r="60" />
                            <circle className="fill" cx="70" cy="70" r="60"
                                style={{
                                    strokeDasharray: `${2 * Math.PI * 60}`,
                                    strokeDashoffset: `${2 * Math.PI * 60 * (1 - progress / 100)}`
                                }}
                            />
                        </svg>
                        <div className="progress-text">{Math.round(progress)}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mcq;
