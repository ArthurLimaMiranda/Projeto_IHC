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
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Início", icon: HomeIcon },
    { href: "/pedidos", label: "Pedidos", icon: ClipboardIcon },
    { href: "/financas", label: "Finanças", icon: ChartBarIcon },
    { href: "/produtos", label: "Produtos", icon: CubeIcon },
  ];

  // Remove barra final, caso exista
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-[#E0DFCC] py-2 bg-[#EEEDDF]">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active =
          normalizePath(pathname) === normalizePath(item.href) ||
          normalizePath(pathname).startsWith(normalizePath(item.href) + "/");
        const colorClass = active ? "text-red-500" : "text-[#BDAC9B]";

        return (
        <Link
        key={item.href}
        href={item.href}
        className="flex w-full flex-col items-center justify-center gap-1"
        >
        <Icon className={`h-6 w-6 ${active ? "text-red-500" : "text-[#BDAC9B]"}`} />
        <span className={`text-xs font-medium ${active ? "text-red-500" : "text-[#BDAC9B]"}`}>
            {item.label}
        </span>
        </Link>

        );
      })}
    </nav>
  );
}
