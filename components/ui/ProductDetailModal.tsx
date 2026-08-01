'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { X, Rotate3d, Layers, Sun, ShieldCheck, Truck, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { StudioLighting } from '../3d/StudioCanvas';
import { luxuryAudio } from '@/lib/audio';

interface ProductDetailModalProps {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: (variant: ProductVariant) => void;
  explodedProgress: number;
  setExplodedProgress: (val: number) => void;
  studioLighting: StudioLighting;
  setStudioLighting: (lighting: StudioLighting) => void;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, embossingText?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedVariant,
  setSelectedVariant,
  explodedProgress,
  setExplodedProgress,
  studioLighting,
  setStudioLighting,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [embossingText, setEmbossingText] = useState('');
  const [activeTab, setActiveTab] = useState<'craft' | 'specs' | 'provenance'>('craft');

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      
      {/* Semi-transparent backdrop shadow */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
      />

      {/* Right Slide-out Inspection Drawer */}
      <div className="relative w-full md:w-[540px] h-full bg-neutral-950/95 border-l border-white/10 p-8 overflow-y-auto pointer-events-auto shadow-2xl flex flex-col justify-between text-white">
        
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div>
              <span className="text-amber-300 text-[10px] tracking-[0.3em] uppercase block">
                {product.code} — {product.frenchName}
              </span>
              <h2 className="font-serif text-3xl font-light text-white mt-1">
                {product.name}
              </h2>
            </div>
            <button
              onClick={() => {
                luxuryAudio.playSoftClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D CONTROLS BAR */}
          <div className="my-6 p-4 bg-neutral-900/80 border border-white/10 rounded-xl space-y-4">
            <div className="flex items-center justify-between text-xs tracking-widest text-neutral-400 uppercase">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Rotate3d className="w-4 h-4" />
                3D Inspection Tools
              </span>
              <span>Interactive View</span>
            </div>

            {/* Material Exploded View Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  Material Exploded Geometry:
                </span>
                <span className="text-amber-300 font-mono">{Math.round(explodedProgress * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={explodedProgress}
                onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Studio Lighting Switcher */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400">
              <span className="flex items-center gap-1 text-[11px]">
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                Studio Ambient:
              </span>
              <div className="flex gap-2">
                {(['obsidian', 'nordic', 'velvet'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      luxuryAudio.playSoftClick();
                      setStudioLighting(mode);
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider ${
                      studioLighting === mode
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'bg-black/40 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VARIANT SELECTOR */}
          <div className="my-6">
            <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-3">
              Selected Material & Finish:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      luxuryAudio.playShimmer();
                      setSelectedVariant(v);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'border-white/10 bg-black/40 hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
                      style={{ backgroundColor: v.previewColor }}
                    />
                    <div>
                      <p className="text-xs font-medium text-white">{v.name}</p>
                      <p className="text-[10px] text-neutral-400 font-light">{v.materialName}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BESPOKE EMBOSSING MONOGRAM OPTION */}
          <div className="my-6 p-4 bg-black/40 border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-200 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Complimentary Atelier Monogramming</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-light">
              Add custom embossed initials on gold or leather (Up to 4 letters):
            </p>
            <input
              type="text"
              maxLength={4}
              placeholder="e.g. N.A."
              value={embossingText}
              onChange={(e) => setEmbossingText(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-xs text-amber-300 tracking-widest font-mono uppercase focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* TABS FOR CRAFTSMANSHIP & SPECS */}
          <div className="my-6 border-b border-white/10 flex space-x-6 text-xs tracking-widest uppercase">
            <button
              onClick={() => setActiveTab('craft')}
              className={`pb-2 transition-colors ${
                activeTab === 'craft' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-neutral-400'
              }`}
            >
              Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 transition-colors ${
                activeTab === 'specs' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-neutral-400'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('provenance')}
              className={`pb-2 transition-colors ${
                activeTab === 'provenance' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-neutral-400'
              }`}
            >
              Provenance
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="text-xs text-neutral-300 leading-relaxed space-y-3 font-light mb-8">
            {activeTab === 'craft' && (
              <>
                <p>{product.craftsmanship}</p>
                <div className="pt-2">
                  <span className="text-amber-300/90 font-medium block mb-1">Key Atelier Notes:</span>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Dimensions:</span>
                  <span className="text-white font-mono">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Weight:</span>
                  <span className="text-white font-mono">{product.weight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Origin:</span>
                  <span className="text-white font-mono">{product.origin}</span>
                </div>
              </div>
            )}

            {activeTab === 'provenance' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guaranteed Digital Certificate of Authenticity</span>
                </div>
                <p className="text-neutral-400">
                  Every NOIRÉ piece is registered with a unique cryptographic provenance token laser-engraved onto the piece and stored in the private client vault.
                </p>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Truck className="w-4 h-4 text-amber-300" />
                  <span>Insured Armored Freight or White-Glove Hand Delivery</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase block">
                Atelier Price
              </span>
              <span className="font-serif text-3xl text-amber-300 font-light">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => {
                luxuryAudio.playSoftClick();
                onToggleWishlist(product);
              }}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-neutral-300 hover:text-rose-400"
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>

          <button
            onClick={() => {
              luxuryAudio.playShimmer();
              onAddToCart(product, selectedVariant, embossingText);
            }}
            className="w-full py-4 bg-amber-400 text-black font-semibold uppercase tracking-[0.2em] rounded-xl hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Acquire Object — ${product.price.toLocaleString()}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
