import { useEffect, useRef } from "react";
import Section from "./Section";
import { motion } from "framer-motion";
// Import Three.js with error handling
let THREE;
try {
  THREE = import('three');
} catch (e) {
  console.warn('Three.js import failed:', e);
  THREE = null;
}

// This component has been removed/disabled since we don't want to show hackathon themes
const Themes = () => {
  // Return null to not render anything
  return null;
};

export default Themes;
