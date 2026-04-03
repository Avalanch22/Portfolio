'use client'

import { useState, useRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import styles from './Hero.module.css'

export default function Hero() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [downloadState, setDownloadState] = useState<'idle' | 'animating' | 'downloaded'>('idle')
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (downloadState !== 'idle') {
      e.preventDefault()
      return
    }
    
    setDownloadState('animating')
    
    setTimeout(() => {
      setDownloadState('downloaded')
    }, 1500)
  }

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Text Content */}
        <div className={styles.heroContent}>
          <p className={`${styles.subtitle} fade-up`}>
            <span className={styles.highlight}>Hello, I'm</span>
          </p>
          <h1 className={`${styles.title} fade-up`}>Bishal Das</h1>
          <h2 className={`${styles.role} fade-up delay-1`}>
            Software Engineer <br />
            & <span className="gradient-text">Creative Developer</span>
          </h2>
          <p className={`${styles.description} fade-up delay-2`}>
            I build responsive, modern, and accessible digital experiences that balance aesthetics and scalable performance.
          </p>
          <div className={`${styles.ctaGroup} fade-up delay-3`}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => {
                const section = document.getElementById('projects')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                  // Reset the URL hash so the button always works
                  history.replaceState(null, '', window.location.pathname)
                }
              }}
            >
              View My Work
            </button>
            <a 
              href="/resume.pdf" 
              download 
              onClick={handleDownload}
              className={`${styles.btn} ${styles.btnSecondary} ${styles.btnDownload} ${
                downloadState === 'animating' ? styles.downloadAnimating : 
                downloadState === 'downloaded' ? styles.downloadDownloaded : ''
              }`}
            >
              {downloadState === 'idle' && "Download Resume"}
              {downloadState === 'animating' && <FaCheck className={styles.tickIcon} />}
              {downloadState === 'downloaded' && "Downloaded"}
            </a>
          </div>
        </div>
        
        {/* Right UI Heavy Interactive Component */}
        <div className={`${styles.interactiveWrapper} fade-up delay-4`}>
          <div 
            ref={cardRef}
            className={styles.interactiveCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
            }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.macButtons}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.cardTitle}>developer.ts</div>
            </div>
            
            <div className={styles.cardBody}>
              <pre>
                <code>
                  <span className={styles.keyword}>const</span> <span className={styles.variable}>profile</span> = {'{'}
                  {'\n  '}name: <span className={styles.string}>"Bishal Das"</span>,
                  {'\n  '}role: <span className={styles.string}>"Software Engineer"</span>,
                  {'\n  '}base: <span className={styles.string}>"Gurugram, India"</span>,
                  {'\n  '}stack: [<span className={styles.string}>"React"</span>, <span className={styles.string}>"Next.js"</span>],
                  {'\n  '}passion: <span className={styles.string}>"Building UIs"</span>
                  {'\n}'};
                  {'\n\n'}
                  <span className={styles.keyword}>export default</span> <span className={styles.variable}>profile</span>;
                </code>
              </pre>
            </div>
            
            <div className={styles.floatingElement1}></div>
            <div className={styles.floatingElement2}></div>
          </div>
        </div>

      </div>
      
      <div className={`${styles.scrollIndicator} fade-up delay-4`}>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}
