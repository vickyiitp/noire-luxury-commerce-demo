'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { X, ShieldCheck, QrCode, Crown, Truck, PackageCheck, Award } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface ClientAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const ClientAccountModal: React.FC<ClientAccountModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-amber-400/30 rounded-2xl p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-amber-300 text-[10px] tracking-[0.3em] uppercase block">
                VIP OBSIDIAN TIER CLIENT
              </span>
              <h2 className="font-serif text-2xl font-light text-white">
                Client Portal & Authenticity Vault
              </h2>
            </div>
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

        {/* Client Status Badge */}
        <div className="my-6 p-4 bg-gradient-to-r from-amber-400/10 via-neutral-900 to-black border border-amber-400/20 rounded-xl flex justify-between items-center text-xs">
          <div>
            <p className="text-amber-300 font-serif text-lg">Lord Harrison Sterling</p>
            <p className="text-neutral-400 font-mono text-[11px]">Vault ID: NA-VIP-889021</p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-amber-400/20 border border-amber-400 text-amber-300 rounded-full text-[10px] tracking-widest uppercase">
              Private Concierge Assigned
            </span>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
            <PackageCheck className="w-4 h-4" />
            Acquisition History ({orders.length})
          </h3>

          {orders.length === 0 ? (
            <div className="p-8 bg-neutral-900 border border-white/5 rounded-xl text-center text-neutral-500 text-xs">
              No registered acquisitions yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 bg-neutral-900 border border-white/10 rounded-xl space-y-3"
              >
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="text-amber-300 font-mono font-medium">{order.id}</span>
                    <p className="text-neutral-400 text-[11px] mt-0.5">{order.date}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-200 rounded text-[10px] uppercase">
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-neutral-300 space-y-1">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{it.quantity}x {it.product.name} ({it.selectedVariant.name})</span>
                      <span className="font-mono text-amber-300">${(it.product.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Award className="w-3.5 h-3.5" />
                    {order.certificateToken}
                  </span>
                  <span>Courier: {order.deliveryMethod}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
