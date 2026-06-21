'use client'

import { useState, useRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import { Sparkles } from 'lucide-react'
import styles from './Hero.module.css'
import { FloatingPaths } from '@/components/ui/background-paths'
import DisplayCards from '@/components/ui/display-cards'
import { GooeyText } from '@/components/ui/gooey-text-morphing'

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Creative Developer",
    description: "Building immersive digital experiences",
    date: "Current Focus",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-zinc-800 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0a]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Software Engineer",
    description: "Crafting scalable architectures",
    date: "Professional",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-8 md:translate-x-12 md:translate-y-10 hover:-translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-zinc-800 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0a]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "UI/UX Enthusiast",
    description: "Designing with purpose and aesthetics",
    date: "Passion",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-12 sm:translate-x-16 sm:translate-y-16 md:translate-x-24 md:translate-y-20 hover:translate-y-0",
  },
];

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
    <section id="hero" className={`${styles.heroSection} relative`}>
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      
      <div className={`container ${styles.heroContainer} relative z-20`}>
        
        {/* Left Text Content */}
        <div className={styles.heroContent}>
          <p className={`${styles.subtitle} fade-up delay-1`}>
            <span className={styles.highlight}>Hello, I'm</span>
          </p>
          <h1 className={`${styles.title} fade-up delay-2`}>Bishal Das</h1>
          <h2 className={`${styles.role} fade-up delay-3`}>
            Software Engineer <br className="hidden lg:block" />
            <span className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-2 mt-2">
              <span className="hidden lg:inline-block">&</span> 
              <span className="relative inline-block h-[1.2em] w-[260px] sm:w-[320px] md:w-[400px] align-middle">
                <GooeyText 
                  texts={["Creative Designer", "UI/UX Enthusiast", "Creative Developer"]} 
                  textClassName="left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 top-0 whitespace-nowrap !text-blue-500" 
                  className="w-full h-full"
                  morphTime={1}
                  cooldownTime={3}
                />
              </span>
            </span>
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
        <div className={`${styles.interactiveWrapper} fade-up delay-4 relative z-10 pointer-events-auto`}>
          <DisplayCards cards={defaultCards} />
        </div>

      </div>
      
      <div className={`${styles.scrollIndicator} fade-up delay-4 z-20`}>
        <span>Scroll Down</span>
      </div>

      {/* Bottom Blur/Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 20%, transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to top, black 10%, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent)'
        }} 
      />
    </section>
  )
}
