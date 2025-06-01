import React, { useState, useRef, useEffect } from "react";
import Section from "./Section";
import { socials } from "../constants";
import { motion } from "framer-motion";

// FAQ Item component with enhanced 3D animations
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      className={`bg-n-8 rounded-xl overflow-hidden border border-n-6 transition-all duration-500 ${isOpen ? 'shadow-xl shadow-blue-900/20 border-blue-500/40' : 'hover:border-blue-500/20'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ 
        perspective: "1000px", 
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-xl opacity-0"
        animate={{ 
          opacity: hovered ? 0.5 : 0,
          rotateX: hovered ? 5 : 0,
          rotateY: hovered ? 5 : 0
        }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      
      <motion.div 
        className="relative z-10 p-6 cursor-pointer flex justify-between items-center bg-gradient-to-r from-transparent via-blue-900/5 to-transparent"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ 
          rotateX: hovered ? 2 : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.h4 
          className="text-base md:text-lg font-semibold text-white"
          initial={false}
          animate={{ 
            color: isOpen ? '#60a5fa' : '#ffffff',
            z: hovered ? 20 : 0,
            textShadow: hovered ? "0 0 8px rgba(96, 165, 250, 0.5)" : "none",
          }}
          transition={{ duration: 0.3 }}
          style={{ transform: "translateZ(10px)" }}
        >
          {question}
        </motion.h4>
        <motion.div 
          className="text-blue-500"
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.2 : 1,
            z: hovered ? 20 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transform: "translateZ(15px)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="overflow-hidden"
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut",
          opacity: { duration: 0.25, delay: isOpen ? 0.2 : 0 }
        }}
      >
        <motion.div 
          className="px-6 pb-6 bg-gradient-to-b from-blue-900/5 to-transparent"
          animate={{
            rotateX: isOpen ? 0 : -10,
          }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.p 
            className="text-sm md:text-base text-white"
            initial={{ y: -10, opacity: 0 }}
            animate={isOpen ? { 
              y: 0, 
              opacity: 1,
              textShadow: "0 0 3px rgba(255, 255, 255, 0.2)"
            } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ transform: "translateZ(5px)" }}
          >
            {answer}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// New FAQ Section component with enhanced 3D styling
const FAQSection = () => {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const faqs = [
    {
      question: "1. Will travel allowances be provided to participants?",
      answer: "Travel allowances may not be provided to the hackathon participants. Respective Teams have to manage it by there own."
    },
    {
      question: "2. Can the Second round be attended virtually?",
      answer: "No, participants must have to attend the second round on the given venue physically."
    },
    {
      question: "3. What happens if one of my team members is unable to attend the final round?",
      answer: "In case a team member cannot attend the final round, the remaining team members can continue to represent the team."
    },
    {
      question: "4. Are we required to build the same project that we submitted in the initial PPT for the offline round?",
      answer: "No, teams are expected to work on other industry based problem statements that will be given after the declaration of first round."
    },
    {
      question: "5. Can we add 1–2 additional slides to the PPT, or must we strictly follow the given format?",
      answer: "Participants are expected to adhere to the prescribed PPT format shared in the official guidelines provided on the unstop platform."
    },
    {
      question: "6. What are the criteria for shortlisting PPTs in the first round?",
      answer: "PPTs will be evaluated based on several factors, including: relevance of the problem statement, Innovativeness and feasibility of the proposed solution, Technical approach and implementation strategy and Presentation quality."
    },
    {
      question: "7. Are we allowed to propose IoT or hardware-based solutions for our ideas?",
      answer: "Yes, participants are allowed to develop IoT or hardware-based solutions. Ensure your idea addresses the selected problem statement."
    },
    {
      question: "8. When will the results be announced?",
      answer: "Results will be Declared by 10th of June 2025."
    },
    {
      question: "9. Will accommodation be provided for participants?",
      answer: "Accommodation along with food will be provided to the top 35 selected teams, and only a minimum charge will be collected to cover the basic facilities and services."
    }
  ];

  // Display first 3 FAQs separately
  const featuredFaqs = faqs.slice(0, 3);
  const remainingFaqs = faqs.slice(3);
  
  const handleShowMore = () => {
    setShowAll(true);
    // Smoothly scroll to the container after it renders
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <Section id="faq" className="!px-0 !py-20 overflow-hidden">
      <div className="container relative">
        {/* Enhanced 3D decorative elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotateZ: [0, 10, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotateZ: [0, -10, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            y: [0, -20, 0],
            z: [0, 50, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ transformStyle: "preserve-3d" }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
          style={{ perspective: "1500px" }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent"
              style={{ 
                textShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
                transformStyle: "preserve-3d"
              }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              initial={{ width: 0, rotateX: -30 }}
              whileInView={{ width: '150px', rotateX: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-6"
              style={{ 
                boxShadow: "0 0 10px rgba(96, 165, 250, 0.5)",
                transformStyle: "preserve-3d"
              }}
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0, y: -10, z: -20 }}
              whileInView={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-n-3 max-w-md mx-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              Find answers to common questions about HacKronyX hackathon
            </motion.p>
          </div>
          
          {/* Featured FAQs - always visible */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {featuredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
          
          {/* Show More Button */}
          {!showAll && (
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleShowMore}
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3 px-6 rounded-full font-medium"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Show More FAQs
              </motion.button>
            </motion.div>
          )}
          
          {/* Scrollable FAQs container - shown when "Show More" is clicked */}
          {showAll && (
            <motion.div
              ref={scrollContainerRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Additional Questions</h3>
              <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 gap-6">
                  {remainingFaqs.map((faq, index) => (
                    <FAQItem
                      key={index + 3}
                      question={faq.question}
                      answer={faq.answer}
                      index={index + 3}
                    />
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  onClick={() => setShowAll(false)}
                  className="bg-gradient-to-r from-violet-500 to-blue-500 text-white py-3 px-6 rounded-full font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show Less
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 30, 35, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #a78bfa);
        }
      `}</style>
    </Section>
  );
};

