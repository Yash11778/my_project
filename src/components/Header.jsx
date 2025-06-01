import { useState, useEffect } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HackRonyXSymbol } from "../assets";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
 
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        openNavigation ? "bg-n-8" : scrolled ? "bg-n-8/95 backdrop-blur-xl shadow-lg" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-10 xl:px-14 max-lg:py-6 lg:py-8">
        <div className="flex items-center flex-grow">
          <motion.a 
            href="#hero" 
            onClick={handleClick} 
            className="flex items-center gap-3 relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              {/* Enhanced logo glow effect with multiple layers */}
              <motion.div 
                className="absolute inset-[-4px] rounded-full opacity-70"
                animate={{ 
                  boxShadow: [
                    '0 0 0 rgba(139, 92, 246, 0)', 
                    '0 0 25px rgba(139, 92, 246, 0.8)',
                    '0 0 15px rgba(236, 72, 153, 0.7)', 
                    '0 0 0 rgba(139, 92, 246, 0)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] rounded-full border-2 border-purple-500/30 border-dashed"
              />
              
              {/* Middle spinning ring - opposite direction */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] rounded-full border-[1px] border-blue-400/40 border-dotted"
              />
              
              {/* Inner energy effect */}
              <motion.div
                className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-color-1/20 via-color-2/20 to-color-1/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  background: [
                    "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(90deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
              
              {/* Logo image with enhanced animation */}
              <motion.img 
                src={HackRonyXSymbol} 
                alt="HacKronyX Logo" 
                className="w-[2.5rem] h-[2.5rem] relative z-10"
                whileHover={{ rotate: 360, scale: 1.1 }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 5px rgba(139, 92, 246, 0.7))',
                    'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))',
                    'drop-shadow(0 0 5px rgba(139, 92, 246, 0.7))'
                  ]
                }}
                transition={{ 
                  rotate: { duration: 0.8, type: "spring" },
                  filter: { duration: 4, repeat: Infinity }
                }}
              />
              
              {/* Enhanced animated gradient behind logo */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  background: [
                    "linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(to right, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))"
                  ]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
              
              {/* Energy particles radiating from logo */}
              <AnimatePresence>
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-color-1"
                    initial={{ 
                      scale: 0,
                      x: 0,
                      y: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      x: [0, (Math.cos(i * 60 * Math.PI/180) * 20)],
                      y: [0, (Math.sin(i * 60 * Math.PI/180) * 20)],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2 + Math.random(),
                      repeatDelay: Math.random()
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Brand name with enhanced gradient text animation */}
            <motion.div 
              className="text-[2rem] font-bold leading-loose pb-2"
              style={{
                backgroundImage: "linear-gradient(90deg, #4f46e5, #ec4899, #8b5cf6, #3b82f6, #4f46e5)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: "0.125rem",
                lineHeight: 1.2,
                display: "inline-block",
                filter: "drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
              }}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            >
              HacKronyX
            </motion.div>
            
            {/* Enhanced particle effects on hover */}
            <AnimatePresence>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute hidden group-hover:block rounded-full"
                  style={{
                    background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    boxShadow: '0 0 4px rgba(139, 92, 246, 0.8)',
                    left: `${50 + (Math.random() - 0.5) * 30}%`, 
                    top: `${50 + (Math.random() - 0.5) * 30}%` 
                  }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0, 
                    scale: 0
                  }}
                  animate={{ 
                    x: [0, (Math.random() - 0.5) * 100], 
                    y: [0, (Math.random() - 0.5) * 60], 
                    opacity: [0, 1, 0], 
                    scale: [0, Math.random() + 0.5, 0],
                    rotate: [0, Math.random() * 180]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.a>
          
          <motion.div 
            className="h-[2.5rem] w-px ml-5 md:ml-10"
            style={{
              background: "linear-gradient(to bottom, rgba(48, 48, 64, 0), rgba(139, 92, 246, 0.5), rgba(48, 48, 64, 0))"
            }}
            animate={{ 
              scaleY: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
              background: [
                "linear-gradient(to bottom, rgba(48, 48, 64, 0), rgba(139, 92, 246, 0.5), rgba(48, 48, 64, 0))",
                "linear-gradient(to bottom, rgba(48, 48, 64, 0), rgba(236, 72, 153, 0.5), rgba(48, 48, 64, 0))",
                "linear-gradient(to bottom, rgba(48, 48, 64, 0), rgba(139, 92, 246, 0.5), rgba(48, 48, 64, 0))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Navigation links with hover effects */}
          <nav className="hidden lg:flex items-center ml-10 xl:ml-14 mr-auto">
            {navigation.map((item, index) => (
              <motion.li 
                key={item.id} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.2 + index * 0.1, 
                  type: "spring",
                  stiffness: 150
                }}
                className="relative"
              >
                {item.url.startsWith("/") ? (
                  <Link 
                    to={item.url}
                    className="px-6 py-3 font-code text-n-1 text-lg transition-all duration-300 hover:text-color-1 relative inline-block group"
                  >
                    {item.title}
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-color-1 to-color-2 transform -translate-x-1/2"
                      whileHover={{ width: "80%" }}
                      transition={{ type: "spring", stiffness: 150 }}
                    />
                  </Link>
                ) : (
                  <a
                    href={item.url}
                    className="px-6 py-3 font-code text-n-1 text-lg transition-all duration-300 hover:text-color-1 relative inline-block group"
                  >
                    {item.title}
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-color-1 to-color-2 transform -translate-x-1/2"
                      whileHover={{ width: "80%" }}
                      transition={{ type: "spring", stiffness: 150 }}
                    />
                  </a>
                )}
              </motion.li>
            ))}
          </nav>
        </div>
        
        {/* Enhanced register button with animated gradient border and effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          className="hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full p-[2px] overflow-hidden group"
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-color-1 via-color-2 to-color-1"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            />
            
            <Button 
              className="relative bg-n-8 text-lg py-4 px-8 rounded-full z-10 group-hover:bg-n-7 transition-colors"
              href="#register"
            >
              <span className="bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-clip-text text-transparent bg-[length:200%_auto]">
                Register Now
              </span>
              
              {/* Animated particles that appear on hover */}
              <AnimatePresence>
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute hidden group-hover:block w-1 h-1 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0, 
                      scale: 0,
                      backgroundColor: i % 2 === 0 ? "#8b5cf6" : "#ec4899"
                    }}
                    animate={{ 
                      x: [0, (Math.random() - 0.5) * 80], 
                      y: [0, (Math.random() - 0.5) * 40], 
                      opacity: [0, 1, 0], 
                      scale: [0, Math.random() + 0.5, 0] 
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      delay: Math.random() * 0.3
                    }}
                    style={{ 
                      left: `${50 + (Math.random() - 0.5) * 30}%`, 
                      top: `${50 + (Math.random() - 0.5) * 30}%` 
                    }}
                  />
                ))}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Mobile menu button with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="ml-auto lg:hidden"
        >
          <Button 
            className="px-6 py-4 relative group overflow-hidden" 
            onClick={toggleNavigation}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-color-1/30 to-color-2/30 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ 
                scale: openNavigation ? [1, 1.2, 1] : [1, 1.05, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {openNavigation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <HamburgerMenu
              openNavigation={openNavigation}
              navigation={navigation}
              handleClick={handleClick}
            />
            
            {/* Mobile "Register" button at bottom of mobile menu */}
            <motion.div 
              className="flex justify-center py-6 bg-n-8 border-t border-n-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-full p-[2px] overflow-hidden"
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-color-1 via-color-2 to-color-1"
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% auto" }}
                />
                
                <Button 
                  className="relative bg-n-8 text-lg py-3 px-8 rounded-full z-10"
                  href="#register"
                  onClick={handleClick}
                >
                  <span className="bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-clip-text text-transparent bg-[length:200%_auto]">
                    Register Now
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Animated highlight line that appears on scroll */}
      <motion.div 
        className="h-[2px] bg-gradient-to-r from-color-1 via-color-2 to-color-1 w-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: scrolled ? 1 : 0,
          opacity: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

export default Header;
