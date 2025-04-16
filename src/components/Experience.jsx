import { EXPERIENCES } from '../constants';
import React, { useRef, useState, useEffect } from 'react';



const Experience = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Start animating items sequentially
          EXPERIENCES.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, index]);
            }, 200 * (index + 1));
          });
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Custom hooks for skill item hover effects
  const useHoverState = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };
    
    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };
    
    return { hoveredIndex, handleMouseEnter, handleMouseLeave };
  };

  const { hoveredIndex: hoveredCardIndex, handleMouseEnter: handleCardEnter, handleMouseLeave: handleCardLeave } = useHoverState();
  const { hoveredIndex: hoveredSkillIndex, handleMouseEnter: handleSkillEnter, handleMouseLeave: handleSkillLeave } = useHoverState();

  return (
    <div className="bg-gradient-to-b from-transparent to-transparent py-12 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-500 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10"
      >
        <h2 
          className={`text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          Professional Journey
        </h2>

        <div className="space-y-6 relative">
          {/* Vertical line connecting experiences */}
          <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-400 via-indigo-500 to-pink-500 hidden sm:block"></div>
          
          {EXPERIENCES.map((experience, index) => (
            <div 
              key={index}
              className={`relative transition-all duration-700 ease-out transform ${
                animatedItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={handleCardLeave}
            >
              {/* Timeline dot */}
              <div className="absolute left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-x-1/2 z-10 hidden sm:flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              {/* Experience card */}
              <div 
                className={`ml-0 sm:ml-8 bg-gradient-to-br from to-slate-950 rounded-xl p-5 shadow-lg border border-neutral-800 transition-all duration-300 ${
                  hoveredCardIndex === index ? 'border-purple-500 shadow-purple-500/20' : ''
                }`}
                style={{
                  transform: hoveredCardIndex === index ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-purple-400 bg-opacity-20 p-2 rounded-lg text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {experience.role}
                  </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <span className="text-purple-300 font-medium mb-1 sm:mb-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    {experience.company}
                  </span>
                  <span className="text-neutral-400 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {experience.year}
                  </span>
                </div>
                
                <p className="text-neutral-300 mb-4 border-l-2 border-purple-500 pl-3 italic">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center transition-all duration-300 ${
                        hoveredSkillIndex === `${index}-${skillIndex}` 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                      style={{
                        transform: hoveredSkillIndex === `${index}-${skillIndex}` ? 'scale(1.1)' : 'scale(1)'
                      }}
                      onMouseEnter={() => handleSkillEnter(`${index}-${skillIndex}`)}
                      onMouseLeave={handleSkillLeave}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;