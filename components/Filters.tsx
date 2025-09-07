"use client";

import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

export interface Filters{
    search: string,
    category: string,
    minPrice: number,
    maxPrice: number,
    sortBy: string,
    order: string,
}

export default function Filters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<{
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    order: string;
}>>;
}) {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 180000,
  ]);

  const handlePriceChange = (val: number[]) => {
    setPriceRange(val);
    setFilters({ ...filters, minPrice: val[0], maxPrice: val[1] });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      minPrice: 0,
      maxPrice: 180000,
      sortBy: "title",
      order: "asc",
    };
    setFilters(clearedFilters);
    setPriceRange([0, 180000]);
  };

  const hasActiveFilters = filters.search || filters.category || filters.minPrice || filters.maxPrice;

  const FiltersContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <h2 className="font-bold text-xl text-white">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Search Products</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Category</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <input
            type="text"
            placeholder="Filter by category..."
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Price Range</label>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            max={180000}
            min={0}
            step={10000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Min:</span>
              <span className="text-sm font-medium text-blue-400">₹{priceRange[0].toLocaleString()}</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Max:</span>
              <span className="text-sm font-medium text-blue-400">₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300 border-b border-gray-800 pb-2">Sort Options</h3>
        
        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-xs text-gray-400">Sort By</label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all"
            >
              <option value="title">Product Name</option>
              <option value="price">Price</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Order */}
        <div className="space-y-2">
          <label className="block text-xs text-gray-400">Order</label>
          <div className="relative">
            <select
              value={filters.order}
              onChange={(e) => setFilters({ ...filters, order: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all"
            >
              <option value="asc">Ascending (A-Z, Low-High)</option>
              <option value="desc">Descending (Z-A, High-Low)</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-400">Active Filters</span>
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              {[filters.search, filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-2xl sticky top-4">
          {FiltersContent}
        </div>
      </div>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="secondary" 
              className="w-full bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 text-white backdrop-blur-sm transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Filters & Sort
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {[filters.search, filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900/95 backdrop-blur-xl text-white border-gray-700/50 w-80">
            <SheetHeader className="border-b border-gray-800 pb-4">
              <SheetTitle className="text-white text-left">Filters & Sorting</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto max-h-[calc(100vh-120px)]">
              {FiltersContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}