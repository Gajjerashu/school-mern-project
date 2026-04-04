import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });

    const [status, setStatus] = useState({ loading: false, msg: "", type: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Typing vakhte alert hide karva mate
        if (status.msg) setStatus({ loading: false, msg: "", type: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Email Validation
        if (!formData.email.includes("@")) {
            setStatus({ loading: false, msg: "❌ Please enter a valid email.", type: "error" });
            return;
        }

        setStatus({ loading: true, msg: "", type: "" });

        const templateParams = {
            from_email: formData.email,
            message: formData.message,
            title: "New Quick Inquiry Submission",
            reply_to: formData.email
        };

        try {
            // ✅ Vite Environment Variables vaparva best chhe (Security mate)
            // .env file ma: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zz0wjx8", 
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_8livzh9", 
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "ixS9p5SDSZYMsvndX"
            );

            if (response.status === 200) {
                setStatus({ 
                    loading: false, 
                    msg: "✅ Message sent successfully!", 
                    type: "success" 
                });
                setFormData({ email: "", message: "" });
                
                // 5 second pachi success message hide thai jay
                setTimeout(() => setStatus({ loading: false, msg: "", type: "" }), 5000);
            }
        } catch (error) {
            console.error("FAILED...", error);
            setStatus({ 
                loading: false, 
                msg: "❌ Failed to send message. Please try again.", 
                type: "error" 
            });
        }
    };

    return (
        <section className="section contact" id="contact">
            <div className="container">
                <h2 className="section-title">Contact Us</h2>

                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <div className="info-item">
                            <p><strong>📍 Address:</strong><br />Ahmedabad, Gujarat</p>
                        </div>
                        <div className="info-item">
                            <p><strong>📞 Phone:</strong><br />+91 98765 43210</p>
                        </div>
                        <div className="info-item">
                            <p><strong>✉️ Email:</strong><br />info@inspireedgeschool.edu.in</p>
                        </div>
                    </div>

                    <div className="contact-form-card">
                        <h3>Quick Inquiry</h3>
                        
                        {/* Status Message Display */}
                        {status.msg && (
                            <div className={`status-alert ${status.type}`} style={{
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '15px',
                                textAlign: 'center',
                                backgroundColor: status.type === 'success' ? '#eafaf1' : '#fdedec',
                                color: status.type === 'success' ? '#2ecc71' : '#e74c3c',
                                border: `1px solid ${status.type === 'success' ? '#2ecc71' : '#e74c3c'}`
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>YOUR EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>MESSAGE</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-submit" 
                                disabled={status.loading}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    cursor: status.loading ? 'not-allowed' : 'pointer',
                                    opacity: status.loading ? 0.7 : 1
                                }}
                            >
                                {status.loading ? "SENDING..." : "SEND MESSAGE"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
