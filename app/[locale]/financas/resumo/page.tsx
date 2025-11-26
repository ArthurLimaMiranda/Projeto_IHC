// app/financas/resumo/page.tsx - ATUALIZADA
"use client";

import { useState, useEffect } from "react";
import { ArrowLeftIcon, DocumentIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

// IMPORTS DO PDF (NO TOPO!!)
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DashboardFinanceiro() {
  const router = useRouter();
  const { getFinancialSummary, getRevenueVsExpenses, getProfitEvolution } = useCart();
  
  const [periodo, setPeriodo] = useState<'month' | '30days' | 'year'>('month');
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    revenueGrowth: 0,
    expenseGrowth: 0,
    profitGrowth: 0
  });
  const [revenueExpenseData, setRevenueExpenseData] = useState<any[]>([]);
  const [profitData, setProfitData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      setFinancialSummary(getFinancialSummary(periodo));
      setRevenueExpenseData(getRevenueVsExpenses(4));
      setProfitData(getProfitEvolution(6));
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [getFinancialSummary, getRevenueVsExpenses, getProfitEvolution, periodo]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  // --------------------------
  // FUNÇÃO PARA GERAR O PDF
  // --------------------------
  const gerarPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 10;

    const sections = [
      document.querySelector("#cards-resumo"),
      document.querySelector("#grafico-receitas"),
      document.querySelector("#grafico-lucro"),
    ];

    for (const section of sections) {
      if (!section) continue;

      const canvas = await html2canvas(section as HTMLElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (yPosition + pdfHeight > pdf.internal.pageSize.getHeight() - 10) {
        pdf.addPage();
        yPosition = 10;
      }

      pdf.addImage(imgData, "PNG", 10, yPosition, pdfWidth, pdfHeight);
      yPosition += pdfHeight + 10;
    }

    pdf.save("relatorio-financeiro.pdf");
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4] text-[#4F2712] pb-12">
      
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <ArrowLeftIcon 
            className="w-7 h-7 cursor-pointer text-[#4F2712]"
            onClick={() => router.back()} 
          />
        </div>

        <h1 className="text-lg font-bold flex-1 text-center">Resumo Financeiro</h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pb-24">

        {/* Filtros */}
        <div className="p-4 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { label: "Este Mês", value: "month" },
              { label: "Últimos 30 dias", value: "30days" },
              { label: "Este Ano", value: "year" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setPeriodo(item.value as any)}
                className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-4 shrink-0 text-sm font-medium ${
                  periodo === item.value
                    ? "bg-[#4F2712] text-white"
                    : "bg-white text-[#4F2712] border border-[#4F2712]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botão Gerar PDF */}
        <div className="px-4 mt-1">
          <button
            onClick={gerarPDF}
            className="w-full py-3 flex flex-row gap-2 justify-center items-center rounded-xl bg-[#34A7B2] text-white font-medium shadow-md active:scale-[0.98] transition"
          >
            <DocumentIcon className="w-6 h-6" />
            <span>Gerar Relatório</span>
          </button>
        </div>


        {/* Cards de Resumo */}
        <div id="cards-resumo" className="flex flex-wrap gap-4 p-4">
          <ResumoCard titulo="Receita Bruta Total" valor={formatCurrency(financialSummary.totalRevenue)} variacao={financialSummary.revenueGrowth} />
          <ResumoCard titulo="Despesas Totais" valor={formatCurrency(financialSummary.totalExpenses)} variacao={financialSummary.expenseGrowth} isExpense />
          <ResumoCard titulo="Lucro Líquido" valor={formatCurrency(financialSummary.netProfit)} variacao={financialSummary.profitGrowth} full />
        </div>

        {/* Gráfico Receitas vs Despesas */}
        <section id="grafico-receitas" className="flex flex-col gap-4 border rounded-xl mx-4 p-5 bg-white border-[#B95760]">
          <div className="flex items-center justify-between">
            <p className="font-bold">Receitas vs. Despesas</p>
            <div className="flex gap-4 text-xs">
              <Legenda cor="bg-[#34A7B2]" label="Receitas" />
              <Legenda cor="bg-[#B95760]" label="Despesas" />
            </div>
          </div>
          <GraficoBarras data={revenueExpenseData} />
        </section>

        {/* Gráfico Evolução do Lucro */}
        <section id="grafico-lucro" className="flex flex-col gap-4 border rounded-xl mx-4 mt-4 p-5 bg-white border-[#34A7B2]">
          <p className="font-bold">Evolução do Lucro</p>
          <GraficoLinha data={profitData} />
        </section>

      </main>

      {/* Botão flutuante */}
      <Link href="/financas/despesas">
        <button className="fixed bottom-20 right-6 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-[#B95760] text-white shadow-lg hover:bg-[#A0464E]">
          <PlusIcon className="w-6 h-6" />
        </button>
      </Link>

      <MenuInferior />
    </div>
  );
}

/* ----------------------------------------------
   COMPONENTES AUXILIARES
---------------------------------------------- */

function ResumoCard({ titulo, valor, variacao, isExpense = false, full = false }: any) {
  const growthColor = variacao >= 0 ? "text-green-600" : "text-red-600";
  const growthIcon = variacao >= 0 ? "↑" : "↓";

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl shadow-sm p-5 bg-white border ${
        isExpense ? "border-[#B95760]" : "border-[#34A7B2]"
      } ${full ? "w-full" : "flex-1 min-w-[158px]"}`}
    >
      <p className="text-[#4F2712]/80 text-base font-medium">{titulo}</p>
      <p className="text-2xl font-bold">{valor}</p>
      <p className={`text-base font-medium ${growthColor}`}>
        {growthIcon} {Math.abs(variacao).toFixed(1)}%
      </p>
    </div>
  );
}

function Legenda({ cor, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-3 rounded-full ${cor}`} />
      <span className="text-[#4F2712] font-medium">{label}</span>
    </div>
  );
}

