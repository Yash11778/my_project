import React from "react";
import { motion } from "framer-motion";

const PricingList = ({ id, title, price }) => {
  // Define prize configurations for each position
  const prizeConfig = {
    "1st Prize": {
      bgGradient: "from-yellow-500/20 via-amber-600/10 to-yellow-500/20",
      textGradient: "from-yellow-300 via-amber-200 to-yellow-400",
      borderGradient: "from-yellow-500 via-amber-400 to-yellow-500",
      icon: "🏆",
      scale: 1.05
    },
    "2nd Prize": {
      bgGradient: "from-slate-400/20 via-gray-500/10 to-slate-400/20",
      textGradient: "from-gray-200 via-slate-300 to-gray-200",
      borderGradient: "from-gray-400 via-slate-300 to-gray-400",
      icon: "🥈",
      scale: 1.02
    },
    "3rd Prize": {
      bgGradient: "from-amber-700/20 via-amber-800/10 to-amber-700/20",
      textGradient: "from-amber-500 via-amber-600 to-amber-500",
      borderGradient: "from-amber-700 via-amber-600 to-amber-700",
      icon: "🥉",
      scale: 1.02
    },
    "4th Prize": {
      bgGradient: "from-purple-600/20 via-purple-700/10 to-purple-600/20",
      textGradient: "from-purple-400 via-purple-500 to-purple-400",
      borderGradient: "from-purple-600 via-purple-500 to-purple-600",
      icon: "🏅",
      scale: 1
    },
    "5th Prize": {
      bgGradient: "from-pink-600/20 via-pink-700/10 to-pink-600/20",
      textGradient: "from-pink-400 via-pink-500 to-pink-400",
      borderGradient: "from-pink-600 via-pink-500 to-pink-600",
      icon: "🎖️",
      scale: 1
    }
  };
  
  const config = prizeConfig[title] || prizeConfig["5th Prize"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: Number(id) * 0.15,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        scale: config.scale
      }}
      className={`relative bg-n-8 border border-n-6 rounded-2xl overflow-hidden`}
    >
      {/* Card content */}
      <div className="relative p-6 h-full flex flex-col items-center">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${config.bgGradient} opacity-50`}></div>
        
        {/* Prize icon */}
        <motion.div
          className="text-4xl mb-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          {config.icon}
        </motion.div>
        
        {/* Prize title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {/* Prize amount - Enhanced visibility */}
        <motion.div 
          className="mt-1 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-gradient-to-r from-color-1 via-color-2 to-color-1 p-[1px] rounded-lg inline-block">
            <div className="bg-n-8 py-2 px-5 rounded-lg">
              <span className="text-2xl font-bold text-white">₹ {price}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingList;
