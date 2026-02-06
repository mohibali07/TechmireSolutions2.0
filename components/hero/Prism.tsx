"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Prism() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float floatIntensity={2} speed={2} rotationIntensity={1}>
        <mesh ref={meshRef} scale={1.2}>
            {/* Geometric Prism Shape - Octahedron looks more "tech" */}
            <octahedronGeometry args={[1, 0]} />
            
            {/* Advanced Glass Material - Optimized */}
            <MeshTransmissionMaterial
                backside
                samples={6}           // Reduced from 16 for performance
                resolution={512}      // Lower resolution buffer
                thickness={0.3}
                roughness={0}
                chromaticAberration={0.6}
                anisotropy={0.3}
                distortion={0.3}
                distortionScale={0.5}
                temporalDistortion={0.1}
                ior={1.4}
                color="#ffffff"
                attenuationDistance={0.5}
                attenuationColor="#EF6524"
            />
        </mesh>
    </Float>
  );
}
