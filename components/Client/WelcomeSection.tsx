import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function WelcomeSection() {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-24 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bem-viwwndo(a)!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          O que sua comemoraçãssdoee merece?
        </p>
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Busque aqui..."
            className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}