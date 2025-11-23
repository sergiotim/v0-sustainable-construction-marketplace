"use client"

import { Header } from "@/components/header"
import { ArrowRight, Sparkles, Trash2, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Material {
  id: string
  name: string
  quantity: number
  unit: string
}

type LatLng = { lat: number; lon: number }

interface Supplier {
  id: number
  name: string
  city: string
  product: string
  lat: number
  lon: number
}

interface Recommendation {
  id: string
  original: string
  substitute: string
  compatibility: number
  price: string
  co2: string
  co2Reduction: number
  quantity: number
  image: string
  distanceKm: number | null
  supplier?: Supplier
}

// ---------------------------
// FORNECEDORES (CSV resumido)
// ---------------------------

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Polinorte Sustentáveis",
    city: "Araguaína-TO",
    product: "Blocos, pré-moldados, concreto ecológico",
    lat: -7.19238,
    lon: -48.2044,
  },
  {
    id: 2,
    name: "AB Telhas Ecológicas",
    city: "Araguaína-TO",
    product: "Telhas ecológicas",
    lat: -7.19238,
    lon: -48.2044,
  },
  {
    id: 3,
    name: "Ecolar Tijolos Ecológicos",
    city: "Palmas-TO",
    product: "Tijolos solo-cimento",
    lat: -10.31715,
    lon: -48.3014,
  },
  {
    id: 4,
    name: "Ecotins Tijolos e Construções Ecológicas",
    city: "Porto Nacional-TO",
    product: "Tijolos artesanais / cerâmica ecológica",
    lat: -10.7078,
    lon: -48.4169,
  },
  {
    id: 5,
    name: "Cotae Tijolos Ecológicos Ltda",
    city: "Palmas-TO",
    product: "Tijolos ecológicos",
    lat: -10.1844,
    lon: -48.3336,
  },
  {
    id: 6,
    name: "Cerâmica Sustentável Paraíso-TO",
    city: "Paraíso do Tocantins-TO",
    product: "Telhas e tijolos (casca de arroz)",
    lat: -10.1722,
    lon: -48.881,
  },
  {
    id: 10,
    name: "Madeireira Rio Araguaia",
    city: "Araguaína-TO",
    product: "Materiais ecológicos",
    lat: -7.19083,
    lon: -48.2069,
  },
  {
    id: 13,
    name: "Produção artesanal de Adobe – Jalapão",
    city: "Mateiros-TO",
    product: "Tijolos de adobe familiar",
    lat: -10.5782,
    lon: -46.424,
  },
  {
    id: 16,
    name: "LANCI – Madeira Plástica Reciclada",
    city: "Palmas-TO",
    product: "Madeira plástica reciclada",
    lat: -10.1844,
    lon: -48.3336,
  },
]

// ---------------------------------
// FUNÇÕES DE DISTÂNCIA (Haversine)
// ---------------------------------

function toRad(value: number) {
  return (value * Math.PI) / 180
}

function distanceInKm(a: LatLng, b: LatLng): number {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return R * c
}

function getNearestSupplier(
  userLocation: LatLng,
  supplierIds?: number[]
): { supplier: Supplier; distanceKm: number } | null {
  const candidates =
    supplierIds && supplierIds.length > 0
      ? suppliers.filter((s) => supplierIds.includes(s.id))
      : suppliers

  if (!candidates.length) return null

  let best = candidates[0]
  let bestDistance = distanceInKm(userLocation, { lat: best.lat, lon: best.lon })

  for (const s of candidates.slice(1)) {
    const d = distanceInKm(userLocation, { lat: s.lat, lon: s.lon })
    if (d < bestDistance) {
      best = s
      bestDistance = d
    }
  }

  return { supplier: best, distanceKm: bestDistance }
}

type MaterialDBEntry = {
  base: Omit<Recommendation, "distanceKm" | "supplier">
  supplierIds: number[]
}

