"use client";

import { Search, MapPin, ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


type Supplier = {
  id: number;
  name: string;
  city: string;
  product: string;
  lat: number;
  lon: number;
};

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
    id: 16,
    name: "LANCI – Madeira Plástica Reciclada",
    city: "Palmas-TO",
    product: "Madeira plástica reciclada",
    lat: -10.1844,
    lon: -48.3336,
  },
];

const products = [
  {
    id: 1,
    name: "Tijolo Modular Padrão",
    price: "R$ 1,87",
    co2: "-13% CO₂",
    category: "Materiais Reciclados",
    image: "/images/tijolo.jpg",
    supplierIds: [1, 3, 4, 5, 6],
  },
  {
    id: 2,
    name: "Seixo Rolado 0",
    price: "R$ 90,00",
    co2: "-15% CO₂",
    category: "Agregados",
    image: "/images/seixo.jpg",
    supplierIds: [1, 2, 6, 10],
  },
  {
    id: 3,
    name: "Telha Ecológica Térmica",
    price: "R$ 53,00",
    co2: "-18% CO₂",
    category: "Estruturas e Pisos",
    image: "/images/telha.jpg",
    supplierIds: [2, 6],
  },
  {
    id: 4,
    name: "Painél de Parede MW9A4B1",
    price: "R$ 48,70",
    co2: "-26% CO₂",
    category: "Acabamento Sustentável",
    image: "/images/painel.jpg",
    supplierIds: [1, 5, 10, 16],
  },
];

const categories = [
  {
    name: "Materiais Reciclados",
    image: "/images/materiais.jpg",
    slug: "reciclados",
  },
  {
    name: "Acabamento Sustentável",
    image: "/images/acabamento.jpg",
    slug: "acabamento",
  },
  {
    name: "Estruturas e Pisos",
    image: "/images/estruturas.jpg",
    slug: "estruturas",
  },
];

type LatLng = { lat: number; lon: number };

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function distanceInKm(a: LatLng, b: LatLng): number {
  const R = 6371; 
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

function getNearestSupplierForProduct(
  userLocation: LatLng,
  supplierIds?: number[]
) {
  const candidates =
    supplierIds && supplierIds.length > 0
      ? suppliers.filter((s) => supplierIds.includes(s.id))
      : suppliers;

  if (!candidates.length) return null;

  let best = candidates[0];
  let bestDistance = distanceInKm(userLocation, {
    lat: best.lat,
    lon: best.lon,
  });

  for (const s of candidates.slice(1)) {
    const d = distanceInKm(userLocation, { lat: s.lat, lon: s.lon });
    if (d < bestDistance) {
      best = s;
      bestDistance = d;
    }
  }

  return { supplier: best, distanceKm: bestDistance };
}





export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("");

  const handleGetLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocationStatus("Seu navegador não suporta geolocalização.");
      return;
    }
  
    setLocationStatus("Obtendo sua localização...");
  
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
  
        setLocationStatus(
          "Localização detectada! Já estamos buscando fornecedores próximos."
        );
      },
      (err) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Erro ao obter localização", err);
        }
  
        setLocationStatus(
          err?.message ||
            "Não foi possível obter sua localização. Verifique as permissões do navegador."
        );
      }
    );
  };  

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ecobuild
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
              Fale com Representante
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition">
              <User size={20} />
            </button>
            <Link href={"/carrinho"}>
              <button className="p-2 hover:bg-secondary rounded-lg transition relative">
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </Link>
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

          {/* Botão de localização */}
          <div className="mt-6 flex flex-col items-center gap-2 text-sm">
            <button
              type="button"
              onClick={handleGetLocation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
            >
              <MapPin size={16} />
              Usar minha localização para achar fornecedores próximos
            </button>
            {locationStatus && (
              <span className="text-xs opacity-80 max-w-md">
                {locationStatus}
              </span>
            )}
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
          {products.map((product) => {
            const nearest =
              userLocation != null
                ? getNearestSupplierForProduct(userLocation, product.supplierIds)
                : null;

            return (
              <Link key={product.id} href={`/produto/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
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
                    <p className="text-xs text-muted-foreground mt-auto flex items-center gap-1">
                      <MapPin size={12} />
                      {nearest && userLocation ? (
                        <>
                          {nearest.supplier.city} • ~
                          {nearest.distanceKm.toFixed(0)} km
                        </>
                      ) : (
                        "Ative sua localização para ver fornecedores próximos"
                      )}
                    </p>
                  </div>

                  <div className="p-4 border-t border-border">
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition text-sm font-medium">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
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
                    <span className="text-muted-foreground">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </span>
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
