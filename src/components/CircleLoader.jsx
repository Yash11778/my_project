import React from 'react';
import { motion } from 'framer-motion';

const CircleLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-n-8/80 backdrop-blur-sm">
      <div className="p-8 rounded-2xl flex flex-col items-center">
        <motion.div
          className="w-16 h-16 mb-4 relative"
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "linear"
          }}
        >
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-4 border-t-color-1 border-r-color-2 border-b-color-1 border-l-color-2 opacity-70" />
          
          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full border-3 border-t-transparent border-r-transparent border-b-white border-l-white opacity-50" />
          
          {/* Center dot */}
          <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full" />
        </motion.div>
        <p className="text-white text-lg font-medium">Redirecting...</p>
      </div>
    </div>
  );
};

export default CircleLoader;
