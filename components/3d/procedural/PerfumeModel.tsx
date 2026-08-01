'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductVariant } from '@/lib/types';

interface PerfumeModelProps {
  variant: ProductVariant;
  explodedProgress?: number;
  isRotating?: boolean;
}

export const PerfumeModel: React.FC<PerfumeModelProps> = ({
  variant,
  explodedProgress = 0,
  isRotating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (isRotating && groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    }
  });

  const capY = 2.4 + explodedProgress * 1.5;
  const collarY = 1.7 + explodedProgress * 0.6;
  const liquidY = -0.1;

  const glassColor = variant.id === 'v-clear-crystal' ? '#ffffff' : '#1a120b';

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- HEAVY CRYSTAL BOTTLE BODY --- */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 3.2, 1.4]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={variant.id === 'v-clear-crystal' ? 0.92 : 0.45}
          roughness={variant.roughness}
          metalness={variant.metalness}
          ior={1.52}
          thickness={0.8}
          transparent={true}
          opacity={0.9}
          reflectivity={0.9}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Internal Liquid Core (Amber/Oud Extract) */}
      <mesh position={[0, liquidY, 0]}>
        <boxGeometry args={[1.8, 2.5, 1.0]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.1}
          metalness={0.2}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Engraved Atelier Gold Plaque */}
      <mesh position={[0, 0.1, 0.72]}>
        <planeGeometry args={[1.4, 1.2]} />
        <meshStandardMaterial
          color="#c59b27"
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* --- SPRAY COLLAR & NOZZLE (Y: collarY) --- */}
      <group position={[0, collarY, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.6, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
          <meshStandardMaterial color="#111113" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* --- MAGNETIC CAP (Y: capY) --- */}
      <mesh position={[0, capY, 0]}>
        <boxGeometry args={[1.3, 1.2, 1.3]} />
        <meshStandardMaterial
          color="#0f0f11"
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={2.0}
        />
      </mesh>
      {/* Gold Ring around Cap */}
      <mesh position={[0, capY - 0.5, 0]}>
        <boxGeometry args={[1.32, 0.1, 1.32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  );
};
