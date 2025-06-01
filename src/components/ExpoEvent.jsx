import React from "react";
import Section from "./Section";
import { motion } from "framer-motion";
import { expoEvent } from "../constants";
import Heading from "./Heading";

const ExpoEvent = () => {
  return (
    <Section className="overflow-hidden" id="expo-event">
      <div className="container relative z-2">
        <Heading
          title="Expo Showcase"
          text="The grand finale of HacKronyX 2025 - where innovation meets opportunity"
        />
        
        {/* Main content area */}
        <div className="mt-10 lg:mt-16 relative">
          {/* Expo event header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-gradient-to-r from-color-1/80 to-color-2/80 text-white py-2 px-6 rounded-full mb-6">
              <span className="font-bold">{expoEvent.date}</span>
            </div>
            <p className="text-n-3 text-lg max-w-3xl mx-auto">
              {expoEvent.description}
            </p>
          </motion.div>
          
          {/* Featured activities */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {/* Showcase card */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-n-8/80 backdrop-blur-sm border border-n-6 hover:border-color-1/50 transition-all duration-300 rounded-3xl overflow-hidden"
            >
              <div className="p-6 relative h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-color-1/20 to-color-2/20 rounded-full blur-3xl -z-10"></div>
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-color-1 to-color-2">Expo Showcase</h3>
                <p className="text-n-3 mb-6 flex-grow">Teams present their innovative solutions in a science fair format, showcasing working prototypes to judges, industry experts, and fellow participants.</p>
              </div>
            </motion.div>
            
            {/* Finalist presentations card */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-n-8/80 backdrop-blur-sm border border-n-6 hover:border-color-1/50 transition-all duration-300 rounded-3xl overflow-hidden"
            >
              <div className="p-6 relative h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-color-2/20 to-color-3/20 rounded-full blur-3xl -z-10"></div>
                <div className="text-5xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-color-2 to-color-3">Finalist Presentations</h3>
                <p className="text-n-3 mb-6 flex-grow">Top teams selected from the Expo Showcase present their solutions on the main stage to all attendees, demonstrating their technical innovations and business potential.</p>
              </div>
            </motion.div>
            
            {/* Awards ceremony card */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-n-8/80 backdrop-blur-sm border border-n-6 hover:border-color-1/50 transition-all duration-300 rounded-3xl overflow-hidden"
            >
              <div className="p-6 relative h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-color-3/20 to-color-1/20 rounded-full blur-3xl -z-10"></div>
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-color-3 to-color-1">Awards Ceremony</h3>
                <p className="text-n-3 mb-6 flex-grow">The culmination of HacKronyX 2025, where winners are announced and prizes worth ₹1,50,000+ are distributed. A celebration of innovation, creativity, and technical excellence.</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Expo highlights section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-b from-n-8 to-n-8/0 rounded-3xl overflow-hidden mb-16"
          >
            <div className="absolute inset-0 bg-n-8/0 backdrop-blur-sm border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-color-1 opacity-30 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-color-2 opacity-30 rounded-full blur-[100px]"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
                Why Participate in the Expo?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {expoEvent.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-color-1/30 to-color-2/30 flex items-center justify-center text-xl">
                      {index === 0 ? "✨" : 
                       index === 1 ? "🤝" : 
                       index === 2 ? "🧠" : 
                       index === 3 ? "📱" : "🚀"}
                    </div>
                    <p className="text-n-1/90">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Ready to showcase your innovation?</h3>
              <p className="text-n-3 mb-8">
                Join us at the HacKronyX 2025 Expo Event for a day of innovation, networking, and celebration. Register now to secure your spot in this premier tech showcase.
              </p>
              <a
                href="#register"
                className="bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white font-medium py-3 px-6 rounded-full transition-colors inline-block"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-color-1/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-color-2/10 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </Section>
  );
};

export default ExpoEvent;
