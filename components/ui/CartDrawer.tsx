'use client';

import React from 'react';
import { CartItem } from '@/lib/types';
import { X, Trash2, ShieldCheck, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-light">Atelier Selection</span>
              <span className="text-xs text-amber-300 font-mono">({cartItems.length} Objects)</span>
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

          {/* Cart Items List */}
          <div className="my-6 space-y-6 max-h-[55vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 space-y-3">
                <Sparkles className="w-8 h-8 text-amber-400/40 mx-auto" />
                <p className="text-sm font-light uppercase tracking-widest">
                  Your Atelier Selection is Empty
                </p>
                <p className="text-xs text-neutral-600">
                  Explore our exhibitions to discover objects of desire.
                </p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-neutral-900/80 border border-white/10 rounded-xl space-y-3 relative group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-amber-300 tracking-widest uppercase">
                        {item.product.code}
                      </span>
                      <h4 className="font-serif text-lg text-white">{item.product.name}</h4>
                      <p className="text-xs text-neutral-400 font-light">
                        Finish: {item.selectedVariant.name}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        luxuryAudio.playSoftClick();
                        onRemoveItem(idx);
                      }}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Remove Object"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.embossingText && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20 inline-block font-mono">
                      Embossed Monogram: &quot;{item.embossingText}&quot;
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <div className="flex items-center space-x-3 text-xs bg-black/40 border border-white/10 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="text-neutral-400 hover:text-white px-1"
                      >
                        -
                      </button>
                      <span className="text-white font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="text-neutral-400 hover:text-white px-1"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-lg text-amber-300 font-light">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-amber-300 text-[11px] uppercase tracking-widest">
                <Gift className="w-3.5 h-3.5" />
                <span>Complimentary Bespoke Packaging</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-light">
                Includes black lacquer box, wax-sealed authenticity letter, and silk traveling vault.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-mono">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Armored Express Freight:</span>
                <span className="text-amber-300 uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-base text-white pt-2 border-t border-white/10 font-serif font-light">
                <span>Total Amount:</span>
                <span className="text-amber-300 font-serif">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                luxuryAudio.playCameraWhoosh();
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-amber-400 text-black font-semibold uppercase tracking-[0.2em] rounded-xl hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
            >
              <span>Initiate Private Acquisition</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
