import React from "react";
import Image from "next/image";
import { ArrowLeftIcon, MagnifyingGlassIcon, ChevronRightIcon, CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function HistoricoPedidosPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-brand-cream overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 flex items-center bg-brand-cream/80 p-4 pb-2 justify-between backdrop-blur-sm">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <ArrowLeftIcon className="w-6 h-6 text-brand-brown" />
        </div>
        <h1 className="text-brand-brown text-xl font-bold flex-1 text-center">
          Histórico de Pedidos
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-brand-brown/10">
            <MagnifyingGlassIcon className="w-6 h-6 text-brand-brown" />
          </button>
        </div>
      </header>

      {/* Entregas Pendentes */}
      <h2 className="text-brand-brown text-lg font-bold px-4 pb-2 pt-4">
        Entregas Pendentes
      </h2>

      <div className="flex overflow-x-auto scrollbar-hide pb-4">
        <div className="flex items-stretch px-4 gap-3">
          {/* Carousel Item */}
          {[
            {
              id: 1024,
              title: "Bolo de Casamento",
              date: "25/12/23",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBff8rrlcYOt2zQ7bpFJWZkjlYLArW9QAs0cASC9crW_RhCOPvjQPNmF9mQ_vKT8DAWmnoo8QQ0yNl2jRkzg-KG7U73zBnbUfmxb9bkh9ZbrEgUtHE1vSMBpn-wL8iqzvJt4w8FcUE_fGloFR0oDHo-k1a7brwmnyTJxeO_aiPOLIPFz3yT77gKkaT5oTZRB-LvXavqQg7GEnErOrbVwZ5TuNVbe9gPY2TDYLjsc_CCPCy37t42kgDQD1inEHJx_O5wTceHPDdnZlo",
            },
            {
              id: 1023,
              title: "Bolo de Chocolate + Kit",
              date: "24/12/23",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDpufPD_bXfOzt5TC_23vvSx7qVRX7a1L-5hiIMtrgYEA0qTOjFwTYtqUtvsVW9Zbo-7u5fsWLe7KttzMQ3GMr8K8foTRPXxR144ql3U-ADfg2gaBsEsJTSso35TORkmtxtjC0kYaZp1Mbjrip3mGHaTnzQw9uF1nqpI_4POqahCekz7ZLL7cNWovy1rOSQ1g1xtOv_P36_JtpJSWKxpDPPczQCq8e-OuNdtAPg8wD4OBCR8H8QPH765KeUwdzPfMGRFQX86vJ6070",
            },
            {
              id: 1022,
              title: "50 Docinhos Variados",
              date: "23/12/23",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB4CyG_HnIdfGyujAFojUowqzPx9Xt1n-uQ2oChOk5wemtxLiRKSY3LVx7d28zxtu9B-ONikr8M-j08V2edrfa45gTkkkGqJLupiqPWz_whANDI28K4ZSvaxLWgQXXpiSubSzCcutLeT96oaXWc44KzK3Gf3lHPAJtABbig9q-xu4uoBzniWNjufRSqdabEnWWZ7ar0HWX-WEw2DkQU4_QVIniN9pkAVO7Mf4dExZScqnrRPIsJp18Fw0BHhf8cwWDmMdpUBMBvOzY",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm min-w-52 border border-brand-rose/50"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />

              <div>
                <p className="text-brand-brown text-base font-bold">Pedido #{item.id}</p>
                <p className="text-brand-brown/70 text-sm">{item.title}</p>
                <p className="text-brand-rose text-sm font-bold mt-1">
                  Entrega: {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Todos os Pedidos */}
      <h2 className="text-brand-brown text-lg font-bold px-4 pb-2 pt-4">
        Todos os Pedidos
      </h2>

      <div className="flex flex-col px-4 gap-3 pb-24">
        {/* Pedido Template */}
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="size-16 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(https://picsum.photos/200?${i})` }}
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-brand-brown text-base font-bold">#10{i + 20} - Cliente</p>
                  <p className="text-brand-brown/70 text-sm">Entrega: 20/12/23 - R$ 150,00</p>
                  <p className="text-brand-brown/70 text-sm truncate max-w-48">Descrição do pedido</p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-brand-brown/50" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-brand-brown/10">
              <p className="text-sm text-brand-brown/80">Status:</p>

              {i === 0 && (
                <button className="flex items-center gap-2 rounded-full bg-brand-teal px-3 py-1 text-sm font-medium text-white">
                  Em Produção <ChevronDownIcon className="w-4 h-4" />
                </button>
              )}

              {i === 1 && (
                <button className="flex items-center gap-2 rounded-full bg-brand-light-blue px-3 py-1 text-sm font-medium text-brand-brown">
                  Concluído <ChevronDownIcon className="w-4 h-4" />
                </button>
              )}

              {i === 2 && (
                <div className="flex items-center gap-2 rounded-full bg-brand-brown/10 px-3 py-1 text-sm font-medium text-brand-brown">
                  <CheckCircleIcon className="w-4 h-4" /> Entregue
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-rose text-white shadow-lg hover:scale-105 transition-transform">
        +
      </button>
    </div>
  );
}
