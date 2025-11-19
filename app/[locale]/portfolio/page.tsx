// app/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Client/Header';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronDownIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Dados do portfólio - foco em imagens e inspiração
const portfolioItems = [
  {
    id: 1,
    title: "Casamento Floral Elegante",
    category: "Casamento",
    description: "Bolo de noiva com decoração floral natural e detalhes em dourado",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdiU8oQSTRRohMxEkg4V_39E7TEhf9bfn1am1mpr3q9eB9ba-E1vvMYK9dBqnP7hv5DOKn8k15UIUi76aLGRw5s3OHaon2SVhu93YfZ6zYrcSZYtL-RnN6kFa0cUXBOnLVQNDd3Yog0KzAyWRjcYwZzWrEO7HPiCPNHxZnF1Gf86g5_WUCE3rpENWixeNkD-fIyFn9hpOaKQKuIp9hx7ZjZktp38nJbYR_2-UU21N-ktN6Sn1kSWKvsPws6i5jpeVHv_C3JLybsLKn",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop"
    ],
    tags: ["Elegante", "Floral", "Dourado", "2 Andares"],
    featured: true
  },
  {
    id: 2,
    title: "Jardim Encantado Infantil",
    category: "Aniversário",
    description: "Tema de floresta encantada com animais e cogumelos",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChpO64SeKSkYbsjlQrr9_0fDEwndNVQA1-ppvsS2TK8cNuffzKDPo7XTcr9ECB8SoF3S1h5-q2m0z9iBTlMPNy4u_JQVAO8K06RTKFx9xqQrjMDNeP3WVy17nnBnEUSucRkSjbfQLIboUAI2U1uDq3uOycherXw7s3qyQRXJrgWp4B8FbxGcLUiVHJRykHLUm8nkAbCgPQa_k7vUwNw01l7b4R-ZoYu3Zcme7-vd8B_z_OYdLUOv7LbBQSZm0WDGacGzp1ASSMN8yz",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop"
    ],
    tags: ["Infantil", "Floresta", "Colorido", "Temático"],
    featured: true
  },
  {
    id: 3,
    title: "Tentação de Chocolate",
    category: "Aniversário",
    description: "Bolo drip de chocolate com morangos frescos e decoracao moderna",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwY88NX7MFpXY4vXoaDWWNS1DzEotn1ByBJ41d1D9pZaw1eJ93TUk_K-m7IdIUXSBI83U9iRt05PuSc4MYOlpW2TnVYFPjNC_pfQv_1EFM7mz9_MxOyBwR3GegwHbfW_jnD27r4VqssayPj72wWcl8bgD8XwqblrvklBm0YrSfrmKcOPJimkIE4dzQMxV8jH1xtldByV7dJSrS7r1k5IV_sTyvhubYfTgqc9g0EqB01pBCa9ftjXmya7OCfrr7wdZtIKIQcRtshye_"
    ],
    tags: ["Chocolate", "Moderno", "Drip", "Morangos"],
    featured: false
  },
  {
    id: 4,
    title: "Chá de Bebê Nuvens",
    category: "Chá de Bebê",
    description: "Tema delicado em azul e branco com nuvens e arco-íris",
    images: [
      "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=600&fit=crop"
    ],
    tags: ["Bebê", "Nuvens", "Delicado", "Unissex"],
    featured: true
  },
  {
    id: 5,
    title: "Formatura Clássica",
    category: "Formatura",
    description: "Bolo temático com capelo e diploma em pasta americana",
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop"
    ],
    tags: ["Formatura", "Capelo", "Elegante", "Personalizado"],
    featured: false
  },
  {
    id: 6,
    title: "Rústico com Flores Campestres",
    category: "Casamento",
    description: "Naked cake com flores do campo e estilo campestre",
    images: [
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop"
    ],
    tags: ["Rústico", "Naked Cake", "Flores", "Campestre"],
    featured: true
  },
  {
    id: 7,
    title: "Super Heróis Infantil",
    category: "Aniversário",
    description: "Bolo temático de super heróis para festa infantil",
    images: [
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop"
    ],
    tags: ["Infantil", "Super Heróis", "Colorido", "Divertido"],
    featured: false
  },
  {
    id: 8,
    title: "Aniversário Dourado",
    category: "Aniversário",
    description: "Elegante bolo de aniversário adulto com detalhes em dourado",
    images: [
      "https://images.unsplash.com/photo-1558301214-0c28b4d0fcb5?w=800&h=600&fit=crop"
    ],
    tags: ["Elegante", "Dourado", "Adulto", "Sofisticado"],
    featured: true
  }
];

const categories = ["Todos", "Casamento", "Aniversário", "Chá de Bebê", "Formatura"];
const tags = ["Todos", "Elegante", "Floral", "Infantil", "Rústico", "Moderno", "Colorido", "Temático"];

export default function PortfolioPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTag, setSelectedTag] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filtrar itens do portfólio
  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesTag = selectedTag === 'Todos' || item.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleRequestQuote = (itemTitle?: string) => {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const baseMessage = "Olá! Gostaria de fazer um orçamento para um bolo personalizado.";
    const message = itemTitle ? `${baseMessage} Me interessei pelo modelo: ${itemTitle}` : baseMessage;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedTag('Todos');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />

      <main className="pb-24">
        {/* Cabeçalho Inspiracional */}
        <div className="bg-rose-500 text-white py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nosso Portfólio</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Inspire-se com nossas criações e deixe sua celebração ainda mais especial
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white border-b border-rose-100">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Barra de pesquisa */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar por tema, ocasião ou estilo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-12 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filtros rápidos */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-full border border-rose-600 bg-rose-600/10 px-4 py-2 text-sm font-medium text-rose-600"
              >
                <FunnelIcon className="h-4 w-4" />
                Filtros
              </button>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {(selectedCategory !== 'Todos' || selectedTag !== 'Todos' || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Limpar Filtros
                </button>
              )}
            </div>

            {/* Filtros expandidos */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-rose-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-rose-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTag === tag
                            ? 'bg-rose-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grid do Portfólio */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Nenhuma criação encontrada com os filtros selecionados.</p>
              <button
                onClick={clearFilters}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Ver todo o portfólio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                  onClick={() => openModal(item)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay no hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestQuote(item.title);
                          }}
                          className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors"
                        >
                          <HeartIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.featured && (
                        <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Destaque
                        </span>
                      )}
                      <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-rose-50 text-rose-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {item.images.length} foto{item.images.length !== 1 ? 's' : ''}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestQuote(item.title);
                        }}
                        className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                      >
                        Orçar este modelo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              {/* Imagem Principal */}
              <div className="relative h-96 bg-gray-100">
                <img
                  src={selectedItem.images[currentImageIndex]}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navegação de Imagens */}
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                    >
                      <ChevronDownIcon className="h-6 w-6 rotate-90" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                    >
                      <ChevronDownIcon className="h-6 w-6 -rotate-90" />
                    </button>
                  </>
                )}

                {/* Indicadores */}
                {selectedItem.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedItem.images.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Botão Fechar */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                >
                  <ChevronDownIcon className="h-6 w-6 rotate-45" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedItem.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                  </div>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedItem.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleRequestQuote(selectedItem.title)}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                  >
                    Quero um Orçamento
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante para orçamento */}
      <button
        onClick={() => handleRequestQuote()}
        className="fixed bottom-6 right-6 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors z-40 flex items-center gap-2"
      >
        <HeartIcon className="h-5 w-5" />
        Fazer Orçamento
      </button>
    </div>
  );
}