const materialDatabase: Record<string, MaterialDBEntry> = {
  "cimento cp2": {
    base: {
      id: "1",
      original: "Cimento CP2",
      substitute: "Adobe Ecológico",
      compatibility: 95,
      price: "R$ 45,00",
      co2: "-35% CO₂",
      co2Reduction: 35,
      quantity: 1,
      image: "/images/adobe.jpg",
    },
    supplierIds: [3, 4, 5, 13],
  },
  "brita 1": {
    base: {
      id: "2",
      original: "Brita 1",
      substitute: "Seixo Rolado 0",
      compatibility: 88,
      price: "R$ 90,00",
      co2: "-26% CO₂",
      co2Reduction: 26,
      quantity: 1,
      image: "/images/seixo.jpg",
    },
    supplierIds: [1, 2, 6, 10],
  },
  reboco: {
    base: {
      id: "3",
      original: "Reboco",
      substitute: "Reboco Sustentável",
      compatibility: 92,
      price: "R$ 55,00",
      co2: "-22% CO₂",
      co2Reduction: 22,
      quantity: 1,
      image: "/images/reboco.jpg",
    },
    supplierIds: [1, 3, 5],
  },
  areia: {
    base: {
      id: "4",
      original: "Areia",
      substitute: "Areia Reciclada",
      compatibility: 90,
      price: "R$ 35,00",
      co2: "-30% CO₂",
      co2Reduction: 30,
      quantity: 1,
      image: "/images/areia.jpg",
    },
    supplierIds: [1, 2, 6, 10],
  },
  telha: {
    base: {
      id: "5",
      original: "Telha Cerâmica",
      substitute: "Telha Ecológica Térmica",
      compatibility: 94,
      price: "R$ 50,00",
      co2: "-28% CO₂",
      co2Reduction: 28,
      quantity: 1,
      image: "/images/telha.jpg",
    },
    supplierIds: [2, 6],
  },
  tijolos: {
    base: {
      id: "6",
      original: "Tijolos Convencionais",
      substitute: "Tijolo Modular Padrão",
      compatibility: 96,
      price: "R$ 1,87",
      co2: "-32% CO₂",
      co2Reduction: 32,
      quantity: 1,
      image: "/images/tijolo.jpg",
    },
    supplierIds: [1, 3, 4, 5, 6],
  },
}

