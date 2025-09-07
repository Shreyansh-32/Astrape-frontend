"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { isLoggedIn, logout } = useAppContext();

  return (
    <nav className="w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-8 bg-[#0B1120] border-b border-blue-900 shadow-md">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={100}
          width={100}
          className="md:h-12 h-10 w-auto cursor-pointer"
        />
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="size-7 text-gray-200 hover:text-blue-400 transition" />
          </SheetTrigger>
          <SheetContent className="bg-[#0F172A] text-gray-200">
            <div className="w-full h-full flex flex-col gap-6 p-6">
              <Link href={"/"} className="hover:text-blue-400 transition">
                Products
              </Link>
              <Link href={"/cart"} className="hover:text-blue-400 transition">
                Cart
              </Link>

              {!isLoggedIn && (
                <div className="flex flex-col gap-3">
                  <Link href={"/login"}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href={"/signup"}>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Signup
                    </Button>
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <Button
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Log out
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href={"/cart"} className="flex items-center gap-1 text-gray-200 hover:text-blue-400 transition">
          <ShoppingCart className="size-5" /> Cart
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full bg-blue-600 p-2 hover:bg-blue-700 transition">
            <User className="text-white size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0F172A] text-gray-200 border border-blue-800">
            <DropdownMenuSeparator />

            {!isLoggedIn && (
              <>
                <DropdownMenuItem asChild>
                  <Link href={"/login"}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Login
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/signup"}>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Signup
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            {isLoggedIn && (
              <DropdownMenuItem>
                <Button
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Log out
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
