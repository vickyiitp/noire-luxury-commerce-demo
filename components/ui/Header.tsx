'use client';

import React from 'react';
import { Volume2, VolumeX, ShoppingBag, Heart, Sparkles, User, Search } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface HeaderProps {
  activeTab: 'hero' | 'collection' | 'catalog';
  setActiveTab: (tab: 'hero' | 'collection' | 'catalog') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenConcierge: () => void;
  onOpenAccount: () => void;
  isAudioOn: boolean;
  setIsAudioOn: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenConcierge,
  onOpenAccount,
  isAudioOn,
  setIsAudioOn,
}) => {
  const toggleAudio = () => {
    const newState = luxuryAudio.toggle();
    setIsAudioOn(newState);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.25em] uppercase font-light text-neutral-300">
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              setActiveTab('hero');
            }}
            className={`transition-colors hover:text-amber-300 ${
              activeTab === 'hero' ? 'text-amber-300 font-medium border-b border-amber-300/60 pb-1' : ''
            }`}
          >
            Atelier
          </button>
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              setActiveTab('collection');
            }}
            className={`transition-colors hover:text-amber-300 ${
              activeTab === 'collection' ? 'text-amber-300 font-medium border-b border-amber-300/60 pb-1' : ''
            }`}
          >
            Exhibition
          </button>
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              setActiveTab('catalog');
            }}
            className={`transition-colors hover:text-amber-300 flex items-center gap-1.5 ${
              activeTab === 'catalog' ? 'text-amber-300 font-medium border-b border-amber-300/60 pb-1' : ''
            }`}
          >
            <Search className="w-3 h-3 text-amber-300/80" />
            Catalog
          </button>
        </nav>

        {/* Center Brand Logo */}
        <div
          onClick={() => setActiveTab('hero')}
          className="cursor-pointer text-center group"
        >
          <h1 className="font-serif text-2xl md:text-3xl font-normal tracking-[0.35em] text-white group-hover:text-amber-200 transition-colors">
            NOIRÉ
          </h1>
          <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-400 -mt-1 group-hover:text-amber-300/80 transition-colors">
            ATELIER PARIS
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-5 text-xs tracking-widest text-neutral-300">
          
          {/* AI Concierge Trigger */}
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              onOpenConcierge();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 hover:border-amber-400/60 transition-all text-[11px] font-light"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Atelier Concierge</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            title="Toggle Ambient Audio"
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
          >
            {isAudioOn ? (
              <Volume2 className="w-4 h-4 text-amber-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              onOpenAccount();
            }}
            title="Client Portal"
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-neutral-300 hover:text-amber-200"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              onOpenWishlist();
            }}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-neutral-300 hover:text-amber-200"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag / Cart */}
          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              onOpenCart();
            }}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-neutral-300 hover:text-amber-200 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-widest text-neutral-400">
              Bag
            </span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
