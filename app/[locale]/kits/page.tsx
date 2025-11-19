// app/kits/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

// Dados mockados dos kits
const kits = [
  {
    id: 1,
    name: "Festa na Caixa - Essencial",
    description: "O kit perfeito para uma celebração especial e inesquecível.",
    detailedDescription: "Kit completo com bolo personalizado, docinhos e itens decorativos. Perfeito para celebrações íntimas e especiais.",
    price: 99.90,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc4mxIAkiam7m47zK2CBrLQ28Vxmzq3NHHHD6k7fdUkFa6apYB6Kbs3QWrM0AHYsMETC05bZJE7bULDUyyZsBHRmi1M4K1fX-ywmYhvWZliqRwpjoAlxcWoedkDtjd117ZN7WovzUUcchC2f4F1dVTIb7Ti00tQJ_Kdzhrp6OAPT8GDAPel65nx4i4UMYZ9fgN8g9FfcKEPVucVOar2D_aXFE1v1jdM1_0iZLsaIebNDsB0ukACadV93xuabr8PxDAnO9DxeiEEJKf",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC38mV1LGFWfkduslyUq_4ERsFgLOv7r6ppB-EEF32w3YGjkdbR93dVhQvgRtrFmfkrp3j9Q53crxeG2hNAh5PjRfX1DgAXjWzdXDcgxc0rU3V_wLRdiOPsGVMKF4EZlYuZAbKbkZZR96CCNW9_LHXsCn901Kq6EpU_RjaBdBLTabvq5e_xLaZiEWgqu8lYYNuxx6MZDZu5o7e_u5ph4EXNlOmGbfe4SHH5gK_dt9G-NUucs7TB4dikw2EJ8DuN8dHchbw45z0PRBpsy",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0cq4e9_1diyGdFWla1lr6NaD0kICuvXNzAM9ZlIvXBPpF3GGu8k1AZNuqu5fbkgB6aaFemwgvtTQPpwfr-fmGlo0PFPOJl2u627yyYbtw8cYg9M9jgVSKb_AAEk42rNmki8spwDEbba5KTEHYDKbLMktLYm9U27GDvFnBvkvltvUp6MSJOUnXlO6kv3byv2gpzJTqhaUveonH3ty_JCY_qxfdYUyPUkgRQbnRKcMzdOORWKIK9Z_ozGXWXisDrQKfmzCMxQTKuLAB",
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
    image: "https://images.unsplash.com/photo-1558301214-0c0ea40e6b8e?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop",
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
    <div className="min-h-screen bg-rose-50">
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
      <footer className="bg-rose-100 mt-8 p-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          {/* Instagram */}
          <a 
            href="https://instagram.com/jujubolos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-700 transition-colors"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.153 2.153c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.153 2.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.153-2.153c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 012.153-2.153c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0-2c-2.19 0-2.458.01-3.542.057-1.19.055-2.227.248-3.138.608-1.02.414-1.928 1.02-2.784 1.876S1.414 4.542 1 5.562c-.36.91-.553 1.948-.608 3.138C.01 9.542 0 9.81 0 12s.01 2.458.057 3.542c.055 1.19.248 2.227.608 3.138.414 1.02 1.02 1.928 1.876 2.784s1.764 1.462 2.784 1.876c.91.36 1.948.553 3.138.608C9.542 23.99 9.81 24 12 24s2.458-.01 3.542-.057c1.19-.055 2.227-.248 3.138-.608 1.02-.414 1.928-1.02 2.784-1.876s1.462-1.764 1.876-2.784c.36-.91.553-1.948.608-3.138C23.99 14.458 24 14.19 24 12s-.01-2.458-.057-3.542c-.055-1.19-.248-2.227-.608-3.138-.414-1.02-1.02-1.928-1.876-2.784s-1.764-1.462-2.784-1.876c-.91-.36-1.948-.553-3.138-.608C14.458.01 14.19 0 12 0z"/>
              <path d="M12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://facebook.com/jujubolos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-700 transition-colors"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-700 transition-colors"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464"/>
            </svg>
          </a>
        </div>

        <div className="flex justify-center gap-4 gap-y-2 flex-wrap text-sm mt-4">
          <a href="/contato" className="text-rose-600 font-medium hover:underline">
            Contato
          </a>
          <a href="/faq" className="text-rose-600 font-medium hover:underline">
            FAQ
          </a>
          <a href="/entrega" className="text-rose-600 font-medium hover:underline">
            Política de Entrega
          </a>
          <a href="/termos" className="text-rose-600 font-medium hover:underline">
            Termos de Serviço
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          © 2024 Juju Bolos Decorados. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}