// app/produtos/page.tsx (nova página para linkar)
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Produtos() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-rose-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Nossos Produtos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Monte Seu Kit */}
            <Link 
              href="/monta-seu-kit"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="bg-rose-100 rounded-lg p-4 text-center mb-4">
                <span className="material-symbols-outlined text-rose-500 text-4xl">
                  build
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Monte Seu Kit</h3>
              <p className="text-gray-600 mb-4">
                Personalize seu bolo perfeito escolhendo sabor, recheio, cobertura e decoração.
              </p>
              <button className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors">
                Personalizar Agora
              </button>
            </Link>

            {/* Outros produtos... */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}