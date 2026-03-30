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

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          B.<span>DAS</span>
        </Link>
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><Link href="#about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="#skills" className={styles.navLink} onClick={() => setIsOpen(false)}>Skills</Link></li>
          <li><Link href="#projects" className={styles.navLink} onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link href="#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link></li>
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
