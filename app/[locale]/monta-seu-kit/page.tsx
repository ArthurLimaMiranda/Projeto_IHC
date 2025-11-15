'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

// Dados mockados baseados no projeto real
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
    image: '/assets/frosting-buttercream.jpg'
  },
  {
    id: 2,
    name: 'Ganache de Chocolate',
    description: 'Chocolate derretido com creme',
    price: 7.00,
    image: '/assets/frosting-ganache.jpg'
  },
  {
    id: 3,
    name: 'Cream Cheese',
    description: 'Cobertura cremosa com queijo',
    price: 6.00,
    image: '/assets/frosting-cream-cheese.jpg'
  },
  {
    id: 4,
    name: 'Merengue Italiano',
    description: 'Merengue leve e doce',
    price: 8.00,
    image: '/assets/frosting-meringue.jpg'
  },
];

const toppings = [
  {
    id: 1,
    name: 'Frutas Frescas',
    description: 'Morangos, kiwis e blueberries',
    price: 12.00,
    image: '/assets/topping-fruits.jpg'
  },
  {
    id: 2,
    name: 'Chocolate Premium',
    description: 'Lascas de chocolate belga',
    price: 10.00,
    image: '/assets/topping-chocolate.jpg'
  },
  {
    id: 3,
    name: 'Flores Comestíveis',
    description: 'Decoração floral natural',
    price: 15.00,
    image: '/assets/topping-flowers.jpg'
  },
  {
    id: 4,
    name: 'Confeitos Coloridos',
    description: 'Sprinkles e confeitos diversos',
    price: 8.00,
    image: '/assets/topping-sprinkles.jpg'
  },
];

const addOns = [
  {
    id: 1,
    name: 'Velas Personalizadas',
    description: 'Velas com número ou tema',
    price: 5.00,
    image: '/assets/addon-candles.jpg'
  },
  {
    id: 2,
    name: 'Placa de Mensagem',
    description: 'Placa com mensagem personalizada',
    price: 8.00,
    image: '/assets/addon-message.jpg'
  },
  {
    id: 3,
    name: 'Caixa Presente',
    description: 'Embalagem especial para presente',
    price: 12.00,
    image: '/assets/addon-gift-box.jpg'
  },
  {
    id: 4,
    name: 'Topper Personalizado',
    description: 'Decoração de topo temática',
    price: 15.00,
    image: '/assets/addon-topper.jpg'
  },
];

export default function CustomizeCakeKit() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState([1]);
  const [selectedOptions, setSelectedOptions] = useState({
    flavor: null as number | null,
    frosting: null as number | null,
    toppings: [] as number[],
    addOns: [] as number[],
  });

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
    
    return total;
  };

  const getStepTitle = (step: number) => {
    const titles = {
      1: 'Cake Flavor',
      2: 'Frosting & Filling',
      3: 'Toppings & Decor',
      4: 'Add-Ons',
    };
    return titles[step as keyof typeof titles] || '';
  };

  return (
    <div className="min-h-screen bg-rose-50 font-display">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 p-4 backdrop-blur-sm border-b border-rose-100">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-rose-600 hover:text-rose-700 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        
        <h1 className="text-lg font-bold text-rose-600">Juju Bolos Decorados</h1>
        
        <button className="text-rose-600 hover:text-rose-700 transition-colors">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="pb-32">
        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrayjEUqOlp8xmiGb8YbYkckommk2_lOzXnDWb1K5rqkwqLOOSJVqozRlC2JE1tePHEe5oxtlQLKWRaP0Idty0IVHbbpEeeyGE-aTvym26YHA69DKg6J8rx9RMcH8mDPgRl3QR2a3zL4SuP4wDhTaBFIpU2qOgnAggSADsYj94CRjkkMPRIjp8Mz-RAn1CRt21blUlmhtT-gd3lTcyUyuHfd83anjbBGimi9tz6gz9bgutZ90GZVQWErmoSMCx3V2m2tmERMclYu_W"
            alt="Beautifully decorated cake with colorful frosting"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4].map((step) => (
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
            Customize Your Cake Kit
          </h1>
          <p className="text-gray-600 mb-6">
            Create your perfect celebration with our delicious, fully customizable cake kits. 
            Everything you need for a memorable party!
          </p>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Step {currentStep} of 4</span>
              <span className="text-rose-600 font-semibold">{getStepTitle(currentStep)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Customization Sections */}
          <div className="space-y-4">
            {/* Cake Flavor */}
            <section className="bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => toggleSection(1)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">1. Choose Your Cake Flavor</h3>
                  <p className="text-sm text-gray-600 mt-1">Select one delicious option</p>
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
            <section className="bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => toggleSection(2)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">2. Select Frosting & Filling</h3>
                  <p className="text-sm text-gray-600 mt-1">Choose your preferred frosting</p>
                </div>
                {expandedSections.includes(2) ? (
                  <ChevronUpIcon className="h-5 w-5 text-rose-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedSections.includes(2) && (
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
                        <span className="text-rose-500 text-xs font-bold">FROST</span>
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
            <section className="bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => toggleSection(3)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">3. Pick Toppings & Decor</h3>
                  <p className="text-sm text-gray-600 mt-1">Select as many as you like</p>
                </div>
                {expandedSections.includes(3) ? (
                  <ChevronUpIcon className="h-5 w-5 text-rose-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedSections.includes(3) && (
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
            <section className="bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => toggleSection(4)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">4. Add-Ons</h3>
                  <p className="text-sm text-gray-600 mt-1">Extra items for your celebration</p>
                </div>
                {expandedSections.includes(4) ? (
                  <ChevronUpIcon className="h-5 w-5 text-rose-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedSections.includes(4) && (
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
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-left">
            <span className="text-sm text-gray-600">Total Price</span>
            <p className="text-2xl font-bold text-gray-800">
              R$ {calculateTotal().toFixed(2)}
            </p>
          </div>
          <button 
            onClick={() => router.push('/cart')}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </button>
        </div>
      </footer>
    </div>
  );
}