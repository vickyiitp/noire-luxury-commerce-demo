'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductVariant } from '@/lib/types';

interface WatchModelProps {
  variant: ProductVariant;
  explodedProgress?: number; // 0 (assembled) to 1 (fully exploded)
  isRotating?: boolean;
}

export const WatchModel: React.FC<WatchModelProps> = ({
  variant,
  explodedProgress = 0,
  isRotating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const tourbillonRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Mesh>(null);
  const minuteHandRef = useRef<THREE.Mesh>(null);
  const hourHandRef = useRef<THREE.Mesh>(null);

  // Material settings from variant
  const metalColor = new THREE.Color(variant.colorHex);
  const roughness = variant.roughness;
  const metalness = variant.metalness;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.25;
    }

    // Flying tourbillon cage spin
    if (tourbillonRef.current) {
      tourbillonRef.current.rotation.z = t * 3.0;
    }

    // Hands movement
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -t * 1.5;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -t * 0.05;
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -t * 0.005 - 0.8;
    }
  });

  // Exploded spacing offsets
  const glassZ = 0.55 + explodedProgress * 1.2;
  const bezelZ = 0.45 + explodedProgress * 0.7;
  const dialZ = 0.35 + explodedProgress * 0.2;
  const movementZ = 0.0 - explodedProgress * 0.5;
  const casebackZ = -0.4 - explodedProgress * 1.0;

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- WATCH CASE (MAIN BODY) --- */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.7, 64]} />
        <meshStandardMaterial
          color={metalColor}
          roughness={roughness}
          metalness={metalness}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Outer Crown Knob */}
      <mesh position={[2.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial
          color={metalColor}
          roughness={roughness * 0.8}
          metalness={metalness}
        />
      </mesh>

      {/* Lugs Top & Bottom */}
      {[-2.2, 2.2].map((y, idx) => (
        <group key={idx} position={[0, y, -0.1]}>
          <mesh position={[-1.3, 0, 0]}>
            <boxGeometry args={[0.35, 0.9, 0.6]} />
            <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[1.3, 0, 0]}>
            <boxGeometry args={[0.35, 0.9, 0.6]} />
            <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      ))}

      {/* Strap (Leather / Alligator Texture) */}
      {[-3.2, 3.2].map((y, idx) => (
        <mesh key={idx} position={[0, y, -0.2]}>
          <boxGeometry args={[2.1, 1.8, 0.25]} />
          <meshStandardMaterial
            color="#141416"
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* --- BEZEL (Z: bezelZ) --- */}
      <mesh position={[0, 0, bezelZ]}>
        <torusGeometry args={[1.9, 0.18, 16, 64]} />
        <meshStandardMaterial
          color={metalColor}
          roughness={roughness * 0.6}
          metalness={metalness}
        />
      </mesh>

      {/* --- DIAL FACE (Z: dialZ) --- */}
      <group position={[0, 0, dialZ]}>
        {/* Main Dial Plate */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.85, 1.85, 0.05, 64]} />
          <meshStandardMaterial
            color="#0d0d10"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Dial Hour Indices (Gold / Polished) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const radius = 1.6;
          const x = Math.sin(angle) * radius;
          const y = Math.cos(angle) * radius;
          return (
            <mesh key={i} position={[x, y, 0.04]} rotation={[0, 0, -angle]}>
              <boxGeometry args={[0.06, 0.22, 0.04]} />
              <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
            </mesh>
          );
        })}

        {/* Flying Tourbillon Aperture at 6 o'clock (y: -0.8) */}
        <group position={[0, -0.75, 0.04]}>
          {/* Circular Cutout Ring */}
          <mesh>
            <torusGeometry args={[0.55, 0.04, 16, 32]} />
            <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={0.9} />
          </mesh>

          {/* Rotating Tourbillon Cage */}
          <group ref={tourbillonRef}>
            <mesh>
              <boxGeometry args={[0.9, 0.08, 0.03]} />
              <meshStandardMaterial color="#e5c158" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.9, 0.08, 0.03]} />
              <meshStandardMaterial color="#e5c158" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.04]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#a81c1c" roughness={0.1} metalness={0.2} /> {/* Synthetic Ruby */}
            </mesh>
          </group>
        </group>

        {/* Hands (Hour, Minute, Second) */}
        <group position={[0, 0, 0.08]}>
          {/* Hour Hand */}
          <mesh ref={hourHandRef} position={[0, 0, 0.02]} rotation={[0, 0, -0.8]}>
            <boxGeometry args={[0.08, 0.9, 0.03]} />
            <meshStandardMaterial color="#f5e6c4" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Minute Hand */}
          <mesh ref={minuteHandRef} position={[0, 0, 0.04]} rotation={[0, 0, -2.1]}>
            <boxGeometry args={[0.06, 1.4, 0.03]} />
            <meshStandardMaterial color="#f5e6c4" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Second Hand */}
          <mesh ref={secondHandRef} position={[0, 0, 0.06]}>
            <boxGeometry args={[0.02, 1.6, 0.02]} />
            <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={1.0} />
          </mesh>

          {/* Center Pin Cap */}
          <mesh position={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* --- MOVEMENT / MECHANISM BACK (Z: movementZ) --- */}
      <mesh position={[0, 0, movementZ]}>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#222226" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* --- SAPPHIRE GLASS (Z: glassZ) --- */}
      <mesh position={[0, 0, glassZ]}>
        <cylinderGeometry args={[1.9, 1.9, 0.08, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={1}
          transparent={true}
          roughness={0.02}
          ior={1.77} // Sapphire Crystal IOR
          reflectivity={0.9}
          thickness={0.2}
        />
      </mesh>

      {/* --- CASEBACK (Z: casebackZ) --- */}
      <mesh position={[0, 0, casebackZ]}>
        <cylinderGeometry args={[1.95, 1.95, 0.1, 64]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>
    </group>
  );
};
