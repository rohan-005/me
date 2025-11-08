/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../css/ProjectsShowcase.css';

// Devicons component
const Devicon = ({ name, className = "" }) => {
  return <i className={`devicon-${name} ${className}`}></i>;
};

const TechLogos = {
  react: { icon: <Devicon name="react-original" className="devicon" />, name: 'React' },
  javascript: { icon: <Devicon name="javascript-plain" className="devicon" />, name: 'JavaScript' },
  typescript: { icon: <Devicon name="typescript-plain" className="devicon" />, name: 'TypeScript' },
  tailwind: { icon: <Devicon name="tailwindcss-plain" className="devicon" />, name: 'Tailwind CSS' },
  vite: { icon: <Devicon name="vite-plain" className="devicon" />, name: 'Vite' },
  css: { icon: <Devicon name="css3-plain" className="devicon" />, name: 'CSS' },
  nextjs: { icon: <Devicon name="nextjs-plain" className="devicon" />, name: 'Next.js' },
  unity: { icon: <Devicon name="unity-original" className="devicon" />, name: 'Unity' },
  blender: { icon: <Devicon name="blender-original" className="devicon" />, name: 'Blender' },
  nodejs: { icon: <Devicon name="nodejs-plain" className="devicon" />, name: 'Node.js' },
  mongodb: { icon: <Devicon name="mongodb-plain" className="devicon" />, name: 'MongoDB' },
  express: { icon: <Devicon name="express-original" className="devicon" />, name: 'Express' },
  csharp: { icon: <Devicon name="csharp-plain" className="devicon" />, name: 'C#' },
  cpp: { icon: <Devicon name="cplusplus-plain" className="devicon" />, name: 'C++' },
  python: { icon: <Devicon name="python-plain" className="devicon" />, name: 'Python' },
  firebase: { icon: <Devicon name="firebase-plain" className="devicon" />, name: 'Firebase' },
  docker: { icon: <Devicon name="docker-plain" className="devicon" />, name: 'Docker' },
  redis: { icon: <Devicon name="redis-plain" className="devicon" />, name: 'Redis' },
  socketio: { icon: <Devicon name="socketio-original" className="devicon" />, name: 'Socket.io' },
  tensorflow: { icon: <Devicon name="tensorflow-original" className="devicon" />, name: 'TensorFlow' },
  unreal: { icon: <Devicon name="unrealengine-original" className="devicon" />, name: 'Unreal Engine' }
};

const ProjectsShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "The Heist Sprint",
      category: "game",
      year: "2024",
      description: "An immersive 3D stealth-action game where players plan and execute high-stakes heists in procedurally generated environments with advanced AI systems.",
      technologies: ["unity", "csharp", "blender"],
      demoLink: "https://github.com/yourusername/the-heist-sprint",
      repoLink: "https://github.com/yourusername/the-heist-sprint",
      featured: true
    },
    {
      id: 2,
      title: "Nexus Commerce",
      category: "web",
      year: "2024",
      description: "Revolutionary full-stack e-commerce platform with real-time analytics, AI-powered recommendations, and seamless payment integration.",
      technologies: ["react", "nodejs", "mongodb", "express", "redis"],
      demoLink: "https://nexus-commerce-demo.vercel.app",
      repoLink: "https://github.com/yourusername/nexus-commerce",
      featured: true
    },
    {
      id: 3,
      title: "The Timber Curse",
      category: "game",
      year: "2023",
      description: "Atmospheric survival horror experience set in dynamically generated haunted forests with intelligent enemy AI and weather systems.",
      technologies: ["unreal", "cpp", "blender"],
      demoLink: "https://github.com/yourusername/timber-curse",
      repoLink: "https://github.com/yourusername/timber-curse",
      featured: false
    },
    {
      id: 4,
      title: "FlowSpace Pro",
      category: "web",
      year: "2023",
      description: "Next-gen collaborative workspace with real-time synchronization, advanced task management, and intelligent workflow automation.",
      technologies: ["react", "nodejs", "mongodb", "express", "socketio", "docker"],
      demoLink: "https://flowspace-pro.vercel.app",
      repoLink: "https://github.com/yourusername/flowspace-pro",
      featured: false
    },
    {
      id: 5,
      title: "Cosmic Defender 2D",
      category: "game",
      year: "2023",
      description: "Retro-inspired 2D space shooter featuring advanced particle systems, dynamic power-ups, and global leaderboard integration.",
      technologies: ["unity", "csharp", "javascript"],
      demoLink: "https://github.com/yourusername/cosmic-defender",
      repoLink: "https://github.com/yourusername/cosmic-defender",
      featured: false
    },
    {
      id: 6,
      title: "Climate Vision AI",
      category: "web",
      year: "2022",
      description: "Intelligent weather analytics platform with predictive modeling, interactive 3D maps, and machine learning forecasts.",
      technologies: ["react", "python", "tensorflow", "nodejs", "mongodb"],
      demoLink: "https://climate-vision-ai.vercel.app",
      repoLink: "https://github.com/yourusername/climate-vision",
      featured: false
    }
  ];

  const handleMouseMove = (e, cardId) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    setMousePosition({ x, y });
    setActiveCard(cardId);
    
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-12px) scale(1.03)`;
  };

  const handleMouseLeave = (cardId) => {
    const card = cardRefs.current[cardId];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)';
    }
    setActiveCard(null);
  };

  const handleCardClick = (project) => {
    window.open(project.demoLink || project.repoLink, '_blank');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach(el => {
      if (!el.classList.contains('fade-in')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const TechTag = ({ tech }) => {
    const techData = TechLogos[tech] || { icon: <div className="devicon">⚙️</div>, name: tech };
    
    return (
      <motion.span 
        className={`tech-tag ${tech}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {techData.icon}
        <span>{techData.name}</span>
      </motion.span>
    );
  };

  return (
    <div className="projects-showcase">
      <div className="projects-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ← Return Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="projects-title">
            Digital Creations
            <br />
            <span style={{fontSize: 'clamp(1.8rem, 4vw, 3rem)', opacity: 0.9}}>Portfolio</span>
          </h1>
          <p className="projects-subtitle">
            Where Imagination Meets Implementation
          </p>
          <p className="creative-tagline">
            Crafting immersive digital experiences through innovative code and creative design
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="timeline-item"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-year">{project.year}</div>
              
              <motion.div 
                ref={el => cardRefs.current[project.id] = el}
                className="timeline-content"
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                onClick={() => handleCardClick(project)}
                whileHover={{ 
                  transition: { duration: 0.2 }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="project-category">
                  {project.category === 'game' ? '🎮 Interactive Experience' : '💻 Web Application'}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <TechTag key={techIndex} tech={tech} />
                  ))}
                </div>
                
                <div className="click-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Click to explore project
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;