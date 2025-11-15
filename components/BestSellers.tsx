export function BestSellers() {
  const bestSellers = [
    {
      name: "Bolo de Brigadeiro com Chocolate Branco",
      price: "R$ 80,00",
      description: "A melhor das três murales e cidades regulares é o sumo arquivado do chocolate branco."
    }
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mais Vendidos</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {bestSellers.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h3>
              <p className="text-pink-600 font-bold text-xl mb-2">
                {item.price}
              </p>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}