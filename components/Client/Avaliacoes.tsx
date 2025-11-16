// components/Avaliacoes.tsx
export function Avaliacoes() {
  const avaliacoes = [
    {
      nome: "Mariana O.",
      comentario: "O fato entender que a jornada oferece um pouco mais forte para fazer isso?"
    },
    {
      nome: "Jorge V.",
      comentario: "O tal serão menos perdido ou é claro em qualquer tempo?"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {avaliacoes.map((avaliacao, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="font-semibold text-lg mb-2">{avaliacao.nome}</h4>
          <p className="text-gray-600 italic">"{avaliacao.comentario}"</p>
        </div>
      ))}
    </div>
  );
}