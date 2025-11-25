// app/products/page.tsx
'use client';


import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Dados mockados dos bolos
const bolos = [
  {
    id: 1,
    name: "Bolo de Casamento Floral",
    description: "Dois andares, recheio de nozes",
    detailedDescription: "Bolo elegante para cerimônias, com dois andares e decoração floral natural. Recheio premium de nozes com cream cheese.",
    price: 180.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdiU8oQSTRRohMxEkg4V_39E7TEhf9bfn1am1mpr3q9eB9ba-E1vvMYK9dBqnP7hv5DOKn8k15UIUi76aLGRw5s3OHaon2SVhu93YfZ6zYrcSZYtL-RnN6kFa0cUXBOnLVQNDd3Yog0KzAyWRjcYwZzWrEO7HPiCPNHxZnF1Gf86g5_WUCE3rpENWixeNkD-fIyFn9hpOaKQKuIp9hx7ZjZktp38nJbYR_2-UU21N-ktN6Sn1kSWKvsPws6i5jpeVHv_C3JLybsLKn",
    category: "Casamento",
    flavors: ["Baunilha", "Chocolate Branco"],
    size: "2 andares",
    serves: 50
  },
  {
    id: 2,
    name: "Bolo Jardim Encantado",
    description: "Massa de baunilha com brigadeiro",
    detailedDescription: "Bolo temático com decoração de jardim encantado, borboletas e flores comestíveis. Perfeito para aniversários infantis e festas temáticas.",
    price: 120.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChpO64SeKSkYbsjlQrr9_0fDEwndNVQA1-ppvsS2TK8cNuffzKDPo7XTcr9ECB8SoF3S1h5-q2m0z9iBTlMPNy4u_JQVAO8K06RTKFx9xqQrjMDNeP3WVy17nnBnEUSucRkSjbfQLIboUAI2U1uDq3uOycherXw7s3qyQRXJrgWp4B8FbxGcLUiVHJRykHLUm8nkAbCgPQa_k7vUwNw01l7b4R-ZoYu3Zcme7-vd8B_z_OYdLUOv7LbBQSZm0WDGacGzp1ASSMN8yz",
    category: "Aniversário",
    flavors: ["Baunilha", "Chocolate"],
    size: "Médio",
    serves: 30
  },
  {
    id: 3,
    name: "Bolo Tentação de Chocolate",
    description: "Chocolate meio amargo com morangos",
    detailedDescription: "Para os amantes de chocolate! Bolo com cobertura drip de chocolate meio amargo, recheio de brigadeiro e morangos frescos.",
    price: 90.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwY88NX7MFpXY4vXoaDWWNS1DzEotn1ByBJ41d1D9pZaw1eJ93TUk_K-m7IdIUXSBI83U9iRt05PuSc4MYOlpW2TnVYFPjNC_pfQv_1EFM7mz9_MxOyBwR3GegwHbfW_jnD27r4VqssayPj72wWcl8bgD8XwqblrvklBm0YrSfrmKcOPJimkIE4dzQMxV8jH1xtldByV7dJSrS7r1k5IV_sTyvhubYfTgqc9g0EqB01pBCa9ftjXmya7OCfrr7wdZtIKIQcRtshye_",
    category: "Aniversário",
    flavors: ["Chocolate", "Red Velvet"],
    size: "Pequeno",
    serves: 20
  },
  {
    id: 4,
    name: "Bolo de Chá de Bebê Unissex",
    description: "Tema nuvens e arco-íris",
    detailedDescription: "Bolo delicado para chá de bebê com tema de nuvens e arco-íris. Cores suaves e decoração fofa.",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    category: "Chá de Bebê",
    flavors: ["Baunilha", "Limão"],
    size: "Médio",
    serves: 25
  },
  {
    id: 5,
    name: "Bolo de Formatura",
    description: "Decorado com capelo e diploma",
    detailedDescription: "Bolo temático para formaturas, com detalhes em pasta americana representando capelo e diploma. Personalizável com as cores da faculdade.",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400&h=300&fit=crop",
    category: "Formatura",
    flavors: ["Chocolate", "Baunilha"],
    size: "Grande",
    serves: 40
  },
  {
    id: 6,
    name: "Bolo Rustico de Noivas",
    description: "Decoration naked cake com flores",
    detailedDescription: "Bolo no estilo naked cake com efeito rústico, decorado com flores naturais. Perfeito para casamentos ao ar livre.",
    price: 200.00,
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop",
    category: "Casamento",
    flavors: ["Red Velvet", "Baunilha"],
    size: "3 andares",
    serves: 60
  }
];

