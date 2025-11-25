// app/customize/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, ArrowRightIcon, ShoppingBagIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';

// Dados mockados existentes
const cakeFlavors = [
  { 
    id: 1, 
    name: 'Chocolate', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJeZalV3RmogkHWMdqXX_lLoBKmiLozGHk2ondHXW3XTYMpDBkNLgCwzWtowoRcw5E2_DAwToez2QUZuwiqbsDsUiaNN5wHJUPr58L1g2jQJfFUXSlo5BGqm4e2Ee-ERUr9BYOrCv1uCfkzbfry_bav5vzKi_ktJVrl8zqJW9kQ2UV7pcVk3q28NU651xYugpLzVISVeu8e2nKiQsIeUSCLIAecCBTrgPvSYueN_WsjkCP6skDA3T04bZpyw7TB-m6UHxo4CXwZCQ3',
    description: 'Massa de chocolate úmida com cacau premium',
    price: 25.00
  },
  { 
    id: 2, 
    name: 'Vanilla', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKqeEC4X-KxPcVbMRpMrGRSXCZK-pSy2VCL5aqyCAYfa5ErEty-frbZ0A-gZbIF_9OskNOAidZDzcPDvCzxplND_9NK_7sYeyctkrlnqbYybQJOHk6xHakF2wGQ0I43p1XXIYJ-DTJQElJwXQLafwBurA2qj1VTGRjxD-MwcqLeRI-eVV6qQ-92doLdwY5U-SMiMeazAB3pqNWefFyaym_YvbG8sL_TpV7WCCGpq-z3Uy7uRcVfVKvDS0is71JMQ9m4bDrgQfaIy0W',
    description: 'Massa branca fofinha com baunilha natural',
    price: 23.00
  },
  { 
    id: 3, 
    name: 'Strawberry', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzEekZVIgwxUupPb7u50DmZPgEuh8aQfxSRf3mf0JyoM1T8gJkKRQmQOAC3r9CHsB893stlgbFrWJZ8J_lYqpFof0XpUcZtqa347Lp0H1et-Kk4gA_ugA0WjJpKpPhLF90fXEMxBZJK9KSRTJXtbnmMD89NQf1d3cilyqwC5jQrpABXK-t83E7MLwDiA8D9hB_uwo270xuWcB5rdfeSNYFaDHdSC1XtqbxoWyKGTEOH-84F-nYRR8WqVrx4m9JRFCfG_dIMkGjsG55',
    description: 'Massa com pedaços de morango fresco',
    price: 28.00
  },
  { 
    id: 4, 
    name: 'Red Velvet', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-W88WhWwRYe3C-ycr-u8qdcyhhM0fWt4iJ7C2VvNBHrNjz0XR11HKBSApy0GqHPHzaz-fIwL42Wqq3h0wCoQhbXZRHn5u9Ec47gsTbNFPIlXG5AZ-s47blFk9tvYvDbm2873ATMdA0ysCywitWifttfl0nmjgp-V6Pc67VmXNXyOtVAv8xUj-O7Iyl7lok0PYM0B0G0AFlUkHehPBN9exS4b81akDsOJH4iDbwhZbx6tuwatiQAJ4mewV1IxPKMPLZwgRGj-_7lGx',
    description: 'Massa aveludada vermelha com toque de cacau',
    price: 30.00
  },
];

const frostings = [
  {
    id: 1,
    name: 'Buttercream Clássico',
    description: 'Cobertura cremosa de manteiga',
    price: 5.00,
  },
  {
    id: 2,
    name: 'Ganache de Chocolate',
    description: 'Chocolate derretido com creme',
    price: 7.00,
  },
  {
    id: 3,
    name: 'Cream Cheese',
    description: 'Cobertura cremosa com queijo',
    price: 6.00,
  },
  {
    id: 4,
    name: 'Merengue Italiano',
    description: 'Merengue leve e doce',
    price: 8.00,
  },
];

const toppings = [
  {
    id: 1,
    name: 'Frutas Frescas',
    description: 'Morangos, kiwis e blueberries',
    price: 12.00,
  },
  {
    id: 2,
    name: 'Chocolate Premium',
    description: 'Lascas de chocolate belga',
    price: 10.00,
  },
  {
    id: 3,
    name: 'Flores Comestíveis',
    description: 'Decoração floral natural',
    price: 15.00,
  },
  {
    id: 4,
    name: 'Confeitos Coloridos',
    description: 'Sprinkles e confeitos diversos',
    price: 8.00,
  },
];

