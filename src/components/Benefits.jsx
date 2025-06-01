import { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { benefitIcon1, benefitIcon2, benefitIcon3, benefitIcon4 } from "../assets";

const BenefitCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <motion.div
        className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] h-full"
        style={{ backgroundImage: `url(${item.backgroundUrl})` }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
          <motion.div
            className="h-20 relative mb-6 flex items-center"
            animate={isHovered ? {
              y: [0, -5, 0],
              rotateZ: [0, 5, -5, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${
              index % 4 === 0 ? 'from-purple-500/30 to-blue-500/30' :
              index % 4 === 1 ? 'from-pink-500/30 to-purple-500/30' :
              index % 4 === 2 ? 'from-blue-500/30 to-cyan-500/30' :
              'from-indigo-500/30 to-violet-500/30'
            }`}>
              <img
                src={item.iconUrl}
                alt={item.title}
                className="w-8 h-8"
              />
            </div>
          </motion.div>
          
          <motion.h5 
            className="h5 mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
            animate={isHovered ? { 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            } : {}}
            transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}
            style={{ backgroundSize: '200% auto' }}
          >
            {item.title}
          </motion.h5>
          
          <p className="body-2 mb-6 text-n-3">{item.text}</p>
          
          <motion.div 
           
          >
            
            <motion.svg 
             >
              <path 
               
              />
            </motion.svg>
          </motion.div>
        </div>

        {item.light && <GradientLight />}

        <div
          className="absolute inset-0.5 bg-n-8"
          style={{ clipPath: "url(#benefits)" }}
        >
          <motion.div 
            className="absolute inset-0 opacity-0 transition-opacity hover:opacity-20"
            animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                width={380}
                height={362}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          
          {/* Animated background effects */}
          <motion.div 
            className="absolute inset-0"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute w-40 h-40 blur-3xl rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 -right-10 -top-10"></div>
            <div className="absolute w-40 h-40 blur-3xl rounded-full bg-gradient-to-r from-blue-600/20 to-pink-600/20 -left-10 -bottom-10"></div>
          </motion.div>
        </div>

        <ClipPath />
      </motion.div>
    </motion.div>
  );
};

const Benefits = () => {
  const benefitItems = [
    {
      id: 1,
      title: "Industry Exposure",
      text: "Work on real problems submitted by industries and gain experience solving practical challenges.",
      iconUrl: benefitIcon1,
      backgroundUrl: "/src/assets/benefits/card-1.svg",
      imageUrl: "/src/assets/benefits/industry-exposure.jpg",
      light: true
    },
    {
      id: 2,
      title: "Skill Enhancement",
      text: "Sharpen your coding, problem-solving, and presentation skills through intensive challenges.",
      iconUrl: benefitIcon2,
      backgroundUrl: "/src/assets/benefits/card-2.svg",
      imageUrl: "/src/assets/benefits/skill-enhancement.jpg",
    },
    {
      id: 3,
      title: "Networking",
      text: "Connect with industry experts, potential employers, and like-minded tech enthusiasts.",
      iconUrl: benefitIcon3,
      backgroundUrl: "/src/assets/benefits/card-3.svg",
      imageUrl: "/src/assets/benefits/networking.jpg",
      light: true
    },
    {
      id: 4,
      title: "Recognition & Rewards",
      text: "Win prizes worth ₹1,50,000+ and gain recognition for your innovative solutions.",
      iconUrl: benefitIcon4,
      backgroundUrl: "/src/assets/benefits/card-4.svg",
      imageUrl: "/src/assets/benefits/recognition.jpg",
    }
  ];

  return (
    <Section id="features" className="overflow-hidden">
      <div className="container relative z-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Heading
            className="md:max-w-md lg:max-w-2xl mx-auto text-center"
            title="Why Participate in HacKronyX?"
          />
        </motion.div>

        {/* Animated background spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[50rem] max-h-[50rem] -z-1">
          <motion.div 
            className="absolute top-0 left-0 w-60 h-60 rounded-full bg-gradient-to-r from-color-1/40 to-color-3/40 blur-3xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <motion.div 
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-r from-color-2/40 to-color-1/40 blur-3xl"
            animate={{ 
              x: [0, -30, 0], 
              y: [0, 30, 0],
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1 
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mt-12">
          {benefitItems.map((item, index) => (
            <BenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
