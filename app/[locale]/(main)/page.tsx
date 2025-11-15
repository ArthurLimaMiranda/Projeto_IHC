// app/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarrosselProdutos } from "@/components/CarrosselProdutos";
import { Categorias } from "@/components/Categorias";
import { Avaliacoes } from "@/components/Avaliacoes";

async function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-rose-50">
        {/* Seção Bem-vindo */}
        <section className="bg-rose-500 text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo(a)!</h1>
          <p className="text-xl mb-8">O que sua comemoração merece?</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full px-4 py-2 flex items-center">
              <input 
                type="text" 
                placeholder="Busque aqui..."
                className="w-full bg-transparent text-gray-800 outline-none px-4"
              />
              <button className="bg-rose-600 text-white rounded-full px-6 py-2 hover:bg-rose-700 transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Seção O que você procura */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            O que você procura?
          </h2>
          <Categorias />
        </section>

        {/* Seção Mais Vendidos */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Mais Vendidos
            </h2>
            <CarrosselProdutos />
          </div>
        </section>

        {/* Seção Categorias */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Categoria</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Aniversário</h4>
                  <p className="text-gray-600">Bolos especiais</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Chá de Bebê</h4>
                  <p className="text-gray-600">Temas feitos</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Ver tudo</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Casamento</h4>
                  <p className="text-gray-600">Bolos elegantes</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Formatura</h4>
                  <p className="text-gray-600">Celebre conosco</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Avaliações */}
        <section className="py-12 bg-rose-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Avaliações de Compradores
            </h2>
            <p className="text-center text-gray-600 mb-8">
              A opinião de quem já provou
            </p>
            <Avaliacoes />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;