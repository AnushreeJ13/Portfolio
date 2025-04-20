import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/AnushreeProfile.jpg";
import { Link } from 'react-router-dom';



const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Handle mouse movement for interactive elements
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    // Text animation for role title
    const roleText = "Aspiring SDE";
    const roleLetters = roleText.split("");
    
    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-indigo-900 opacity-80" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI5IDBhMjkgMjkgMCAxIDAgNTggMCAyOSAyOSAwIDEgMC01OCAwIiBzdHJva2U9IiM0QjU1NjMiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiM0QjU1NjMiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10" />
            
            {/* Glowing orbs */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl"
                animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl"
                animate={{
                    x: [0, -30, 30, 0],
                    y: [0, 30, -30, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main content container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
                {/* Header with glassmorphism effect */}
                <motion.div 
                    className="absolute top-0 left-0 right-0 py-6 px-4 backdrop-blur-md bg-black/30 border-b border-white/10 z-20"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <motion.div 
                            className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                        >
                        ⭐
                        </motion.div>
                       
                    </div>
                </motion.div>
                
                {/* Hero content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-20 lg:py-32">
                    {/* Text section */}
                    <motion.div 
                        className="w-full lg:w-1/2 text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div 
                            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <span className="text-white/80 font-medium">Welcome to my portfolio</span>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Anushree Jain
                        </motion.h1>
                        
                        <motion.div 
                            className="flex justify-center lg:justify-start mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="relative px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                                <div className="flex">
                                    {roleLetters.map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            className="text-2xl font-medium text-white inline-block"
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ 
                                                delay: 0.8 + (index * 0.05),
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 10
                                            }}
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </div>
                                <motion.div 
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1.3, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                        
                        <motion.p 
                            className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            {HERO_CONTENT}
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                        >
                            
                            <motion.button 
                                className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                >
                                
                                <a href="#contact" className="px-4 py-2 hover:bold">Contact Me</a>
                            </motion.button>

                        </motion.div>
                        
                       
                    </motion.div>
                    
                    {/* Image section */}
                    <motion.div 
                        className="w-full lg:w-1/2 flex justify-center items-center relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 animate-pulse" />
                        
                        {/* Decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                className="w-64 h-64 rounded-full border-2 border-white/10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute w-72 h-72 rounded-full border-2 border-white/5"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute w-80 h-80 rounded-full border-2 border-white/5"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        
                        {/* Interactive image container */}
                        <motion.div
                            className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-full border-2 border-white/20 p-1 bg-gradient-to-br from-purple-500/20 via-black/50 to-pink-500/20 backdrop-blur-md shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: 1000,
                            }}
                            animate={{
                                rotateY: mousePosition.x / 50,
                                rotateX: -mousePosition.y / 50,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={profilePic}
                                    alt="Anushree Jain"
                                    className="w-full h-full object-cover rounded-full"
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = "/api/placeholder/400/400"; 
                                    }}
                                />
                            </div>
                            
                            {/* Glowing effect */}
                            <motion.div 
                                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-sm -z-10"
                                animate={{ 
                                    background: [
                                        "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)",
                                        "linear-gradient(to right, #6366f1, #ec4899, #8b5cf6)",
                                        "linear-gradient(to right, #8b5cf6, #6366f1, #ec4899)",
                                        "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)"
                                    ]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                        
                        {/* Floating tech icons */}
                        {["⚛️", "🖥️", "🌐", "🔧"].map((icon, index) => (
                            <motion.div
                                key={index}
                                className="absolute text-2xl backdrop-blur-sm bg-white/10 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-white/20"
                                initial={{ 
                                    x: (index % 2 === 0 ? -150 : 150), 
                                    y: (index < 2 ? -80 : 80),
                                    opacity: 0 
                                }}
                                animate={{ 
                                    x: (index % 2 === 0 ? -120 : 120), 
                                    y: (index < 2 ? -100 : 100),
                                    opacity: 1 
                                }}
                                transition={{ 
                                    delay: 1 + (index * 0.2), 
                                    duration: 0.8 
                                }}
                            >
                                {icon}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div 
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-white/50 text-sm">Scroll Down</span>
                    <motion.div 
                        className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2"
                    >
                        <motion.div 
                            className="w-1.5 h-3 bg-white/50 rounded-full"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;