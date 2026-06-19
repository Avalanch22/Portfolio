import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      name: 'Sphere Analytics',
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
    <section id="projects" className="w-full bg-[#0a0a0a]">
      <div className="container py-20 text-center">
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
      </div>
      
      {projectsData.map((project, index) => (
        <ScrollExpandMedia
          key={project.id}
          mediaType="image"
          mediaSrc={project.image}
          title={project.name}
          textBlend={true}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.name}</h3>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {project.tech.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <Link href={project.link} className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                <span>View Project</span>
                <FaExternalLinkAlt />
              </Link>
              <Link href={project.github} className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-full font-bold border border-white/30 hover:bg-white/20 transition-colors">
                <span>Source Code</span>
                <FaGithub size={20} />
              </Link>
            </div>
          </div>
        </ScrollExpandMedia>
      ))}
    </section>
  )
}
