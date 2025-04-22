import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiCplusplus, SiGithub } from "react-icons/si";
const Technologies = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const technologies = [
        { icon: <FaPython className="text-5xl text-yellow-400" />, key: 'Python' },
        { icon: <SiCplusplus className="text-5xl text-blue-400" />, key: 'C++' },
        { icon: <FaHtml5 className="text-5xl text-orange-500" />, key: "HTML" },
        { icon: <FaCss3Alt className="text-5xl text-blue-500" />, key: "CSS" },
        { icon: <FaJs className="text-5xl text-yellow-500" />, key: "JavaScript" },
       
        { icon: <SiGithub className="text-5xl bg-white p-2 text-black" />, key: 'GitHub' },
        
       
        
    ];

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

    return (
        <div ref={ref} className="border-b border-neutral-800 pb-24">
            <h1 className="my-20 text-center text-4xl">Technologies</h1>
            <div className="flex flex-wrap items-center justify-center gap-6">
                {technologies.map((tech, index) => (
                    <motion.div
                        key={tech.key}
                        className="rounded-2xl border-4 border-neutral-800 p-6"
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                    >
                        {tech.icon}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Technologies;
