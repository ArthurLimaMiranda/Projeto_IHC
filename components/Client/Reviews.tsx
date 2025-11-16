export function Reviews() {
  const reviews = [
    {
      author: "Mariana O.",
      comment: "O fato entender que a jornada oferece um pouco mais forte para fazer isso?"
    },
    {
      author: "Jorge V.",
      comment: "O tal serão menos perdido ou é claro em qualquer tempo?"
    }
  ]

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Avaliações de Compradores
      </h2>
      <p className="text-gray-600 mb-6">
        A opinião de quem já provou
      </p>
      
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-3"></div>
              <h4 className="font-semibold text-gray-800">{review.author}</h4>
            </div>
            <p className="text-gray-600 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}