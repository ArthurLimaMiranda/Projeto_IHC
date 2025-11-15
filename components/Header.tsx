// components/Header.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export function Header() {
  const [headerOpen, setHeaderOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-rose-600">
            Julia
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-rose-600 transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-gray-700 hover:text-rose-600 transition-colors">
              Produtos
            </Link>
            <Link href="/categorias" className="text-gray-700 hover:text-rose-600 transition-colors">
              Categorias
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-rose-600 transition-colors">
              Contato
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-rose-600 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setHeaderOpen(!headerOpen)}
            >
              {headerOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {headerOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-rose-600 transition-colors">
                Início
              </Link>
              <Link href="/produtos" className="text-gray-700 hover:text-rose-600 transition-colors">
                Produtos
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-rose-600 transition-colors">
                Categorias
              </Link>
              <Link href="/contato" className="text-gray-700 hover:text-rose-600 transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}