const Footer = ({ hideFAQ }) => {
  // Check if current URL contains 'problem-statements' to disable FAQ on that page
  const [isOnProblemStatementsPage, setIsOnProblemStatementsPage] = useState(false);
  
  useEffect(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname.toLowerCase();
      setIsOnProblemStatementsPage(
        currentPath.includes('problem') || 
        currentPath.includes('problems') || 
        currentPath.includes('statements')
      );
    }
  }, []);
  
  // Don't show FAQ if explicitly hidden via prop or on Problem Statements page
  const shouldShowFAQ = !hideFAQ && !isOnProblemStatementsPage;

  return (
    <>
      {shouldShowFAQ && <FAQSection />}
      <Section crosses className="!px-0 !py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-0"
            >
              <a href="#hero" className="flex items-center gap-2">
                <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
                <div className="text-[1.2rem] font-bold text-gradient">HacKronyX</div>
              </a>
              <p className="mt-4 text-n-3 text-sm max-w-xs">
                Organized by CacheClan Tech Community at St. Vincent Pallotti College of Engineering & Technology, Nagpur
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-3">
                {socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                  >
                    <img src={item.iconUrl} alt={item.title} width={16} height={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-n-6 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between"
          >
            <p className="text-n-4 text-xs">
              © {new Date().getFullYear()} HacKronyX. All rights reserved.
            </p>
            
            <nav className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-n-4 text-xs hover:text-n-1 transition-colors">
                
              </a>
              <a href="#" className="text-n-4 text-xs hover:text-n-1 transition-colors">
                
              </a>
              <div className="flex flex-col">
                <a href="#contact" className="text-n-4 text-xs hover:text-n-1 transition-colors">
                  Contact Us :
                </a>
                <p className="text-n-4 text-xs mt-1">Nishant Gakare : +918767377573</p>
                <p className="text-n-4 text-xs mt-1">Ajinkya Mariche : +919022858154</p>
                <p className="text-n-4 text-xs mt-1">Kritika Mandale : +919699677543</p>
              </div>
            </nav>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Footer;
