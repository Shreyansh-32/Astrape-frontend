"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-950 text-gray-300 py-8 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <Image src={"/logo.png"} alt="Logo" height={100} width={100} className="md:size-20 size-16"></Image>
          <h2 className="text-xl font-bold text-white mb-3">Astrape</h2>
          <p className="text-sm text-gray-400">
            Your one-stop tech gadget e-commerce store. Discover the latest and greatest in technology.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link href="#" className="hover:text-white">Products</Link>
          <Link href="#" className="hover:text-white">About</Link>
          <Link href="#" className="hover:text-white">Contact</Link>
          <Link href="#" className="hover:text-white">FAQs</Link>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Github className="w-5 h-5 hover:text-white" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Astrape. All rights reserved.
      </div>
    </footer>
  );
}
