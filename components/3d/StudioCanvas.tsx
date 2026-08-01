'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Product, ProductVariant } from '@/lib/types';
import { WatchModel } from './procedural/WatchModel';
import { PerfumeModel } from './procedural/PerfumeModel';
import { HandbagModel } from './procedural/HandbagModel';
import { RingModel } from './procedural/RingModel';
import { SunglassesModel } from './procedural/SunglassesModel';

export type ViewMode = 'hero' | 'collection' | 'detail';
export type StudioLighting = 'obsidian' | 'nordic' | 'velvet';

interface StudioCanvasProps {
  viewMode: ViewMode;
  heroProduct: Product;
  selectedVariant: ProductVariant;
  activeDetailProduct: Product | null;
  detailVariant: ProductVariant | null;
  collectionProducts: Product[];
  activeCollectionId: string;
  explodedProgress?: number;
  studioLighting?: StudioLighting;
  pointerPos: { x: number; y: number };
  onSelectProduct: (product: Product) => void;
}

// Camera controller smoothly moving camera between Hero, Collection gallery, and Product detail mode
const CameraRig: React.FC<{
  viewMode: ViewMode;
  pointerPos: { x: number; y: number };
  activeCollectionId: string;
}> = ({ viewMode, pointerPos, activeCollectionId }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (viewMode === 'hero') {
      // Hero view: subtle pointer parallax
      targetPos.current.set(
        pointerPos.x * 0.8,
        pointerPos.y * 0.5,
        5.2
      );
      targetLook.current.set(0, 0, 0);
    } else if (viewMode === 'collection') {
      // Collection gallery view: offset camera based on active collection index
      const collectionIndex = activeCollectionId === 'NEW OBJECTS' ? 0 : activeCollectionId === 'ICONS' ? 1 : activeCollectionId === 'LIMITED' ? 2 : 3;
      targetPos.current.set(
        (collectionIndex - 1.5) * 4.5 + pointerPos.x * 0.4,
        0.5 + pointerPos.y * 0.3,
        6.5
      );
      targetLook.current.set((collectionIndex - 1.5) * 4.5, 0, 0);
    } else if (viewMode === 'detail') {
      // Detail view: focused close-up
      targetPos.current.set(pointerPos.x * 0.3, pointerPos.y * 0.2, 4.2);
      targetLook.current.set(0, 0, 0);
    }

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(targetLook.current);
  });

  return null;
};

// Render Product by its modelType
export const ProductMeshRenderer: React.FC<{
  product: Product;
  variant: ProductVariant;
  explodedProgress?: number;
  isRotating?: boolean;
}> = ({ product, variant, explodedProgress = 0, isRotating = true }) => {
  switch (product.modelType) {
    case 'watch':
      return <WatchModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
    case 'perfume':
      return <PerfumeModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
    case 'handbag':
      return <HandbagModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
    case 'ring':
      return <RingModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
    case 'sunglasses':
      return <SunglassesModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
    default:
      return <WatchModel variant={variant} explodedProgress={explodedProgress} isRotating={isRotating} />;
  }
};

export const StudioCanvas: React.FC<StudioCanvasProps> = ({
  viewMode,
  heroProduct,
  selectedVariant,
  activeDetailProduct,
  detailVariant,
  collectionProducts,
  activeCollectionId,
  explodedProgress = 0,
  studioLighting = 'obsidian',
  pointerPos,
  onSelectProduct,
}) => {
  const isDetailMode = viewMode === 'detail' && activeDetailProduct && detailVariant;

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', background: '#0a0a0c' }}
      >
        <CameraRig viewMode={viewMode} pointerPos={pointerPos} activeCollectionId={activeCollectionId} />

        {/* --- STUDIO LIGHTING PRESETS --- */}
        <ambientLight intensity={studioLighting === 'nordic' ? 0.6 : studioLighting === 'velvet' ? 0.2 : 0.35} />
        
        {/* Main Softbox Key Light */}
        <spotLight
          position={[5, 8, 6]}
          angle={0.6}
          penumbra={0.8}
          intensity={studioLighting === 'velvet' ? 3.5 : 2.5}
          color={studioLighting === 'velvet' ? '#ffe8cd' : '#f0e6d2'}
          castShadow
        />

        {/* Rim Cool Fill Light */}
        <pointLight
          position={[-6, 4, -3]}
          intensity={1.8}
          color={studioLighting === 'nordic' ? '#9ec5fe' : '#8fa8c0'}
        />

        {/* Bottom Gold Accent Up-light */}
        <pointLight
          position={[0, -4, 2]}
          intensity={1.2}
          color="#d4af37"
        />

        {/* Soft HDRI Environment */}
        <Environment preset="studio" />

        {/* --- HERO MODE: Floating Hero Object --- */}
        {viewMode === 'hero' && (
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group scale={heroProduct.modelScale || 1.2}>
              <ProductMeshRenderer
                product={heroProduct}
                variant={selectedVariant}
                isRotating={true}
              />
            </group>
          </Float>
        )}

        {/* --- DETAIL MODE: Single Active Product Viewer --- */}
        {isDetailMode && (
          <group scale={activeDetailProduct.modelScale || 1.2}>
            <ProductMeshRenderer
              product={activeDetailProduct}
              variant={detailVariant}
              explodedProgress={explodedProgress}
              isRotating={false}
            />
          </group>
        )}

        {/* --- COLLECTION MODE: 3D Gallery Pedestals --- */}
        {viewMode === 'collection' && (
          <group>
            {collectionProducts.map((prod, idx) => {
              const xPos = (idx - 1.5) * 4.5;
              const isSelected = activeDetailProduct?.id === prod.id;
              const defaultVar = prod.variants[0];

              return (
                <group
                  key={prod.id}
                  position={[xPos, -0.4, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(prod);
                  }}
                  onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = 'default';
                  }}
                >
                  {/* Pedestal Cylinder */}
                  <mesh position={[0, -1.2, 0]}>
                    <cylinderGeometry args={[1.2, 1.3, 1.4, 32]} />
                    <meshStandardMaterial
                      color="#141418"
                      roughness={0.2}
                      metalness={0.8}
                      envMapIntensity={2.0}
                    />
                  </mesh>

                  {/* Gold Pedestal Rim Ring */}
                  <mesh position={[0, -0.48, 0]}>
                    <torusGeometry args={[1.22, 0.03, 16, 32]} />
                    <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
                  </mesh>

                  {/* Product Object on Top */}
                  <group position={[0, 0.8, 0]} scale={prod.modelScale ? prod.modelScale * 0.85 : 1.0}>
                    <ProductMeshRenderer
                      product={prod}
                      variant={defaultVar}
                      isRotating={true}
                    />
                  </group>
                </group>
              );
            })}
          </group>
        )}

        {/* Contact Shadow Ground */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.7}
          scale={15}
          blur={2.5}
          far={4}
          color="#000000"
        />

        {/* Interactive Orbit Controls in Detail Mode */}
        {isDetailMode && (
          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={8}
            enablePan={false}
            rotateSpeed={0.8}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
          />
        )}
      </Canvas>
    </div>
  );
};
