import { useEffect, useRef } from "react";
import Section from "./Section";
import { motion } from "framer-motion";
import * as THREE from "three";
import { timelineEvents } from "../constants";

const TimelineCard = ({ title, date, details, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      className="backdrop-blur-md bg-n-8/50 border border-n-1/10 rounded-3xl p-6 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold text-gradient mb-2">{title}</h3>
      <div className="text-n-1/50 text-sm mb-4">{date}</div>
      <ul className="space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + idx * 0.1, type: "spring" }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
            />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Timeline = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;
    
    // Setup renderer with better quality
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light with animation
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create advanced particle system
    const particlesCount = 3000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Color - purple/blue gradient
      colors[i * 3] = Math.random() * 0.3 + 0.1; // R
      colors[i * 3 + 1] = Math.random() * 0.1; // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
      
      // Size & speed variation
      sizes[i] = Math.random() * 3;
      speeds[i] = Math.random() * 0.02 + 0.005;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    
    // Custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute vec3 color;
        attribute float size;
        attribute float speed;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Animated position
          float yOffset = sin(time * speed * 2.0 + position.x) * 2.0;
          mvPosition.y += yOffset;
          
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          float alpha = 0.8 * (1.0 - distanceToCenter * 2.0);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create floating 3D polygons with glow effect
    const createPolygon = () => {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 1 + 0.5, 0);
      
      // Create glowing material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(
            Math.random() * 0.3 + 0.1, // R
            Math.random() * 0.1, // G
            Math.random() * 0.5 + 0.5 // B
          )}
        },
        vertexShader: `
          uniform float time;
          varying vec3 vNormal;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            
            // Add subtle animation to vertices
            vec3 pos = position;
            pos += normal * 0.05 * sin(time * 0.5 + position.x * 10.0);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying vec3 vNormal;
          
          void main() {
            float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 glow = color * intensity * 1.5;
            
            // Add time-based color pulsation
            float pulse = 0.5 + 0.5 * sin(time * 0.5);
            vec3 finalColor = mix(color, glow, pulse);
            
            gl_FragColor = vec4(finalColor, 0.7);
          }
        `,
        wireframe: true,
        transparent: true,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.speed = {
        rotation: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        position: {
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
          z: (Math.random() - 0.5) * 0.05
        }
      };
      scene.add(mesh);
      return mesh;
    };
    
    const polygons = [];
    for (let i = 0; i < 20; i++) {
      polygons.push(createPolygon());
    }
    
    // Create connected nodes effect
    const nodes = [];
    const nodeConnections = [];
    
    for (let i = 0; i < 10; i++) {
      const node = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      nodes.push({
        position: node,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      });
    }
    
    // Create lines between nodes
    const updateNodeConnections = () => {
      // Remove old connections
      nodeConnections.forEach(line => scene.remove(line));
      nodeConnections.length = 0;
      
      // Create new connections based on proximity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          
          if (distance < 15) {
            const intensity = 1 - distance / 15; // Fade with distance
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position
            ]);
            
            const lineMaterial = new THREE.LineBasicMaterial({ 
              color: new THREE.Color(0x8b5cf6),
              transparent: true,
              opacity: intensity * 0.5
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            nodeConnections.push(line);
          }
        }
      }
    };
    
    // Mouse interaction for parallax effect
    let mouse = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth camera movement for parallax
      target.x = mouse.x * 0.5;
      target.y = mouse.y * 0.5;
      camera.position.x += (target.x - camera.position.x) * 0.05;
      camera.position.y += (target.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Update uniforms time
      particlesMaterial.uniforms.time.value = elapsedTime;
      
      // Update directional light position
      directionalLight.position.x = Math.sin(elapsedTime * 0.2) * 10;
      directionalLight.position.y = Math.cos(elapsedTime * 0.3) * 10;
      
      // Animate particles
      particles.rotation.y = elapsedTime * 0.02;
      
      // Animate polygons
      polygons.forEach(polygon => {
        polygon.rotation.x += polygon.speed.rotation.x;
        polygon.rotation.y += polygon.speed.rotation.y;
        polygon.rotation.z += polygon.speed.rotation.z;
        
        polygon.position.x += polygon.speed.position.x;
        polygon.position.y += polygon.speed.position.y;
        polygon.position.z += polygon.speed.position.z;
        
        // Update shader uniforms
        polygon.material.uniforms.time.value = elapsedTime;
        
        // Boundary check and reverse direction
        if (Math.abs(polygon.position.x) > 15) polygon.speed.position.x *= -1;
        if (Math.abs(polygon.position.y) > 15) polygon.speed.position.y *= -1;
        if (Math.abs(polygon.position.z) > 15) polygon.speed.position.z *= -1;
      });
      
      // Update node positions
      nodes.forEach(node => {
        node.position.add(node.velocity);
        
        // Boundary check
        if (Math.abs(node.position.x) > 20) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 20) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 20) node.velocity.z *= -1;
      });
      
      // Update connections every few frames
      if (Math.floor(elapsedTime * 10) % 5 === 0) {
        updateNodeConnections();
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      particlesMaterial.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  return (
    <Section id="timeline">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0" 
      />
      
      <div className="container z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 mb-4 rounded-full bg-n-1/10 text-n-1/80 text-sm">
            Mark your calendar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Event Timeline
          </h2>
          <p className="text-n-1/50 max-w-3xl mx-auto">
            Follow our hackathon journey from registration to final presentations.
            The HacKronyX 2025 experience is designed to bring out your best innovation in a structured format.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timelineEvents.map((event, index) => (
            <TimelineCard 
              key={event.id}
              title={event.title}
              date={event.date}
              details={event.details}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md p-6 rounded-2xl inline-block hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
            <p className="text-lg text-n-1/70">
              <span className="text-gradient font-bold"></span> 
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Timeline;
