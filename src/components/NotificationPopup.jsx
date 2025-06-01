import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const NotificationPopup = ({ isVisible, message, onClose }) => {
  useEffect(() => {
    
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      document.body.style.overflow = 'hidden';
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-n-8/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-md w-full mx-4 bg-n-7 border border-n-6 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/80 to-indigo-500/80 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </div>
              <h3 className="text-color-1 font-bold text-xl mb-3">Information</h3>
              <p className="text-n-1 text-center mb-6">{message}</p>
              <Button onClick={onClose}>Got it</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
