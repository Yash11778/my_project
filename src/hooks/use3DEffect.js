import { useState } from 'react';

export default function use3DEffect() {
  const [position, setPosition] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)', highlight: 'none' });
  const [opacity, setOpacity] = useState(0);
  
  function handleMouseMove(e) {
    try {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      const tiltX = (posY / rect.height) * 10; 
      const tiltY = -(posX / rect.width) * 10; 
      
      const highlightX = (posX / rect.width) * 100 + 50;
      const highlightY = (posY / rect.height) * 100 + 50;
      
      setPosition({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        highlight: `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`
      });
      
      setOpacity(1);
    } catch (error) {
      console.log('Error in 3D effect:', error);
    }
  }
  
  function handleMouseLeave() {
    setPosition({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
      highlight: 'none'
    });
    setOpacity(0);
  }
  
  return {
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave
    },
    style: {
      transform: position.transform,
      transition: 'transform 0.2s ease-out'
    },
    highlightStyle: {
      background: position.highlight,
      opacity: opacity,
      transition: 'opacity 0.3s ease-out'
    }
  };
}