const categories = ["Todos", "Casamento", "Aniversário", "Chá de Bebê", "Formatura"];
const sizes = ["Todos", "Pequeno", "Médio", "Grande", "2 andares", "3 andares"];
const flavors = ["Todos", "Chocolate", "Baunilha", "Red Velvet", "Limão", "Chocolate Branco"];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'Todos';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Todos');
  const [selectedSize, setSelectedSize] = useState('Todos');
  const [selectedFlavor, setSelectedFlavor] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'Todos';
    
    setSearchTerm(search);
    setSelectedCategory(category);
  }, [searchParams]);

  // Função para atualizar a URL sem recarregar a página
  const updateURL = (params: { search?: string; category?: string }) => {
    const newParams = new URLSearchParams();
    
    if (params.search) newParams.set('search', params.search);
    if (params.category && params.category !== 'Todos') newParams.set('category', params.category);
    
    const queryString = newParams.toString();
    const newUrl = queryString ? `/products?${queryString}` : '/products';
    
    router.push(newUrl, { scroll: false });
  };

  // Filtrar bolos baseado nas seleções
  const filteredBolos = bolos.filter(bolo => {
    const matchesSearch = searchTerm === '' || 
      bolo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bolo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bolo.flavors.some(flavor => flavor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todos' || bolo.category === selectedCategory;
    const matchesSize = selectedSize === 'Todos' || bolo.size === selectedSize;
    const matchesFlavor = selectedFlavor === 'Todos' || bolo.flavors.includes(selectedFlavor);
    
    return matchesSearch && matchesCategory && matchesSize && matchesFlavor;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchTerm, category: selectedCategory });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ search: searchTerm, category });
  };

  const handleAddToCart = (bolo: typeof bolos[0]) => {
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

  const handleCustomize = (bolo: typeof bolos[0]) => {
    // Redirecionar para página de customização com dados pré-selecionados
    router.push('/customize');
  };

  const handleRequestQuote = () => {
    // Redirecionar para WhatsApp
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const message = "Olá! Gostaria de fazer um orçamento para um bolo personalizado.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setSelectedSize('Todos');
    setSelectedFlavor('Todos');
    router.push('/products', { scroll: false });
  };

  const clearSearch = () => {
    setSearchTerm('');
    updateURL({ search: '', category: selectedCategory });
  };

  // Contador de filtros ativos
  const activeFiltersCount = [
    searchTerm ? 1 : 0,
    selectedCategory !== 'Todos' ? 1 : 0,
    selectedSize !== 'Todos' ? 1 : 0,
    selectedFlavor !== 'Todos' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

    return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />

      <main className="pb-24">
        {/* Título com contador de resultados */}
        <div className="px-4 pb-3 pt-6">
          <h1 className="text-3xl font-bold text-[#4F2712] mb-2">
            Nossas Criações
          </h1>
          {filteredBolos.length > 0 && (
            <p className="text-gray-600">
              {filteredBolos.length} {filteredBolos.length === 1 ? 'bolo encontrado' : 'bolos encontrados'}
              {activeFiltersCount > 0 && ` • ${activeFiltersCount} filtro(s) ativo(s)`}
            </p>
          )}
        </div>

        {/* Barra de pesquisa */}
        <div className="px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar bolos, sabores, ocasiões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-10 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        {/* Barra de filtros rápidos */}
        <div className="flex gap-3 overflow-x-auto p-4 pt-0">
          {/* Botão Filtrar com contador */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-rose-600 bg-rose-600/10 px-3 relative"
          >
            <FunnelIcon className="h-4 w-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">Filtrar</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Filtros rápidos de categoria */}
          <button
            onClick={() => handleCategoryChange('Todos')}
            className={`flex h-8 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-medium ${
              selectedCategory === 'Todos' 
                ? 'border-rose-600 bg-rose-600 text-white' 
                : 'border-gray-200 bg-white text-gray-700'
            }`}
          >
            Todos
          </button>

          {categories.filter(cat => cat !== 'Todos').map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex h-8 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-medium ${
                selectedCategory === category 
                  ? 'border-rose-600 bg-rose-600 text-white' 
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filtros expandidos */}
        {showFilters && (
          <div className="border-t border-rose-100 bg-white p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Filtros</h3>
              <button
                onClick={clearFilters}
                className="text-rose-600 hover:text-rose-700 text-sm font-medium"
              >
                Limpar tudo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tamanho</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sabor</label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                {flavors.map(flavor => (
                  <option key={flavor} value={flavor}>{flavor}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Lista de bolos */}
        <div className="flex flex-col gap-4 px-4">
          {filteredBolos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-2" />
                <p className="text-gray-500 mb-2">Nenhum bolo encontrado</p>
                <p className="text-sm text-gray-400 mb-4">
                  {activeFiltersCount > 0 
                    ? "Tente ajustar os filtros ou buscar por outros termos."
                    : "Em breve teremos novidades!"
                  }
                </p>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            filteredBolos.map((bolo) => (
              <div key={bolo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div 
                  className="aspect-video w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${bolo.image})` }}
                />
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#4F2712] flex-1">{bolo.name}</h3>
                    <span className="bg-rose-100 text-rose-600 text-xs font-medium px-2 py-1 rounded-full ml-2">
                      {bolo.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{bolo.description}</p>
                  
                  <div className="text-sm text-gray-500 space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>Serve:</span>
                      <span className="font-medium">{bolo.serves} pessoas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabores:</span>
                      <span className="font-medium">{bolo.flavors.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho:</span>
                      <span className="font-medium">{bolo.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-rose-600 font-bold text-lg">
                      R$ {bolo.price.toFixed(2)}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(bolo)}
                        className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Botão flutuante para orçamento */}
      <button
        onClick={handleRequestQuote}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-colors z-10"
      >
        <PlusIcon className="h-5 w-5" />
        Fazer Orçamento
      </button>
    </div>
  );
}