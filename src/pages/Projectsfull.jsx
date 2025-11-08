/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
      description: "An immersive 3D stealth-action game where players plan and execute high-stakes heists in procedurally generated environments with advanced AI systems.",
      technologies: ["Unity3D", "C#", "Blender", "Mixamo", "AI Pathfinding"],
      demoLink: "#",
      repoLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Nexus Commerce",
      category: "web",
      year: "2024",
      description: "Revolutionary full-stack e-commerce platform with real-time analytics, AI-powered recommendations, and seamless payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
      demoLink: "#",
      repoLink: "#",
      featured: true
    },
    {
      id: 3,
      title: "The Timber Curse",
      category: "game",
      year: "2023",
      description: "Atmospheric survival horror experience set in dynamically generated haunted forests with intelligent enemy AI and weather systems.",
      technologies: ["Unreal Engine", "C++", "Blender", "Substance Painter"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 4,
      title: "FlowSpace Pro",
      category: "web",
      year: "2023",
      description: "Next-gen collaborative workspace with real-time synchronization, advanced task management, and intelligent workflow automation.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Docker"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 5,
      title: "Cosmic Defender 2D",
      category: "game",
      year: "2023",
      description: "Retro-inspired 2D space shooter featuring advanced particle systems, dynamic power-ups, and global leaderboard integration.",
      technologies: ["Unity3D", "C#", "Photoshop", "Firebase"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    },
    {
      id: 6,
      title: "Climate Vision AI",
      category: "web",
      year: "2022",
      description: "Intelligent weather analytics platform with predictive modeling, interactive 3D maps, and machine learning forecasts.",
      technologies: ["React", "Python", "D3.js", "TensorFlow", "API Integration"],
      demoLink: "#",
      repoLink: "#",
      featured: false
    }
  ];

  // Fixed category filtering
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...new Set([...prev, entry.target.dataset.id])]);
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
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const categoryCounts = {
    all: projects.length,
    game: projects.filter(p => p.category === 'game').length,
    web: projects.filter(p => p.category === 'web').length
  };

  return (
    <div className="projects-showcase">
      <div className="projects-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Return Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="projects-title">
            Digital Creations
            <br />
            <span style={{fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', opacity: 0.9}}>Portfolio</span>
          </h1>
          <p className="projects-subtitle">
            Where Imagination Meets Implementation
          </p>
          <p className="creative-tagline">
            Crafting immersive digital experiences through innovative code and creative design
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="category-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            🌟 All Masterpieces ({categoryCounts.all})
          </button>
          <button
            className={`category-tab ${activeCategory === 'game' ? 'active' : ''}`}
            onClick={() => setActiveCategory('game')}
          >
            🎮 Virtual Worlds ({categoryCounts.game})
          </button>
          <button
            className={`category-tab ${activeCategory === 'web' ? 'active' : ''}`}
            onClick={() => setActiveCategory('web')}
          >
            💻 Digital Solutions ({categoryCounts.web})
          </button>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory} // This forces re-animation when category changes
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="timeline-item"
                  data-id={project.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">{project.year}</div>
                  
                  <motion.div 
                    className="timeline-content"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="project-category">
                      {project.category === 'game' ? '🎮 Interactive Experience' : '💻 Web Application'}
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="tech-tag"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="project-actions">
                      <motion.a 
                        href={project.demoLink} 
                        className="project-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Explore Project</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round"/>
                          <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>🚧 Under Construction</h3>
                <p>More amazing projects coming soon in this category!</p>
                <motion.button
                  className="project-button"
                  onClick={() => setActiveCategory('all')}
                  style={{marginTop: '1rem'}}
                  whileHover={{ scale: 1.05 }}
                >
                  View All Projects
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;