function GraficoBarras({ data }: { data: any[] }) {
  if (!data || data.length === 0)
    return <div className="min-h-[180px] flex items-center justify-center text-gray-500">Nenhum dado disponível</div>;

  const maxValue = Math.max(...data.map((d) => Math.max(d.revenue, d.expenses))) * 1.1;

  return (
    <div className="grid grid-cols-4 gap-4 items-end justify-items-center min-h-[180px]">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="relative flex h-32 w-8 items-end gap-1">
            <div className="w-full bg-[#34A7B2] rounded-t" style={{ height: `${(d.revenue / maxValue) * 100}%` }} />
            <div className="w-full bg-[#B95760] rounded-t" style={{ height: `${(d.expenses / maxValue) * 100}%` }} />
          </div>
          <p className="text-xs font-bold text-[#4F2712]/70">{d.week}</p>
        </div>
      ))}
    </div>
  );
}

function GraficoLinha({ data }: { data: any[] }) {
  if (!data || data.length === 0)
    return <div className="min-h-[148px] flex items-center justify-center text-gray-500">Nenhum dado disponível</div>;

  const maxProfit = Math.max(...data.map((d) => d.profit));
  const minProfit = Math.min(...data.map((d) => d.profit));
  const range = maxProfit - minProfit || 1;

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="relative h-32">
        <svg fill="none" height="128" width="100%" viewBox="0 0 400 128" preserveAspectRatio="none">
          <path
            d={`M0,${128 - ((data[0].profit - minProfit) / range) * 100} ${data
              .map((d, i) => `L${(i / (data.length - 1)) * 400},${128 - ((d.profit - minProfit) / range) * 100}`)
              .join(" ")} L400,128 L0,128 Z`}
            fill="url(#gradient)"
          />

          <path
            d={`M0,${128 - ((data[0].profit - minProfit) / range) * 100} ${data
              .map((d, i) => `L${(i / (data.length - 1)) * 400},${128 - ((d.profit - minProfit) / range) * 100}`)
              .join(" ")}`}
            stroke="#34A7B2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop stopColor="#34A7B2" stopOpacity="0.2" />
              <stop offset="1" stopColor="#34A7B2" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-around text-xs font-bold text-[#4F2712]/70">
        {data.map((d, i) => (
          <p key={i}>{d.month}</p>
        ))}
      </div>
    </div>
  );
}
