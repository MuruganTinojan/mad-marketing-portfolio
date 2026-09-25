import React, { useState } from 'react';

export default function ContactSection({ onInquirySuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    let err = '';
    if (field === 'name' && !value.trim()) {
      err = 'Name is required';
    } else if (field === 'email') {
      if (!value.trim()) {
        err = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        err = 'Please enter a valid email address';
      }
    } else if (field === 'subject' && !value) {
      err = 'Please select a project type';
    } else if (field === 'message' && !value.trim()) {
      err = 'Project description is required';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save inquiry to localStorage
      const submissions = JSON.parse(localStorage.getItem('mad_inquiries') || '[]');
      const newEntry = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString()
      };
      submissions.push(newEntry);
      localStorage.setItem('mad_inquiries', JSON.stringify(submissions));

      // Format WhatsApp notification for +94763555873
      const waNumber = '94763555873';
      const waLines = [
        `*🚀 New Inquiry from MAD Marketing Portfolio*`,
        ``,
        `*👤 Name:* ${formData.name}`,
        `*✉️ Email:* ${formData.email}`,
        `*📌 Subject / Category:* ${formData.subject || 'General Inquiry'}`,
        ``,
        `*💬 Message:*`,
        `${formData.message}`,
        ``,
        `-------------------------`,
        `_Sent via madmarketing.lk portfolio_`
      ];
      const waText = encodeURIComponent(waLines.join('\n'));
      const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

      // Open WhatsApp chat
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        console.warn('Could not auto-open WhatsApp tab:', err);
      }

      setIsSubmitting(false);
      onInquirySuccess({ ...formData, waUrl });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 700);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">GET IN TOUCH</span>
          <h2 className="section-heading">
            Let's build something <span className="gradient-text">Remarkable Together.</span>
          </h2>
        </div>

        <div className="contact-layout-grid">
          {/* Left: Contact Form */}
          <div className="contact-form-container">
            <h3 className="form-header-title">Send Us a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid-row">
                <div className="form-field-group">
                  <label htmlFor="contact-name" className="form-field-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-control-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email" className="form-field-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-control-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-subject" className="form-field-label">
                  Project Type
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="form-control-select"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Web & Digital Development">Web & Digital Development</option>
                  <option value="Social & Marketing Campaigns">Social & Marketing Campaigns</option>
                  <option value="Custom Software Development (MAD LABS)">
                    Custom Software Development (MAD LABS)
                  </option>
                  <option value="Retainer Agency Partnership">Retainer Agency Partnership</option>
                  <option value="GCC Regional Expansion">GCC Regional Expansion</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
                {errors.subject && <span className="form-error-msg">{errors.subject}</span>}
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message" className="form-field-label">
                  Project Description & Goals
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-control-textarea"
                  placeholder="Tell us about the business problem you need to solve..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-submit-inquiry"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    Send Inquiry <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Contained Contact Details Card */}
          <div className="contact-info-container">
            <h3 className="form-header-title">Direct Connection</h3>
            <p className="contact-intro-lead" style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Have a complex project that needs custom execution? Tell us about your goals, timelines, and business challenges. Our team is ready to go deep.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="info-circle-badge">
                  <img src="./Contact/1.png" alt="Email Icon" />
                </div>
                <div className="info-text-wrap">
                  <span className="info-category-title">Email Inquiry</span>
                  <a href="mailto:info@madmarketing.lk" className="info-content-value">
                    info@madmarketing.lk
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-circle-badge">
                  <img src="./Contact/2.png" alt="Market Coverage Icon" />
                </div>
                <div className="info-text-wrap">
                  <span className="info-category-title">Market Coverage</span>
                  <span className="info-content-value">Local & International (UK, Canada, Australia, GCC)</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-circle-badge">
                  <img src="./Contact/3.png" alt="Headquarters Location Icon" />
                </div>
                <div className="info-text-wrap">
                  <span className="info-category-title">Headquarters</span>
                  <span className="info-content-value">
                    MAD Spaces, Level 6, Nugegoda Business Centre, 80 Nawala Road, Nugegoda, Sri Lanka
                  </span>
                </div>
              </div>
            </div>

            <div className="social-icons-row">
              <a href="https://www.facebook.com/madmarketinglk" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <img src="./Contact/facebook.png" alt="Facebook" />
              </a>
              <a href="https://instagram.com/madmarketinglk/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <img src="./Contact/instagram.png" alt="Instagram" />
              </a>
              <a href="https://linkedin.com/company/madmarketinglk" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <img src="./Contact/linkedin.png" alt="LinkedIn" />
              </a>
              <a href="https://pin.it/2Z5zegCyZ" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Pinterest">
                <img src="./Contact/pinterest.png" alt="Pinterest" />
              </a>
              <a href="https://www.tiktok.com/@mad.marketing43" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="TikTok">
                <img src="./Contact/tiktok.png" alt="TikTok" />
              </a>
              <a href="https://www.youtube.com/@madmarketinglk" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
                <img src="./Contact/youtube.png" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
