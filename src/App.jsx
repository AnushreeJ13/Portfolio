import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

const Home = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Mouse tracking
    let mouse = { x: width / 2, y: height / 2 };
    const onMove = e => mouse = { x: e.clientX, y: e.clientY };
    window.addEventListener('mousemove', onMove);

    // Stars
    const stars = [];
    const starColors = ['#fff','#ffe9c4','#d4fbff','#e5c4ff','#ffcefa'];
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.5 + 0.5;
      stars.push({
        x, y, r,
        color: starColors[Math.floor(Math.random()*starColors.length)],
        ox: x, oy: y, vx: 0, vy: 0, friction: 0.8
      });
    }

    // Nebula clouds
    const clouds = [];
    const purples = [260,270,280,290,300,310];
    for (let i = 0; i < 14; i++) {
      clouds.push({
        x: Math.random()*width,
        y: Math.random()*height,
        radius: Math.random()*300 + 150,
        hue: i<10 ? purples[Math.floor(Math.random()*purples.length)] : (Math.random()*20+320),
        sat: Math.random()*40+60,
        light: Math.random()*20+15,
        opacity: Math.random()*0.05+0.02,
        dx: (Math.random()>0.5?1:-1)*(Math.random()*0.05),
        dy: (Math.random()>0.5?1:-1)*(Math.random()*0.05)
      });
    }

    function draw() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // Nebula
      clouds.forEach(c => {
        const g = ctx.createRadialGradient(c.x,c.y,0, c.x,c.y,c.radius);
        g.addColorStop(0,   `hsla(${c.hue},${c.sat}%,${c.light+10}%,${c.opacity*2})`);
        g.addColorStop(0.5, `hsla(${c.hue-5},${c.sat}%,${c.light}%,${c.opacity})`);
        g.addColorStop(1,   'hsla(280,70%,5%,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.radius,0,2*Math.PI);
        ctx.fill();

        c.x += c.dx; c.y += c.dy;
        if (c.x < -c.radius) c.x = width + c.radius;
        if (c.x > width + c.radius) c.x = -c.radius;
        if (c.y < -c.radius) c.y = height + c.radius;
        if (c.y > height + c.radius) c.y = -c.radius;
      });

      // Stars
      stars.forEach(s => {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 300) {
          const f = 0.15 * (1 - dist/300);
          s.vx += (dx/dist)*f;
          s.vy += (dy/dist)*f;
        } else {
          s.vx += (s.ox - s.x)*0.01;
          s.vy += (s.oy - s.y)*0.01;
        }

        s.vx *= s.friction;
        s.vy *= s.friction;
        s.x += s.vx;
        s.y += s.vy;

        ctx.shadowBlur = s.r * 4;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Occasional energy lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i+1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 70 && Math.random()<0.01) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180,120,255,${0.1 - d/700})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    // Resize
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach(s => {
        s.ox = s.x = Math.random()*width;
        s.oy = s.y = Math.random()*height;
      });
      clouds.forEach(c => {
        c.x = Math.random()*width;
        c.y = Math.random()*height;
      });
    };
    window.addEventListener('resize', onResize);

    draw();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };
  const slideLeft = { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-black selection:text-slate-900">
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0 0',
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '4px', background: 'linear-gradient(90deg, #ff6ec4, #7873f5)',
          zIndex: 100
        }}
      />
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <div className="fixed top-0 -z-9 h-full w-full bg-gradient-to-b from-purple-950/20 to-black pointer-events-none" />
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-8"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(190,120,255,0.15) 0%, transparent 60%)'
        }}
      />

      <div className="container mx-auto px-8">
        <Navbar />

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Hero />
        </motion.div>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <About />
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="my-20">
          <Technologies />
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="my-20">
          <Experience />
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="my-20">
          <Education />
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
        }} className="my-20">
          <Contact />
        </motion.section>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* if you ever want a standalone Contact page: */}
    
    </Routes>
  </Router>
);

export default App;
