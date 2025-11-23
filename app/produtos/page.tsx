"use client"

import { Header } from "@/components/header"
import { Search, ChevronDown, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const allProducts = [
  {
    id: 1,
    name: "Cumueeira Ecológica 6mm",
    price: "R$ 50,00",
    co2: "-13% CO₂",
    category: "Estruturas",
    distance: "8km",
    image:"/images/cuumeira.webp"
  },
  { id: 2, name: "Tijolo Modular Padrão", price: "R$ 1,87", co2: "-13% CO₂", category: "Reciclados", distance: "5km",
    image:"/images/tijolo.jpg" },
  { id: 3, name: "Canaleta Modular", price: "R$ 1,97", co2: "-13% CO₂", category: "Agregados", distance: "12km",
    image:"/images/canaleta.jpg" },
  {
    id: 4,
    name: "Cola para Tijolos Ecológicos",
    price: "R$ 50,00",
    co2: "-13% CO₂",
    category: "Acabamento",
    distance: "15km",
    image:"/images/cola.webp"
  },
  { id: 5, name: "Pedra Canga (500g)", price: "R$ 90,00", co2: "-26% CO₂", category: "Agregados", distance: "10km" ,
    image:"/images/pedra.webp"},
  { id: 6, name: "Seixo Rolado 0", price: "R$ 90,00", co2: "-15% CO₂", category: "Agregados", distance: "7km" ,
    image:"/images/seixo.jpg"},
  { id: 7, name: "Assoalho MI081", price: "R$ 9,00", co2: "-18% CO₂", category: "Pisos", distance: "20km",
    image:"/images/assoalho.png" },
  { id: 8, name: "Telha Ecológica", price: "R$ 50,00", co2: "-17% CO₂", category: "Estruturas", distance: "9km",
    image:"/images/telha.jpg" },
  {
    id: 9,
    name: "Painél de Parede MW9A4B1",
    price: "R$ 48,70",
    co2: "-26% CO₂",
    category: "Acabamento",
    distance: "6km"
    ,
    image:"/images/painel.jpg"
  },
  { id: 10, name: "Canaleta Modular", price: "R$ 1,97", co2: "-13% CO₂", category: "Agregados", distance: "11km",
    image:"/images/canaleta.jpg" },
  {
    id: 11,
    name: "Cumueeira Ecológica 6mm",
    price: "R$ 50,00",
    co2: "-13% CO₂",
    category: "Estruturas",
    distance: "14km",
    image:"/images/cuumeira.webp"
  },
  {
    id: 12,
    name: "Cumueeira Ecológica 6mm",
    price: "R$ 50,00",
    co2: "-13% CO₂",
    category: "Estruturas",
    distance: "8km",
    
    image:"/images/cuumeira.webp"
  },
]

const categories = ["Materiais Reciclados", "Acabamentos", "Estruturas e Pisos", "Materiais Naturais", "Agregados"]

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [maxPrice, setMaxPrice] = useState(100)
  const [maxDistance, setMaxDistance] = useState(25)
  const [sortBy, setSortBy] = useState("relevancia")
  const [expandedFilter, setExpandedFilter] = useState("")

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = Number.parseFloat(product.price.replace("R$", "")) <= maxPrice
      const matchesDistance = Number.parseInt(product.distance) <= maxDistance
      return matchesSearch && matchesCategory && matchesPrice && matchesDistance
    })
    .sort((a, b) => {
      if (sortBy === "preco-asc") {
        return Number.parseFloat(a.price.replace("R$", "")) - Number.parseFloat(b.price.replace("R$", ""))
      }
      if (sortBy === "preco-desc") {
        return Number.parseFloat(b.price.replace("R$", "")) - Number.parseFloat(a.price.replace("R$", ""))
      }
      if (sortBy === "distancia") {
        return Number.parseInt(a.distance) - Number.parseInt(b.distance)
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Bar */}
      <div className="bg-white border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por item, categoria ou fornecedor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground p-3 rounded-lg hover:opacity-90 transition">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <button
                  onClick={() => setExpandedFilter(expandedFilter === "categories" ? "" : "categories")}
                  className="w-full flex items-center justify-between font-semibold text-foreground mb-3"
                >
                  Categorias
                  <ChevronDown
                    size={18}
                    className={`transition ${expandedFilter === "categories" ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilter === "categories" && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        !selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      Todos
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                          selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <button
                  onClick={() => setExpandedFilter(expandedFilter === "price" ? "" : "price")}
                  className="w-full flex items-center justify-between font-semibold text-foreground mb-3"
                >
                  Preço
                  <ChevronDown size={18} className={`transition ${expandedFilter === "price" ? "rotate-180" : ""}`} />
                </button>
                {expandedFilter === "price" && (
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <p className="text-sm text-muted-foreground">Até R$ {maxPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Distance Filter */}
              <div>
                <button
                  onClick={() => setExpandedFilter(expandedFilter === "distance" ? "" : "distance")}
                  className="w-full flex items-center justify-between font-semibold text-foreground mb-3"
                >
                  Distância
                  <ChevronDown
                    size={18}
                    className={`transition ${expandedFilter === "distance" ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilter === "distance" && (
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <p className="text-sm text-muted-foreground">Até {maxDistance} km</p>
                  </div>
                )}
              </div>

              {/* CO2 Impact Note */}
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-sm font-semibold text-accent mb-2">Impacto Ambiental</p>
                <p className="text-xs text-muted-foreground">
                  Todos os produtos aqui reduzem significativamente emissões de CO₂.
                </p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">Showing 1-12 of {filteredProducts.length} item(s)</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevancia">Relevância</option>
                <option value="preco-asc">Menor Preço</option>
                <option value="preco-desc">Maior Preço</option>
                <option value="distancia">Mais Próximo</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/produto/${product.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition cursor-pointer h-full flex flex-col group">
                      <div className="relative h-48 bg-secondary overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80">
                          <span className="text-muted-foreground">
                            <img src={product.image} alt="" />
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          {product.co2}
                        </div>
                        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition">
                          <Heart size={16} className="text-primary" />
                        </button>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-foreground mb-3 text-sm">{product.name}</h3>
                        <div className="flex items-baseline gap-2 mb-3">
                          <p className="text-primary font-bold text-lg">{product.price}</p>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
                          <MapPin size={12} />
                          {product.distance}
                        </p>
                      </div>

                      <div className="p-4 border-t border-border">
                        <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition text-sm font-medium group-hover:shadow-md">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">Nenhum produto encontrado</p>
                <p className="text-sm text-muted-foreground">Tente ajustar seus filtros</p>
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition font-semibold inline-flex items-center gap-2">
                Load More
                <span>→</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
