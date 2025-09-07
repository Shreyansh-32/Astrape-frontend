"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export interface Cart {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imageUrl: string;
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(res.data.cart || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId: number, change: number) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
        { productId, quantity: change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-300">
                {loading
                  ? "Loading your items..."
                  : `${totalItems} item${
                      totalItems !== 1 ? "s" : ""
                    } in your cart`}
              </p>
            </div>
            {!loading && cart.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-3xl font-bold text-white">
                  {formatPrice(total)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading State
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900/50 rounded-2xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-800 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  </div>
                  <div className="w-32 h-12 bg-gray-800 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : cart.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-300 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link href={"/"}>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          // Cart Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Cart Items</h2>
                <span className="text-sm text-gray-400">
                  {totalItems} items
                </span>
              </div>

              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-24 h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/200/200";
                          }}
                        />
                        {item.product.category && (
                          <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm rounded-full border border-blue-400/30">
                            {item.product.category}
                          </span>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {item.product.title}
                        </h3>
                        <p className="text-2xl font-bold text-blue-400 mb-2">
                          {formatPrice(item.product.price)}
                        </p>
                        <p className="text-sm text-gray-400">
                          Subtotal:{" "}
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-gray-800/50 rounded-2xl p-2 border border-gray-700/50">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            disabled={updatingItems.has(item.productId)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-red-600 text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingItems.has(item.productId) ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            )}
                          </button>

                          <span className="w-12 text-center text-xl font-bold text-white">
                            {item.quantity}
                          </span>

                          {item.quantity < item.product.quantity && (
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              disabled={updatingItems.has(item.productId)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-green-600 text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {updatingItems.has(item.productId) ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                      <span className="text-gray-300">
                        Items ({totalItems})
                      </span>
                      <span className="text-white font-semibold">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-green-400 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-3 text-lg font-bold border-t-2 border-blue-500/30">
                      <span className="text-white">Total</span>
                      <span className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Proceed to Checkout
                  </button>

                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Free shipping on orders over ₹999
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
