'use client'

import React, { useState } from 'react'
import { FaLinkedinIn, FaGithub, FaCheck } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success'>('idle')
  const [hasSent, setHasSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitState !== 'idle') return

    setSubmitState('sending')

    try {
      const res = await fetch('https://formsubmit.co/ajax/9fb70362c2cb92a67e0d76fda9b2b5b5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'box'
        })
      })

      if (res.ok) {
        setSubmitState('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setSubmitState('idle')
          setHasSent(true)
        }, 4000)
      } else {
        alert('Something went wrong. Please try again later.')
        setSubmitState('idle')
      }
    } catch (err) {
      alert('Network error. Please try again.')
      setSubmitState('idle')
    }
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>

        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <h3>Let's build something amazing.</h3>
            <p>I am currently open to new opportunities. Feel free to reach out to me for collaborations, freelance work or just to say hi!</p>

            <div className={styles.contactDetails}>
              <a href="mailto:hello@bishaldas.com" className={styles.contactItem}>
                <span>bishald087@gmail.com</span>
              </a>
              <div className={styles.contactItem}>
                <span>Gurugram / India</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/bishal-das-82a5bb149/" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://github.com/Avalanch22" aria-label="GitHub"><FaGithub /></a>
              <a href="https://x.com/BishalD56991929" aria-label="X (Twitter)"><FaXTwitter /></a>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                placeholder="Message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitState !== 'idle'}
              className={`${styles.submitBtn} ${submitState === 'sending' ? styles.btnSending :
                  submitState === 'success' ? styles.btnSuccess : ''
                }`}
            >
              {submitState === 'idle' && (hasSent ? "Send Another" : "Send Message")}
              {submitState === 'sending' && <div className={styles.spinner}></div>}
              {submitState === 'success' && (
                <>
                  <FaCheck className={styles.tickIcon} style={{ marginRight: '8px' }} /> Sent!
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
