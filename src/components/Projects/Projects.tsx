import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      name: 'Sphere Analytics Dashboard',
      description: 'A real-time data visualization platform with interactive charts, a dark mode theme, and customizable widget layouts for business intelligence.',
      tech: ['React', 'D3.js', 'Next.js', 'Tailwind CSS'],
      image: '/projects/project1.png',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      name: 'Velour E-Commerce',
      description: 'A high-performance online storefront featuring an integrated payment gateway, smooth cart functionality, and headless CMS support.',
      tech: ['Next.js', 'Stripe', 'Framer Motion', 'Sanity'],
      image: '/projects/project2.png',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      name: 'Aether AI Interface',
      description: 'A conversational UI for advanced language models, featuring streaming responses, glassmorphism, and robust session memory.',
      tech: ['TypeScript', 'WebSockets', 'OpenAI API', 'CSS Modules'],
      image: '/projects/project3.png',
      link: '#',
      github: '#'
    }
  ]

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        
        <div className={styles.projectsGrid}>
          {projectsData.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image 
                  src={project.image} 
                  alt={project.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.projectOverlay}>
                  <Link href={project.link} className={styles.projectLink} aria-label="View Project">
                    <span aria-hidden="true"><FaExternalLinkAlt size={20} /></span>
                  </Link>
                  <Link href={project.github} className={styles.projectLink} aria-label="View Source">
                    <span aria-hidden="true"><FaGithub size={24} /></span>
                  </Link>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
