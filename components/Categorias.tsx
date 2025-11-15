// components/Categorias.tsx
export function Categorias() {
  const categorias = [
    {
      titulo: "Bolos",
      subtitulo: "Más personalizados",
      cor: "bg-rose-100",
      corTexto: "text-rose-600"
    },
    {
      titulo: "Portídias",
      subtitulo: "Monta seu Kit",
      cor: "bg-green-100",
      corTexto: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categorias.map((categoria, index) => (
        <div
          key={index}
          className={`${categoria.cor} rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer`}
        >
          <h3 className={`text-2xl font-bold ${categoria.corTexto} mb-2`}>
            {categoria.titulo}
          </h3>
          <p className="text-gray-600">{categoria.subtitulo}</p>
        </div>
      ))}
    </div>
  );
}