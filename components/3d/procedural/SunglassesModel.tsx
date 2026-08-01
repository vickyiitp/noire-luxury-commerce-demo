'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductVariant } from '@/lib/types';

interface SunglassesModelProps {
  variant: ProductVariant;
  explodedProgress?: number;
  isRotating?: boolean;
}

export const SunglassesModel: React.FC<SunglassesModelProps> = ({
  variant,
  explodedProgress = 0,
  isRotating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (isRotating && groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.3;
    }
  });

  const titaniumColor = new THREE.Color(variant.colorHex);
  const lensZ = explodedProgress * 0.8;

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- TITANIUM DOUBLE BRIDGE FRAME --- */}
      {/* Top Bar */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[3.2, 0.08, 0.08]} />
        <meshStandardMaterial color={titaniumColor} roughness={variant.roughness} metalness={variant.metalness} />
      </mesh>
      {/* Nose Bridge */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.25, 0.04, 16, 16, Math.PI]} />
        <meshStandardMaterial color={titaniumColor} roughness={variant.roughness} metalness={variant.metalness} />
      </mesh>

      {/* Lens Rims & Lenses (Left & Right) */}
      {[-1.0, 1.0].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          {/* Rim Wire */}
          <mesh>
            <torusGeometry args={[0.7, 0.04, 16, 32]} />
            <meshStandardMaterial color={titaniumColor} roughness={variant.roughness} metalness={variant.metalness} />
          </mesh>

          {/* ZEISS Dark Gradient Mineral Glass Lens */}
          <mesh position={[0, 0, lensZ]}>
            <cylinderGeometry args={[0.66, 0.66, 0.04, 32]} />
            <meshPhysicalMaterial
              color="#1a1c23"
              transmission={0.3}
              opacity={0.88}
              transparent={true}
              roughness={0.05}
              ior={1.6}
              reflectivity={0.95}
              envMapIntensity={3.0}
            />
          </mesh>
        </group>
      ))}

      {/* Side Temples (Arms) */}
      {[-1.7, 1.7].map((x, idx) => (
        <group key={idx} position={[x, 0, -1.1]} rotation={[0, idx === 0 ? 0.15 : -0.15, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.1, 2.2]} />
            <meshStandardMaterial color={titaniumColor} roughness={variant.roughness} metalness={variant.metalness} />
          </mesh>
          {/* Acetate Ear Tips */}
          <mesh position={[0, -0.05, -1.0]}>
            <boxGeometry args={[0.08, 0.12, 0.5]} />
            <meshStandardMaterial color="#0c0c0e" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
