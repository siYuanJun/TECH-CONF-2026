
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { simplexNoise3D } from '../shaders/noise';

const LiquidSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom uniforms for the displacement
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uNoiseDensity: { value: 0.35 },
    uNoiseStrength: { value: 0.15 },
  }), []);

  // Use onBeforeCompile to inject our vertex displacement into the MeshTransmissionMaterial
  const onBeforeCompile = (shader: THREE.Shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uNoiseDensity = uniforms.uNoiseDensity;
    shader.uniforms.uNoiseStrength = uniforms.uNoiseStrength;

    shader.vertexShader = `
      uniform float uTime;
      uniform float uNoiseDensity;
      uniform float uNoiseStrength;
      ${simplexNoise3D}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float displacement = snoise(vec3(position.xyz * uNoiseDensity + uTime * 0.2)) * uNoiseStrength;
      transformed += normal * displacement;
      `
    );
  };

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 128]} />
      {/* MeshTransmissionMaterial is an advanced version of MeshPhysicalMaterial 
          with easy dispersion and transmission props */}
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={2}
        chromaticAberration={0.1}
        anisotropy={0.3}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        transmission={1}
        roughness={0.05}
        color="#ffffff"
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
};

export default LiquidSphere;
