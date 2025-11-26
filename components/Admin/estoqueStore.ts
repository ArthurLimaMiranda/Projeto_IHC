import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface ItemEstoque {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string; // kg, L, unidades etc.
  categoria: string;
  status: "primary" | "low" | "out";
}

interface EstoqueState {
  itens: ItemEstoque[];
  adicionarItem: (item: Omit<ItemEstoque, "id" | "status">) => void;
  atualizarItem: (id: string, data: Partial<ItemEstoque>) => void;
  removerItem: (id: string) => void;
}

export const estoqueStore = create<EstoqueState>((set) => ({
  itens: [],

  adicionarItem: (item) =>
    set((state) => ({
      itens: [
        ...state.itens,
        {
          id: uuid(),
          status:
            item.quantidade === 0
              ? "out"
              : item.quantidade <= 3
              ? "low"
              : "primary",
          ...item,
        },
      ],
    })),

  atualizarItem: (id, data) =>
    set((state) => ({
      itens: state.itens.map((i) =>
        i.id === id
          ? {
              ...i,
              ...data,
              status:
                (data.quantidade ?? i.quantidade) === 0
                  ? "out"
                  : (data.quantidade ?? i.quantidade) <= 3
                  ? "low"
                  : "primary",
            }
          : i
      ),
    })),

  removerItem: (id) =>
    set((state) => ({
      itens: state.itens.filter((i) => i.id !== id),
    })),
}));
