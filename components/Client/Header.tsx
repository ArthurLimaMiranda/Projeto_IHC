// components/Header.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/outline";
import logo from '../../public/assets/Logo.png'
import Image from "next/image";

export function Header() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Verifica se não está na página inicial
  const isNotHome = pathname !== "/pt";

  return (
    <header className="bg-[#FFFFF4] shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Botão Voltar - só aparece se não estiver na home */}
          {isNotHome ? (
            <>
            <button 
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 text-rose-600 hover:text-rose-700 transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div className="w-10 h-10"></div>
            </>
          ) : (
            <>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            </>
          )}

          {/* Logo */}
          <Link href="/" className="w-[25%]">
            <Image src={logo} alt='logo' className="opacity-70"/>
          </Link>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {/* Aqui você pode adicionar um badge de quantidade se quiser */}
            </Link>

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
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === "/" ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setHeaderOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/products" 
                className={`transition-colors ${
                  pathname === "/products" ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setHeaderOpen(false)}
              >
                Produtos
              </Link>
              <Link 
                href="/customize" 
                className={`transition-colors ${
                  pathname === "/customize" ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setHeaderOpen(false)}
              >
                Personalizar
              </Link>
              <Link 
                href='/track-order'
                className={`transition-colors ${
                  pathname === "/contact" ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setHeaderOpen(false)}
              >
                Rastrear Pedido
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}