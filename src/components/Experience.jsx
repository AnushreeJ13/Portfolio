import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { Briefcase, Star } from 'lucide-react';

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
                                <Briefcase className="mr-3 text-purple-400" size={24} />
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
                                        className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded-full text-xs font-medium"
                                        whileHover={{ 
                                            scale: 1.1,
                                            backgroundColor: "rgb(126, 34, 206)"
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Star size={12} className="inline mr-1 text-yellow-400" />
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