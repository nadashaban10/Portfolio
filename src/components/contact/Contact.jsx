import "./contact.css";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const ref = useRef(null);
  const form = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => setStatus("success"),
        () => setStatus("error")
      );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <motion.div 
        className="container contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="section-header text-center">
          <span className="section-badge">Contact</span>
          <h2 className="section-title">Let's Build Together</h2>
          <p className="section-subtitle mx-auto">
            Ready to bring your ideas to life? Drop me a message and let's discuss your next big project.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* ===== LEFT: INFO ===== */}
          <motion.div className="contact-info-area" variants={containerVariants}>
            <div className="contact-methods">
              <motion.a variants={itemVariants} href="mailto:nadashapann@gmail.com" className="contact-method glass-panel">
                <div className="method-icon"><FaEnvelope /></div>
                <div className="method-text">
                  <span>Email</span>
                  <strong>nadashapann@gmail.com</strong>
                </div>
              </motion.a>
              <motion.a variants={itemVariants} href="https://wa.me/201156647497" target="_blank" rel="noopener noreferrer" className="contact-method glass-panel">
                <div className="method-icon"><FaWhatsapp /></div>
                <div className="method-text">
                  <span>WhatsApp</span>
                  <strong>+20 115 664 7497</strong>
                </div>
              </motion.a>
            </div>

            <motion.div variants={itemVariants} className="contact-socials glass-panel">
              <p>Connect on Socials</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/nada-shaban-89340a223/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/nadashaban10" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              </div>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT: FORM ===== */}
          <motion.div className="contact-form-area glass-panel" variants={containerVariants}>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="user_username">Name</label>
                <input id="user_username" type="text" name="user_username" placeholder="John Doe" required />
              </motion.div>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="user_email">Email</label>
                <input id="user_email" type="email" name="user_email" placeholder="john@example.com" required />
              </motion.div>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="user_message">Message</label>
                <textarea id="user_message" name="user_message" rows="5" placeholder="Tell me about your project..." required></textarea>
              </motion.div>

              <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary form-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="form-toast success">Message sent successfully! I'll get back to you soon.</motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="form-toast error">Oops! Something went wrong. Please try again.</motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;