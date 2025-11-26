// app/financas/despesas/page.tsx
"use client";
import React, { useState, useRef } from "react";
import {
  ArrowLeftIcon,
  CameraIcon,
  GiftTopIcon,
  ArchiveBoxIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  HomeModernIcon,
  UsersIcon,
  FolderIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

// Categorias convertidas para Heroicons
const categories = [
  { label: "Ingredientes", icon: GiftTopIcon },
  { label: "Embalagens", icon: ArchiveBoxIcon },
  { label: "Marketing", icon: MegaphoneIcon },
  { label: "Contas", icon: DocumentTextIcon },
  { label: "Aluguel", icon: HomeModernIcon },
  { label: "Salários", icon: UsersIcon },
  { label: "Outros", icon: FolderIcon },
];

const subcategories = {
  "Ingredientes": ["Farinhas", "Laticínios", "Açúcares", "Frutas", "Chocolate", "Corantes", "Outros"],
  "Embalagens": ["Caixas", "Sacolas", "Fitas", "Etiquetas", "Embalagens plásticas", "Outros"],
  "Marketing": ["Anúncios", "Panfletos", "Fotos", "Site", "Redes Sociais", "Outros"],
  "Contas": ["Luz", "Água", "Internet", "Telefone", "Gás", "Outros"],
  "Aluguel": ["Espaço comercial", "Equipamentos", "Outros"],
  "Salários": ["Funcionários", "Freelancers", "Outros"],
  "Outros": ["Manutenção", "Transporte", "Taxas", "Outros"]
};

const paymentTypes = ["Cartão de Crédito", "Cartão de Débito", "PIX", "Dinheiro", "Transferência"];

export default function RegistroDespesa() {
  const router = useRouter();
  const { addExpense } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState("Ingredientes");
  const [valor, setValor] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(() => {
    // Formatar data atual no formato YYYY-MM-DD para o input date
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [fornecedor, setFornecedor] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("Cartão de Crédito");
  const [foto, setFoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função corrigida para formatar valor monetário
  const formatCurrency = (value: string): string => {
    // Remove tudo que não é número
    const onlyNumbers = value.replace(/\D/g, '');
    
    if (!onlyNumbers) return '';
    
    // Converte para número e formata como moeda brasileira
    const numberValue = parseInt(onlyNumbers, 10) / 100;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(numberValue);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setValor(formattedValue);
  };

  // Função para converter valor formatado para número
  const parseCurrency = (currencyString: string): number => {
    if (!currencyString) return 0;
    
    // Remove "R$", espaços e converte vírgula para ponto
    const cleanString = currencyString
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();
    
    return parseFloat(cleanString) || 0;
  };

  const handleSalvar = () => {
    if (!valor) {
      alert("Por favor, insira um valor.");
      return;
    }

    // Converter valor usando a função corrigida
    const valorNumerico = parseCurrency(valor);
    
    if (valorNumerico <= 0) {
      alert("Por favor, insira um valor válido maior que zero.");
      return;
    }

    const novaDespesa = {
      amount: valorNumerico,
      category: selectedCategory,
      subcategory: subcategoria || undefined,
      description: descricao || undefined,
      date: data,
      supplier: fornecedor || undefined,
      paymentMethod: tipoPagamento,
      receiptImage: foto || undefined,
    };

    addExpense(novaDespesa);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  // Função para lidar com upload de foto
  const handleFotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas imagens.');
      return;
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFoto(e.target.result as string);
      }
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Erro ao carregar a imagem. Tente novamente.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoverFoto = () => {
    setFoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnexarFotoClick = () => {
    fileInputRef.current?.click();
  };

  // Função para obter o placeholder da data no formato correto
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FFFFF4]">
      {/* Top App Bar */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon 
            className="w-7 h-7 cursor-pointer text-[#4F2712]"
            onClick={() => router.back()} 
          />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Registrar Despesa
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 flex flex-col gap-6 pt-6">

        {/* Valor */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-semibold pb-2 text-lg">Valor *</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={valor}
            onChange={handleValorChange}
            inputMode="decimal"
            className="form-input w-full rounded-lg bg-white border border-gray-300 h-14 p-4 text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Digite o valor (ex: 45.50 para R$ 45,50)
          </p>
        </label>

        {/* Categoria */}
        <div className="flex items-center gap-4">
          <h3 className="text-[#4F2712] font-semibold text-lg">Categoria *</h3>
          <div className="flex-grow h-px bg-[#B95760]/30"></div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex h-10 items-center justify-center gap-x-2 rounded-full pl-3 pr-4 transition-all shadow-sm border
                ${selectedCategory === cat.label
                  ? "bg-[#B95760] text-white border-[#B95760]"
                  : "bg-white border-[#B95760] text-[#B95760] hover:bg-[#B95760]/10"}`}
            >
              <cat.icon className="w-5 h-5" />
              <p className="text-sm font-medium">{cat.label}</p>
            </button>
          ))}
        </div>

        {/* Subcategoria */}
        <div className="flex flex-col">
          <p className="text-base font-medium pb-2 text-[#4F2712]">Subcategoria (opcional)</p>
          <select 
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          >
            <option value="">Selecione uma subcategoria</option>
            {subcategories[selectedCategory as keyof typeof subcategories]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Descrição */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2 text-lg">Descrição (opcional)</p>
          <input
            type="text"
            placeholder="Ex: Farinha de amêndoas premium"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        {/* Data */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-semibold text-lg pb-2">Data *</p>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 text-[#0A0A0A] focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
            min="2020-01-01"
            max="2030-12-31"
          />
        </label>

        {/* Fornecedor / Pagamento / Foto */}
        <div className="flex flex-col gap-6 pt-2">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Fornecedor / Loja (opcional)</p>
            <input
              type="text"
              placeholder="Ex: Doce Vida Embalagens"
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Tipo de Pagamento *</p>
            <select 
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
              className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
            >
              {paymentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-base font-medium pb-2 text-[#4F2712]">Foto do Comprovante (opcional)</p>
            
            {/* Input de arquivo oculto */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFotoUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
            
            {foto ? (
              <div className="relative">
                <div className="w-full h-48 rounded-lg border-2 border-dashed border-[#34A7B2] bg-[#34A7B2]/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src={foto} 
                    alt="Comprovante" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  onClick={handleRemoverFoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAnexarFotoClick}
                disabled={uploading}
                className={`w-full h-14 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${
                  uploading 
                    ? 'border-gray-400 bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'border-[#34A7B2] bg-[#34A7B2]/10 text-[#34A7B2] hover:bg-[#34A7B2]/20'
                }`}
              >
                <CameraIcon className="w-6 h-6" />
                {uploading ? 'Carregando...' : 'Anexar Foto'}
              </button>
            )}
            
            {foto && (
              <p className="text-xs text-green-600 mt-2 text-center">
                ✓ Foto anexada com sucesso
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="sticky bottom-0 bg-[#FFFFF4] p-4 pt-2 pb-24">
        <div className="flex gap-4">
          <button 
            onClick={() => router.back()}
            className="flex w-full justify-center items-center rounded-xl h-14 text-[#B95760] border border-[#B95760] text-base font-bold hover:bg-[#B95760]/10 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => setShowConfirmModal(true)}
            className="flex w-full justify-center rounded-xl items-center bg-[#B95760] h-14 text-white text-base font-bold hover:bg-[#A0464E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!valor || parseCurrency(valor) <= 0}
          >
            Salvar Despesa
          </button>
        </div>
        
        {/* Indicador de campos obrigatórios */}
        <p className="text-xs text-gray-500 text-center mt-2">
          * Campos obrigatórios
        </p>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-[#4F2712] text-center mb-3">
              Confirmar Registro
            </h2>
            <p class="text-gray-700 text-center mb-6">
              Deseja registrar esta despesa?
            </p>

            <div className="flex gap-3">
              <button
                className="w-full h-12 rounded-xl border border-[#B95760] text-[#B95760] font-semibold"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>
              <button
                className="w-full h-12 rounded-xl bg-[#B95760] text-white font-semibold"
                onClick={handleSalvar}
              >
                Sim, registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <h2 className="text-lg font-bold text-green-700 mb-3">
              Sucesso!
            </h2>
            <p className="text-gray-700 mb-6">
              A despesa foi registrada com sucesso.
            </p>

            <button
              className="w-full h-12 rounded-xl bg-green-600 text-white font-semibold"
              onClick={() => {
                setShowSuccessModal(false);
                router.back();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}


      <MenuInferior />
    </div>
  );
}