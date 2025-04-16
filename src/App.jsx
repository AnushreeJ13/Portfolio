import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Education from './components/Education';
import { motion, useScroll } from 'framer-motion';

const App = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll(); // Get the scroll progress from Framer Motion

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Track mouse position
    let mousePosition = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    
    // Update mouse position on move
    const updateMousePosition = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', updateMousePosition);
    
    // Stars configuration
    const stars = [];
    const starCount = 350; // More stars for density
    const starColors = ['#ffffff', '#ffe9c4', '#d4fbff', '#e5c4ff', '#ffcefa'];
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        originalX: 0,
        originalY: 0,
        vx: 0,
        vy: 0,
        friction: 0.8,
        directionX: Math.random() > 0.5 ? 1 : -1,
        directionY: Math.random() > 0.5 ? 1 : -1
      });
    }
    
    // Nebula clouds - Purple color theme
    const nebulaClouds = [];
    const cloudCount = 10; // More clouds for richer effect
    const purpleHues = [260, 270, 280, 290, 300, 310];
    
    // Create nebula clouds with purple theme
    for (let i = 0; i < cloudCount; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        hue: purpleHues[Math.floor(Math.random() * purpleHues.length)],
        saturation: Math.random() * 40 + 60,
        lightness: Math.random() * 15 + 15,
        opacity: Math.random() * 0.05 + 0.03,
        directionX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.05),
        directionY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.05)
      });
    }
    
    // Additional magenta and pink highlights for variation
    for (let i = 0; i < 4; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        hue: Math.random() * 20 + 320,
        saturation: Math.random() * 30 + 70,
        lightness: Math.random() * 20 + 20,
        opacity: Math.random() * 0.04 + 0.02,
        directionX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.05),
        directionY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.05)
      });
    }
    
    // Save original star positions
    stars.forEach(star => {
      star.originalX = star.x;
      star.originalY = star.y;
    });
    
    // Animation function
    function animate() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nebula clouds
      nebulaClouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, `hsla(${cloud.hue}, ${cloud.saturation}%, ${cloud.lightness + 10}%, ${cloud.opacity * 2})`);
        gradient.addColorStop(0.5, `hsla(${cloud.hue - 5}, ${cloud.saturation}%, ${cloud.lightness}%, ${cloud.opacity})`);
        gradient.addColorStop(1, 'hsla(280, 70%, 5%, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
        
        cloud.x += cloud.directionX;
        cloud.y += cloud.directionY;
        
        // Wrap around edges
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;
      });
      
      // Update and draw stars
      stars.forEach(star => {
        const dx = mousePosition.x - star.x;
        const dy = mousePosition.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = 0.15 * (1 - distance / 300);
          star.vx += (dx / distance) * force;
          star.vy += (dy / distance) * force;
        } else {
          star.vx += (star.originalX - star.x) * 0.01;
          star.vy += (star.originalY - star.y) * 0.01;
        }
        
        star.vx *= star.friction;
        star.vy *= star.friction;
        star.x += star.vx;
        star.y += star.vy;
        
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = star.color;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw occasional energy arcs between stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 70 && Math.random() < 0.01) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180, 120, 255, ${0.1 - distance/700})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Handle resize events
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      stars.forEach(star => {
        star.originalX = Math.random() * canvas.width;
        star.originalY = Math.random() * canvas.height;
        star.x = star.originalX;
        star.y = star.originalY;
      });
      
      nebulaClouds.forEach(cloud => {
        cloud.x = Math.random() * canvas.width;
        cloud.y = Math.random() * canvas.height;
      });
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-black selection:text-slate-900">
      {/* Animated Scroll Progress Bar */}
      <motion.div 
        className="progress-bar" 
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0 0',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff6ec4, #7873f5)',
          zIndex: 100
        }}
      />

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10"
      ></canvas>

      <div className="fixed top-0 -z-9 h-full w-full bg-gradient-to-b from-purple-950/20 to-black pointer-events-none"></div>
      
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-8" 
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(190, 120, 255, 0.15) 0%, transparent 60%)'
        }}
      ></div>
      
      <div className="container mx-auto px-8">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <About />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideLeftVariants}
          className="my-20"
        >
          <Technologies />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="my-20"
        >
          <Experience />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="my-20"
        >
          <Education />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, delay: 0.2 }
            }
          }}
          className="my-20"
        >
          <Contact />
        </motion.section>
      </div>
    </div>
  );
};

export default App;
