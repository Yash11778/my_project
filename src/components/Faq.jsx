import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { faqs } from "../constants";

const FaqItem = ({ question, answer, index }) => {
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
        className="relative z-10 p-5 cursor-pointer flex justify-between items-center bg-gradient-to-r from-transparent via-blue-900/5 to-transparent"
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
          className="px-5 pb-5 bg-gradient-to-b from-blue-900/5 to-transparent"
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

const Faq = () => {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  
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
              <FaqItem
                key={faq.id}
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
                    <FaqItem
                      key={faq.id}
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

export default Faq;
