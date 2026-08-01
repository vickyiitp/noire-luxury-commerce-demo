'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { X, Trash2, ShoppingBag, Share2 } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const handleShareWishlist = () => {
    luxuryAudio.playSoftClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Atelier Wishlist link copied to clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Drawer */}
      <div className="relative w-full md:w-[480px] h-full bg-neutral-950 border-l border-white/10 p-8 flex flex-col justify-between shadow-2xl text-white">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div>
              <span className="text-amber-300 text-[10px] tracking-[0.3em] uppercase block">
                Saved Atelier Curation
              </span>
              <h3 className="font-serif text-2xl font-light text-white">
                Client Wishlist ({wishlistProducts.length})
              </h3>
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

          {/* List */}
          <div className="my-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 space-y-2">
                <p className="text-sm uppercase tracking-widest font-light">
                  No Saved Objects
                </p>
                <p className="text-xs text-neutral-600">
                  Select the heart icon on any masterpiece to save to your personal curation.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-neutral-900 border border-white/10 rounded-xl flex justify-between items-center gap-4"
                >
                  <div>
                    <span className="text-[10px] text-amber-300 tracking-widest uppercase">{p.code}</span>
                    <h4 className="font-serif text-lg text-white">{p.name}</h4>
                    <p className="text-amber-300 font-serif text-sm">${p.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        luxuryAudio.playShimmer();
                        onAddToCart(p);
                      }}
                      className="p-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        luxuryAudio.playSoftClick();
                        onRemoveFromWishlist(p);
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Share Button */}
        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleShareWishlist}
              className="w-full py-3 bg-neutral-900 border border-white/10 rounded-xl text-xs uppercase tracking-widest text-amber-200 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Curation Link</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
