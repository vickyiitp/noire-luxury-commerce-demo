'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS, COLLECTIONS } from '@/lib/data/products';
import { Product, ProductVariant, CartItem, Order } from '@/lib/types';
import { StudioCanvas, ViewMode, StudioLighting } from '@/components/3d/StudioCanvas';
import { Header } from '@/components/ui/Header';
import { EditorialHeroOverlay } from '@/components/ui/EditorialHeroOverlay';
import { CollectionCarousel } from '@/components/ui/CollectionCarousel';
import { ProductCatalog } from '@/components/ui/ProductCatalog';
import { ProductDetailModal } from '@/components/ui/ProductDetailModal';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { CheckoutModal } from '@/components/ui/CheckoutModal';
import { ConciergeModal } from '@/components/ui/ConciergeModal';
import { WishlistDrawer } from '@/components/ui/WishlistDrawer';
import { ClientAccountModal } from '@/components/ui/ClientAccountModal';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'hero' | 'collection' | 'catalog'>('hero');
  const [heroProduct] = useState<Product>(PRODUCTS[0]); // Chrono Noir I
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(PRODUCTS[0].variants[0]);

  // Collection State
  const [activeCollectionId, setActiveCollectionId] = useState<string>('NEW OBJECTS');

  // Inspection / Detail 3D View Mode State
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [detailVariant, setDetailVariant] = useState<ProductVariant | null>(null);
  const [explodedProgress, setExplodedProgress] = useState<number>(0);
  const [studioLighting, setStudioLighting] = useState<StudioLighting>('obsidian');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedCart = localStorage.getItem('noire_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedWishlist = localStorage.getItem('noire_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedOrders = localStorage.getItem('noire_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch {
      return [];
    }
  });

  // Pointer position for subtle 3D lighting/camera parallax
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('noire_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('noire_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('noire_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Pointer movement listener
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;
    setPointerPos({ x, y });
  };

  // Determine current 3D Canvas View Mode
  const currentViewMode: ViewMode = activeDetailProduct
    ? 'detail'
    : activeTab === 'collection'
    ? 'collection'
    : 'hero';

  // Collection filtered products
  const collectionProducts = PRODUCTS.filter(
    (p) => p.edition === activeCollectionId
  );

  const handleSelectProduct = (product: Product) => {
    setActiveDetailProduct(product);
    setDetailVariant(product.variants[0]);
    setExplodedProgress(0);
  };

  const handleAddToCart = (product: Product, variant?: ProductVariant, embossingText?: string) => {
    const v = variant || product.variants[0];
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === v.id
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: v, quantity: 1, embossingText }];
      }
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full min-h-screen bg-[#080808] text-[#E5E5E5] select-none overflow-x-hidden font-sans"
    >
      {/* 3D Studio Environment Ambient Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-studio-environment opacity-90"></div>
      
      {/* Vignette Depth Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-vignette-overlay"></div>

      {/* Fixed Luxury Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveDetailProduct(null);
          setActiveTab(tab);
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
      />

      {/* 3D CANVAS VIEWPORT - Fixed background canvas during Hero, Exhibition, or Detail Mode */}
      {activeTab !== 'catalog' && (
        <div className="fixed inset-0 z-0">
          <StudioCanvas
            viewMode={currentViewMode}
            heroProduct={heroProduct}
            selectedVariant={selectedVariant}
            activeDetailProduct={activeDetailProduct}
            detailVariant={detailVariant}
            collectionProducts={collectionProducts}
            activeCollectionId={activeCollectionId}
            explodedProgress={explodedProgress}
            studioLighting={studioLighting}
            pointerPos={pointerPos}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      )}

      {/* HERO OVERLAY */}
      {activeTab === 'hero' && !activeDetailProduct && (
        <EditorialHeroOverlay
          heroProduct={heroProduct}
          onEnterCollection={() => setActiveTab('collection')}
          onInspectHero={() => handleSelectProduct(heroProduct)}
        />
      )}

      {/* EXHIBITION COLLECTION CAROUSEL */}
      {activeTab === 'collection' && !activeDetailProduct && (
        <CollectionCarousel
          activeCollectionId={activeCollectionId}
          setActiveCollectionId={setActiveCollectionId}
          products={collectionProducts}
          onSelectProduct={handleSelectProduct}
          onQuickAdd={(p) => handleAddToCart(p)}
        />
      )}

      {/* CATALOG GRID VIEW */}
      {activeTab === 'catalog' && (
        <div className="relative z-10 bg-[#080808]">
          <ProductCatalog
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(p) => handleAddToCart(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
          <Footer />
        </div>
      )}

      {/* PRODUCT DETAIL 3D INSPECTOR OVERLAY */}
      {activeDetailProduct && detailVariant && (
        <ProductDetailModal
          product={activeDetailProduct}
          selectedVariant={detailVariant}
          setSelectedVariant={setDetailVariant}
          explodedProgress={explodedProgress}
          setExplodedProgress={setExplodedProgress}
          studioLighting={studioLighting}
          setStudioLighting={setStudioLighting}
          onClose={() => setActiveDetailProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(activeDetailProduct.id)}
        />
      )}

      {/* CART VELVET DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(index) =>
          setCartItems((prev) => prev.filter((_, i) => i !== index))
        }
        onUpdateQuantity={(index, newQty) =>
          setCartItems((prev) => {
            const updated = [...prev];
            updated[index].quantity = newQty;
            return updated;
          })
        }
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
          setCartItems([]);
        }}
      />

      {/* AI CONCIERGE CHAT DRAWER */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      {/* WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* CLIENT ACCOUNT PORTAL */}
      <ClientAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={orders}
      />
    </div>
  );
}
