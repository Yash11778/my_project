import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-n-8 to-n-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center">
        {/* A minimalist, elegant logo animation */}
        <motion.div 
          className="relative w-24 h-24 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-blue-500/60 rounded-full" />
          
          {/* Inner spinning circle */}
          <motion.div 
            className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full absolute -top-1" />
          </motion.div>
          
          {/* HacKronyX text or simplified logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gradient font-bold">HK</span>
          </div>
        </motion.div>
        
        {/* Loading text */}
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-n-1 text-sm"
        >
          Loading...
        </motion.div>
        
        {/* Loading bar */}
        <div className="mt-4 w-48 h-1 bg-n-6 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
