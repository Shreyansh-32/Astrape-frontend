"use client";

import { Product } from "@/app/page";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const addToCart = async () => {
    if (isAddingToCart || isAdded) return;
    
    setIsAddingToCart(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsAdded(true);
      
      // Reset the "added" state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
      
    } catch (error) {
      console.error(error);
      toast.error("Login and please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-gray-900/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 hover:border-gray-700/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]">
      
      {/* Product Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        )}
        
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = "/api/placeholder/400/300";
            setImageLoaded(true);
          }}
        />
        
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 text-xs font-semibold bg-white/10 text-white backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              {product.category}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Product Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={isAddingToCart || isAdded}
          className={`
            w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 
            flex items-center justify-center gap-3 relative overflow-hidden
            ${isAdded 
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
              : isAddingToCart
              ? 'bg-blue-400 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {/* Button Background Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isAdded || isAddingToCart ? 'hidden' : ''}`}></div>
          
          <div className="relative z-10 flex items-center gap-3">
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding to Cart...</span>
              </>
            ) : isAdded ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </div>
        </button>

        {/* Additional Product Info */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Free Shipping
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            In Stock
          </span>
        </div>
      </div>

      {/* Card Border Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-transparent group-hover:to-purple-500/20 pointer-events-none transition-all duration-500"></div>
    </div>
  );
}