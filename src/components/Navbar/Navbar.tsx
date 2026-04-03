'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', window.location.pathname)
    }
    setIsOpen(false)
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          B.<span>DAS</span>
        </Link>
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><button className={styles.navLink} onClick={() => scrollToSection('about')}>About</button></li>
          <li><button className={styles.navLink} onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button className={styles.navLink} onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button className={styles.navLink} onClick={() => scrollToSection('contact')}>Contact</button></li>
        </ul>
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bar} style={{ transform: isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none' }}></span>
          <span className={styles.bar} style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span className={styles.bar} style={{ transform: isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none' }}></span>
        </div>
      </div>
    </nav>
  )
}
