import React, { useRef, useEffect } from "react";
import Section from "./Section";
import Button from "./Button";
import { motion } from "framer-motion";
import Heading from "./Heading";
import { yourlogo } from "../assets";

const SponsorLogo = ({ img }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] p-4 flex items-center justify-center bg-n-8">
      <img 
        src={img} 
        alt="Sponsor logo" 
        className="max-w-full h-auto w-40 object-contain logo-rotate" 
        style={{ 
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      />
    </div>
  );
};

const SponsorSlider = () => {
  const sliderRef = useRef();
  const sponsors = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    let startTime;
    let animationId;
    
    const speed = 30; 
    const totalWidth = slider.scrollWidth / 2;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const xPos = (elapsed / speed) % totalWidth;
      
      slider.style.transform = `translateX(-${xPos}px)`;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  const allSponsors = [...sponsors, ...sponsors, ...sponsors]; 
  
  return (
    <div className="w-full overflow-hidden my-10">
      <div
        className="relative flex items-center gap-16 py-6"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          ref={sliderRef}
          className="flex items-center gap-16"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d'
          }}
        >
          {allSponsors.map((sponsor, idx) => (
            <div
              key={`sponsor-${idx}`}
              className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <SponsorLogo img={sponsor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Sponsorship = () => {
  return (
    <Section id="sponsors" className="overflow-hidden">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Our Sponsors"
          text="HacKronyX 2025 is made possible by the generous support of our sponsors who share our vision of fostering innovation and tech talent."
        />
        
        <SponsorSlider />
      </div>
      
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-n-1/5 to-transparent rounded-full animate-float opacity-70"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </Section>
  );
};

export default Sponsorship;