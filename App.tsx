
import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [explosionPos, setExplosionPos] = useState<[number, number, number] | null>(null);

  const handleCanvasClick = useCallback((e: any) => {
    // Basic screen to world roughly
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    // We trigger the explosion at the center mostly or based on click
    setExplosionPos([x * 5, y * 5, 0]);
    
    // Clear after a moment
    setTimeout(() => setExplosionPos(null), 100);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: false, stencil: false }}
          onClick={handleCanvasClick}
        >
          <color attach="background" args={['#020205']} />
          <Experience triggerExplosion={explosionPos} />
        </Canvas>
      </Suspense>

      <Overlay />
      <Loader />
      
      {/* Bottom Gradient for depth */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default App;
