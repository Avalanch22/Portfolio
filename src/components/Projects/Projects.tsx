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
      name: 'Code Annotator',
      description: 'A developer productivity tool providing line-by-line code explanations via a VS Code-like interface. Features drag-and-drop file support and advanced syntax highlighting.',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS', 'Monaco Editor'],
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
          textBlend={false}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">{project.name}</h3>
            <p className="text-base sm:text-lg md:text-2xl text-zinc-300 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {project.tech.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 w-full mt-2 sm:mt-4">
              <Link href={project.link} className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                <span>View Project</span>
                <FaExternalLinkAlt />
              </Link>
              <Link href={project.github} className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white rounded-full font-bold border border-white/30 hover:bg-white/20 transition-colors">
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