const addOns = [
  {
    id: 1,
    name: 'Velas Personalizadas',
    description: 'Velas com número ou tema',
    price: 5.00,
  },
  {
    id: 2,
    name: 'Placa de Mensagem',
    description: 'Placa com mensagem personalizada',
    price: 8.00,
  },
  {
    id: 3,
    name: 'Caixa Presente',
    description: 'Embalagem especial para presente',
    price: 12.00,
  },
  {
    id: 4,
    name: 'Topper Personalizado',
    description: 'Decoração de topo temática',
    price: 15.00,
  },
];

const extras = [
  {
    id: 1,
    name: 'Bem Casados',
    description: 'Casquinha crocante com recheio cremoso',
    price: 2.50,
    category: 'doces'
  },
  {
    id: 2,
    name: 'Brigadeiros',
    description: 'Brigadeiros tradicionais de chocolate',
    price: 1.50,
    category: 'doces'
  },
  {
    id: 3,
    name: 'Beijinhos',
    description: 'Docinho de coco com leite condensado',
    price: 1.50,
    category: 'doces'
  },
  {
    id: 4,
    name: 'Cajuzinhos',
    description: 'Doce de amendoim com chocolate',
    price: 1.75,
    category: 'doces'
  },
  {
    id: 5,
    name: 'Coxinhas',
    description: 'Coxinhas de frango com catupiry',
    price: 4.00,
    category: 'salgados'
  },
  {
    id: 6,
    name: 'Quiches',
    description: 'Quiches de espinafre e queijo',
    price: 5.00,
    category: 'salgados'
  },
  {
    id: 7,
    name: 'Mini Empadas',
    description: 'Empadinhas de palmito e frango',
    price: 3.50,
    category: 'salgados'
  },
  {
    id: 8,
    name: 'Bolinhos de Queijo',
    description: 'Bolinhos de queijo assados',
    price: 3.50,
    category: 'salgados'
  },
];

