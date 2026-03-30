'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from './Skills.module.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaDocker, FaAws, FaFigma } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiPostgresql, SiMongodb, SiGraphql, SiVercel, SiJest } from 'react-icons/si'

type Skill = {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export default function Skills() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    // 1. Mouse Tracking logic for glowing borders
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return
      
      const cards = cardsRef.current.getElementsByClassName(styles.skillCategory)
      for (let i = 0; i < cards.length; i++) {
        const target = cards[i] as HTMLElement
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        target.style.setProperty("--mouse-x", `${x}px`)
        target.style.setProperty("--mouse-y", `${y}px`)
      }
    }
    
    window.addEventListener("mousemove", handleMouseMove)

    // 2. Intersection Observer logic for scroll pop animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 } 
    )
    
    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const handleSkillClick = (tech: Skill, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Position popover perfectly underneath the clicked item
    let left = rect.left + (rect.width / 2)
    let top = rect.bottom + 15
    
    // Fallback if the popover would render off the bottom of the screen
    if (top + 180 > window.innerHeight) {
      top = rect.top - 180 
    }

    // Keep popover from shifting off the horizontal edges of small screens
    if (left - 160 < 10) left = 160 + 10
    if (left + 160 > window.innerWidth - 10) left = window.innerWidth - 170

    setPopupPos({ top, left })
    setSelectedSkill(tech)
  }

  // Data structure mapped with highly-visual React Icons and descriptions
  const skillsData = [
    {
      category: 'Frontend',
      techs: [
        { name: 'HTML5', icon: <FaHtml5 />, description: 'The foundation of the web, providing semantic structure and accessibility to modern applications.' },
        { name: 'CSS3', icon: <FaCss3Alt />, description: 'Extensive experience crafting responsive, fluid layouts with Flexbox, Grid, and complex CSS variable systems.' },
        { name: 'JavaScript', icon: <FaJs />, description: 'Proficient in ES6+ features, DOM manipulation, asynchronous programming, and building highly interactive client-side logic.' },
        { name: 'TypeScript', icon: <SiTypescript />, description: 'My preferred way of writing JS. I rely on static typing for massive productivity gains and catching bugs at compile-time.' },
        { name: 'React', icon: <FaReact />, description: 'Deep understanding of hooks, component lifecycles, and state management paradigms for large-scale web apps.' },
        { name: 'Next.js', icon: <SiNextdotjs />, description: 'Expertise in both App and Pages routers, leveraging SSR, SSG, and API routes for optimal SEO and performance.' },
        { name: 'Tailwind', icon: <SiTailwindcss />, description: 'Highly proficient in rapid UI development using utility-first classes without writing custom CSS.' },
        { name: 'Framer', icon: <SiFramer />, description: 'Experienced in creating fluid, physics-based micro-interactions and layout animations with Framer Motion.' },
      ],
    },
    {
      category: 'Backend',
      techs: [
        { name: 'Node.js', icon: <FaNodeJs />, description: 'Building scalable, event-driven server architectures and REST APIs utilizing V8 JavaScript.' },
        { name: 'Express', icon: <SiExpress />, description: 'Creating robust, modular API routing structures, middleware layers, and authentication flows.' },
        { name: 'Python', icon: <FaPython />, description: 'Leveraging Python for backend scripting, data wrangling, and integrating AI microservices.' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, description: 'Experience designing normalized relational databases, complex joins, and secure indexing.' },
        { name: 'MongoDB', icon: <SiMongodb />, description: 'Utilizing NoSQL infrastructure for flexible schemas and rapid prototyping on the backend.' },
        { name: 'GraphQL', icon: <SiGraphql />, description: 'Implementing precise data fetching endpoints reducing over-fetching across clients.' },
      ],
    },
    {
      category: 'Tools & DevOps',
      techs: [
        { name: 'Git', icon: <FaGitAlt />, description: 'Advanced version control mastery including rebasing, conflict resolution, and branching strategies.' },
        { name: 'GitHub', icon: <FaGithub />, description: 'Managing CI/CD pipelines natively with Actions, code reviews, and remote repository structures.' },
        { name: 'Docker', icon: <FaDocker />, description: 'Containerizing full-stack environments ensuring total consistency across staging and development.' },
        { name: 'AWS', icon: <FaAws />, description: 'Familiarity with S3, EC2 instances, and Lambda serverless functions for cloud hosting.' },
        { name: 'Vercel', icon: <SiVercel />, description: 'My go-to platform for seamlessly deploying Next.js edge functions and global CDNs.' },
        { name: 'Figma', icon: <FaFigma />, description: 'Translating complex high-fidelity vector mockups and component libraries directly into code.' },
        { name: 'Jest', icon: <SiJest />, description: 'Writing comprehensive unit and integration test suites ensuring strict code reliability.' },
      ],
    },
  ]

  return (
    <>
      <section id="skills" className={styles.skillsSection}>
        <div className="container">
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          
          <div className={styles.skillsGrid} ref={cardsRef}>
            {skillsData.map((skillGroup, idx) => (
              <div key={idx} className={styles.skillCategory}>
                <div className={styles.cardContent}>
                  <h3 className={styles.categoryTitle}>{skillGroup.category}</h3>
                  <div className={styles.skillsList}>
                    {skillGroup.techs.map((tech, tIdx) => (
                      <div 
                        key={tIdx} 
                        style={{ transitionDelay: `${(idx * 0.1) + (tIdx * 0.05)}s` }}
                        className={`${styles.skillItem} ${isVisible ? styles.animateIn : ''}`}
                        onClick={(e) => handleSkillClick(tech, e)}
                        tabIndex={0}
                        role="button"
                      >
                        <div className={styles.iconWrapper}>
                          {tech.icon}
                        </div>
                        <span className={styles.skillName}>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popover UI exactly next to the clicked skill */}
      {selectedSkill && (
        <>
          {/* Fully transparent overlay to capture "click outside" events */}
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 9998, cursor: 'default' }} 
            onClick={() => setSelectedSkill(null)} 
          />
          
          <div 
            className={styles.popoverContent} 
            style={{ top: `${popupPos.top}px`, left: `${popupPos.left}px` }}
          >
            <div className={styles.popoverHeader}>
               <div className={styles.popoverIconBg}>
                 <div className={styles.popoverIcon}>
                   {selectedSkill.icon}
                 </div>
               </div>
               <h3 className={styles.popoverTitle}>{selectedSkill.name}</h3>
            </div>
            <p className={styles.popoverDesc}>{selectedSkill.description}</p>
          </div>
        </>
      )}
    </>
  )
}
