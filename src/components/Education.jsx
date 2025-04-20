import React, { useEffect, useRef, useState } from 'react';

const Education = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const educationRef = useRef(null);
  const itemRefs = useRef([]);

  const educationDetails = [
    {
      institution: "Indira Gandhi Delhi Technical University for Women",
      year: "2023 - 2027",
      type: "B.Tech - CSE - AI",
      percentage: "CGPA: 9.66",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-300",
      textColor: "text-gray-800"
    },
    {
      institution: "Mayo International School",
      year: "2021 - 2023",
      type: "Senior Secondary",
      percentage: "Percentage: 95.2%",
      bgColor: "bg-gradient-to-br from-slate-600 to-slate-700",
      textColor: "text-white"
    },
    {
      institution: "DPS Indirapuram",
      year: "2008 - 2021",
      type: "Secondary",
      percentage: "Percentage: 98.6%",
      bgColor: "bg-gradient-to-br from-indigo-900 to-indigo-950",
      textColor: "text-white"
    },
  ];

  useEffect(() => {
    // Set up intersection observer to trigger animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the component is in view, start the animation sequence
            animateItems();
            // Disconnect after animation starts
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe the education section
    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateItems = () => {
    // Animate items one by one with a delay
    educationDetails.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, 600 * index);
    });
  };

  return (
    <div 
      ref={educationRef} 
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h2 className="my-20 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Education
      </h2>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-300 via-blue-400 to-pink-500 h-full hidden md:block"></div>
        
        {educationDetails.map((edu, index) => {
          const isVisible = visibleItems.includes(index);
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={`
                flex flex-col md:flex-row items-center mb-16 relative
                transition-all duration-700 ease-out
                ${isEven ? 'md:flex-row-reverse' : ''}
                ${isVisible ? 'opacity-100' : 'opacity-0'}
                ${isVisible ? '' : isEven ? 'translate-x-16' : '-translate-x-16'}
              `}
            >
              {/* Timeline dot with pulse effect */}
              <div className={`
                w-8 h-8 rounded-full bg-white border-4 border-purple-500
                absolute left-1/2 transform -translate-x-1/2 z-10
                hidden md:flex items-center justify-center
                ${isVisible ? 'animate-pulse' : ''}
              `}>
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              </div>
              
              {/* Education Card */}
              <div 
                className={`
                  w-full md:w-5/12 p-6 rounded-xl shadow-lg
                  transition-all duration-500
                  ${edu.bgColor}
                  ${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}
                  transform hover:scale-105 hover:shadow-xl
                  border border-white/10
                `}
              >
                <h3 className={`
                  text-xl font-bold
                  ${edu.textColor}
                  mb-2`}
                >
                  {edu.institution}
                </h3>
                <p className={`
                  text-sm font-medium
                  ${edu.textColor} opacity-80
                  mb-2`}
                >
                  {edu.year}
                </p>
                <p className={`
                  text-md font-semibold
                  ${edu.textColor}
                  mb-2`}
                >
                  {edu.type}
                </p>
                <p className={`
                  text-sm
                  ${edu.textColor} opacity-90
                `}>
                  {edu.percentage}
                </p>
                
                {/* Small connecting line to timeline */}
                <div className={`
                  hidden md:block absolute top-1/2 w-12 h-0.5 bg-gray-300
                  ${isEven ? 'right-0 translate-x-12' : 'left-0 -translate-x-12'}
                  transform -translate-y-1/2
                `}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;