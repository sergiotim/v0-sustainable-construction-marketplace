"use client"

import { Header } from "@/components/header"
import { Search, MapPin, Star, Package, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const suppliers = [
  {
    id: 1,
    name: "Thiago Tijolos",
    category: "Materiais Reciclados",
    distance: "5km",
    rating: 4.8,
    reviews: 127,
    products: 24,
    co2Saved: "1.240 ton",
    description: "Especialista em tijolos modulares ecológicos com alta precisão",
    badges: ["Certificado", "Verde+"],
    image: "🧱",
  },
  {
    id: 2,
    name: "Paulo Painéis",
    category: "Acabamento Sustentável",
    distance: "6km",
    rating: 4.6,
    reviews: 98,
    products: 18,
    co2Saved: "856 ton",
    description: "Painéis de parede ecológicos com máxima eficiência térmica",
    badges: ["Certificado"],
    image: "📦",
  },
  {
    id: 3,
    name: "Agregados Sustentáveis",
    category: "Agregados",
    distance: "8km",
    rating: 4.7,
    reviews: 156,
    products: 32,
    co2Saved: "2.104 ton",
    description: "Fornecedor de agregados reciclados com qualidade garantida",
    badges: ["Certificado", "Verde+", "Premium"],
    image: "⚫",
  },
  {
    id: 4,
    name: "Telhas Ecológicas Brasil",
    category: "Estruturas e Pisos",
    distance: "9km",
    rating: 4.9,
    reviews: 213,
    products: 28,
    co2Saved: "3.421 ton",
    description: "Telhas e estruturas 100% sustentáveis para obras residenciais",
    badges: ["Certificado", "Verde+", "Premium", "Top Seller"],
    image: "🏠",
  },
  {
    id: 5,
    name: "Madeira Certificada Regional",
    category: "Materiais Naturais",
    distance: "7km",
    rating: 4.5,
    reviews: 89,
    products: 15,
    co2Saved: "945 ton",
    description: "Madeira nativa com reflorestamento garantido",
    badges: ["Certificado"],
    image: "🌳",
  },
  {
    id: 6,
    name: "Reciclados Tocantins",
    category: "Materiais Reciclados",
    distance: "4km",
    rating: 4.8,
    reviews: 142,
    products: 41,
    co2Saved: "2.567 ton",
    description: "Cooperativa de reciclagem com forte impacto comunitário",
    badges: ["Verde+", "Premium"],
    image: "♻️",
  },
  {
    id: 7,
    name: "Soluções de Piso Sustentável",
    category: "Estruturas e Pisos",
    distance: "11km",
    rating: 4.4,
    reviews: 76,
    products: 22,
    co2Saved: "1.189 ton",
    description: "Pisos ecológicos com durabilidade extrema",
    badges: ["Certificado"],
    image: "⬜",
  },
  {
    id: 8,
    name: "Colas e Adesivos Eco",
    category: "Acabamento Sustentável",
    distance: "10km",
    rating: 4.3,
    reviews: 64,
    products: 12,
    co2Saved: "423 ton",
    description: "Adesivos e colas 100% biodegradáveis para construção",
    badges: ["Certificado", "Verde+"],
    image: "🧪",
  },
]

export default function FornecedoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  const categories = Array.from(new Set(suppliers.map((s) => s.category)))

  const filteredSuppliers = suppliers
    .filter((supplier) => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || supplier.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "distance") return Number.parseInt(a.distance) - Number.parseInt(b.distance)
      if (sortBy === "co2") return Number.parseInt(b.co2Saved) - Number.parseInt(a.co2Saved)
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Nossos Fornecedores Sustentáveis</h1>
          <p className="text-primary-foreground/80 text-lg">
            Conheça os parceiros EcoBuild comprometidos com a sustentabilidade
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              {/* Categories */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">Categorias</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                      !selectedCategory ? "bg-primary text-primary-foreground font-medium" : "hover:bg-secondary"
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="rating">Melhor Avaliação</option>
                  <option value="distance">Mais Próximo</option>
                  <option value="co2">Maior Impacto</option>
                </select>
              </div>

              {/* Stats */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-accent" />
                  Impacto Coletivo
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">8 Fornecedores</span> ativos
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-accent">15.745 ton CO₂</span> evitadas
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Suppliers Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredSuppliers.length} fornecedor{filteredSuppliers.length !== 1 ? "es" : ""} encontrado
                {filteredSuppliers.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredSuppliers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-6 flex items-start justify-between">
                      <div>
                        <div className="text-4xl mb-3">{supplier.image}</div>
                        <h2 className="text-2xl font-bold text-primary-foreground">{supplier.name}</h2>
                        <p className="text-primary-foreground/80 text-sm mt-1">{supplier.category}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Description */}
                      <p className="text-foreground text-sm mb-4">{supplier.description}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {supplier.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            <Award size={12} />
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-secondary rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Avaliação</p>
                          <p className="text-lg font-bold text-foreground flex items-center gap-1">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            {supplier.rating}
                          </p>
                          <p className="text-xs text-muted-foreground">({supplier.reviews})</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Produtos</p>
                          <p className="text-lg font-bold text-foreground flex items-center gap-1">
                            <Package size={16} />
                            {supplier.products}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Distância</p>
                          <p className="text-lg font-bold text-foreground flex items-center gap-1">
                            <MapPin size={16} />
                            {supplier.distance}
                          </p>
                        </div>
                      </div>

                      {/* CO2 Impact - Highlighted */}
                      <div className="bg-accent text-accent-foreground p-4 rounded-lg mb-4 border-2 border-accent/50">
                        <p className="text-xs font-semibold opacity-90 mb-1">CO₂ Evitado</p>
                        <p className="text-2xl font-bold">{supplier.co2Saved}</p>
                        <p className="text-xs opacity-90 mt-1">Impacto acumulado de todas as vendas</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Link href={`/fornecedores/${supplier.id}`} className="flex-1">
                          <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold">
                            Ver Produtos
                          </button>
                        </Link>
                        <button className="flex-1 border-2 border-primary text-primary py-3 rounded-lg hover:bg-primary/5 transition font-semibold">
                          Contato
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary rounded-lg">
                <p className="text-foreground font-semibold mb-2">Nenhum fornecedor encontrado</p>
                <p className="text-muted-foreground text-sm">Tente ajustar seus filtros ou pesquisa</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">{suppliers.length}</p>
              <p className="text-primary-foreground/80 text-sm">Fornecedores Ativos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{suppliers.reduce((acc, s) => acc + s.products, 0)}</p>
              <p className="text-primary-foreground/80 text-sm">Produtos Sustentáveis</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {(suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length).toFixed(1)}
              </p>
              <p className="text-primary-foreground/80 text-sm">Avaliação Média</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {(suppliers.reduce((acc, s) => acc + Number.parseInt(s.co2Saved), 0) / 1000).toFixed(1)}k
              </p>
              <p className="text-primary-foreground/80 text-sm">Toneladas CO₂ Evitadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
