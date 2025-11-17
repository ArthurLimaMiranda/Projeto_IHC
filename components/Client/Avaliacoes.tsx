// components/Avaliacoes.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Dados mockados para avaliações
const avaliacoes = [
  {
    id: 1,
    nome: "Mariana O.",
    comentario: "O bolo foi incrível! Todos na festa elogiaram. A Juju superou todas as expectativas.",
    foto: "/assets/avatar1.jpg",
    rating: 5,
    data: "2024-01-15"
  },
  {
    id: 2,
    nome: "Jorge V.",
    comentario: "Atendimento excelente e o bolo estava delicioso. Recomendo para todas as ocasiões!",
    foto: "/assets/avatar2.jpg",
    rating: 5,
    data: "2024-01-10"
  },
  {
    id: 3,
    nome: "Ana Silva",
    comentario: "Fiz o bolo de aniversário do meu filho e foi um sucesso! Muito obrigada pela qualidade.",
    foto: "/assets/avatar3.jpg",
    rating: 5,
    data: "2024-01-08"
  },
  {
    id: 4,
    nome: "Carlos M.",
    comentario: "Profissionalismo e qualidade impressionantes. O bolo do casamento foi perfeito!",
    foto: "/assets/avatar4.jpg",
    rating: 5,
    data: "2024-01-05"
  },
  {
    id: 5,
    nome: "Fernanda L.",
    comentario: "Já é a terceira vez que encomendo e sempre surpreende. Os bolos são maravilhosos!",
    foto: "/assets/avatar5.jpg",
    rating: 5,
    data: "2024-01-03"
  },
  {
    id: 6,
    nome: "Roberto S.",
    comentario: "O sabor e a apresentação são impecáveis. Vale cada centavo investido!",
    foto: "/assets/avatar6.jpg",
    rating: 5,
    data: "2024-01-01"
  }
];

// Placeholder para fotos de perfil
const placeholderAvatars = [
  '/assets/avatar-placeholder1.jpg',
  '/assets/avatar-placeholder2.jpg',
  '/assets/avatar-placeholder3.jpg',
  '/assets/avatar-placeholder4.jpg',
  '/assets/avatar-placeholder5.jpg',
  '/assets/avatar-placeholder6.jpg'
];

export function Avaliacoes() {
  const carrossel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcular a largura do carrossel
  useEffect(() => {
    if (carrossel.current) {
      setWidth(carrossel.current.scrollWidth - carrossel.current.offsetWidth);
    }
  }, []);

  // Atualizar o índice baseado na posição do drag
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Drag para a direita - item anterior
      setCurrentIndex(prev => prev === 0 ? avaliacoes.length - 1 : prev - 1);
    } else if (info.offset.x < -threshold) {
      // Drag para a esquerda - próximo item
      setCurrentIndex(prev => (prev + 1) % avaliacoes.length);
    }
  };

  // Função para ir para um slide específico
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-avanço do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % avaliacoes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calcular a posição X baseada no currentIndex
  const getXPosition = () => {
    const itemWidth = 304; // 280px + 24px de margin
    return -currentIndex * itemWidth;
  };

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full py-8">
      {/* Versão Mobile/Tablet - Carrossel Contínuo */}
      <div className="lg:hidden">
        <motion.div 
          className="cursor-grab overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
          ref={carrossel}
        >
          <motion.div 
            className="flex"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            onDragEnd={handleDragEnd}
            animate={{ x: getXPosition() }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {avaliacoes.map((avaliacao, index) => (
              <motion.div 
                key={avaliacao.id}
                className="min-w-[280px] max-w-[280px] mx-3"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  {/* Header da Avaliação */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                        <span className="text-rose-500 font-bold text-sm">
                          {avaliacao.nome.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{avaliacao.nome}</h4>
                      {renderStars(avaliacao.rating)}
                    </div>
                  </div>
                  
                  {/* Comentário */}
                  <p className="text-gray-600 leading-relaxed">
                    "{avaliacao.comentario}"
                  </p>
                  
                  {/* Data */}
                  <p className="text-sm text-gray-400 mt-3">
                    {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Versão Desktop - Grid Fixo */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {avaliacoes.slice(0, 6).map((avaliacao, index) => (
          <div key={avaliacao.id} className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Header da Avaliação */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                  <span className="text-rose-500 font-bold text-sm">
                    {avaliacao.nome.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{avaliacao.nome}</h4>
                {renderStars(avaliacao.rating)}
              </div>
            </div>
            
            {/* Comentário */}
            <p className="text-gray-600 leading-relaxed">
              "{avaliacao.comentario}"
            </p>
            
            {/* Data */}
            <p className="text-sm text-gray-400 mt-3">
              {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
      </div>

      {/* Indicadores para Mobile - Agora funcionais */}
      <div className="lg:hidden flex justify-center mt-6 space-x-2">
        {avaliacoes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-rose-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Botões de navegação para Mobile */}
      <div className="lg:hidden flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentIndex(prev => prev === 0 ? avaliacoes.length - 1 : prev - 1)}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % avaliacoes.length)}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}