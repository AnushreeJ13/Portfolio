import React, { useRef } from 'react';
import { EXPERIENCES } from '../constants';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Trigger animation once when in view

    // Define animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.2 },
        }),
    };

    return (
        <motion.div
            ref={ref}
            className='border-b border-neutral-900 pb-4'
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'} // Animate when in view
            variants={containerVariants}
        >
            <h1 className='my-20 text-center text-4xl text-neutral-300'>Experience</h1>
            <div>
                {EXPERIENCES.map((experience, index) => (
                    <motion.div
                        key={index}
                        className='mb-8 flex flex-wrap lg:justify-center'
                        variants={itemVariants}
                        custom={index}
                    >
                        <div className="w-full lg:w-1/4">
                            <motion.p
                                className='mb-4 font-bold text-lg text-slate-500 text-neutral-400 bg-slate-900 '
                                variants={itemVariants}
                                custom={index}
                            >
                                {experience.year}
                            </motion.p>
                        </div>
                        <div className="w-full max-w-xl lg:w-3/4">
                            <motion.h6
                                className='mb-4 font-semibold text-neutral-100 bg-slate-900 p-3 rounded-md'
                                variants={itemVariants}
                                custom={index}
                            >
                                {experience.role} -{' '}
                                <span className='text-small text-purple-200'>
                                    {experience.company}
                                </span>
                            </motion.h6>
                            <p className='mb-4 text-neutral-400'>{experience.description}</p>
                            <div className='flex flex-wrap'>
                                {experience.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skillIndex}
                                        className='mr-2 mt-4 rounded px-3 py-1 text-small font-medium bg-neutral-900'
                                        style={{
                                            background: 'linear-gradient(to right, #A855F7,#E5E7EB)', // Gradient colors
                                            WebkitBackgroundClip: 'text', // For text gradient effect
                                            WebkitTextFillColor: 'transparent', // Make text transparent to show gradient
                                        }}
                                        whileHover={{ scale: 1.2 }} // Scale effect on hover
                                        transition={{ duration: 0.2 }} // Transition duration for hover effect
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Experience;
