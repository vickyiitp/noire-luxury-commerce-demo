'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/lib/data/products';
import { Product, Category } from '@/lib/types';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedEdition, setSelectedEdition] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesEdition = selectedEdition === 'all' || item.edition === selectedEdition;
      const matchesPrice = item.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesEdition && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedEdition, maxPrice]);

  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto min-h-screen text-white">
      
      {/* Catalog Editorial Header */}
      <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-amber-300 text-xs tracking-[0.3em] uppercase font-light">
            Atelier Complete Catalogue
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light mt-1 text-white">
            Objects of Distinction
          </h2>
        </div>
        <p className="text-neutral-400 text-xs tracking-widest font-light max-w-md">
          Explore handcrafted haute horlogerie, joaillerie, French box calfskin leatherware, and rare perfume extracts.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mb-12 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title, craftsmanship, or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            {(['all', 'horlogerie', 'parfumerie', 'leatherware', 'joaillerie', 'optique'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    luxuryAudio.playSoftClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-lg text-[11px] tracking-widest uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-black font-medium shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'bg-black/40 border border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Métiers' : cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Second Row: Price Slider & Edition */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-white/5 text-xs text-neutral-400">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-amber-300" />
            <span>Max Value:</span>
            <input
              type="range"
              min={1000}
              max={150000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-amber-400 cursor-pointer"
            />
            <span className="text-amber-300 font-serif">${maxPrice.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Edition:</span>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Exhibitions</option>
              <option value="NEW OBJECTS">01 NEW OBJECTS</option>
              <option value="ICONS">02 ICONS</option>
              <option value="LIMITED">03 LIMITED</option>
              <option value="ARCHIVE">04 ARCHIVE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);

          return (
            <div
              key={product.id}
              onClick={() => {
                luxuryAudio.playShimmer();
                onSelectProduct(product);
              }}
              className="group relative bg-neutral-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 hover:bg-neutral-900/90 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl"
            >
              {/* Top Badge & Wishlist */}
              <div>
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                  <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-300 rounded-full">
                    {product.edition}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      luxuryAudio.playSoftClick();
                      onToggleWishlist(product);
                    }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-serif text-2xl text-white mt-4 group-hover:text-amber-200 transition-colors">
                  {product.name}
                </h3>
                <p className="text-neutral-400 text-xs font-light mt-1">
                  {product.subtitle}
                </p>

                <p className="text-neutral-400 text-xs font-light line-clamp-3 mt-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Footer Specs & Action */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block tracking-widest">
                    Prix Inclusive
                  </span>
                  <span className="font-serif text-xl text-amber-300 font-light">
                    ${product.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      luxuryAudio.playSoftClick();
                      onQuickAdd(product);
                    }}
                    className="px-4 py-2 bg-amber-400 text-black font-medium rounded-lg text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Bag</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
