'use client';

import React from 'react';
import { ArrowDownRight, Compass } from 'lucide-react';
import { Product } from '@/lib/types';
import { luxuryAudio } from '@/lib/audio';

interface EditorialHeroOverlayProps {
  heroProduct: Product;
  onEnterCollection: () => void;
  onInspectHero: () => void;
}

export const EditorialHeroOverlay: React.FC<EditorialHeroOverlayProps> = ({
  heroProduct,
  onEnterCollection,
  onInspectHero,
}) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      
      {/* Background Editorial Watermark Typography (Passes BEHIND 3D Canvas feel) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.06] blur-[0.5px]">
        <span className="font-serif text-[18vw] leading-none tracking-tighter text-white font-extralight uppercase block">
          NOIRÉ
        </span>
      </div>

      {/* Top Editorial Subtext */}
      <div className="flex justify-between items-start text-neutral-400 text-xs tracking-[0.3em] uppercase pt-16">
        <div>
          <p className="text-amber-300/90 font-medium">AUTUMN / WINTER 2026</p>
          <p className="text-neutral-500 text-[10px] tracking-[0.2em] mt-0.5">DEVIL LABS CONCEPT DEMO</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-neutral-300 font-serif lowercase italic text-sm">haute horlogerie & joaillerie</p>
          <p className="text-neutral-500 text-[10px] tracking-[0.2em]">48.8674° N, 2.3294° E — PLACE VENDÔME</p>
        </div>
      </div>

      {/* Center Title & Hero Product Teaser */}
      <div className="my-auto max-w-2xl">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-200 text-[10px] tracking-[0.3em] uppercase rounded-full">
            Featured Masterpiece
          </span>
          <h2 className="font-serif text-5xl md:text-7xl font-extralight text-white tracking-tight leading-[0.95]">
            NOIRÉ
          </h2>
          <p className="font-serif text-xl md:text-3xl text-neutral-300 font-light italic tracking-wider">
            Objects of Desire.
          </p>
        </div>

        {/* Product Quick Teaser Box */}
        <div className="mt-8 p-6 bg-black/40 backdrop-blur-md border-l-2 border-amber-400/80 max-w-md pointer-events-auto transition-all hover:bg-black/60">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
              {heroProduct.code}
            </span>
            <span className="text-amber-300 font-serif text-lg font-light">
              ${heroProduct.price.toLocaleString()}
            </span>
          </div>
          <h3 className="text-white font-serif text-xl mt-1">{heroProduct.name}</h3>
          <p className="text-neutral-400 text-xs font-light line-clamp-2 mt-1 leading-relaxed">
            {heroProduct.subtitle}
          </p>

          <button
            onClick={() => {
              luxuryAudio.playShimmer();
              onInspectHero();
            }}
            className="mt-4 text-xs tracking-[0.25em] text-amber-200 uppercase flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span>Inspect 3D Geometry</span>
            <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform text-amber-400" />
          </button>
        </div>
      </div>

      {/* Bottom Compositional CTA - NOT a rectangular button, but architectural text framing */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-8 border-t border-white/10 pointer-events-auto">
        
        {/* Left Coordinates & Atelier Details */}
        <div className="flex items-center gap-3 text-neutral-400 text-[11px] font-light tracking-widest">
          <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>SWITZERLAND / FRANCE / JAPAN</span>
        </div>

        {/* Compositional CTA: ENTER COLLECTION */}
        <button
          onClick={() => {
            luxuryAudio.playCameraWhoosh();
            onEnterCollection();
          }}
          className="group relative flex items-center gap-6 px-8 py-5 border-l border-t border-amber-300/40 bg-gradient-to-br from-amber-400/10 via-transparent to-black/60 backdrop-blur-md hover:border-amber-300 transition-all duration-500 text-left"
        >
          <div className="space-y-1">
            <p className="text-[10px] tracking-[0.35em] text-amber-300 uppercase font-light">
              01 — 04 EXHIBITIONS
            </p>
            <p className="font-serif text-2xl md:text-3xl text-white tracking-[0.2em] font-normal group-hover:text-amber-200 transition-colors">
              ENTER COLLECTION
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center group-hover:border-amber-300 group-hover:scale-110 transition-all bg-amber-400/10">
            <ArrowDownRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </div>
        </button>

      </div>
    </div>
  );
};
