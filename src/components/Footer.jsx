import React from "react";
import Section from "./Section";
import { socials } from "../constants";
import { motion } from "framer-motion";
import Faq from "./Faq"; // Import the Faq component

const Footer = () => {
  return (
    <>
      <Faq /> {/* Add Faq component right before Footer */}
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
                <p className="text-n-4 text-xs mt-1">Rashmin Chaudhari : +919356274667</p>
              </div>
            </nav>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Footer;
