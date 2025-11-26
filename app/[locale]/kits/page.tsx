// app/kits/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Footer } from '@/components/Client/Footer';

// Dados mockados dos kits
const kits = [
  {
    id: 1,
    name: "Festa na Caixa - Essencial",
    description: "O kit perfeito para uma celebração especial e inesquecível.",
    detailedDescription: "Kit completo com bolo personalizado, docinhos e itens decorativos. Perfeito para celebrações íntimas e especiais.",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&h=300&fit=crop",
    category: "essencial",
    includes: [
      "Bolo personalizado (1kg)",
      "12 brigadeiros",
      "12 beijinhos",
      "Velas decorativas",
      "Topper personalizado"
    ],
    serves: 10
  },
  {
    id: 2,
    name: "Kit Casal Apaixonado",
    description: "Celebre o amor com doces que encantam e aproximam.",
    detailedDescription: "Kit romântico especialmente criado para casais. Inclui sabores sofisticados e decoração elegante.",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop&crop=center",
    category: "romantico",
    includes: [
      "Bolo red velvet (500g)",
      "6 cupcakes temáticos",
      "6 trufas de champagne",
      "2 taças de sobremesa",
      "Decoração romântica"
    ],
    serves: 2
  },
  {
    id: 3,
    name: "Kit Festa Infantil Mágica",
    description: "Toda a alegria e doçura para a festa dos pequenos.",
    detailedDescription: "Kit completo para festas infantis com temas mágicos e personagens favoritos das crianças.",
    price: 189.90,
    image: "https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg?w=400&h=300&fit=crop",
    category: "infantil",
    includes: [
      "Bolo temático (2kg)",
      "24 docinhos variados",
      "Pirulitos decorados",
      "Lembrancinhas",
      "Decoração completa"
    ],
    serves: 20
  },
  {
    id: 4,
    name: "Kit Corporativo Elegante",
    description: "Sofisticação para eventos empresariais e reuniões importantes.",
    detailedDescription: "Kit elegante e refinado para eventos corporativos, coffee breaks e reuniões executivas.",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
    category: "corporativo",
    includes: [
      "Bolo premium (1.5kg)",
      "12 mini tortas",
      "12 petit fours",
      "Brownies gourmet",
      "Embalagem executiva"
    ],
    serves: 15
  },
  {
    id: 5,
    name: "Kit Aniversário Premium",
    description: "Celebração completa com toques especiais e muita doçura.",
    detailedDescription: "Kit premium para aniversários com produtos selecionados e decoração personalizada.",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=400&h=300&fit=crop&crop=center",
    category: "aniversario",
    includes: [
      "Bolo decorado (1.5kg)",
      "18 docinhos premium",
      "Cupcakes personalizados",
      "Velas número",
      "Kit decoração"
    ],
    serves: 15
  },
  {
    id: 6,
    name: "Kit Chá de Bebê",
    description: "Doçura e delicadeza para celebrar a chegada do bebê.",
    detailedDescription: "Kit encantador para chá de bebê com temas unissex ou personalizado por gênero.",
    price: 139.90,
    image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?w=400&h=300&fit=crop",
    category: "chabebe",
    includes: [
      "Bolo tema bebê (1kg)",
      "12 docinhos delicados",
      "Biscoitos decorados",
      "Lembrancinhas",
      "Decoração tema"
    ],
    serves: 12
  }
];

const categories = [
  { id: 'todos', name: 'Todos os Kits' },
  { id: 'essencial', name: 'Mais Vendidos' },
  { id: 'romantico', name: 'Românticos' },
  { id: 'infantil', name: 'Infantis' },
  { id: 'corporativo', name: 'Corporativos' },
  { id: 'aniversario', name: 'Aniversário' },
  { id: 'chabebe', name: 'Chá de Bebê' }
];

