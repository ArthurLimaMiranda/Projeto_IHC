// app/page.tsx
'use client';
import { Header } from "@/components/Client/Header";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Footer } from "@/components/Client/Footer";
import { CarrosselProdutos } from "@/components/Client/CarrosselProdutos";
import { Categorias } from "@/components/Client/Categorias";
import { Avaliacoes } from "@/components/Client/Avaliacoes";
import {
  CakeIcon,
  HeartIcon,
  AcademicCapIcon,
  GiftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  const handleRequestQuote = (itemTitle?: string) => {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const baseMessage = "Olá! Gostaria de fazer um orçamento para um bolo personalizado.";
    const message = itemTitle ? `${baseMessage} Me interessei pelo modelo: ${itemTitle}` : baseMessage;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/products');
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };


  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FFFFF4]">
        {/* Seção Bem-vindo */}
        <section className="bg-[#4F2712] text-white py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-poppins">Bem-vindo(a)!</h1>
          <p className="text-xl mb-8">O que sua comemoração merece?</p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-full px-4 py-2 flex items-center">
              <input 
                type="text" 
                placeholder="Buscar bolos, sabores, ocasiões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-[#4F2712] outline-none px-2 placeholder:text-sm"
              />
              <button 
                type="submit"
                className="bg-[#B95760] text-white rounded-full px-3 py-2 hover:bg-[#34A7B2] transition-colors text-sm flex items-center gap-1"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Seção O que você procura */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4F2712] mb-8 text-center">
            O que você procura?
          </h2>
          <Categorias />
        </section>

        <section className="flex items-center justify-center my-10">
          <button
            onClick={() => handleRequestQuote()}
            className="px-8 py-4 bg-[#B95760] text-white rounded-xl text-xl hover:bg-[#34A7B2] transition font-semibold font-poppins flex items-center gap-3"
          >
            <HeartIcon className="h-6 w-6 text-white" />
            Fazer Orçamento
          </button>
        </section>

        {/* Seção Mais Vendidos */}
        <section className="py-12 bg-[#FFFFF4]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-[#4F2712]">
                Mais Vendidos
              </h3>
              <a
                href="/products"
                className="text-[#34A7B2] hover:underline font-medium text-lg"
              >
                Ver tudo
              </a>
            </div>
            <CarrosselProdutos />
          </div>
        </section>

        <section className="py-12 px-4 max-w-6xl mx-auto">
          <div className="flex flex-row justify-between mb-6">
            <h3 className="text-3xl font-bold text-[#4F2712]">Categoria</h3>
            <button
              onClick={() => router.push('/products')}
              className="text-[#34A7B2] hover:underline font-medium text-lg"
            >
              Ver tudo
            </button>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <button 
              onClick={() => handleCategoryClick('Aniversário')}
              className="bg-[#34A7B2] rounded-lg px-4 py-6 shadow-sm flex flex-col justify-center items-center hover:bg-[#2B8C95] transition-colors cursor-pointer"
            >
              <CakeIcon className="h-10 w-10 text-white mb-3" />
              <h4 className="font-semibold text-lg text-white">Aniversário</h4>
              <p className="text-white text-sm">Bolos especiais</p>
            </button>

            <button 
              onClick={() => handleCategoryClick('Casamento')}
              className="bg-[#B95760] rounded-lg px-4 py-6 shadow-sm flex flex-col justify-center items-center hover:bg-[#A34C54] transition-colors cursor-pointer"
            >
              <HeartIcon className="h-10 w-10 text-white mb-3" />
              <h4 className="font-semibold text-lg text-white">Casamento</h4>
              <p className="text-white text-sm">Bolos elegantes</p>
            </button>

            <button 
              onClick={() => handleCategoryClick('Chá de Bebê')}
              className="bg-[#B95760] rounded-lg px-4 py-6 shadow-sm flex flex-col justify-center items-center hover:bg-[#A34C54] transition-colors cursor-pointer"
            >
              <GiftIcon className="h-10 w-10 text-white mb-3" />
              <h4 className="font-semibold text-lg text-white">Chá de Bebê</h4>
              <p className="text-white text-sm">Temas feitos</p>
            </button>

            <button 
              onClick={() => handleCategoryClick('Formatura')}
              className="bg-[#34A7B2] rounded-lg px-4 py-6 shadow-sm flex flex-col justify-center items-center hover:bg-[#2B8C95] transition-colors cursor-pointer"
            >
              <AcademicCapIcon className="h-10 w-10 text-white mb-3" />
              <h4 className="font-semibold text-lg text-white">Formatura</h4>
              <p className="text-white text-sm">Celebre conosco</p>
            </button>
          </div>
        </section>

        {/* Seção Avaliações */}
        <section className="py-12 bg-[#F7EFE7]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#4F2712] mb-4 text-center">
              Avaliações de Compradores
            </h2>
            <p className="text-center text-[#0A0A0A] mb-8">
              A opinião de quem já provou
            </p>
            <Avaliacoes />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}