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
        if (status.msg) setStatus({ loading: false, msg: "", type: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, msg: "", type: "" });

        const templateParams = {
            from_email: formData.email,
            message: formData.message,
            title: "New Quick Inquiry Submission",
            reply_to: formData.email
        };

        try {
            const response = await emailjs.send(
                "service_zz0wjx8", // Tamari Service ID
                "template_8livzh9", // Tamari Template ID
                templateParams,
                "ixS9p5SDSZYMsvndX" // Tamari Public Key
            );

            if (response.status === 200) {
                setStatus({ 
                    loading: false, 
                    msg: "✅ Message sent successfully!", 
                    type: "success" 
                });
                setFormData({ email: "", message: "" });
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
                            <div className={`status-alert ${status.type}`}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
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
                            >
                                {status.loading ? (
                                    <><span className="spinner"></span> SENDING...</>
                                ) : (
                                    "SEND MESSAGE"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
