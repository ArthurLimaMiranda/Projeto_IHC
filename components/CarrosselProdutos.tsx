// components/CarrosselProdutos.tsx
'use client'
import { useState } from "react";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const produtos = [
  {
    id: 1,
    nome: "Bolo de Chocolate com Frutas Vermelhas",
    preco: "R$ 105,00",
    descricao: "Ganache cremosa, finalização artística em chocolate e cobertura generosa de frutas frescas.",
    imagem: "/assets/1-4.jpeg"
  },
  {
    id: 2,
    nome: "Bolo campestre com morangos e chantilly",
    preco: "R$ 85,00",
    descricao: "Bolo fresco com recheio de morango natural.",
    imagem: "/assets/strawberry.jpg"
  },
  {
    id: 3,
    nome: "Bolo Floresta Negra",
    preco: "R$ 90,00",
    descricao: "Chocolate belga de alta qualidade.",
    imagem: "/assets/Bolo-Floresta-Negra.jpg"
  }
];

export function CarrosselProdutos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % produtos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + produtos.length) % produtos.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {produtos.map((produto) => (
            <div key={produto.id} className="w-full flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 mx-4">
                <div className="relative h-64 mb-4">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#4F2712] mb-2">
                  {produto.nome}
                </h3>
                <p className="text-2xl font-bold text-[#39C24A] mb-2">
                  {produto.preco}
                </p>
                <p className="text-[#0A0A0A]">
                  {produto.descricao}
                </p>
                <div className="flex items-center justify-start">
                  <button className="flex gap-3 mt-4 bg-[#B95760] text-white px-7 py-3 rounded-full hover:bg-[#34A7B2] transition-colors font-semibold">
                    <ShoppingBagIcon className="h-6 w-6 text-white" />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {produtos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#34A7B2]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}