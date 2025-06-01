import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-n-8">
      <div className="flex flex-col items-center">
        <motion.div
          className="w-20 h-20 mb-6 relative"
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "linear"
          }}
        >
          {/* Outer ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-t-color-1 border-r-color-2 border-b-color-1 border-l-color-2 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          
          {/* Inner ring */}
          <motion.div 
            className="absolute inset-2 rounded-full border-4 border-t-color-2 border-r-color-1 border-b-color-2 border-l-color-1 opacity-50"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div 
            className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-n-1 text-lg font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Redirecting...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
