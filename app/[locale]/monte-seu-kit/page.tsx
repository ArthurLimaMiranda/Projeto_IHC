// app/customize/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  PlusIcon, 
  ArrowRightIcon, 
  ShoppingBagIcon, 
  XMarkIcon,
  MinusIcon,
  CameraIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
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
    extras: [] as { id: number; quantity: number }[], // Agora com quantidade
  });

  const [orderInfo, setOrderInfo] = useState({
    customerName: '',
    eventDate: '',
    eventTime: '',
    observations: '',
    description: '',
    themePhoto: null as File | null,
    themePhotoPreview: '',
    allergies: '',
    lactoseIntolerant: false,
    otherRestrictions: ''
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    if (type === 'flavor' && id !== null) {
      setTimeout(() => {
        setExpandedSections(prev => {
          const newSections = prev.filter(section => section !== 1);
          return [...newSections, 2].sort((a, b) => a - b);
        });
      }, 300);
    }
  };

  // Funções para gerenciar quantidade dos extras
  const handleExtraQuantityChange = (id: number, quantity: number) => {
    if (quantity < 0) return;
    
    setSelectedOptions(prev => {
      const existingExtraIndex = prev.extras.findIndex(extra => extra.id === id);
      
      if (existingExtraIndex >= 0) {
        if (quantity === 0) {
          // Remove o extra se quantidade for 0
          return {
            ...prev,
            extras: prev.extras.filter(extra => extra.id !== id)
          };
        } else {
          // Atualiza a quantidade
          const updatedExtras = [...prev.extras];
          updatedExtras[existingExtraIndex] = { ...updatedExtras[existingExtraIndex], quantity };
          return { ...prev, extras: updatedExtras };
        }
      } else {
        // Adiciona novo extra com quantidade
        return {
          ...prev,
          extras: [...prev.extras, { id, quantity }]
        };
      }
    });
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
    
    selectedOptions.extras.forEach(extra => {
      const extraItem = extras.find(e => e.id === extra.id);
      total += (extraItem?.price || 0) * extra.quantity;
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
      6: 'Informações do Pedido'
    };
    return titles[step as keyof typeof titles] || '';
  };

  const handleOrderInfoChange = (field: string, value: any) => {
    setOrderInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleThemePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrderInfo(prev => ({
        ...prev,
        themePhoto: file,
        themePhotoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeThemePhoto = () => {
    setOrderInfo(prev => ({
      ...prev,
      themePhoto: null,
      themePhotoPreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddToCart = () => {
    if (!selectedOptions.flavor) {
      alert('Por favor, selecione um sabor para o bolo!');
      if (!expandedSections.includes(1)) {
        setExpandedSections(prev => [1, ...prev]);
      }
      return;
    }

    const selectedFlavor = cakeFlavors.find(f => f.id === selectedOptions.flavor);
    const selectedFrosting = frostings.find(f => f.id === selectedOptions.frosting);
    const selectedToppings = toppings.filter(t => selectedOptions.toppings.includes(t.id));
    const selectedAddOns = addOns.filter(a => selectedOptions.addOns.includes(a.id));
    
    // CORREÇÃO: Garantir que os extras tenham name como string
    const selectedExtras = selectedOptions.extras
      .map(extra => {
        const extraItem = extras.find(e => e.id === extra.id);
        if (!extraItem) return null;
        
        return {
          name: extraItem.name, // Garantir que é string
          quantity: extra.quantity
        };
      })
      .filter((extra): extra is { name: string; quantity: number } => extra !== null);

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
      description += ` | Extras: ${selectedExtras.map(e => `${e.quantity}x ${e.name}`).join(', ')}`;
    }

    const cartItem = {
      id: Date.now(),
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
        extras: selectedExtras, // Agora é do tipo correto
      },
      orderInfo: { ...orderInfo }
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
    setSelectedOptions({ flavor: null, frosting: null, toppings: [], addOns: [], extras: [] });
    setOrderInfo({
      customerName: '',
      eventDate: '',
      eventTime: '',
      observations: '',
      description: '',
      themePhoto: null,
      themePhotoPreview: '',
      allergies: '',
      lactoseIntolerant: false,
      otherRestrictions: ''
    });
    setExpandedSections([1]);
    setCurrentStep(1);
  };

  const isSectionAccessible = (sectionId: number) => {
    if (sectionId === 1) return true;
    if (sectionId === 2) return selectedOptions.flavor !== null;
    if (sectionId === 3) return selectedOptions.flavor !== null;
    if (sectionId === 4) return selectedOptions.flavor !== null;
    if (sectionId === 5) return selectedOptions.flavor !== null;
    if (sectionId === 6) return selectedOptions.flavor !== null;
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
            {[1, 2, 3, 4, 5, 6].map((step) => (
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
              <span className="text-gray-700">Passo {Math.max(1, currentStep)} de 6</span>
              <span className="text-rose-600 font-semibold">{getStepTitle(Math.max(1, currentStep))}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Math.max(1, currentStep) / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Customization Sections */}
          <div className="space-y-4">
            {/* Seções 1-4 permanecem iguais */}
            {/* Cake Flavor */}
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

            {/* Extras com Quantidade */}
            {/* Extras com Quantidade - Versão Atualizada */}
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
        {selectedOptions.extras.length > 0 ? `${selectedOptions.extras.reduce((sum, extra) => sum + extra.quantity, 0)} item(s) selecionado(s)!` : 'Complete sua festa com delícias extras'}
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
          {extras.filter(extra => extra.category === 'doces').map((extra) => {
            const selectedExtra = selectedOptions.extras.find(e => e.id === extra.id);
            const quantity = selectedExtra ? selectedExtra.quantity : 0;

            return (
              <div key={extra.id} className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                quantity > 0
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-2 flex items-center justify-center">
                  <span className="text-purple-500 text-xs font-bold">DOCE</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm text-center">
                  {extra.name}
                </span>
                <span className="text-sm text-purple-600 font-medium mt-1">
                  R$ {extra.price.toFixed(2)} cada
                </span>
                
                {/* Controles de Quantidade Atualizados */}
                <div className="flex flex-col items-center gap-2 mt-2 w-full">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExtraQuantityChange(extra.id, quantity - 1)}
                      disabled={quantity === 0}
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        quantity === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </button>
                    
                    {/* Input numérico para inserção manual */}
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 0;
                          if (newQuantity >= 0 && newQuantity <= 100) {
                            handleExtraQuantityChange(extra.id, newQuantity);
                          }
                        }}
                        onBlur={(e) => {
                          // Se estiver vazio, define como 0
                          if (e.target.value === '') {
                            handleExtraQuantityChange(extra.id, 0);
                          }
                        }}
                        className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
                        <div className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => handleExtraQuantityChange(extra.id, quantity + 1)}
                            className="h-2 w-3 flex items-center justify-center text-gray-400 hover:text-purple-600"
                          >
                            <ChevronUpIcon className="h-2 w-2" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExtraQuantityChange(extra.id, quantity - 1)}
                            className="h-2 w-3 flex items-center justify-center text-gray-400 hover:text-purple-600"
                          >
                            <ChevronDownIcon className="h-2 w-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleExtraQuantityChange(extra.id, quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                    >
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Botão rápido para quantidades comuns */}
                  {quantity === 0 && (
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 10)}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                      >
                        10
                      </button>
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 25)}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                      >
                        25
                      </button>
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 50)}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                      >
                        50
                      </button>
                    </div>
                  )}
                </div>

                {quantity > 0 && (
                  <div className="text-center mt-2">
                    <span className="text-xs text-purple-600 font-medium">
                      Total: R$ {(extra.price * quantity).toFixed(2)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {quantity} unidade(s)
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Salgados */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Salgados</h4>
        <div className="grid grid-cols-2 gap-3">
          {extras.filter(extra => extra.category === 'salgados').map((extra) => {
            const selectedExtra = selectedOptions.extras.find(e => e.id === extra.id);
            const quantity = selectedExtra ? selectedExtra.quantity : 0;

            return (
              <div key={extra.id} className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                quantity > 0
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mb-2 flex items-center justify-center">
                  <span className="text-orange-500 text-xs font-bold">SALG</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm text-center">
                  {extra.name}
                </span>
                <span className="text-sm text-orange-600 font-medium mt-1">
                  R$ {extra.price.toFixed(2)} cada
                </span>
                
                {/* Controles de Quantidade Atualizados */}
                <div className="flex flex-col items-center gap-2 mt-2 w-full">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExtraQuantityChange(extra.id, quantity - 1)}
                      disabled={quantity === 0}
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        quantity === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </button>
                    
                    {/* Input numérico para inserção manual */}
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 0;
                          if (newQuantity >= 0 && newQuantity <= 100) {
                            handleExtraQuantityChange(extra.id, newQuantity);
                          }
                        }}
                        onBlur={(e) => {
                          // Se estiver vazio, define como 0
                          if (e.target.value === '') {
                            handleExtraQuantityChange(extra.id, 0);
                          }
                        }}
                        className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
                        <div className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => handleExtraQuantityChange(extra.id, quantity + 1)}
                            className="h-2 w-3 flex items-center justify-center text-gray-400 hover:text-orange-600"
                          >
                            <ChevronUpIcon className="h-2 w-2" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExtraQuantityChange(extra.id, quantity - 1)}
                            className="h-2 w-3 flex items-center justify-center text-gray-400 hover:text-orange-600"
                          >
                            <ChevronDownIcon className="h-2 w-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleExtraQuantityChange(extra.id, quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                    >
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Botão rápido para quantidades comuns */}
                  {quantity === 0 && (
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 10)}
                        className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                      >
                        10
                      </button>
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 25)}
                        className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                      >
                        25
                      </button>
                      <button
                        onClick={() => handleExtraQuantityChange(extra.id, 50)}
                        className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                      >
                        50
                      </button>
                    </div>
                  )}
                </div>

                {quantity > 0 && (
                  <div className="text-center mt-2">
                    <span className="text-xs text-orange-600 font-medium">
                      Total: R$ {(extra.price * quantity).toFixed(2)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {quantity} unidade(s)
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumo dos Extras Selecionados */}
      {selectedOptions.extras.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-2">Resumo dos Extras Selecionados</h5>
          <div className="space-y-2 text-sm">
            {selectedOptions.extras.map(extra => {
              const extraItem = extras.find(e => e.id === extra.id);
              if (!extraItem) return null;
              
              return (
                <div key={extra.id} className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {extraItem.name} × {extra.quantity}
                  </span>
                  <span className="font-medium text-gray-800">
                    R$ {(extraItem.price * extra.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total em Extras:</span>
                <span className="text-rose-600">
                  R$ {selectedOptions.extras.reduce((sum, extra) => {
                    const extraItem = extras.find(e => e.id === extra.id);
                    return sum + (extraItem?.price || 0) * extra.quantity;
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )}
</section>

            {/* Informações do Pedido */}
            <section className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
              !getSectionState(6).isAccessible ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => getSectionState(6).isAccessible && toggleSection(6)}
                className="flex items-center justify-between w-full text-left"
                disabled={!getSectionState(6).isAccessible}
              >
                <div>
                  <h3 className={`text-xl font-bold ${
                    getSectionState(6).isAccessible ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    6. Informações do Pedido
                    {!getSectionState(6).isAccessible && ' (Selecione um sabor primeiro)'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Informações importantes para sua encomenda
                  </p>
                </div>
                {expandedSections.includes(6) ? (
                  <ChevronUpIcon className={`h-5 w-5 ${
                    getSectionState(6).isAccessible ? 'text-rose-500' : 'text-gray-300'
                  }`} />
                ) : (
                  <ChevronDownIcon className={`h-5 w-5 ${
                    getSectionState(6).isAccessible ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
              </button>

              {expandedSections.includes(6) && getSectionState(6).isAccessible && (
                <div className="mt-4 space-y-4">
                  {/* Descrição da Encomenda */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição da Encomenda
                    </label>
                    <textarea
                      value={orderInfo.description}
                      onChange={(e) => handleOrderInfoChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Descreva como você imagina seu bolo, cores preferidas, tema da festa..."
                    />
                  </div>

                  {/* Foto do Tema */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <CameraIcon className="h-4 w-4 inline mr-1" />
                      Foto do Tema Desejado
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleThemePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {orderInfo.themePhotoPreview ? (
                      <div className="relative">
                        <img
                          src={orderInfo.themePhotoPreview}
                          alt="Preview do tema"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeThemePhoto}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors"
                      >
                        <div className="flex flex-col items-center">
                          <CameraIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Clique para adicionar uma foto do tema</span>
                          <span className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG, GIF</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Observações e Restrições */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações (Alergias, Intolerâncias, etc.)
                      </label>
                      <textarea
                        value={orderInfo.observations}
                        onChange={(e) => handleOrderInfoChange('observations', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Alguma alergia alimentar? Intolerância a lactose? Outras restrições?"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="lactoseIntolerant"
                        checked={orderInfo.lactoseIntolerant}
                        onChange={(e) => handleOrderInfoChange('lactoseIntolerant', e.target.checked)}
                        className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <label htmlFor="lactoseIntolerant" className="text-sm text-gray-700">
                        Intolerante à lactose
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Outras Restrições Alimentares
                      </label>
                      <input
                        type="text"
                        value={orderInfo.otherRestrictions}
                        onChange={(e) => handleOrderInfoChange('otherRestrictions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Ex: Vegano, sem glúten, sem açúcar..."
                      />
                    </div>
                  </div>

                  {/* Aviso sobre WhatsApp */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Importante:</strong> Após finalizar o pedido, entraremos em contato via WhatsApp 
                      para confirmar todos os detalhes e combinar a entrega. Certifique-se de que as informações 
                      estão corretas!
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-left">
            <span className="text-sm text-gray-600">Preço Total</span>
            <p className="text-lg font-bold text-gray-800">
              R$ {calculateTotal().toFixed(2)}
            </p>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={!selectedOptions.flavor}
            className={`px-3 py-3 text-sm rounded-full font-bold transition-colors shadow-lg flex items-center gap-2 ${
              selectedOptions.flavor
                ? 'bg-rose-500 hover:bg-rose-600 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedOptions.flavor ? (
              <>
                <ShoppingBagIcon className="h-5 w-5" />
                Adicionar ao Carrinho
              </>
            ) : (
              'Selecione um Sabor'
            )}
          </button>
        </div>
      </footer>

      {/* Modal de Confirmação */}
      {showConfirmationModal && lastAddedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Item Adicionado!</h3>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 bg-rose-50 rounded-lg p-3">
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
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                <p className="text-sm text-green-800 text-center">
                  <strong>Próximo passo:</strong> Entraremos em contato via WhatsApp para confirmar os detalhes!
                </p>
              </div>
            </div>

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
          </div>
        </div>
      )}
    </div>
  );
}