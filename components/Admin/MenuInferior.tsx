'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  HomeIcon,
  ClipboardIcon,
  ChartBarIcon,
  CubeIcon
} from "@heroicons/react/24/solid";

export default function MenuInferior() {
  const rawPath = usePathname() ?? "";

  // remove /pt, /en etc
  const pathname =
    rawPath.replace(/^\/[a-zA-Z]{2}(?=\/)/, "").split("?")[0] || "/";

  const menuItems = [
    { href: "/dashboard", match: "/dashboard", label: "Início", icon: HomeIcon },
    { href: "/historico-pedidos", match: "/historico-pedidos", label: "Pedidos", icon: ClipboardIcon },
    { href: "/financas", match: "/financas", label: "Finanças", icon: ChartBarIcon },
    { href: "/produtos", match: "/produtos", label: "Produtos", icon: CubeIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex bg-[#EEEDDF] border-t border-[#E0DFCC]">
      {menuItems.map((item) => {
        const Icon = item.icon;

        // ativa se o pathname começar com o prefixo da seção (match)
        const isActive = pathname.startsWith(item.match);

        return (
          <Link
            key={item.href}
            href={`/pt${item.href}`}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-all
              ${isActive ? "bg-[#B95760] text-white" : "text-[#BDAC9B] bg-transparent"}
            `}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
