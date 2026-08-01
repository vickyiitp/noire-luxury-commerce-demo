'use client';

import React, { useState } from 'react';
import { CartItem, Order } from '@/lib/types';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, QrCode, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { luxuryAudio } from '@/lib/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('Lord Harrison Sterling');
  const [email, setEmail] = useState('h.sterling@atelier-private.com');
  const [address, setAddress] = useState('14 Place Vendôme');
  const [city, setCity] = useState('Paris');
  const [country, setCountry] = useState('France');
  const [deliveryMethod, setDeliveryMethod] = useState<'Concierge Courier' | 'Armored Vault Express' | 'White-Glove Hand Delivery'>('White-Glove Hand Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'Amex Centurion' | 'Private Wire' | 'Crypto' | 'Apple Pay'>('Amex Centurion');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e5c158', '#ffffff', '#222222'],
      });
    } catch {
      // Ignore
    }
  };

  const handleSubmitOrder = () => {
    luxuryAudio.playShimmer();
    triggerCelebration();

    const orderId = 'NOIRE-882049';
    const orderDate = 'October 24, 2026';
    const certificateToken = 'CERT-PROVENANCE-VENDOME-99';

    const newOrder: Order = {
      id: orderId,
      date: orderDate,
      items: [...cartItems],
      totalAmount,
      shippingAddress: {
        fullName,
        email,
        address,
        city,
        country,
      },
      deliveryMethod,
      certificateToken,
      status: 'In Atelier Assembly',
    };

    setCompletedOrder(newOrder);
    onOrderComplete(newOrder);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-amber-400/30 rounded-2xl p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-white/10">
          <div>
            <span className="text-amber-300 text-[10px] tracking-[0.3em] uppercase block">
              Private Client Acquisition
            </span>
            <h2 className="font-serif text-3xl font-light text-white mt-1">
              {step === 3 ? 'Acquisition Confirmed' : 'Checkout & Provenance'}
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

        {/* STEP 1: DELIVERY & CLIENT INFO */}
        {step === 1 && (
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                1. Private Delivery Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Full Client Name:</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Confidential Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-neutral-400 block mb-1">Residence / Private Vault Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">City:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Country:</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method Selector */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-xs text-neutral-400 uppercase tracking-widest block">
                Armored Courier Transport:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  'White-Glove Hand Delivery',
                  'Armored Vault Express',
                  'Concierge Courier',
                ].map((method) => (
                  <button
                    key={method}
                    onClick={() => setDeliveryMethod(method as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryMethod === method
                        ? 'border-amber-400 bg-amber-400/10 text-amber-200'
                        : 'border-white/10 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <p className="font-medium text-white">{method}</p>
                    <p className="text-[10px] text-amber-300 mt-1">Complimentary</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                luxuryAudio.playSoftClick();
                setStep(2);
              }}
              className="w-full py-4 bg-amber-400 text-black font-semibold uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                2. Encrypted Payment Vault
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {['Amex Centurion', 'Private Wire', 'Crypto', 'Apple Pay'].map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPaymentMethod(pm as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === pm
                        ? 'border-amber-400 bg-amber-400/10 text-amber-200'
                        : 'border-white/10 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <p className="font-medium text-white">{pm}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Encrypted 256-bit SSL</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Acquisition Value:</span>
                <span className="text-white font-mono">${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Provenance Tax & Customs:</span>
                <span className="text-amber-300 font-mono">Included</span>
              </div>
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-white/10">
                <span>Total Payment:</span>
                <span className="text-amber-300 font-serif">${totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-4 bg-neutral-900 border border-white/10 text-white font-semibold uppercase tracking-widest rounded-xl hover:bg-neutral-800"
              >
                Back
              </button>
              <button
                onClick={handleSubmitOrder}
                className="w-2/3 py-4 bg-amber-400 text-black font-semibold uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Seal Acquisition</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & DIGITAL CERTIFICATE OF AUTHENTICITY */}
        {step === 3 && completedOrder && (
          <div className="py-6 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs text-amber-300 uppercase tracking-[0.3em]">
                Order Reference: {completedOrder.id}
              </p>
              <h3 className="font-serif text-3xl font-light text-white mt-1">
                Your Atelier Acquisition is Registered
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-2 max-w-md mx-auto">
                Thank you, {completedOrder.shippingAddress.fullName}. Your pieces are now entering final hand-assembly and wax-seal packaging at our Paris Atelier.
              </p>
            </div>

            {/* Generated Luxury Certificate of Authenticity */}
            <div className="p-6 bg-gradient-to-br from-amber-400/10 via-black to-neutral-950 border border-amber-400/40 rounded-xl text-left space-y-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-amber-300 block">
                    CERTIFICATE OF AUTHENTICITY & PROVENANCE
                  </span>
                  <h4 className="font-serif text-xl text-white">NOIRÉ ATELIER PARIS</h4>
                </div>
                <QrCode className="w-10 h-10 text-amber-300" />
              </div>

              <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                <p>Provenance Token: <span className="text-amber-300">{completedOrder.certificateToken}</span></p>
                <p>Client Vault: <span className="text-white">{completedOrder.shippingAddress.email}</span></p>
                <p>Courier: <span className="text-white">{completedOrder.deliveryMethod}</span></p>
              </div>

              <div className="pt-2 border-t border-amber-400/20 flex justify-between items-center text-[10px] text-neutral-400">
                <span>SEALED BY MASTER ARTISAN</span>
                <span className="text-amber-300 font-serif italic">Place Vendôme Vault</span>
              </div>
            </div>

            <button
              onClick={() => {
                luxuryAudio.playSoftClick();
                onClose();
              }}
              className="w-full py-4 bg-amber-400 text-black font-semibold uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all"
            >
              Return to Exhibition
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
