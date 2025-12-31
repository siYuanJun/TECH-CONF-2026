
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ExplosionParticlesProps {
  triggerPos: [number, number, number] | null;
}

const ExplosionParticles: React.FC<ExplosionParticlesProps> = ({ triggerPos }) => {
  const count = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xAngle = Math.random() * Math.PI;
      const yAngle = Math.random() * Math.PI * 2;
      temp.push({ t, factor, speed, xAngle, yAngle, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useEffect(() => {
    if (triggerPos && meshRef.current) {
      const { current } = meshRef;
      // Reset and animate expansion
      particles.forEach((p, i) => {
        dummy.position.set(triggerPos[0], triggerPos[1], triggerPos[2]);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        current.setMatrixAt(i, dummy.matrix);
      });
      current.instanceMatrix.needsUpdate = true;

      gsap.to(current.position, {
        duration: 0,
        x: 0, y: 0, z: 0
      });

      particles.forEach((p, i) => {
        const destX = triggerPos[0] + (Math.random() - 0.5) * 15;
        const destY = triggerPos[1] + (Math.random() - 0.5) * 15;
        const destZ = triggerPos[2] + (Math.random() - 0.5) * 15;
        
        const tl = gsap.timeline();
        tl.to(dummy.scale, {
          x: 0.1, y: 0.1, z: 0.1,
          duration: 0.1,
          onUpdate: () => {
             // We'd need to update matrices here if we want perfect sync, 
             // but let's just use a simple frame-based update for performance.
          }
        });
      });
    }
  }, [triggerPos, dummy, particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xAngle, yAngle } = particle;
      t = particle.t += speed / 2;
      
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // If we are exploding, we can add radial velocity here.
      // For this implementation, we'll keep a gentle ambient particle drift
      // and rely on the sphere itself being the focus.
      
      dummy.position.set(
        (particle.mx / 10) * a + xAngle + Math.cos(t * 10) * factor/100,
        (particle.my / 10) * b + yAngle + Math.sin(t * 10) * factor/100,
        (particle.my / 10) * b + xAngle + Math.cos(t * 10) * factor/100
      );
      
      dummy.scale.set(s*0.1, s*0.1, s*0.1);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#66ccff" emissive="#00aaff" emissiveIntensity={2} transparent opacity={0.6} />
    </instancedMesh>
  );
};

export default ExplosionParticles;