export default function ListaMateriais() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [newMaterialName, setNewMaterialName] = useState("")
  const [newMaterialQuantity, setNewMaterialQuantity] = useState(1)
  const [newMaterialUnit, setNewMaterialUnit] = useState("un")
  const [maxDistance, setMaxDistance] = useState(50)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [locationStatus, setLocationStatus] = useState("")

  const addMaterial = () => {
    if (newMaterialName.trim()) {
      setMaterials((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newMaterialName,
          quantity: newMaterialQuantity,
          unit: newMaterialUnit,
        },
      ])
      setNewMaterialName("")
      setNewMaterialQuantity(1)
      setNewMaterialUnit("un")
    }
  }

  const removeMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id))
  }

  const handleGetLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocationStatus("Seu navegador não suporta geolocalização.")
      return
    }

    setLocationStatus("Obtendo sua localização...")

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
        setLocationStatus(
          "Localização detectada! Vamos priorizar fornecedores mais próximos."
        )
      },
      (err) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Erro ao obter localização", err)
        }
        setLocationStatus(
          err?.message ||
            "Não foi possível obter sua localização. Verifique as permissões do navegador."
        )
      }
    )
  }

  const handleRecommend = () => {
    const recs: Recommendation[] = []

    materials.forEach((material) => {
      const materialName = material.name.toLowerCase().trim()
      let matched = false

      for (const [key, entry] of Object.entries(materialDatabase)) {
        if (
          materialName.includes(key) ||
          key.includes(materialName)
        ) {
          matched = true

          let supplierInfo: { supplier: Supplier; distanceKm: number } | null =
            null

          if (userLocation) {
            supplierInfo = getNearestSupplier(userLocation, entry.supplierIds)
          }

          const distanceKm = supplierInfo?.distanceKm ?? null

          if (!userLocation || (distanceKm !== null && distanceKm <= maxDistance)) {
            recs.push({
              ...entry.base,
              quantity: material.quantity,
              distanceKm,
              supplier: supplierInfo?.supplier,
            })
          }

          return
        }
      }

      // fallback custom
      let fallbackSupplierInfo: { supplier: Supplier; distanceKm: number } | null =
        null

      if (userLocation) {
        fallbackSupplierInfo = getNearestSupplier(userLocation)
      }

      const fallbackDistance = fallbackSupplierInfo?.distanceKm ?? null

      if (!userLocation || (fallbackDistance !== null && fallbackDistance <= maxDistance)) {
        recs.push({
          id: `custom-${material.id}`,
          original: material.name,
          substitute: `${material.name} Sustentável`,
          compatibility: 80,
          price: "Sob orçamento",
          co2: "-20% CO₂",
          co2Reduction: 20,
          distanceKm: fallbackDistance,
          quantity: material.quantity,
          image: "/images/order-20history-1.jpeg",
          supplier: fallbackSupplierInfo?.supplier,
        })
      }
    })

    // Ordena dos mais próximos para os mais distantes
    recs.sort((a, b) => {
      const da = a.distanceKm ?? Number.POSITIVE_INFINITY
      const db = b.distanceKm ?? Number.POSITIVE_INFINITY
      return da - db
    })

    setRecommendations(recs)
    setHasSearched(true)
  }

  const totalCo2Reduction =
    recommendations.length > 0
      ? recommendations.reduce(
          (sum, rec) => sum + rec.co2Reduction * rec.quantity,
          0
        )
      : 0

  const avgCompatibility =
    recommendations.length > 0
      ? Math.round(
          recommendations.reduce((sum, rec) => sum + rec.compatibility, 0) /
            recommendations.length
        )
      : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {!hasSearched ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-pretty">
                Converta sua Lista de Materiais
              </h1>
              <p className="text-xl text-muted-foreground text-balance">
                Adicione seus materiais convencionais com quantidades e descubra
                alternativas ecológicas e sustentáveis disponíveis no nosso
                marketplace.
              </p>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm mb-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Adicione seus Materiais
                </label>

                <div className="flex gap-3 mb-4 flex-col sm:flex-row">
                  <input
                    type="text"
                    value={newMaterialName}
                    onChange={(e) => setNewMaterialName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addMaterial()}
                    placeholder="Ex: Cimento CP2, Brita 1, Tijolos..."
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    min="1"
                    value={newMaterialQuantity}
                    onChange={(e) =>
                      setNewMaterialQuantity(
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    placeholder="Qtd"
                    className="w-20 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={newMaterialUnit}
                    onChange={(e) => setNewMaterialUnit(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="un">Unid.</option>
                    <option value="kg">kg</option>
                    <option value="m">m</option>
                    <option value="m2">m²</option>
                    <option value="m3">m³</option>
                    <option value="saco">Saco</option>
                    <option value="caixa">Caixa</option>
                  </select>
                  <button
                    onClick={addMaterial}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold whitespace-nowrap"
                  >
                    Adicionar
                  </button>
                </div>

                {/* Materials List */}
                {materials.length > 0 && (
                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-semibold text-foreground">
                      Materiais Adicionados ({materials.length})
                    </p>
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between bg-secondary p-4 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {material.quantity} {material.unit} de{" "}
                            {material.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeMaterial(material.id)}
                          className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <label className="block text-sm font-semibold text-foreground mb-4">
                  <MapPin size={16} className="inline mr-2" />
                  Raio de Distância dos Fornecedores
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    value={maxDistance}
                    onChange={(e) =>
                      setMaxDistance(Number.parseInt(e.target.value))
                    }
                    className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="min-w-fit">
                    <span className="text-lg font-bold text-primary">
                      {maxDistance} km
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Apenas fornecedores dentro de {maxDistance}km de distância
                  serão considerados nas recomendações{" "}
                  {userLocation ? "" : "(ao ativar sua localização)."}
                </p>

                {/* Botão para pegar localização */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary/10 transition text-sm"
                  >
                    <MapPin size={16} />
                    Usar minha localização
                  </button>
                  {locationStatus && (
                    <span className="text-xs text-muted-foreground max-w-md">
                      {locationStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRecommend}
                  disabled={materials.length === 0}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Recomendar Materiais Sustentáveis
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Dica:</strong> Ative sua localização para que possamos
                  priorizar fornecedores mais próximos da sua obra usando a base
                  de empresas sustentáveis do Tocantins.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setHasSearched(false)
                  setMaterials([])
                  setRecommendations([])
                }}
                className="text-primary hover:underline flex items-center gap-2 mb-4"
              >
                ← Voltar
              </button>
              <h2 className="text-3xl font-bold text-foreground">
                Materiais Sustentáveis Recomendados
              </h2>
              <p className="text-muted-foreground mt-2">
                Encontramos {recommendations.length} alternativa(s) ecológica(s) para seus{" "}
                {materials.length} material(is)
                {userLocation
                  ? ` dentro de ${maxDistance}km, ordenadas pelos fornecedores mais próximos.`
                  : ", mas você ainda não ativou a localização."}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Original Material */}
                    <div className="p-6 border-r border-border flex flex-col justify-center">
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        Material Original
                      </p>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {rec.original}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Quantidade:{" "}
                        <strong>
                          {rec.quantity} {rec.quantity > 1 ? "un." : "un."}
                        </strong>
                      </p>
                    </div>

                    {/* Product Image and Info */}
                    <div className="p-6 flex flex-col justify-between">
                      <div className="mb-4 h-40 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={rec.image || "/placeholder.svg"}
                          alt={rec.substitute}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                          Alternativa Sustentável
                        </p>
                        <h3 className="text-lg font-bold text-primary mb-3">
                          {rec.substitute}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Preço Unit.
                            </p>
                            <p className="font-bold text-foreground">
                              {rec.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Compatibilidade
                            </p>
                            <p className="font-bold text-accent">
                              {rec.compatibility}%
                            </p>
                          </div>
                          {rec.supplier && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Fornecedor
                              </p>
                              <p className="font-semibold text-foreground">
                                {rec.supplier.name} · {rec.supplier.city}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Carbon Impact and Action */}
                    <div className="p-6 bg-accent/5 flex flex-col justify-between">
                      <div className="mb-6">
                        <div className="bg-accent/20 border-2 border-accent rounded-xl p-4 mb-4">
                          <p className="text-xs font-semibold text-accent uppercase mb-2">
                            Impacto de Carbono
                          </p>
                          <p className="text-3xl font-bold text-accent mb-2">
                            {rec.co2}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Redução de emissões de CO₂
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Distância:
                            </span>
                            <span className="font-semibold text-foreground">
                              {rec.distanceKm != null
                                ? `~${Math.round(rec.distanceKm)} km`
                                : userLocation
                                ? "Sem dado de distância"
                                : "Ative sua localização"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/produto/${rec.id}`} className="w-full">
                        <button className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition font-semibold">
                          Ver Detalhes
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">
                Resumo de Sustentabilidade
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary-foreground/10 rounded-xl p-6 border-2 border-primary-foreground">
                  <p className="text-xs font-semibold uppercase mb-2 opacity-80">
                    Redução Total de CO₂
                  </p>
                  <p className="text-5xl font-bold mb-2">
                    {totalCo2Reduction}%
                  </p>
                  <p className="text-sm opacity-90">
                    Considerando todas as alternativas
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">
                    {recommendations.length}
                  </p>
                  <p className="text-sm opacity-90">
                    Alternativas Encontradas
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">
                    {avgCompatibility}%
                  </p>
                  <p className="text-sm opacity-90">
                    Compatibilidade Média
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link href="/carrinho">
                <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold inline-flex items-center gap-2 mb-4">
                  Adicionar ao Carrinho
                  <ArrowRight size={18} />
                </button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Todos os itens recomendados já estão no nosso marketplace
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <section className="bg-secondary border-t border-border mt-12 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Não encontrou o que procura?
          </h3>
          <p className="text-muted-foreground mb-6">
            Fale com um revendedor comercial especializado para soluções
            customizadas em larga escala.
          </p>
          <Link href="/representante">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold">
              Falar com Revendedor →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
