import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '../constants';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
            } 
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -50,
            scale: 0.9 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-slate-900 to-neutral-900 py-16">
            <motion.div 
                ref={ref}
                className="container mx-auto px-4"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.h2 
                    className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Professional Journey
                </motion.h2>

                <div className="space-y-8">
                    {EXPERIENCES.map((experience, index) => (
                        <motion.div 
                            key={index}
                            className="bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700 hover:border-purple-500 transition-all duration-300 group"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.03,
                                boxShadow: "0 10px 20px rgba(136, 58, 234, 0.3)"
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 mr-3 bg-purple-400 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-neutral-100">
                                    {experience.role}
                                </h3>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-purple-300 font-medium">
                                    {experience.company}
                                </span>
                                <span className="text-neutral-400 text-sm">
                                    {experience.year}
                                </span>
                            </div>
                            <p className="text-neutral-300 mb-4">
                                {experience.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {experience.skills.map((skill, skillIndex) => (
                                    <motion.span 
                                        key={skillIndex}
                                        className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded-full text-xs font-medium flex items-center"
                                        whileHover={{ 
                                            scale: 1.1,
                                            backgroundColor: "rgb(126, 34, 206)"
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Experience;