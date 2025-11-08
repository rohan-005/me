/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/ProjectsShowcase.css';

const ProjectsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState([]);
  const observerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "The Heist Sprint",
      category: "game",
      year: "2024",
      description: "An immersive 3D stealth-action game where players plan and execute high-stakes heists in procedurally generated environments.",
      technologies: ["Unity3D", "C#", "Blender", "Mixamo"],
      demoLink: "#",
      repoLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      category: "web",
      year: "2024",
      description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demoLink: "#",
      repoLink: "#",
      featured: true
    },
    {
      id: 3,
      title: "The Timber Curse",
      category: "game",
      year: "2023",
      description: "A survival horror game set in haunted forests with dynamic weather systems and AI-driven enemy behavior.",
      technologies: ["Unreal Engine", "C++", "Blender"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 4,
      title: "Task Management App",
      category: "web",
      year: "2023",
      description: "Collaborative task management application with real-time updates, team workspaces, and progress tracking.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 5,
      title: "Space Shooter 2D",
      category: "game",
      year: "2023",
      description: "Retro-style 2D space shooter with particle effects, power-up system, and online leaderboards.",
      technologies: ["Unity3D", "C#", "Photoshop"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 6,
      title: "Weather Dashboard",
      category: "web",
      year: "2022",
      description: "Real-time weather monitoring dashboard with predictive analytics and interactive maps.",
      technologies: ["React", "Python", "D3.js", "API Integration"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="projects-showcase">
      <div className="projects-container">
        {/* Header */}
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="projects-title">Projects Showcase</h1>
          <p className="projects-subtitle">
            A journey through my creative development work
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="category-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            🚀 All Projects
          </button>
          <button
            className={`category-tab ${activeCategory === 'game' ? 'active' : ''}`}
            onClick={() => setActiveCategory('game')}
          >
            🎮 Game Development
          </button>
          <button
            className={`category-tab ${activeCategory === 'web' ? 'active' : ''}`}
            onClick={() => setActiveCategory('web')}
          >
            💻 Full Stack
          </button>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="timeline-item"
                data-id={project.id}
                variants={itemVariants}
                layout
              >
                <div className="timeline-dot"></div>
                <div className="timeline-year">{project.year}</div>
                
                <motion.div 
                  className="timeline-content glass-effect"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`project-category ${
                    project.category === 'game' ? 'game-category' : 'web-category'
                  }`}>
                    {project.category === 'game' ? '🎮 Game Dev' : '💻 Full Stack'}
                  </div>
                  
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-actions">
                    <a 
                      href={project.demoLink} 
                      className="project-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Project</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round"/>
                        <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No projects found in this category</h3>
            <p>Try selecting a different category to see more projects.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsShowcase;