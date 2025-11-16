// app/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarrosselProdutos } from "@/components/CarrosselProdutos";
import { Categorias } from "@/components/Categorias";
import { Avaliacoes } from "@/components/Avaliacoes";
import {
  CakeIcon,
  HeartIcon,
  AcademicCapIcon,
  GiftIcon,
  PencilIcon
} from "@heroicons/react/24/solid";

async function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FFFFF4]">
        {/* Seção Bem-vindo */}
        <section className="bg-[#4F2712] text-white py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-poppins">Bem-vindo(a)!</h1>
          <p className="text-xl mb-8">O que sua comemoração merece?</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full px-4 py-2 flex items-center">
              <input 
                type="text" 
                placeholder="Buscar bolos, sabores, ocasiões..."
                className="w-full bg-transparent text-[#4F2712] outline-none px-4"
              />
              <button className="bg-[#B95760] text-white rounded-full px-6 py-2 hover:bg-[#34A7B2] transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Seção O que você procura */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4F2712] mb-8 text-center">
            O que você procura?
          </h2>
          <Categorias />
        </section>

        <section className="flex items-center justify-center">
          <button className="px-8 py-4 bg-[#B95760] text-white rounded-xl text-xl hover:bg-[#34A7B2] transition font-semibold font-poppins flex items-center gap-3">
            <PencilIcon className="h-6 w-6 text-white" />
            Monte seu Kit
          </button>
        </section>

        {/* Seção Mais Vendidos */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">

            {/* Cabeçalho com título e link */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#4F2712]">
                Mais Vendidos
              </h2>

              <a
                href="/produtos"
                className="text-[#34A7B2] hover:underline font-medium text-2xl"
              >
                Ver tudo
              </a>
            </div>

            <CarrosselProdutos />

          </div>
        </section>

        <section className="py-12 px-4 max-w-6xl mx-auto">

          {/* Títulos lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <h3 className="text-3xl font-bold text-[#4F2712] ">Categoria</h3>
            <h3 className="text-2xl text-[#34A7B2] hover:underline md:text-right font-medium">Ver tudo</h3>
          </div>

          {/* Cards lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Coluna 1 */}
            <div className="space-y-4">
              <div className="bg-[#34A7B2] rounded-lg p-6 shadow-sm">
                <CakeIcon className="h-10 w-10 text-white mb-3" />
                <h4 className="font-semibold text-lg mb-2 text-white">Aniversário</h4>
                <p className="text-white">Bolos especiais</p>
              </div>

              <div className="bg-[#B95760] rounded-lg p-6 shadow-sm">
                <GiftIcon className="h-10 w-10 text-white mb-3" />
                <h4 className="font-semibold text-lg mb-2 text-white">Chá de Bebê</h4>
                <p className="text-white">Temas feitos</p>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              <div className="bg-[#B95760] rounded-lg p-6 shadow-sm">
                <HeartIcon className="h-10 w-10 text-white mb-3" />
                <h4 className="font-semibold text-lg mb-2 text-white">Casamento</h4>
                <p className="text-white">Bolos elegantes</p>
              </div>

              <div className="bg-[#34A7B2] rounded-lg p-6 shadow-sm">
                <AcademicCapIcon className="h-10 w-10 text-white mb-3" />
                <h4 className="font-semibold text-lg mb-2 text-white">Formatura</h4>
                <p className="text-white">Celebre conosco</p>
              </div>
            </div>

          </div>
        </section>

        {/* Seção Avaliações */}
        <section className="py-12 bg-[#F7EFE7]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#4F2712] mb-4 text-center">
              Avaliações de Compradores
            </h2>
            <p className="text-center text-[#0A0A0A] mb-8">
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