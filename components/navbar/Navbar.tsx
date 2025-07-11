// components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <header className="w-full border-b bg-background px-4 py-4 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl text-rose-600 font-bold">
          Ecom-Shop
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium hover:underline"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="text-sm font-medium hover:underline"
          >
            Check Out
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left text-lg font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col items-center gap-4">
                <Link href="/" className="text-base hover: font-medium">
                  Home
                </Link>
                <Link href="/products" className="text-base font-medium">
                  Products
                </Link>
                <Link href="/checkout" className="text-base font-medium">
                  Check Out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
