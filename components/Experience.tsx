
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import LiquidSphere from './LiquidSphere';
import PostProcessing from './PostProcessing';
import ExplosionParticles from './ExplosionParticles';

interface ExperienceProps {
  triggerExplosion: [number, number, number] | null;
}

const Experience: React.FC<ExperienceProps> = ({ triggerExplosion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Lerp for smooth movement
      const targetX = mousePos.x * 2;
      const targetY = mousePos.y * 2;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      
      // Smooth rotation based on mouse
      groupRef.current.rotation.y += (mousePos.x * 0.5 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-mousePos.y * 0.5 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#4477ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff33aa" />
      
      <Environment preset="night" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <LiquidSphere />
        </Float>
      </group>

      <ExplosionParticles triggerPos={triggerExplosion} />

      <PostProcessing />
    </>
  );
};

export default Experience;