export default function KitsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Filtrar kits baseado na categoria selecionada
  const filteredKits = selectedCategory === 'todos' 
    ? kits 
    : kits.filter(kit => kit.category === selectedCategory);

  const handleAddToCart = (kit: typeof kits[0]) => {
    const cartItem = {
      id: Date.now(),
      name: kit.name,
      description: kit.description,
      price: kit.price,
      quantity: 1,
      image: kit.image,
      customization: {
        flavor: 'Personalizado',
        frosting: 'Inclusa no kit',
        toppings: ['Decoração inclusa'],
        addOns: kit.includes,
        extras: [],
      },
    };

    addToCart(cartItem);
    
    // Feedback visual
    alert(`${kit.name} adicionado ao carrinho!`);
  };

  const handleCustomize = (kit: typeof kits[0]) => {
    // Redirecionar para página de customização com dados do kit pré-selecionados
    router.push(`/customize?kit=${kit.id}`);
  };

  const handleCreateCustomKit = () => {
    router.push('/monte-seu-kit');
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />

      <main className="pb-8">
        {/* Hero Section */}
        <div className="px-4 pt-6">
          <div 
            className="flex min-h-[480px] flex-col gap-6 rounded-2xl items-center justify-center p-6 text-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3TF1GGHlyQhC_BBY8_wqTIejv5rUsTd3M28C0qfJVGeQR3M4aNnNWN4tfohpb0gXs1y54sVfRuY12QUf0RGVOv7-Ea8FvgIUElyY8qwqVRk1ACLs9rKI8bQf6iz-o-yBIQXbxZ15pQIbc8rPNm-n_nvYUufLMRolIixyjF6YGUb6QixTEJIjZHGLLc017tbHh69pRaeY5nl2D2afvaQRrwRveEK_DoBA8JBGl1ZoJW-TyFuO1OKdc-Aj5MapYyR4Vg1DU-ghoti7V")`
            }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-white text-4xl font-black leading-tight">
                Monte seu Kit Festa Personalizado
              </h1>
              <h2 className="text-white/90 text-lg font-normal leading-normal">
                Crie um kit delicioso com a sua cara, de forma fácil e divertida.
              </h2>
            </div>
            <button 
              onClick={handleCreateCustomKit}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full transition-colors mt-4"
            >
              Criar Agora
            </button>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex gap-3 px-4 pt-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 transition-colors ${
                selectedCategory === category.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              }`}
            >
              <span className="text-sm font-medium whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Título da seção */}
        <h2 className="text-gray-800 text-2xl font-bold px-4 pb-3 pt-6">
          Nossos Kits
        </h2>

        {/* Lista de kits */}
        <div className="px-4 space-y-4">
          {filteredKits.map((kit) => (
            <div key={kit.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Imagem do kit */}
              <div 
                className="w-full h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${kit.image})` }}
              />
              
              {/* Conteúdo do kit */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {kit.name}
                </h3>
                
                <p className="text-gray-600 mb-3">
                  {kit.description}
                </p>

                {/* Detalhes do kit */}
                <div className="text-sm text-gray-500 space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span>Serve:</span>
                    <span className="font-medium">{kit.serves} pessoas</span>
                  </div>
                  <div>
                    <span className="font-medium">Inclui:</span>
                    <div className="mt-1 text-xs">
                      {kit.includes.slice(0, 3).map((item, index) => (
                        <div key={index}>• {item}</div>
                      ))}
                      {kit.includes.length > 3 && (
                        <div className="text-rose-600 font-medium">
                          + {kit.includes.length - 3} itens
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preço e ações */}
                <div className="flex items-center justify-between">
                  <span className="text-rose-600 font-bold text-lg">
                    R$ {kit.price.toFixed(2)}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(kit)}
                      className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      <ShoppingCartIcon className="h-4 w-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de chamada para ação */}
        <div className="bg-rose-100 rounded-xl mx-4 mt-8 p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Não encontrou o kit ideal?
          </h3>
          <p className="text-gray-600 mb-4">
            Crie um kit totalmente personalizado com suas preferências!
          </p>
          <button 
            onClick={handleCreateCustomKit}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Criar Kit Personalizado
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}