"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function generateParticles(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Random usage of spherical coordinates for better distribution
        const r = 4 + Math.random() * 6; // Radius between 4 and 10
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

export default function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  // Reduced particle count for better performance & minimalism
  const sphere = generateParticles(50);

  useFrame((state, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.x -= delta / 15;
        pointsRef.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#EF6524"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}
