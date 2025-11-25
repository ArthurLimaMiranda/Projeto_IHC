// components/CarrosselProdutos.tsx
'use client'
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const produtos = [
  {
    id: 1,
    name: "Bolo de Chocolate com Frutas Vermelhas",
    description: "Ganache cremosa com frutas frescas",
    detailedDescription: "Uma verdadeira obra-prima para os amantes de chocolate! Nosso bolo premium apresenta camadas úmidas de massa de chocolate belga, envolvidas por uma ganache cremosa e aveludada. Finalizado artisticamente com uma generosa cobertura de frutas vermelhas frescas - morangos, framboesas, amoras e mirtilos - que criam um contraste perfeito entre o doce intenso do chocolate e o toque levemente ácido das frutas. Cada fatia é uma experiência sensorial única, perfeita para celebrar momentos especiais com sofisticação e sabor.",
    price: 105.00,
    image: "/assets/1-4.jpeg",
    category: "Aniversário",
    flavors: ["Chocolate", "Frutas Vermelhas"],
    size: "Médio",
    serves: 25
  },
  {
    id: 2,
    name: "Bolo Campestre com Morangos e Chantilly",
    description: "Bolo fresco com recheio de morango",
    detailedDescription: "Transporte-se para o campo com este bolo que captura a essência da simplicidade sofisticada. Nossa massa de baunilha artesanal, extremamente fofa e aromática, é cuidadosamente intercalada com camadas de morangos frescos selecionados e um chantilly caseiro preparado na hora. A cobertura leve e aerada complementa perfeitamente a suculência dos morangos, criando uma harmonia de texturas que derrete na boca. Ideal para quem busca um sabor clássico, porém refinado, que remete às receitas de família com um toque contemporâneo.",
    price: 85.00,
    image: "/assets/strawberry.jpg",
    category: "Aniversário",
    flavors: ["Baunilha", "Morango"],
    size: "Pequeno",
    serves: 20
  },
  {
    id: 3,
    name: "Bolo Floresta Negra",
    description: "Chocolate belga de alta qualidade",
    detailedDescription: "Reinventamos o clássico alemão com uma abordagem gourmet! Nossa Floresta Negra é uma celebração de sabores intensos: camadas úmidas de bolo de chocolate negro, embebidas em licor de cerejas artesanal e intercaladas com chantilly premium e cerejas frescas. A cobertura é uma homenagem à tradição - raspas de chocolate belga 60% cacau e cerejas inteiras caramelizadas. Cada elemento foi pensado para criar uma experiência decadente, onde o amargor do chocolate se encontra com a doçura das cerejas em uma dança de sabores que conquista até os paladares mais exigentes.",
    price: 90.00,
    image: "/assets/Bolo-Floresta-Negra.jpg",
    category: "Aniversário",
    flavors: ["Chocolate", "Cereja"],
    size: "Médio",
    serves: 22
  }
];

export function CarrosselProdutos() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: number]: boolean}>({});
  const [heights, setHeights] = useState<{[key: number]: number}>({});
  const contentRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  const toggleDescription = (productId: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Atualizar alturas quando o conteúdo mudar
  useEffect(() => {
    const newHeights: {[key: number]: number} = {};
    
    produtos.forEach(produto => {
      const ref = contentRefs.current[produto.id];
      if (ref) {
        newHeights[produto.id] = ref.scrollHeight;
      }
    });
    
    setHeights(newHeights);
  }, [expandedDescriptions, currentIndex]);

  const handleAddToCart = (bolo: typeof produtos[0]) => {
    const cartItem = {
      id: Date.now(), // ID único baseado no timestamp
      name: bolo.name,
      description: bolo.description,
      price: bolo.price,
      quantity: 1,
      image: bolo.image,
      customization: {
        flavor: bolo.flavors[0],
        frosting: 'Padrão do bolo',
        toppings: ['Decoração inclusa'],
        addOns: [],
        extras: [],
      },
    };

    addToCart(cartItem);
    
    // Feedback visual (poderia ser um toast)
    alert(`${bolo.name} adicionado ao carrinho!`);
  };

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
              <div className="flex flex-col md:flex-row items-start gap-6 px-4">
                {/* Image Container */}
                <div className="w-full md:w-2/5 relative">
                  <div className="relative h-44 md:h-64 rounded-lg overflow-hidden">
                    <Image
                      src={produto.image}
                      alt={produto.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Content Container com altura dinâmica */}
                <div className="w-full md:w-3/5">
                  <div 
                    ref={el => contentRefs.current[produto.id] = el}
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ 
                      height: expandedDescriptions[produto.id] 
                        ? `${heights[produto.id]}px` 
                        : 'auto',
                      maxHeight: expandedDescriptions[produto.id] 
                        ? `${heights[produto.id]}px` 
                        : 'none'
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {produto.name}
                        </h3>
                        <p className="text-lg font-bold text-rose-600">
                          R$ {produto.price.toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Descrição */}
                      <div className="space-y-2">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {expandedDescriptions[produto.id] 
                            ? produto.detailedDescription
                            : produto.description
                          }
                        </p>
                      </div>

                      {/* Informações adicionais */}
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-semibold">Serve:</span> {produto.serves} pessoas
                        </div>
                        <div>
                          <span className="font-semibold">Tamanho:</span> {produto.size}
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">Sabores:</span> {produto.flavors.join(', ')}
                        </div>
                      </div>
                      
                      {/* Botões de ação */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => handleAddToCart(produto)}
                          className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-3 rounded-lg transition-colors flex-1"
                        >
                          <PlusIcon className="h-5 w-5" />
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botão Ver Mais/Ver Menos - SEMPRE VISÍVEL */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => toggleDescription(produto.id)}
                      className="text-rose-500 hover:text-rose-600 text-sm font-medium transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      {expandedDescriptions[produto.id] ? (
                        <>
                          <span>Ver menos detalhes</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Ver mais detalhes</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
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