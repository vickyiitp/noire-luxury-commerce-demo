'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductVariant } from '@/lib/types';

interface HandbagModelProps {
  variant: ProductVariant;
  explodedProgress?: number;
  isRotating?: boolean;
}

export const HandbagModel: React.FC<HandbagModelProps> = ({
  variant,
  explodedProgress = 0,
  isRotating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (isRotating && groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.25;
    }
  });

  const lockZ = 0.85 + explodedProgress * 1.0;
  const handlesY = 1.6 + explodedProgress * 0.5;

  const leatherColor = new THREE.Color(variant.colorHex);

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- MAIN STRUCTURED TOTE BODY --- */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.2, 2.6, 1.6]} />
        <meshStandardMaterial
          color={leatherColor}
          roughness={variant.roughness}
          metalness={variant.metalness}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Front Flap / Envelope Fold */}
      <mesh position={[0, 0.4, 0.81]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[3.1, 1.3, 0.08]} />
        <meshStandardMaterial
          color={leatherColor}
          roughness={variant.roughness}
          metalness={variant.metalness}
        />
      </mesh>

      {/* Stitched Border Details */}
      {[-1.5, 1.5].map((x, idx) => (
        <mesh key={idx} position={[x, -0.2, 0]}>
          <boxGeometry args={[0.08, 2.62, 1.62]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
      ))}

      {/* --- THE OCULUS GOLD LOCK HARDWARE (Z: lockZ) --- */}
      <group position={[0, 0.2, lockZ]}>
        {/* Outer Elliptical Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.08, 16, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
        </mesh>
        {/* Inner Lock Cylinder & Keyhole */}
        <mesh position={[0, 0, -0.04]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.18, 0.04]} />
          <meshStandardMaterial color="#0c0c0e" roughness={0.8} />
        </mesh>
      </group>

      {/* --- ARCHED TOP HANDLES (Y: handlesY) --- */}
      <group position={[0, handlesY, 0]}>
        {/* Left & Right Curved Handles */}
        {[-0.9, 0.9].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.6, 0.12, 16, 32, Math.PI]} />
              <meshStandardMaterial color={leatherColor} roughness={variant.roughness} />
            </mesh>
            {/* Gold Handle Attachment Rings */}
            <mesh position={[-0.6, -0.1, 0]}>
              <torusGeometry args={[0.15, 0.04, 16, 16]} />
              <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh position={[0.6, -0.1, 0]}>
              <torusGeometry args={[0.15, 0.04, 16, 16]} />
              <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Bottom Metal Protective Feet */}
      {[
        [-1.3, -1.5, -0.6],
        [1.3, -1.5, -0.6],
        [-1.3, -1.5, 0.6],
        [1.3, -1.5, 0.6],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <coneGeometry args={[0.1, 0.12, 16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
        </mesh>
      ))}
    </group>
  );
};
