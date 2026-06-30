"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ContactForm.module.css";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mirrorType: "Wooden Frame",
    dimensions: "",
    woodType: "Teak Wood",
    lightType: "None",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      mirrorType: "Wooden Frame",
      dimensions: "",
      woodType: "Teak Wood",
      lightType: "None",
      message: ""
    });
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className={`container ${styles.gridContainer}`}>
        
        {/* Left Info Column */}
        <div className={styles.infoCol}>
          <span className={styles.subtitle}>BESPOKE DESIGNS</span>
          <h2 className={styles.title}>Let's Build Your <span className={styles.accent}>Dream Mirror</span></h2>
          <p className={styles.description}>
            Have custom requirements? Tell us your target space dimensions, select wood tones, and light options, and we will get back to you with a free sketch mockup and quote.
          </p>

          <div className={styles.quickContacts}>
            <div className={styles.contactItem}>
              <h5>DM US ON INSTAGRAM</h5>
              <p>For instant replies, send a design reference on our page: <a href="https://www.instagram.com/glassnwood.in/" target="_blank" rel="noopener noreferrer" className={styles.link}>@glassnwood.in</a></p>
            </div>
            <div className={styles.contactItem}>
              <h5>EMAIL INQUIRIES</h5>
              <p><a href="mailto:custom@glassnwood.in" className={styles.link}>custom@glassnwood.in</a></p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className={styles.formCol}>
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className={styles.form}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={styles.input} 
                    placeholder="e.g. Rahul Sen"
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={styles.input} 
                      placeholder="rahul@example.com"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={styles.input} 
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Mirror Category</label>
                    <select 
                      value={formData.mirrorType}
                      onChange={(e) => setFormData({...formData, mirrorType: e.target.value})}
                      className={styles.select}
                    >
                      <option>Wooden Frame Only</option>
                      <option>LED Glass Mirror</option>
                      <option>LED with Wooden Frame</option>
                      <option>Minimalist Frameless</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Approx Dimensions (H x W in Inches)</label>
                    <input 
                      type="text" 
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                      className={styles.input} 
                      placeholder="e.g. 72 x 36"
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Preferred Wood Type</label>
                    <select 
                      value={formData.woodType}
                      onChange={(e) => setFormData({...formData, woodType: e.target.value})}
                      className={styles.select}
                    >
                      <option>Teak Wood (Rich Golden-Brown)</option>
                      <option>White Oak Wood (Contemporary Light)</option>
                      <option>Walnut Wood (Dark Premium)</option>
                      <option>No Wood (LED Frameless)</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>LED Lighting Type</label>
                    <select 
                      value={formData.lightType}
                      onChange={(e) => setFormData({...formData, lightType: e.target.value})}
                      className={styles.select}
                    >
                      <option>None</option>
                      <option>Warm Backlit (3000K)</option>
                      <option>Neutral White Glow (4000K)</option>
                      <option>Smart Touch Dual Lighting</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Custom Instructions / Message</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={styles.textarea} 
                    placeholder="Describe frame thickness, specific shapes (arch, round, capsule), or ceiling mounts..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <span className={styles.submitBtnText}>Submit Design Inquiry</span>
                  <Send size={16} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 size={64} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
                <p className={styles.successMessage}>
                  Thank you, <strong>{formData.name}</strong>. We have received your specifications for a custom <strong>{formData.mirrorType}</strong> ({formData.dimensions || "standard size"}).
                </p>
                <p className={styles.successSub}>
                  Our artisan designer will reach out via WhatsApp/Email within the next 24 hours with custom layouts and price details.
                </p>
                <button onClick={handleReset} className="btn-outline">
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
