import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import * as THREE from "three";
import { eventHighlights } from "../constants";
import LoadingScreen from "./LoadingScreen"; // Import the new LoadingScreen component

const Hero = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true); // Re-add loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading time with a shorter duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Shorter loading time - just 2 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup scene
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light with animation
    const pointLight = new THREE.PointLight(0x6366f1, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Add second animated point light
    const pointLight2 = new THREE.PointLight(0xec4899, 1);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    // Create animated globe with more details
    const globeGeometry = new THREE.IcosahedronGeometry(2, 5); // More detail
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x0f0f1a,
      wireframe: true,
      wireframeLinewidth: 1,
      emissive: 0x23153c,
      flatShading: false,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Add inner globe for depth effect
    const innerGlobeGeometry = new THREE.IcosahedronGeometry(1.7, 3);
    const innerGlobeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      opacity: 0.5,
      transparent: true,
      wireframe: true,
      emissive: 0x23153c,
    });
    const innerGlobe = new THREE.Mesh(innerGlobeGeometry, innerGlobeMaterial);
    scene.add(innerGlobe);
    
    // Create floating connection lines
    const createConnectionPoint = () => {
      const point = new THREE.Vector3(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5
      );
      point.normalize().multiplyScalar(2);
      return point;
    };
    
    const connectionPoints = [];
    for (let i = 0; i < 80; i++) { // More points
      connectionPoints.push(createConnectionPoint());
    }
    
    const connectionsGeometry = new THREE.BufferGeometry();
    const verticesArray = [];
    const connections = [];
    
    for (let i = 0; i < connectionPoints.length; i++) {
      const pointA = connectionPoints[i];
      
      // Find closest points to create connections
      const distances = [];
      for (let j = 0; j < connectionPoints.length; j++) {
        if (i !== j) {
          distances.push({
            index: j,
            distance: pointA.distanceTo(connectionPoints[j])
          });
        }
      }
      
      // Sort by distance and get the closest ones
      distances.sort((a, b) => a.distance - b.distance);
      
      // Connect to the 3 closest points (increased from 2)
      for (let k = 0; k < Math.min(3, distances.length); k++) {
        const pointB = connectionPoints[distances[k].index];
        const connectionKey = [i, distances[k].index].sort().join('-');
        
        // Avoid duplicate connections
        if (!connections.includes(connectionKey)) {
          connections.push(connectionKey);
          
          // Add the vertices for the line
          verticesArray.push(pointA.x, pointA.y, pointA.z);
          verticesArray.push(pointB.x, pointB.y, pointB.z);
        }
      }
    }
    
    const vertices = new Float32Array(verticesArray);
    connectionsGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
    });
    
    const lineConnections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
    globe.add(lineConnections);
    
    // Add points at connection vertices with improved appearance
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(connectionPoints.flatMap(p => [p.x, p.y, p.z])),
      3
    ));
    
    // Create custom vertex shader for points
    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xec4899) },
      },
      vertexShader: `
        uniform float time;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 5.0 * (1.0 + 0.3 * sin(time + position.x * 10.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(color, 1.0) * (1.0 - dist * 1.5);
        }
      `,
      transparent: true,
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    globe.add(points);
    
    // Add floating particles in background
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      sizes[i] = Math.random() * 2;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x4a4fc5) },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          gl_FragColor = vec4(color, 0.7 * (1.0 - distanceToCenter * 2.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create pulsing light points with more variety and effects
    const pulseLights = [];
    
    for (let i = 0; i < 20; i++) { // Increased count
      const geometry = new THREE.SphereGeometry(0.05, 16, 16);
      
      // Create more interesting colors with gradients
      const color1 = new THREE.Color(
        Math.random() * 0.5 + 0.5, // R
        Math.random() * 0.3, // G
        Math.random() * 0.5 + 0.5 // B
      );
      
      const color2 = new THREE.Color(
        Math.random() * 0.3, // R
        Math.random() * 0.2, // G
        Math.random() * 0.8 + 0.2 // B
      );
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: color1 },
          color2: { value: color2 }
        },
        vertexShader: `
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          
          void main() {
            vec3 color = mix(color1, color2, 0.5 + 0.5 * sin(time * 2.0));
            float alpha = 0.8 * (0.5 + 0.5 * sin(time * 3.0));
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
      });
      
      const light = new THREE.Mesh(geometry, material);
      const position = createConnectionPoint();
      light.position.copy(position);
      
      const pulseData = {
        initialSize: 0.05,
        maxSize: 0.1 + Math.random() * 0.1,
        growSpeed: 0.01 + Math.random() * 0.03,
        growing: true,
        timeOffset: Math.random() * Math.PI * 2
      };
      
      pulseLights.push({ mesh: light, data: pulseData });
      globe.add(light);
    }
    
    // Mouse interaction
    let mouse = new THREE.Vector2();
    let target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x * 0.3;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y * 0.3;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add smartphone gyroscope controls
    const handleDeviceOrientation = (event) => {
      if (event.beta && event.gamma) {
        // Convert degrees to radians and normalize
        const beta = (event.beta - 90) * (Math.PI / 180) * 0.1;
        const gamma = event.gamma * (Math.PI / 180) * 0.1;
        
        mouse.y = beta;
        mouse.x = gamma;
      }
    };
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    // Animation loop with more complex animations
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth camera movement with mouse interaction
      target.x = mouse.x;
      target.y = mouse.y;
      camera.position.x += (target.x - camera.position.x) * 0.05;
      camera.position.y += (target.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Rotating globe with varying speeds
      globe.rotation.y += 0.002;
      globe.rotation.x += Math.sin(elapsedTime * 0.2) * 0.001;
      globe.rotation.z += 0.0005;
      
      // Inner globe counter rotation
      innerGlobe.rotation.y -= 0.001;
      innerGlobe.rotation.x += 0.001;
      
      // Update shader uniforms
      points.material.uniforms.time.value = elapsedTime;
      particlesMaterial.uniforms.time.value = elapsedTime;
      
      // Animate point lights
      pointLight.position.x = Math.sin(elapsedTime * 0.7) * 10;
      pointLight.position.y = Math.cos(elapsedTime * 0.5) * 10;
      
      pointLight2.position.x = Math.sin(elapsedTime * 0.3) * 10;
      pointLight2.position.z = Math.cos(elapsedTime * 0.4) * 10;
      
      // Animate floating particles
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.01;
      
      // Animate pulsing lights with more dynamic effects
      pulseLights.forEach(light => {
        const { mesh, data } = light;
        
        // Update shader time uniform
        mesh.material.uniforms.time.value = elapsedTime + data.timeOffset;
        
        if (data.growing) {
          mesh.scale.x += data.growSpeed;
          mesh.scale.y += data.growSpeed;
          mesh.scale.z += data.growSpeed;
          
          if (mesh.scale.x >= data.maxSize) {
            data.growing = false;
          }
        } else {
          mesh.scale.x -= data.growSpeed;
          mesh.scale.y -= data.growSpeed;
          mesh.scale.z -= data.growSpeed;
          
          if (mesh.scale.x <= data.initialSize) {
            data.growing = true;
          }
        }
        
        // Add subtle motion to pulsing lights
        mesh.position.x += Math.sin(elapsedTime * 2 + data.timeOffset) * 0.001;
        mesh.position.y += Math.cos(elapsedTime * 2 + data.timeOffset) * 0.001;
      });
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  const handleProblemStatementsClick = (e) => {
    e.preventDefault();
    navigate('/problem-statements');
  };
  
  return (
    <>
      {/* New Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Full-screen hero section with just the intro text */}
      <div className="relative h-screen flex items-center justify-center">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 40 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: loading ? 0 : 0.2 }}
          className="relative z-1 max-w-[62rem] mx-auto text-center px-4"
        >
          <h1 className="h1 mb-6">
            <span className="inline-block text-gradient">HacKronyX 2025</span>{" "}
            <br className="hidden md:block" />
            National-Level{" "}
            <span className="inline-block text-gradient">Hackathon</span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-10 text-n-3">
            A 36-hour coding adventure bringing together India's brightest tech minds to solve real-world challenges.
            Join us at St. Vincent Pallotti College of Engineering & Technology, Nagpur on June 27-28, 2025.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="#register" className="min-w-[10rem] text-lg py-4 px-8">Register Now</Button>
            {/* Fix the Button component with Link */}
            <Button 
              onClick={handleProblemStatementsClick} 
              className="min-w-[10rem] text-lg py-4 px-8" 
              white
            >
              Problem Statements
            </Button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center"
          >
            <div className="w-8 h-14 border-2 border-n-1 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="w-1.5 h-3 bg-n-1 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced event info section with more attractive boxes */}
      <Section className="pt-20" id="event-info">
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-1"
          >
            {/* Improved styling for the event info cards */}
            <div className="flex flex-col items-center justify-center backdrop-blur-md bg-n-8/30 rounded-3xl p-8 border border-n-1/10 max-w-4xl mx-auto overflow-hidden">
              
              {/* Background decorative elements */}
              <motion.div 
                className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-color-1/20 to-color-2/20 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-color-3/20 to-color-1/20 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
              
              {/* Section title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-10 text-center"
              >
                Event <span className="text-gradient">Highlights</span>
              </motion.h2>
              
              {/* Prize Pool Box - Featured larger box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-full mb-10 p-6 bg-gradient-to-br from-n-8/90 to-n-8/50 border border-n-1/20 rounded-2xl hover:border-n-1/40 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-color-1/10 to-color-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-1 flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-color-1 to-color-2 mb-4"
                  >
                    <span className="text-3xl">💰</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-medium mb-3 text-n-1/90">Prize Pool</h3>
                  <motion.p 
                    className="text-gradient text-4xl md:text-5xl font-bold"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      repeatType: "reverse"
                    }}
                    style={{ backgroundSize: '200% auto' }}
                  >
                    ₹1,50,000+
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Team Size and Registration Fee boxes in responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Team Size Box */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-gradient-to-br from-n-8/90 to-n-8/50 border border-n-1/20 rounded-2xl hover:border-n-1/40 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-color-2/10 to-color-3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-1 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-color-2 to-color-3 mb-4"
                    >
                      <span className="text-2xl">👥</span>
                    </motion.div>
                    
                    <h3 className="text-lg font-medium mb-3 text-n-1/90">Team Size</h3>
                    <p className="text-gradient-2 text-2xl md:text-3xl font-bold">3-5 students</p>
                  </div>
                </motion.div>
                
                {/* Registration Fee Box */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-gradient-to-br from-n-8/90 to-n-8/50 border border-n-1/20 rounded-2xl hover:border-n-1/40 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-color-3/10 to-color-1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-1 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-color-3 to-color-1 mb-4"
                    >
                      <span className="text-2xl">🎟️</span>
                    </motion.div>
                    
                    <h3 className="text-lg font-medium mb-3 text-n-1/90">Registration Fee</h3>
                    <p className="text-gradient-3 text-2xl md:text-3xl font-bold">Free</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Hero;
