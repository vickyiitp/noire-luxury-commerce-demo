'use client';

import React from 'react';
import { COLLECTIONS } from '@/lib/data/products';
import { Product } from '@/lib/types';
import { Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface CollectionCarouselProps {
  activeCollectionId: string;
  setActiveCollectionId: (id: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const CollectionCarousel: React.FC<CollectionCarouselProps> = ({
  activeCollectionId,
  setActiveCollectionId,
  products,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 pb-8 px-6 md:px-16 pointer-events-none">
      
      {/* Top Exhibition Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-t-2xl pointer-events-auto">
        
        <div className="flex items-center space-x-2 md:space-x-8 overflow-x-auto no-scrollbar py-1">
          {COLLECTIONS.map((col) => {
            const isActive = activeCollectionId === col.id;
            return (
              <button
                key={col.id}
                onClick={() => {
                  luxuryAudio.playCameraWhoosh();
                  setActiveCollectionId(col.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs tracking-[0.25em] uppercase font-light transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {col.label}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-neutral-400 text-xs tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Photographic Set Exhibition</span>
        </div>
      </div>

      {/* Product Cards Row for the Active Exhibition */}
      <div className="max-w-7xl mx-auto bg-black/80 backdrop-blur-2xl border-x border-b border-white/10 p-6 rounded-b-2xl pointer-events-auto shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                luxuryAudio.playShimmer();
                onSelectProduct(prod);
              }}
              className="group relative bg-neutral-900/60 border border-white/5 p-5 rounded-xl hover:border-amber-400/40 hover:bg-neutral-900/90 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Product Header Info */}
              <div>
                <div className="flex justify-between items-start text-[10px] tracking-widest text-neutral-400 uppercase">
                  <span>{prod.code}</span>
                  <span className="text-amber-300 font-serif text-sm">${prod.price.toLocaleString()}</span>
                </div>

                <h4 className="font-serif text-lg text-white group-hover:text-amber-200 transition-colors mt-2">
                  {prod.name}
                </h4>
                <p className="text-neutral-400 text-xs font-light line-clamp-1 mt-0.5">
                  {prod.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                <span className="text-amber-300/80 text-[10px] tracking-widest uppercase flex items-center gap-1 group-hover:text-amber-200">
                  <Eye className="w-3.5 h-3.5" />
                  Inspect 3D
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    luxuryAudio.playSoftClick();
                    onQuickAdd(prod);
                  }}
                  className="p-2 rounded-full bg-amber-400/10 hover:bg-amber-400/30 text-amber-300 transition-colors"
                  title="Add to Bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
