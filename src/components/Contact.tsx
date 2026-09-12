import React, { useState } from "react";
import {
  MdArrowOutward,
  MdCopyright,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
} from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode, SiGmail } from "react-icons/si";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setFeedbackMsg("Please fill in all fields (Name, Email, Message).");
      return;
    }

    setStatus("submitting");
    setFeedbackMsg("");

    try {
      // Direct API submission to abhijeetsingh0260@gmail.com
      const response = await fetch(
        "https://formsubmit.co/ajax/abhijeetsingh0260@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`,
            _template: "table",
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok || (data && (data.success === "true" || data.success === true))) {
        setStatus("success");
        setFeedbackMsg(
          "Thank you! Your message has been sent directly to Abhijeet's inbox."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data?.message || "Failed to send message via API");
      }
    } catch {
      // Fallback prompt allowing instant 1-click delivery via Gmail compose
      setStatus("error");
      setFeedbackMsg(
        "Direct API service is processing. You can click 'Send via Gmail' to deliver your message instantly!"
      );
    }
  };

  const handleOpenGmail = () => {
    const subject = encodeURIComponent(
      formData.name
        ? `Portfolio Inquiry from ${formData.name}`
        : "Portfolio Inquiry - Software / Java Developer"
    );
    const body = encodeURIComponent(
      formData.message
        ? `${formData.message}\n\n---\nFrom: ${formData.name || "Visitor"} (${
            formData.email || "Email not specified"
          })`
        : "Hi Abhijeet,\n\nI reviewed your portfolio and would like to discuss an opportunity."
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=abhijeetsingh0260@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-badge">GET IN TOUCH</span>
          <h2>
            Let's Connect <span>&</span> Build Together
          </h2>
          <p>
            Seeking a Software Developer or Java Developer position to contribute strong
            programming fundamentals, OOP design, and full-stack development skills.
            Feel free to send a message or reach out directly!
          </p>
        </div>

        <div className="contact-main-wrapper">
          {/* Left Column: Contact Details & Socials */}
          <div className="contact-info-col">
            <div className="contact-card">
              <div className="contact-card-icon">
                <MdEmail />
              </div>
              <h4>Direct Email</h4>
              <a
                href="mailto:abhijeetsingh0260@gmail.com"
                className="contact-card-value"
                data-cursor="disable"
              >
                abhijeetsingh0260@gmail.com
              </a>
              <a
                href="mailto:abhijeetsingh0260@gmail.com"
                className="contact-card-btn"
                data-cursor="disable"
              >
                Send via Mail App <MdArrowOutward />
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <MdPhone />
              </div>
              <h4>Phone & WhatsApp</h4>
              <a
                href="tel:+918081739621"
                className="contact-card-value"
                data-cursor="disable"
              >
                +91 80817 39621
              </a>
              <a
                href="https://wa.me/918081739621"
                target="_blank"
                rel="noreferrer"
                className="contact-card-btn"
                data-cursor="disable"
              >
                Chat on WhatsApp <MdArrowOutward />
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <MdLocationOn />
              </div>
              <h4>Location</h4>
              <span className="contact-card-value">Kanpur, UP, India</span>
              <span className="contact-card-status">Open to Remote & On-site</span>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <SiLeetcode />
              </div>
              <h4>Coding & Social Profiles</h4>
              <div className="contact-social-links">
                <a
                  href="https://github.com/Abhijeetsingh18"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="social-badge"
                >
                  <FaGithub /> GitHub <MdArrowOutward />
                </a>
                <a
                  href="https://linkedin.com/in/abhijeet-singh26"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="social-badge"
                >
                  <FaLinkedinIn /> LinkedIn <MdArrowOutward />
                </a>
                <a
                  href="https://leetcode.com/u/abhijeet_singh18_2008/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="social-badge"
                >
                  <SiLeetcode /> LeetCode <MdArrowOutward />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Email API */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <div className="form-card-header">
                <h3>Send a Direct Message</h3>
                <p>
                  Delivers straight to <span>abhijeetsingh0260@gmail.com</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">
                    Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">
                    Message <span>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Hi Abhijeet, I'd like to talk about an opportunity or project..."
                    required
                  />
                </div>

                {status === "success" && (
                  <div className="form-alert form-alert-success" role="alert">
                    <MdCheckCircle />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="form-alert form-alert-error" role="alert">
                    <MdErrorOutline />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={status === "submitting"}
                    data-cursor="disable"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="submit-spinner"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <MdSend /> Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenGmail}
                    className="contact-gmail-btn"
                    data-cursor="disable"
                    title="Compose and send directly in Gmail"
                  >
                    <SiGmail /> Send via Gmail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <h2>
            Designed and Developed by <span>Abhijeet Singh</span>
          </h2>
          <h5>
            <MdCopyright /> 2026 Abhijeet Singh. All rights reserved.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
