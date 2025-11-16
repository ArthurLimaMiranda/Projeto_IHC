// components/Categorias.tsx
export function Categorias() {
  const categorias = [
    {
      titulo: "Bolos",
      subtitulo: "Massas personalizadas",
      imagem:
        "/assets/bolo.jpg",
      span: "col-span-1",
    },
    {
      titulo: "Kits Personalizados",
      subtitulo: "Monte seu Kit",
      imagem:
        "/assets/salgados.jpg",
      span: "col-span-1",
    },
    {
      titulo: "Portfólio",
      subtitulo: "Veja nossos trabalhos",
      imagem:
        "/assets/personalizado.jpeg",
      span: "md:col-span-2 bg-top", // ocupa toda a linha no desktop
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {categorias.map((categoria, index) => (
        <div
          key={index}
          className={`${categoria.span} relative rounded-xl overflow-hidden cursor-pointer group h-96`}
        >
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${categoria.imagem})` }}
          />

          {/* Overlay escuro para o texto ficar legível */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

          {/* Conteúdo */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
            <h3 className="text-3xl font-bold text-white mb-2">
              {categoria.titulo}
            </h3>
            <p className="text-white text-lg">{categoria.subtitulo}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
