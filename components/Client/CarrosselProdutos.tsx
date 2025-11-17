// components/CarrosselProdutos.tsx
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const produtos = [
  {
    id: 1,
    nome: "Bolo de Chocolate com Frutas Vermelhas",
    preco: "105,00",
    descricao: "Ganache cremosa, finalização artística em chocolate e cobertura generosa de frutas frescas.",
    imagem: "/assets/1-4.jpeg"
  },
  {
    id: 2,
    nome: "Bolo campestre com morangos e chantilly",
    preco: "85,00",
    descricao: "Bolo fresco com recheio de morango natural.",
    imagem: "/assets/strawberry.jpg"
  },
  {
    id: 3,
    nome: "Bolo Floresta Negra",
    preco: "90,00",
    descricao: "Chocolate belga de alta qualidade.",
    imagem: "/assets/Bolo-Floresta-Negra.jpg"
  }
];

export function CarrosselProdutos() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % produtos.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + produtos.length) % produtos.length);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleComprar = () => {
    router.push('/customize');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {produtos.map((produto) => (
            <div 
              key={produto.id} 
              className="w-full flex-shrink-0 py-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 px-4">
                {/* Image Container - Agora com posicionamento relativo para as setas */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Navigation Buttons - Agora dentro do container da imagem */}
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {produto.nome}
                  </h3>
                  <p className="text-3xl font-bold text-rose-600">
                    R$ {produto.preco}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {produto.descricao}
                  </p>
                  <button 
                    onClick={handleComprar}
                    className="flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full transition-colors font-semibold mt-4"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators - Mantido fora do carousel container */}
      <div className="flex justify-center mt-6 space-x-3">
        {produtos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-rose-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            } disabled:opacity-50`}
          />
        ))}
      </div>
    </div>
  );
}