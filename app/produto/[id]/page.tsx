"use client"

import { Header } from "@/components/header"
import { Heart, Share2, MapPin, Truck, Leaf, MessageCircle, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { use } from "react"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

const productDetails: Record<string, any> = {
  "1": {
    id: 1,
    name: "Tijolo Modular Padrão",
    supplier: "Thiago Tijolos",
    price: "R$ 1,87",
    co2: "-13% CO₂",
    co2Text: "13 kg CO₂ evitados",
    distance: "5 km de você",
    rating: 4.8,
    reviews: 156,
    badges: ["Material Local", "Reciclado", "Certificado"],
    description:
      "O Tijolo Modular Padrão é uma solução ecológica e durável para construções sustentáveis. Fabricado a partir de materiais reciclados, reduz significativamente a pegada de carbono em comparação com tijolos convencionais.",
    specifications: {
      Dimensões: "9cm × 19cm × 19cm",
      Material: "Argila Reciclada + Resíduos Industriais",
      Peso: "2.5 kg",
      Resistência: "Até 6 MPa",
      Sustentabilidade: "Reduz 13% de emissões de CO₂",
    },
    specifications2: {
      Certificação: "Casa Azul Caixa / LEED",
      Validade: "24 meses",
      Garantia: "2 anos",
      Transporte: "Frete incluído",
    },
    imageUrl: "/images/order-20history-1.jpeg",
  },
}

export default function ProdutoPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = productDetails[id] || productDetails["1"]
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [selectedTab, setSelectedTab] = useState("descricao")

  const unitPrice = Number.parseFloat(product.price.replace("R$", "").replace(",", "."))
  const totalPrice = (unitPrice * quantity).toFixed(2)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-primary">
            Produtos
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-secondary rounded-2xl overflow-hidden border border-border mb-4 aspect-square flex items-center justify-center relative">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80">
                <span className="text-muted-foreground text-lg">[Imagem do Produto]</span>
              </div>
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full hover:shadow-lg transition"
              >
                <Heart size={20} className={liked ? "fill-primary text-primary" : "text-muted-foreground"} />
              </button>
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
                {product.co2}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge: string) => (
                <div
                  key={badge}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Check size={14} />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>

            {/* Supplier */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{product.supplier[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{product.supplier}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={14} />
                  {product.distance}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} avaliações)
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-secondary rounded-xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Preço Unitário</p>
              <h2 className="text-4xl font-bold text-primary mb-4">{product.price}</h2>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-semibold text-foreground">Quantidade:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-border transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-border transition">
                    +
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Subtotal: <span className="font-bold text-foreground">R$ {totalPrice}</span>
              </p>

              {/* Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-primary" />
                  Frete calculado no checkout
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={16} className="text-primary" />
                  {quantity * 13} kg de CO₂ evitados com esta compra
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button className="bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2">
                Adicionar ao Carrinho
              </button>
              <button className="border border-primary text-primary py-3 rounded-lg hover:bg-primary/5 transition font-semibold flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Falar com Revendedor
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-primary transition">
                <Share2 size={18} />
                <span className="text-sm">Compartilhar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex border-b border-border">
            {[
              { id: "descricao", label: "Descrição" },
              { id: "especificacoes", label: "Especificações" },
              { id: "impacto", label: "Impacto Ambiental" },
              { id: "avaliations", label: "Avaliações" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                  selectedTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {selectedTab === "descricao" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Sobre este produto</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                <h4 className="font-semibold text-foreground mb-3">Benefícios</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span>Reduz emissões de carbono em 13% em comparação com tijolos convencionais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span>Fabricado com materiais reciclados, promovendo economia circular</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span>Durável e com desempenho estrutural comprovado</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedTab === "especificacoes" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {Object.entries(product.specifications2).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "impacto" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Análise de Impacto Ambiental</h3>
                <div className="bg-accent/10 rounded-lg p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">CO₂ Evitado por unidade</p>
                  <p className="text-3xl font-bold text-accent mb-4">13 kg CO₂</p>
                  <p className="text-sm text-muted-foreground">Equivalente a rodar 30 km em um carro a gasolina</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">Comparativo com Material Convencional</p>
                    <p className="text-sm text-muted-foreground">
                      O Tijolo Modular Padrão emite 13% menos CO₂ durante toda sua produção em relação aos tijolos
                      convencionais de argila cozida.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "avaliations" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Avaliações (156)</h3>
                <p className="text-muted-foreground">Nenhuma avaliação disponível ainda. Seja o primeiro a avaliar!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
