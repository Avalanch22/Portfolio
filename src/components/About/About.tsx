import styles from './About.module.css'

export default function About() {
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
      </div>
    </section>
  )
}
