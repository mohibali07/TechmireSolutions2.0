"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Prism from "./Prism";
import FloatingParticles from "./FloatingParticles";

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]} // Optimization for varying screens
        >
            <Suspense fallback={null}>
                {/* Lighting - Studio Setup */}
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={5} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#EF6524" />

                {/* Environment Map for Reflections - Clean Studio */}
                <Environment preset="studio" />

                {/* 3D Content - Centered for Card */}
                <group position={[0, 0, 0]}>
                   <Prism />
                </group>
                <FloatingParticles />
                
                 {/* Mouse Interaction - Limited Orbit */}
                 <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2 + 0.2}
                    minPolarAngle={Math.PI / 2 - 0.2}
                 />
            </Suspense>
        </Canvas>
    </div>
  );
}
