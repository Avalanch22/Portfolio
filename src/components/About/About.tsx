"use client";

import { useState } from 'react';
import { FaGraduationCap, FaChevronDown } from 'react-icons/fa6';
import styles from './About.module.css';

export default function About() {
  const [showEducation, setShowEducation] = useState(false);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <h2 className="section-title">About <span className="gradient-text">Me</span></h2>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>
              I am a passionate developer with a keen eye for design. I specialize in building robust applications that provide exceptional user experiences.
            </p>
            <p>
              My approach combines clean code architecture with modern design trends like glassmorphism, dynamic typography, and fluid micro-animations.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source, or refining my craft.
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
            </div>
          </div>

          <div className={styles.abstractContainer}>
            <div className={styles.abstractShape1}></div>
            <div className={styles.abstractShape2}></div>
            <div className={styles.abstractShape3}></div>
          </div>
        </div>

        <div className={styles.educationContainer}>
          <button
            className={`${styles.educationToggle} ${showEducation ? styles.active : ''}`}
            onClick={() => setShowEducation(!showEducation)}
          >
            <span className={styles.toggleLeft}>
              <FaGraduationCap className={styles.toggleIcon} />
              <span>Education Journey</span>
            </span>
            <FaChevronDown className={`${styles.chevronIcon} ${showEducation ? styles.rotateIcon : ''}`} />
          </button>

          <div className={`${styles.educationContent} ${showEducation ? styles.expanded : ''}`}>
            <div className={styles.educationList}>
              <div className={styles.educationItem}>
                <div className={styles.eduDot}></div>
                <div className={styles.eduLine}></div>
                <div className={styles.eduDetails}>
                  <h4 className={styles.eduDegree}>Bachelor of Technology , Information Technology</h4>
                  <h5 className={styles.eduSchool}>Siliguri Institute of Technology</h5>
                  <div className={styles.eduMeta}>
                    <span className={styles.eduYear}>2020 - 2024</span>
                    <span className={styles.eduScore}>CGPA: 9.18</span>
                  </div>
                  <p className={styles.eduDesc}>Specialized in Information Technology. Built foundational knowledge in algorithms, data structures, and software engineering principles.</p>
                </div>
              </div>
              <div className={styles.educationItem}>
                <div className={styles.eduDot}></div>
                <div className={styles.eduLine}></div>
                <div className={styles.eduDetails}>
                  <h4 className={styles.eduDegree}>Higher Secondary</h4>
                  <h5 className={styles.eduSchool}>Army Public School , Bengdubi</h5>
                  <div className={styles.eduMeta}>
                    <span className={styles.eduYear}>2018 - 2020</span>
                    <span className={styles.eduScore}>Percentage: 76.5%</span>
                  </div>
                  <p className={styles.eduDesc}>Focused on Science and Mathematics. Developed a strong analytical mindset.</p>
                </div>
              </div>
              <div className={styles.educationItem}>
                <div className={styles.eduDot}></div>
                <div className={styles.eduLine}></div>
                <div className={styles.eduDetails}>
                  <h4 className={styles.eduDegree}>Secondary School</h4>
                  <h5 className={styles.eduSchool}>Army Public School , Bengdubi</h5>
                  <div className={styles.eduMeta}>
                    <span className={styles.eduYear}>2008 - 2018</span>
                    <span className={styles.eduScore}>Percentage: 89.8%</span>
                  </div>
                  <p className={styles.eduDesc}>Gained fundamental knowledge across various subjects with a focus on core sciences. Built a strong base for future studies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
