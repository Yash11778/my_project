import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { problemStatements } from "../constants";
import Section from "./Section";
import Button from "./Button";

const ProblemStatementCard = ({ problem, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-n-8 border border-n-6 rounded-xl overflow-hidden cursor-pointer hover:border-color-1 transition-all duration-300"
      onClick={onClick}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -15px rgba(2, 12, 27, 0.7)"
      }}
    >
      {/* Card inner content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-color-1/20 to-color-2/20">
            <span className="text-2xl">{problem.icon}</span>
          </div>
          <span className="text-xs text-n-3 px-2 py-1 bg-n-7 rounded-full">
            {problem.difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{problem.title}</h3>
        
        <p className="text-sm text-n-3 line-clamp-3 mb-4">
          {problem.description}
        </p>
        
        <div className="text-xs text-color-1 flex items-center mt-auto">
          View details
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M7 1L13 7M13 7L7 13M13 7H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const Popup = ({ isVisible, problem, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-n-8"
            onClick={onClose}
          />
          
          {/* Content */}
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 30 }}
            className="bg-n-7 relative rounded-2xl overflow-hidden max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header with icon */}
            <div className="bg-gradient-to-r from-color-1/20 to-color-2/20 p-6 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-n-8/50 hover:bg-n-8 text-n-1 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-color-1/30 to-color-2/30 mr-4">
                  <span className="text-2xl">{problem?.icon}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-n-8/50">{problem?.difficulty}</span>
              </div>
              
              <h2 className="text-2xl font-bold">{problem?.title}</h2>
              <div className="mt-2 inline-block px-3 py-1 bg-n-8/50 rounded-full text-xs">
                {problem?.category}
              </div>
            </div>
            
            {/* Problem description */}
            <div className="p-6">
              <h3 className="text-lg font-medium mb-3">Problem Statement</h3>
              <p className="text-n-3 text-sm leading-relaxed mb-6">
                {problem?.description}
              </p>
              
              <h3 className="text-lg font-medium mb-3">Expected Deliverables</h3>
              <ul className="text-n-3 text-sm list-disc pl-5 space-y-2 mb-6">
                <li>A working prototype or solution addressing the problem</li>
                <li>Technical documentation explaining your approach</li>
                <li>Presentation slides for your solution</li>
                <li>GitHub repository with your code</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-3">Judging Criteria</h3>
              <ul className="text-n-3 text-sm list-disc pl-5 space-y-2 mb-6">
                <li><span className="text-color-1">Innovation (25%)</span> - Originality and creativity of the solution</li>
                <li><span className="text-color-1">Technical Implementation (25%)</span> - Quality of code and technical execution</li>
                <li><span className="text-color-1">Business Impact (20%)</span> - Potential value and feasibility</li>
                <li><span className="text-color-1">User Experience (15%)</span> - Design and usability of the solution</li>
                <li><span className="text-color-1">Presentation (15%)</span> - Clarity and quality of your pitch</li>
              </ul>
              
              <div className="flex justify-center mt-8">
                <Button>Register & Submit Your Solution</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProblemStatementsButton = () => {
  const [showReleasePopup, setShowReleasePopup] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowReleasePopup(true)}>
        View Problem Statements
      </Button>
      
      <AnimatePresence>
        {showReleasePopup && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-n-8"
              onClick={() => setShowReleasePopup(false)}
            />
            
            {/* Content */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-n-7 relative rounded-2xl p-8 max-w-md w-full text-center"
            >
              <button 
                onClick={() => setShowReleasePopup(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-n-8/50 hover:bg-n-8 text-n-1 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-color-1/30 to-color-2/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Problem Statements</h3>
              <p className="text-n-3 mb-6">
                Problem statements will be released soon. Stay tuned for updates!
              </p>
              
              <Button onClick={() => setShowReleasePopup(false)}>
                Got it
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProblemStatementSection = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  
  // Set to true to show the full list of problems, or false to show the coming soon popup
  const areProblemsReleased = false;
  
  const handleCardClick = (problem) => {
    setSelectedProblem(problem);
  };
  
  if (!areProblemsReleased) {
    return (
      <Section id="problem-statements" className="overflow-hidden">
        <div className="container relative">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="tagline mb-6">Choose your challenge</div>
              <h2 className="h2 mb-8">Round 1 Problem Statements</h2>
              <p className="body-2 text-n-3 max-w-[800px] mx-auto mb-10">
                Select one of these real-world challenges for your hackathon project. Each problem presents
                unique opportunities to showcase your technical skills and innovative thinking.
              </p>
              
              <ProblemStatementsButton />
            </motion.div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-40 h-40 bg-color-1/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-color-2/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </Section>
    );
  }
  
  return (
    <Section id="problem-statements" className="overflow-hidden">
      <div className="container relative">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-40 h-40 bg-color-1/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-color-2/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="tagline mb-6">Choose your challenge</div>
            <h2 className="h2 mb-8">Round 1 Problem Statements</h2>
            <p className="body-2 text-n-3 max-w-[800px] mx-auto">
              Select one of these real-world challenges for your hackathon project. Each problem presents
              unique opportunities to showcase your technical skills and innovative thinking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemStatements.map((problem, index) => (
              <ProblemStatementCard
                key={problem.id}
                problem={problem}
                index={index}
                onClick={() => handleCardClick(problem)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Problem detail popup */}
      <Popup 
        isVisible={selectedProblem !== null} 
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />
    </Section>
  );
};

export default ProblemStatementSection;
