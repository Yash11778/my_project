import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { hackathonThemes } from '../constants';

export const TagSphere = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
 
    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6366f1, 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const themeSpheres = [];
    const radius = 15;
    
    hackathonThemes.forEach((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / hackathonThemes.length);
      const theta = Math.sqrt(hackathonThemes.length * Math.PI) * phi;
      
      const geometry = new THREE.SphereGeometry(0.7, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(
          0.1 + Math.random() * 0.2,
          0.05 + Math.random() * 0.1,
          0.5 + Math.random() * 0.3
        ),
        transparent: true,
        opacity: 0.8
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.x = radius * Math.sin(phi) * Math.cos(theta);
      sphere.position.y = radius * Math.sin(phi) * Math.sin(theta);
      sphere.position.z = radius * Math.cos(phi);
      
      sphere.lookAt(0, 0, 0);
      scene.add(sphere);
      themeSpheres.push(sphere);
    });
    
    const connectionsGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < themeSpheres.length; i++) {
      for (let j = i + 1; j < themeSpheres.length; j++) {
        if (Math.random() > 0.7) continue; // Only connect some spheres
        
        linePositions.push(
          themeSpheres[i].position.x, themeSpheres[i].position.y, themeSpheres[i].position.z,
          themeSpheres[j].position.x, themeSpheres[j].position.y, themeSpheres[j].position.z
        );
      }
    }
    
    connectionsGeometry.setAttribute('position', 
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3 
    });
    
    const connections = new THREE.LineSegments(connectionsGeometry, lineMaterial);
    scene.add(connections);
    
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const sphereGroup = new THREE.Group();
    themeSpheres.forEach(sphere => {
      sphereGroup.add(sphere);
    });
    sphereGroup.add(connections);
    scene.add(sphereGroup);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.05;
      sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.05;
      
      sphereGroup.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
};

export default TagSphere;
