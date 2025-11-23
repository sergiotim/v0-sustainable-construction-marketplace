"use client"

import { ShoppingCart, User, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          eco
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/produtos" className="text-foreground hover:text-primary transition">
            Produtos
          </Link>
          <Link href="/fornecedores" className="text-foreground hover:text-primary transition">
            Fornecedores
          </Link>
          <Link href="/representante" className="text-foreground hover:text-primary transition">
            Nos Represente
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-lg transition">
            <User size={20} />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition relative">
            <ShoppingCart size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white p-4 flex flex-col gap-4">
          <Link href="/produtos" className="text-foreground hover:text-primary">
            Produtos
          </Link>
          <Link href="/fornecedores" className="text-foreground hover:text-primary">
            Fornecedores
          </Link>
          <Link href="/representante" className="text-foreground hover:text-primary">
            Nos Represente
          </Link>
        </div>
      )}
    </header>
  )
}
