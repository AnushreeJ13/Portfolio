import React, { useEffect, useRef, useState } from 'react';
import Anushree_about from "../assets/Anushree_about.jpg";
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    // Handle mouse movement for interactive elements
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handle intersection observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    // Split text for character animation
    const aboutTitle = "About Me".split("");

    // Text paragraph animation variants
    const paragraphVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015,
                delayChildren: 0.3
            }
        }
    };

    const paragraphWords = ABOUT_TEXT.split("   ");

    return (
        <div ref={ref} id="about" className="relative border-b border-white/10 py-24 lg:py-32 overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-indigo-950/30 opacity-80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI5IDBhMjkgMjkgMCAxIDAgNTggMCAyOSAyOSAwIDEgMC01OCAwIiBzdHJva2U9IiM0QjU1NjMiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiM0QjU1NjMiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10" />
            
            {/* Glowing orb */}
            <motion.div 
                className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-3xl"
                animate={{
                    x: [0, -20, 20, 0],
                    y: [0, 20, -20, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div 
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-white/80 font-medium">Get to know me</span>
                    </motion.div>
                    
                    <div className="relative inline-block">
                        <h2 className="text-5xl lg:text-6xl font-bold flex justify-center">
                            {aboutTitle.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className={`${letter === "M" ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent" : "text-white"} ${letter === " " ? "mx-4" : ""}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + (index * 0.05), duration: 0.5 }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </h2>
                        <motion.div 
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: "60%" } : {}}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                    {/* Image Section */}
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-70">
                            <motion.div 
                                className="w-64 h-64 rounded-md border border-white/10 rotate-45"
                                animate={{ rotate: [45, 55, 45] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="absolute w-72 h-72 rounded-md border border-white/5 rotate-45"
                                animate={{ rotate: [45, 35, 45] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Interactive image container */}
                        <motion.div
                            className="relative z-10 rounded-lg border-2 border-white/20 p-1 bg-gradient-to-br from-purple-500/20 via-black/50 to-pink-500/20 backdrop-blur-md shadow-2xl"
                            whileHover={{ scale: 1.03 }}
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: 1000,
                            }}
                            animate={{
                                rotateY: mousePosition.x / 80,
                                rotateX: -mousePosition.y / 80,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        >
                            <div className="overflow-hidden rounded-lg">
                                <motion.img
                                    src={Anushree_about}
                                    alt="About Anushree"
                                    className="w-72 lg:w-80 object-cover rounded-lg shadow-inner transform transition-transform"
                                    whileHover={{ scale: 1.05 }}
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = "/api/placeholder/350/400"; 
                                    }}
                                />
                            </div>
                            
                            {/* Glowing effect */}
                            <motion.div 
                                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-sm -z-10"
                                animate={{ 
                                    background: [
                                        "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)",
                                        "linear-gradient(to right, #6366f1, #ec4899, #8b5cf6)",
                                        "linear-gradient(to right, #8b5cf6, #6366f1, #ec4899)",
                                        "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)"
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                        
                        {/* Floating geometric elements */}
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className="absolute hidden lg:block"
                                style={{
                                    top: `${20 + (index * 30)}%`,
                                    right: `${80 - (index * 15)}%`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 + (index * 0.2) }}
                            >
                                <motion.div 
                                    className={`h-4 w-4 ${index === 0 ? 'bg-pink-500/30' : index === 1 ? 'bg-purple-500/30' : 'bg-indigo-500/30'} backdrop-blur-sm rounded-sm`}
                                    animate={{ 
                                        rotate: [0, 180, 360], 
                                        y: [0, 10, 0],
                                    }}
                                    transition={{ 
                                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                        y: { duration: 3 + index, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center lg:justify-start"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <div className="relative p-6 lg:p-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg max-w-xl">
                            {/* Animated underline accent */}
                            <motion.div 
                                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                                initial={{ width: 0 }}
                                animate={isVisible ? { width: "100%" } : {}}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            />
                            
                            <motion.p 
                                className="text-lg text-white/80 leading-relaxed"
                                variants={paragraphVariants}
                                initial="hidden"
                                animate={isVisible ? "visible" : "hidden"}
                            >
                                {paragraphWords.map((word, index) => (
                                    <motion.span
                                        key={index}
                                        className="inline-block"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { 
                                                opacity: 1, 
                                                y: 0,
                                                transition: { 
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 20
                                                }
                                            }
                                        }}
                                    >
                                        {word}{' '}
                                    </motion.span>
                                ))}
                            </motion.p>
                            
                            {/* Skills highlights */}
                            <motion.div 
                                className="mt-8 flex flex-wrap gap-2"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 1.2 }}
                            >
                                {["HTML", "CSS", "JavaScript", "React Js", "firebase"].map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 1.3 + (index * 0.1) }}
                                        whileHover={{ 
                                            scale: 1.05, 
                                            backgroundColor: "rgba(255,255,255,0.2)"
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                            
                            {/* Call to action */}
                            <motion.div 
                                className="mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1.5 }}
                            >
                               
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;