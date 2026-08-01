'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductVariant } from '@/lib/types';

interface RingModelProps {
  variant: ProductVariant;
  explodedProgress?: number;
  isRotating?: boolean;
}

export const RingModel: React.FC<RingModelProps> = ({
  variant,
  explodedProgress = 0,
  isRotating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.35;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.15;
    }
  });

  const bandColor = new THREE.Color(variant.colorHex);

  const diamondY = 1.6 + explodedProgress * 1.2;

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- KNIFE-EDGE PLATINUM BAND --- */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.16, 32, 64]} />
        <meshStandardMaterial
          color={bandColor}
          roughness={variant.roughness}
          metalness={variant.metalness}
          envMapIntensity={3.0}
        />
      </mesh>

      {/* Micro-pave Diamond Accents on Band */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI) / 12 - Math.PI / 2;
        const radius = 1.3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.9}
              roughness={0.05}
              ior={2.42}
              reflectivity={1.0}
            />
          </mesh>
        );
      })}

      {/* Suspension Prongs Holding Gemstone */}
      <group position={[0, 1.2, 0]}>
        {[-0.45, 0.45].map((x, i) =>
          [-0.35, 0.35].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, 0.2, z]}>
              <cylinderGeometry args={[0.04, 0.05, 0.6, 16]} />
              <meshStandardMaterial color={bandColor} roughness={0.1} metalness={0.95} />
            </mesh>
          ))
        )}
      </group>

      {/* --- 4.5 CARAT EMERALD CUT BRILLIANT GEMSTONE (Y: diamondY) --- */}
      <mesh ref={gemRef} position={[0, diamondY, 0]}>
        <octahedronGeometry args={[0.9, 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.98}
          opacity={1.0}
          transparent={true}
          roughness={0.01}
          ior={2.42} // Natural Diamond Refractive Index
          reflectivity={1.0}
          thickness={0.8}
          dispersion={0.044}
          envMapIntensity={4.0}
        />
      </mesh>
    </group>
  );
};
