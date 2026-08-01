'use client';

import React from 'react';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 bg-neutral-950 border-t border-white/10 pt-16 pb-12 px-6 md:px-16 text-white text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
        
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="font-serif text-2xl tracking-[0.3em] uppercase text-white">NOIRÉ</h3>
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-300">
            ATELIER PARIS / GENÈVE
          </p>
          <p className="text-neutral-400 font-light leading-relaxed text-[11px]">
            Haute horlogerie, joaillerie, box calfskin leatherware, and rare perfume extracts.
          </p>
        </div>

        {/* Flagship Salons */}
        <div className="space-y-2">
          <p className="text-amber-300 text-[10px] tracking-[0.3em] uppercase font-medium">
            Flagship Atelier Salons
          </p>
          <ul className="text-neutral-400 font-light space-y-1 text-[11px]">
            <li>Paris — 14 Place Vendôme</li>
            <li>Geneva — 8 Rue du Rhône</li>
            <li>Tokyo — Ginza Six Tower</li>
            <li>New York — 740 Madison Avenue</li>
            <li>Milan — Via Montenapoleone 12</li>
          </ul>
        </div>

        {/* Provenance */}
        <div className="space-y-2">
          <p className="text-amber-300 text-[10px] tracking-[0.3em] uppercase font-medium">
            Atelier Standards
          </p>
          <ul className="text-neutral-400 font-light space-y-1 text-[11px]">
            <li>100% Certified Type IIa Diamonds</li>
            <li>Sabae Beta-Titanium Frames</li>
            <li>Armored Transport & Insured Vault</li>
            <li>Grasse Enfleurage Parfumerie</li>
          </ul>
        </div>

        {/* Private Gazette */}
        <div className="space-y-3">
          <p className="text-amber-300 text-[10px] tracking-[0.3em] uppercase font-medium">
            Private Atelier Gazette
          </p>
          <p className="text-neutral-400 text-[11px] font-light">
            Receive invitation-only previews of limited 1-of-1 creations.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="client@private-vault.com"
              className="bg-black border border-white/10 px-3 py-2 rounded-lg text-[11px] text-white focus:outline-none focus:border-amber-400 flex-1"
            />
            <button className="px-3 py-2 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-amber-300">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Devil Labs Concept Disclaimer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-[10px] tracking-widest uppercase">
        <p>© 2026 NOIRÉ ATELIER. ALL RIGHTS RESERVED.</p>
        <p className="text-amber-300/80 font-mono">
          DEVIL LABS CONCEPT DEMO — HIGH-END D2C LUXURY SHOWCASE
        </p>
      </div>
    </footer>
  );
};
