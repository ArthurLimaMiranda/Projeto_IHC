// components/CarrosselProdutos.tsx
'use client'
import { useState } from "react";
import Image from "next/image";

const produtos = [
  {
    id: 1,
    nome: "Bolo de Brigadeiro com Chocolate Branco",
    preco: "R$ 80,00",
    descricao: "A melhor das três murals e cidades regulares é o sumo arquivado do chocolate branco.",
    imagem: "/placeholder-bolo.jpg"
  },
  {
    id: 2,
    nome: "Bolo de Morango",
    preco: "R$ 75,00",
    descricao: "Bolo fresco com recheio de morango natural.",
    imagem: "/placeholder-bolo2.jpg"
  },
  {
    id: 3,
    nome: "Bolo de Chocolate",
    preco: "R$ 70,00",
    descricao: "Chocolate belga de alta qualidade.",
    imagem: "/placeholder-bolo3.jpg"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  {produto.preco}
                </p>
                <p className="text-gray-600">
                  {produto.descricao}
                </p>
                <button className="mt-4 bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors">
                  Comprar
                </button>
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
              index === currentIndex ? 'bg-rose-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}