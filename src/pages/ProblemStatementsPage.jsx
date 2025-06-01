import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { problemStatements } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CircleLoader from "../components/CircleLoader";

const ProblemCard = ({ problem, index, onClick }) => {
  const getCategoryColor = (category) => {
    const categoryColors = {
      "Logistics & Supply Chain": "from-blue-500/20 to-blue-700/20",
      "Manufacturing": "from-amber-500/20 to-amber-700/20",
      "Security & Privacy": "from-purple-500/20 to-purple-700/20",
      "Blockchain": "from-green-500/20 to-green-700/20",
      "AI & Automation": "from-pink-500/20 to-pink-700/20",
      "Cybersecurity": "from-red-500/20 to-red-700/20"
    };
    return categoryColors[category] || "from-color-1/20 to-color-2/20";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative bg-n-8 border border-n-6 rounded-xl overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(problem.category)} opacity-20`}></div>
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${getCategoryColor(problem.category)} mb-4`}>
            <span className="text-2xl">{problem.icon}</span>
          </div>
          
          <span className={`text-xs px-3 py-1 rounded-full ${
            problem.difficulty === "Expert" ? "bg-red-500/30 text-red-300" :
            problem.difficulty === "Advanced" ? "bg-amber-500/30 text-amber-300" :
            "bg-green-500/30 text-green-300"
          }`}>
            {problem.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-color-1 transition-colors">{problem.title}</h3>
        
        <p className="text-n-3 text-sm line-clamp-3 mb-4">
          {problem.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-n-4 px-2 py-1 bg-n-7 rounded">
            {problem.category}
          </span>
          
          <div className="text-sm text-color-1 flex items-center">
            Details
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 transform group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M4.16668 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProblemDetailModal = ({ isOpen, problem, onClose }) => {
  if (!problem) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-n-8/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-n-7 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-color-1/30 to-color-2/30 mr-4">
                    <span className="text-2xl">{problem.icon}</span>
                  </div>
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      problem.difficulty === "Expert" ? "bg-red-500/30 text-red-300" :
                      problem.difficulty === "Advanced" ? "bg-amber-500/30 text-amber-300" :
                      "bg-green-500/30 text-green-300"
                    } mb-2 inline-block`}>
                      {problem.difficulty}
                    </span>
                    <h2 className="text-2xl font-bold">{problem.title}</h2>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="text-n-3 hover:text-n-1 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <span className="text-sm px-3 py-1 bg-n-6 rounded-full text-n-3 mb-4 inline-block">
                  {problem.category}
                </span>
                <h3 className="text-xl font-medium mb-4">Problem Description</h3>
                <p className="text-n-3 leading-relaxed whitespace-pre-line">
                  {problem.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">Expected Deliverables</h3>
                <ul className="space-y-2 text-n-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-color-1 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    A functional prototype or solution addressing the core issue
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-color-1 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Detailed documentation explaining your approach and technical implementation
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-color-1 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Presentation slides for your solution demo
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-color-1 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Source code repository with setup instructions
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 flex justify-center">
                <a
                  href="https://unstop.com/hackathons/hackronyx-st-vincent-pallotti-college-of-engineering-and-technology-svpcet-nagpur-1466009" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
                >
                  Register & Choose This Problem
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProblemStatementsPage = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
  };
  
  const handleBackToHome = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
      <Header />
      {isLoading && <CircleLoader />}
      
      <div className="min-h-screen bg-n-8 text-n-1 pt-[7rem] pb-[80px]">
        <div className="container mx-auto px-4">
          <div className="mt-10 mb-12">
            <Link 
              to="/" 
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-color-1/80 to-color-2/80 hover:from-color-1 hover:to-color-2 text-white py-3 px-6 rounded-full transition-all duration-300 mb-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold mb-5">Round 1 Problem Statements</h1>
            <p className="text-n-3 max-w-2xl text-lg">
              Select one of these real-world challenges for your hackathon project. Each problem presents unique opportunities to showcase your technical skills and innovative thinking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {problemStatements.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={index}
                onClick={() => handleProblemClick(problem)}
              />
            ))}
          </div>
          
          <div className="mt-16 flex flex-col items-center justify-center gap-6">
            <p className="text-n-3 text-sm max-w-md text-center">
              Have questions about the problem statements? Contact us at <a href="mailto:hackronyx@stvincentngp.edu.in" className="text-color-1 hover:underline">hackronyx@stvincentngp.edu.in</a>
            </p>
            
            <Link 
              to="/" 
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-color-1 hover:text-color-2 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Return to Homepage
            </Link>
          </div>
          
          <ProblemDetailModal
            isOpen={selectedProblem !== null}
            problem={selectedProblem}
            onClose={() => setSelectedProblem(null)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProblemStatementsPage;