export default function CustomizeCakeKit() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState([1]);
  const [selectedOptions, setSelectedOptions] = useState({
    flavor: null as number | null,
    frosting: null as number | null,
    toppings: [] as number[],
    addOns: [] as number[],
    extras: [] as number[],
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);

  // Atualizar step quando expandir seções
  useEffect(() => {
    if (expandedSections.length === 0) {
      setCurrentStep(1);
    } else {
      const highestExpanded = Math.max(...expandedSections);
      setCurrentStep(highestExpanded);
    }
  }, [expandedSections]);

  const toggleSection = (sectionId: number) => {
    // Não permitir colapsar todas as seções - sempre manter pelo menos uma expandida
    if (expandedSections.includes(sectionId) && expandedSections.length === 1) {
      return;
    }

    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Expandir automaticamente a próxima seção quando selecionar um sabor
  useEffect(() => {
    if (selectedOptions.flavor && currentStep === 1) {
      setExpandedSections(prev => [...prev.filter(id => id !== 1), 2]);
    }
  }, [selectedOptions.flavor, currentStep]);

  const handleOptionSelect = (type: keyof typeof selectedOptions, id: number, isMulti = false) => {
    setSelectedOptions(prev => {
      if (isMulti) {
        const current = prev[type] as number[];
        return {
          ...prev,
          [type]: current.includes(id)
            ? current.filter(item => item !== id)
            : [...current, id],
        };
      } else {
        return {
          ...prev,
          [type]: prev[type] === id ? null : id,
        };
      }
    });

    // Se selecionou um sabor (passo 1 obrigatório), expandir automaticamente o próximo passo
    if (type === 'flavor' && id !== null) {
      setTimeout(() => {
        setExpandedSections(prev => {
          const newSections = prev.filter(section => section !== 1);
          return [...newSections, 2].sort((a, b) => a - b);
        });
      }, 300);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (selectedOptions.flavor) {
      const flavor = cakeFlavors.find(f => f.id === selectedOptions.flavor);
      total += flavor?.price || 0;
    }
    
    if (selectedOptions.frosting) {
      const frosting = frostings.find(f => f.id === selectedOptions.frosting);
      total += frosting?.price || 0;
    }
    
    selectedOptions.toppings.forEach(toppingId => {
      const topping = toppings.find(t => t.id === toppingId);
      total += topping?.price || 0;
    });
    
    selectedOptions.addOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      total += addOn?.price || 0;
    });
    
    selectedOptions.extras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      total += extra?.price || 0;
    });
    
    return total;
  };

  const getStepTitle = (step: number) => {
    const titles = {
      1: 'Sabor do Bolo',
      2: 'Cobertura',
      3: 'Toppings',
      4: 'Add-Ons',
      5: 'Extras',
    };
    return titles[step as keyof typeof titles] || '';
  };

  const handleAddToCart = () => {
    // Verificar se pelo menos o sabor foi selecionado
    if (!selectedOptions.flavor) {
      alert('Por favor, selecione um sabor para o bolo!');
      // Expandir automaticamente a seção de sabores se não estiver expandida
      if (!expandedSections.includes(1)) {
        setExpandedSections(prev => [1, ...prev]);
      }
      return;
    }

    const selectedFlavor = cakeFlavors.find(f => f.id === selectedOptions.flavor);
    const selectedFrosting = frostings.find(f => f.id === selectedOptions.frosting);
    const selectedToppings = toppings.filter(t => selectedOptions.toppings.includes(t.id));
    const selectedAddOns = addOns.filter(a => selectedOptions.addOns.includes(a.id));
    const selectedExtras = extras.filter(e => selectedOptions.extras.includes(e.id));

    // Criar um nome descritivo para o item do carrinho
    let name = `Bolo de ${selectedFlavor?.name} Personalizado`;
    let description = `Sabor ${selectedFlavor?.name}`;

    if (selectedFrosting) {
      description += ` com ${selectedFrosting.name}`;
    }

    if (selectedToppings.length > 0) {
      description += ` e ${selectedToppings.map(t => t.name).join(', ')}`;
    }

    if (selectedAddOns.length > 0) {
      description += ` + ${selectedAddOns.map(a => a.name).join(', ')}`;
    }

    if (selectedExtras.length > 0) {
      description += ` | Extras: ${selectedExtras.map(e => e.name).join(', ')}`;
    }

    const cartItem = {
      id: Date.now(), // ID único baseado no timestamp
      name,
      description,
      price: calculateTotal(),
      quantity: 1,
      image: selectedFlavor?.image || '',
      customization: {
        flavor: selectedFlavor?.name || '',
        frosting: selectedFrosting?.name || 'Nenhuma',
        toppings: selectedToppings.map(t => t.name),
        addOns: selectedAddOns.map(a => a.name),
        extras: selectedExtras.map(e => e.name),
      },
    };

    addToCart(cartItem);
    setLastAddedItem(cartItem);
    setShowConfirmationModal(true);
  };

  const handleContinueShopping = () => {
    setShowConfirmationModal(false);
    router.push('/');
  };

  const handleGoToCart = () => {
    setShowConfirmationModal(false);
    router.push('/cart');
  };

  const handleCustomizeAnother = () => {
    setShowConfirmationModal(false);
    // Resetar todas as seleções para personalizar outro bolo
    setSelectedOptions({ flavor: null, frosting: null, toppings: [], addOns: [], extras: [] });
    setExpandedSections([1]);
    setCurrentStep(1);
  };

  // Determinar se uma seção pode ser acessada (só permite acessar a próxima seção após completar a anterior)
  const isSectionAccessible = (sectionId: number) => {
    if (sectionId === 1) return true; // Sempre acessível
    if (sectionId === 2) return selectedOptions.flavor !== null;
    if (sectionId === 3) return selectedOptions.flavor !== null;
    if (sectionId === 4) return selectedOptions.flavor !== null;
    if (sectionId === 5) return selectedOptions.flavor !== null;
    return false;
  };

  const getSectionState = (sectionId: number) => {
    const isAccessible = isSectionAccessible(sectionId);
    const isExpanded = expandedSections.includes(sectionId);
    const isCompleted = sectionId < currentStep;
    
    return {
      isAccessible,
      isExpanded,
      isCompleted,
      isCurrent: sectionId === currentStep
    };
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />

      <main className="pb-32">
        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrayjEUqOlp8xmiGb8YbYkckommk2_lOzXnDWb1K5rqkwqLOOSJVqozRlC2JE1tePHEe5oxtlQLKWRaP0Idty0IVHbbpEeeyGE-aTvym26YHA69DKg6J8rx9RMcH8mDPgRl3QR2a3zL4SuP4wDhTaBFIpU2qOgnAggSADsYj94CRjkkMPRIjp8Mz-RAn1CRt21blUlmhtT-gd3lTcyUyuHfd83anjbBGimi9tz6gz9bgutZ90GZVQWErmoSMCx3V2m2tmERMclYu_W"
            alt="Beautifully decorated cake with colorful frosting"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-rose-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Monte Seu Bolo Personalizado
          </h1>
          <p className="text-gray-600 mb-6">
            Crie a celebração perfeita com nossos kits de bolo personalizados. 
            {!selectedOptions.flavor && (
              <span className="text-rose-500 font-semibold"> Comece selecionando um sabor!</span>
            )}
          </p>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Passo {Math.max(1, currentStep)} de 5</span>
              <span className="text-rose-600 font-semibold">{getStepTitle(Math.max(1, currentStep))}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Math.max(1, currentStep) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Customization Sections */}
          <div className="space-y-4">
            {/* Cake Flavor - SEMPRE ACESSÍVEL */}
            <section className={`bg-white rounded-xl shadow-sm p-4 ${
              !getSectionState(1).isAccessible ? 'opacity-50' : ''
            }`}>
              <button
                onClick={() => toggleSection(1)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(1).isAccessible}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">1. Escolha o Sabor do Bolo</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedOptions.flavor ? 'Sabor selecionado!' : 'Selecione uma opção deliciosa'}
                  </p>
                </div>
                {expandedSections.includes(1) ? (
                  <ChevronUpIcon className="h-5 w-5 text-rose-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedSections.includes(1) && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {cakeFlavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => handleOptionSelect('flavor', flavor.id)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        selectedOptions.flavor === flavor.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                      <span className="font-semibold text-gray-800">{flavor.name}</span>
                      <span className="text-sm text-rose-600 font-medium mt-1">
                        R$ {flavor.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Frosting & Filling */}
            <section className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
              !getSectionState(2).isAccessible ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => getSectionState(2).isAccessible && toggleSection(2)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(2).isAccessible}
              >
                <div>
                  <h3 className={`text-xl font-bold ${
                    getSectionState(2).isAccessible ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    2. Selecione a Cobertura
                    {!getSectionState(2).isAccessible && ' (Selecione um sabor primeiro)'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedOptions.frosting ? 'Cobertura selecionada!' : 'Escolha sua cobertura preferida'}
                  </p>
                </div>
                {expandedSections.includes(2) ? (
                  <ChevronUpIcon className={`h-5 w-5 ${
                    getSectionState(2).isAccessible ? 'text-rose-500' : 'text-gray-300'
                  }`} />
                ) : (
                  <ChevronDownIcon className={`h-5 w-5 ${
                    getSectionState(2).isAccessible ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
              </button>

              {expandedSections.includes(2) && getSectionState(2).isAccessible && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {frostings.map((frosting) => (
                    <button
                      key={frosting.id}
                      onClick={() => handleOptionSelect('frosting', frosting.id)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        selectedOptions.frosting === frosting.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 mb-2 flex items-center justify-center">
                        <span className="text-rose-500 text-xs font-bold">COBERTURA</span>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm text-center">
                        {frosting.name}
                      </span>
                      <span className="text-sm text-rose-600 font-medium mt-1">
                        +R$ {frosting.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Toppings & Decor */}
            <section className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
              !getSectionState(3).isAccessible ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => getSectionState(3).isAccessible && toggleSection(3)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(3).isAccessible}
              >
                <div>
                  <h3 className={`text-xl font-bold ${
                    getSectionState(3).isAccessible ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    3. Escolha os Toppings
                    {!getSectionState(3).isAccessible && ' (Selecione um sabor primeiro)'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedOptions.toppings.length > 0 ? `${selectedOptions.toppings.length} topping(s) selecionado(s)!` : 'Selecione quantos quiser'}
                  </p>
                </div>
                {expandedSections.includes(3) ? (
                  <ChevronUpIcon className={`h-5 w-5 ${
                    getSectionState(3).isAccessible ? 'text-rose-500' : 'text-gray-300'
                  }`} />
                ) : (
                  <ChevronDownIcon className={`h-5 w-5 ${
                    getSectionState(3).isAccessible ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
              </button>

              {expandedSections.includes(3) && getSectionState(3).isAccessible && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {toppings.map((topping) => (
                    <button
                      key={topping.id}
                      onClick={() => handleOptionSelect('toppings', topping.id, true)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        selectedOptions.toppings.includes(topping.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-2 flex items-center justify-center">
                        <span className="text-green-500 text-xs font-bold">TOP</span>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm text-center">
                        {topping.name}
                      </span>
                      <span className="text-sm text-green-600 font-medium mt-1">
                        +R$ {topping.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Add-Ons */}
            <section className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
              !getSectionState(4).isAccessible ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => getSectionState(4).isAccessible && toggleSection(4)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(4).isAccessible}
              >
                <div>
                  <h3 className={`text-xl font-bold ${
                    getSectionState(4).isAccessible ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    4. Add-Ons
                    {!getSectionState(4).isAccessible && ' (Selecione um sabor primeiro)'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedOptions.addOns.length > 0 ? `${selectedOptions.addOns.length} add-on(s) selecionado(s)!` : 'Itens extras para sua celebração'}
                  </p>
                </div>
                {expandedSections.includes(4) ? (
                  <ChevronUpIcon className={`h-5 w-5 ${
                    getSectionState(4).isAccessible ? 'text-rose-500' : 'text-gray-300'
                  }`} />
                ) : (
                  <ChevronDownIcon className={`h-5 w-5 ${
                    getSectionState(4).isAccessible ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
              </button>

              {expandedSections.includes(4) && getSectionState(4).isAccessible && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {addOns.map((addOn) => (
                    <button
                      key={addOn.id}
                      onClick={() => handleOptionSelect('addOns', addOn.id, true)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        selectedOptions.addOns.includes(addOn.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-2 flex items-center justify-center">
                        <span className="text-blue-500 text-xs font-bold">ADD</span>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm text-center">
                        {addOn.name}
                      </span>
                      <span className="text-sm text-blue-600 font-medium mt-1">
                        +R$ {addOn.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Extras */}
            <section className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
              !getSectionState(5).isAccessible ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => getSectionState(5).isAccessible && toggleSection(5)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(5).isAccessible}
              >
                <div>
                  <h3 className={`text-xl font-bold ${
                    getSectionState(5).isAccessible ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    5. Doces e Salgados Extras
                    {!getSectionState(5).isAccessible && ' (Selecione um sabor primeiro)'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedOptions.extras.length > 0 ? `${selectedOptions.extras.length} extra(s) selecionado(s)!` : 'Complete sua festa com delícias extras'}
                  </p>
                </div>
                {expandedSections.includes(5) ? (
                  <ChevronUpIcon className={`h-5 w-5 ${
                    getSectionState(5).isAccessible ? 'text-rose-500' : 'text-gray-300'
                  }`} />
                ) : (
                  <ChevronDownIcon className={`h-5 w-5 ${
                    getSectionState(5).isAccessible ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
              </button>

              {expandedSections.includes(5) && getSectionState(5).isAccessible && (
                <div className="mt-4">
                  {/* Doces */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Doces</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {extras.filter(extra => extra.category === 'doces').map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => handleOptionSelect('extras', extra.id, true)}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedOptions.extras.includes(extra.id)
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-purple-300'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-2 flex items-center justify-center">
                            <span className="text-purple-500 text-xs font-bold">DOCE</span>
                          </div>
                          <span className="font-semibold text-gray-800 text-sm text-center">
                            {extra.name}
                          </span>
                          <span className="text-sm text-purple-600 font-medium mt-1">
                            +R$ {extra.price.toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Salgados */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Salgados</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {extras.filter(extra => extra.category === 'salgados').map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => handleOptionSelect('extras', extra.id, true)}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedOptions.extras.includes(extra.id)
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mb-2 flex items-center justify-center">
                            <span className="text-orange-500 text-xs font-bold">SALG</span>
                          </div>
                          <span className="font-semibold text-gray-800 text-sm text-center">
                            {extra.name}
                          </span>
                          <span className="text-sm text-orange-600 font-medium mt-1">
                            +R$ {extra.price.toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-left">
            <span className="text-sm text-gray-600">Preço Total</span>
            <p className="text-xl font-bold text-gray-800">
              R$ {calculateTotal().toFixed(2)}
            </p>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={!selectedOptions.flavor}
            className={`px-6 py-3 rounded-full font-bold transition-colors shadow-lg flex items-center gap-2 ${
              selectedOptions.flavor
                ? 'bg-rose-500 hover:bg-rose-600 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedOptions.flavor ? 'Adicionar ao Carrinho' : 'Selecione um Sabor'}
          </button>
        </div>
      </footer>

      {/* Modal de Confirmação */}
      {showConfirmationModal && lastAddedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
            {/* Header do Modal */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Item Adicionado!</h3>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 bg-rose-50 rounded-lg">
                <img
                  src={lastAddedItem.image}
                  alt={lastAddedItem.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{lastAddedItem.name}</p>
                  <p className="text-rose-600 font-bold text-lg">
                    R$ {lastAddedItem.price.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-center mb-2">
                Seu bolo personalizado foi adicionado ao carrinho com sucesso!
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <button
                onClick={handleGoToCart}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Ver Carrinho e Finalizar
              </button>
              
              <button
                onClick={handleCustomizeAnother}
                className="w-full border border-rose-500 text-rose-500 hover:bg-rose-50 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Personalizar Outro Bolo
              </button>
              
              <button
                onClick={handleContinueShopping}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRightIcon className="h-5 w-5" />
                Continuar Navegando
              </button>
            </div>

            {/* Mensagem adicional */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Você pode editar seu pedido a qualquer momento no carrinho
            </p>
          </div>
        </div>
      )}
    </div>
  );
}