// components/Categorias.tsx
'use client';

import { useRouter } from 'next/navigation';

export function Categorias() {
  const router = useRouter();

  const categorias = [
    {
      titulo: "Bolos",
      imagem: "/assets/bolo.jpg",
      rota: "/products?category=Todos",
    },
    {
      titulo: "Kits Personalizados",
      imagem: "/assets/salgados.jpg",
      rota: "/kits"
    },
    {
      titulo: "Portfólio",
      imagem: "/assets/personalizado.jpeg",
      rota: "/portfolio"
    },
  ];

  const handleCategoriaClick = (rota: string) => {
    router.push(rota);
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {/* Primeiras duas categorias - quadradas */}
      {categorias.slice(0, 2).map((categoria, index) => (
        <button
          key={index}
          onClick={() => handleCategoriaClick(categoria.rota)}
          className="relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
        >
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${categoria.imagem})` }}
          />

          {/* Overlay escuro para o texto ficar legível */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

          {/* Conteúdo */}
          <div className="absolute inset-0 flex flex-col items-start justify-end text-start z-10 px-2">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
              {categoria.titulo}
            </h3>
          </div>
        </button>
      ))}

      {/* Terceira categoria - retângulo ocupando toda a largura */}
      <button
        onClick={() => handleCategoriaClick(categorias[2].rota)}
        className="col-span-2 relative rounded-xl overflow-hidden cursor-pointer group h-40 md:h-64"
      >
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 bg-cover bg-top transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${categorias[2].imagem})` }}
        />

        {/* Overlay escuro para o texto ficar legível */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

        {/* Conteúdo */}
        <div className="absolute inset-0 flex flex-col items-start justify-end text-start z-10 p-4">
          <h3 className="text-lg md:text-3xl font-bold text-white mb-2">
            {categorias[2].titulo}
          </h3>
        </div>
      </button>
    </div>
  );
}