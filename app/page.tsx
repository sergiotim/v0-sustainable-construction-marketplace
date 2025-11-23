"use client";

import { Search, MapPin, ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Tijolo Modular Padrão",
    price: "R$ 1,87",
    co2: "-13% CO₂",
    category: "Materiais Reciclados",
    image: "/images/order-20history-1.jpeg",
  },
  {
    id: 2,
    name: "Seixo Rolado 0",
    price: "R$ 90,00",
    co2: "-15% CO₂",
    category: "Agregados",
    image: "/images/order-20history-1.jpeg",
  },
  {
    id: 3,
    name: "Telha Ecológica Térmica",
    price: "R$ 53,00",
    co2: "-18% CO₂",
    category: "Estruturas e Pisos",
    image: "/images/order-20history-1.jpeg",
  },
  {
    id: 4,
    name: "Painél de Parede MW9A4B1",
    price: "R$ 48,70",
    co2: "-26% CO₂",
    category: "Acabamento Sustentável",
    image: "/images/order-20history-1.jpeg",
  },
];

const categories = [
  {
    name: "Materiais Reciclados",
    image: "/images/order-20history-1.jpeg",
    slug: "reciclados",
  },
  {
    name: "Acabamento Sustentável",
    image: "/images/order-20history-1.jpeg",
    slug: "acabamento",
  },
  {
    name: "Estruturas e Pisos",
    image: "/images/order-20history-1.jpeg",
    slug: "estruturas",
  },
  {
    name: "Materiais Naturais",
    image: "/images/order-20history-1.jpeg",
    slug: "naturais",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            eco
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/produtos"
              className="text-foreground hover:text-primary transition"
            >
              Produtos
            </Link>
            <Link
              href="/fornecedores"
              className="text-foreground hover:text-primary transition"
            >
              Fornecedores
            </Link>
            <Link
              href="/representante"
              className="text-foreground hover:text-primary transition"
            >
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white p-4 flex flex-col gap-4">
            <Link
              href="/produtos"
              className="text-foreground hover:text-primary"
            >
              Produtos
            </Link>
            <Link
              href="/fornecedores"
              className="text-foreground hover:text-primary"
            >
              Fornecedores
            </Link>
            <Link
              href="/representante"
              className="text-foreground hover:text-primary"
            >
              Nos Represente
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary/80 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">
            Construa o Futuro com Materiais Sustentáveis
          </h1>
          <p className="text-base md:text-lg mb-8 opacity-80 text-balance">
            Conectamos você a fornecedores locais de materiais ecológicos.
            Reduza seu impacto ambiental sem comprometer a qualidade.{" "}
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Buscar materiais, fornecedores..."
              className="flex-1 px-4 py-3 rounded-full text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-white text-foreground p-3 rounded-full hover:opacity-90 transition flex-shrink-0">
              <Search size={20} />
            </button>
            <Link href="/lista-de-materiais">
              <button className="bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition font-semibold whitespace-nowrap">
                Já tenho uma lista
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Produtos em Destaque
          </h2>
          <Link
            href="/produtos"
            className="text-primary hover:underline flex items-center gap-2"
          >
            Ver Todos
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/produto/${product.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      [Imagem do Produto]
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.co2}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold text-lg">
                    {product.price}
                  </p>
                  <p className="text-xs text-muted-foreground mt-auto">
                    <MapPin size={12} className="inline mr-1" />
                    12 km de distância
                  </p>
                </div>

                <div className="p-4 border-t border-border">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition text-sm font-medium">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Confira Nossas Categorias
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">
            Descubra materiais sustentáveis organizados por categoria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categoria/${category.slug}`}>
                <div className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">[Imagem]</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl text-center px-4">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Reseller CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fale com um Revendedor
          </h2>
          <p className="text-lg mb-8 opacity-90 text-balance">
            Negociar descontos especiais em larga escala para projetos de grande
            porte. Nossos revendedores comerciais estão preparados para oferecer
            soluções customizadas e condições especiais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-base opacity-90">
                De satisfação de nossos clientes comerciais
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-base opacity-90">
                Suporte personalizado em todas as negociações
              </p>
            </div>
          </div>

          <Link
            href="/representante"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            Contatar Revendedor →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">EcoBuild</h3>
              <p className="text-sm opacity-80">
                Marketplace sustentável para construção civil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>
                  <Link
                    href="/categoria/reciclados"
                    className="hover:opacity-100"
                  >
                    Reciclados
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categoria/naturais"
                    className="hover:opacity-100"
                  >
                    Naturais
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categoria/estruturas"
                    className="hover:opacity-100"
                  >
                    Estruturas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>
                  <Link href="/fornecedores" className="hover:opacity-100">
                    Fornecedores
                  </Link>
                </li>
                <li>
                  <Link href="/representante" className="hover:opacity-100">
                    Representes
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="hover:opacity-100">
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>
                  <Link href="/privacidade" className="hover:opacity-100">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="hover:opacity-100">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:opacity-100">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 EcoBuild. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
