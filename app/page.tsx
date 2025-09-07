"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface Product{
  id : number;
  title : string;
  description : string;
  price : number;
  quantity : number;
  category : string;
  imageUrl : string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 180000,
    sortBy: "title",
    order: "asc",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`, {
          params: filters,
        });
        setProducts(res.data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore our curated collection of premium products designed to enhance your lifestyle
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <Filters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Products Section */}
          <section className="space-y-6">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800/50 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {loading ? "Loading..." : `${products.length} Products Found`}
                </h2>
                <p className="text-gray-400 text-sm">
                  {filters.search && `Showing results for "${filters.search}"`}
                  {filters.category && ` in ${filters.category}`}
                </p>
              </div>
              
              {products.length > 0 && !loading && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Sorted by:</span>
                  <span className="text-blue-400 font-medium capitalize">
                    {filters.sortBy} ({filters.order === 'asc' ? 'A-Z' : 'Z-A'})
                  </span>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-xl p-6 animate-pulse">
                    <div className="bg-gray-800 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-800 h-4 rounded mb-2"></div>
                    <div className="bg-gray-800 h-3 rounded w-2/3 mb-4"></div>
                    <div className="bg-gray-800 h-6 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Products Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}