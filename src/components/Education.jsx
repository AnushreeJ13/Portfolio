import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

const Education = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const educationRef = useRef(null);

  const educationDetails = [
    {
      institution: "Indira Gandhi Delhi Technical University for Women",
      year: "2023 - 2027",
      type: "B.Tech - CSE - AI",
      percentage: "CGPA: 9.69",
    },
    {
      institution: "Mayo International School",
      year: "2021 - 2023",
      type: "Senior Secondary",
      percentage: "Percentage: 95.2%",
    },
    {
      institution: "DPS Indirapuram",
      year: "2008 - 2021",
      type: "Secondary",
      percentage: "Percentage: 98.6%",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!educationRef.current) return;

      const { top } = educationRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport
      if (top < windowHeight && top >= 0) {
        displayNextEducation();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const displayNextEducation = () => {
      if (currentIndex >= educationDetails.length) return;

      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        displayNextEducation();
      }, 500); // Reduced delay for smoother animation
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex, educationDetails.length]);

  return (
    <div 
      ref={educationRef} 
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h2 className='my-20 text-center text-4xl'>
        Education
      </h2>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full hidden md:block"></div>
        
        {educationDetails.map((edu, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ 
              opacity: index < currentIndex ? 1 : 0, 
              x: index < currentIndex ? 0 : (index % 2 === 0 ? -50 : 50) 
            }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
            className={`
              flex flex-col md:flex-row items-center mb-8 
              ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
            `}
          >
            {/* Timeline Dot */}
            <div className="
              w-6 h-6 rounded-full bg-black 
              absolute left-1/2 transform -translate-x-1/2 
              hidden md:block
            "></div>
            
            {/* Education Card */}
            <div 
              className={`
                w-full md:w-1/2 p-6 rounded-lg shadow-lg 
                ${((index % 2 === 0) && (index !== 2))
                  ? 'bg-pink-200 md:mr-auto text-left md:text-right'
                  : index === 2
                    ? 'border-indigo-950 md:mr-auto text-left md:text-right'
                    : 'bg-slate-600 md:ml-auto text-left md:text-left'
                }
                text-lg lg:text-xl font-light tracking-tight text-gray-400
              `}
            >
              <h3 className={`
                text-xl font-semibold 
                ${index === 2 
                  ? 'text-gray-500' 
                  : index%2===0&&index!==2
                  ?'text-gray-800'
                  :'text-gray-900'
                } 
                mb-2`}
              >
                {edu.institution}
              </h3>
              <p className={`
                text-sm 
                ${index === 2 
                  ? 'text-gray-200' 
                  : 'text-gray-700'
                } 
                mb-1`}
              >
                {edu.year}
              </p>
              <p className={`
                text-md font-medium 
                ${index === 2 
                  ? 'text-white' 
                  : index%2===0&&index!==2
                  ?'text-gray-800'
                  :'text-gray-800'
                } 
                mb-1`}
              >
                {edu.type}
              </p>
              <p className={`
                text-sm 
                ${index ===2
                  ? 'text-gray-200' 
                  : index%2===0&&index!==2
                  ?'text-gray-800'
                  :'text-gray-700'
                }`}
              >
                {edu.percentage}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;