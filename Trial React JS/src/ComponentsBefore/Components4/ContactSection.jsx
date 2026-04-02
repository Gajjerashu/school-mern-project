import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            email: formData.email,
            message: formData.message,
            title: "New Quick Inquiry Submission",
        };

        emailjs
            .send(
                "service_zz0wjx8",
                "template_8livzh9",
                templateParams,
                "ixS9p5SDSZYMsvndX"
            )
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                alert("Your message has been sent successfully!");
                setFormData({
                    email: "",
                    message: "",
                });
            })
            .catch((error) => {
                console.error("FAILED...", error);
                alert("Failed to send message. Please try again!");
            });
    };

    return (
        <section className="section contact" id="contact">

            <div className="container">

                <h2 className="section-title">Contact Us</h2>

                <div className="contact-grid">

                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <p><strong>📍 Address:</strong><br />Ahmedabad, Gujarat</p>
                        <p><strong>📞 Phone:</strong><br />+91 98765 43210</p>
                        <p><strong>✉️ Email:</strong><br />info@inspireedgeschool.edu.in</p>
                    </div>

                    <div className="contact-info">
                        <h3>Quick Inquiry</h3>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>

                            <button type="submit" className="btn-submit">
                                SEND MESSAGE
                            </button>
                        </form>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
