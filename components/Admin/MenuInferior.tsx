import Link from "next/link";
import React from "react";

export default function MenuInferior() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-brand-brown/10 py-2 dark:border-brand-cream/10">
      <Link
        className="flex w-full flex-col items-center justify-center gap-1 text-brand-teal"
        href="#"
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-xs font-medium">Início</span>
      </Link>

      <Link
        className="flex w-full flex-col items-center justify-center gap-1 text-brand-brown/60 hover:text-brand-teal dark:text-brand-cream/60 dark:hover:text-brand-teal"
        href="#"
      >
        <span className="material-symbols-outlined">list_alt</span>
        <span className="text-xs">Pedidos</span>
      </Link>

      <Link
        className="flex w-full flex-col items-center justify-center gap-1 text-brand-brown/60 hover:text-brand-teal dark:text-brand-cream/60 dark:hover:text-brand-teal"
        href="#"
      >
        <span className="material-symbols-outlined">monitoring</span>
        <span className="text-xs">Finanças</span>
      </Link>

      <Link
        className="flex w-full flex-col items-center justify-center gap-1 text-brand-brown/60 hover:text-brand-teal dark:text-brand-cream/60 dark:hover:text-brand-teal"
        href="#"
      >
        <span className="material-symbols-outlined">inventory_2</span>
        <span className="text-xs">Produtos</span>
      </Link>
    </nav>
  );
}