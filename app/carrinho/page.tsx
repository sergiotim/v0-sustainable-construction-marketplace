"use client";

import { Header } from "@/components/header";
import { Trash2, Plus, Minus, Lock, Leaf, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  co2: number;
  distance: number;
  image: string;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Tijolo Modular Padrão",
    supplier: "Thiago Tijolos",
    price: 1.87,
    quantity: 10,
    co2: 130,
    distance: 5,

    image: "/images/tijolo.jpg",
  },
  {
    id: 2,
    name: "Painél de Parede MW9A4B1",
    supplier: "Paulo Painéis",
    price: 48.7,
    quantity: 2,
    co2: 52,
    distance: 6,
    image: "/images/painel.jpg",
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const [step, setStep] = useState<"cart" | "checkout" | "payment">("cart");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal * 0.1).toFixed(2) : "0.00";
  const tax = (subtotal * 0.05).toFixed(2);
  const total = (
    subtotal +
    Number.parseFloat(shipping as string) +
    Number.parseFloat(tax as string)
  ).toFixed(2);
  const totalCO2 = items.reduce((sum, item) => sum + item.co2, 0);

  if (items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-muted-foreground mb-8">
            Comece adicionando produtos sustentáveis ao seu carrinho.
          </p>
          <Link href="/produtos">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold">
              Voltar aos Produtos
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { id: "cart", label: "Carrinho" },
            { id: "checkout", label: "Entrega" },
            { id: "payment", label: "Pagamento" },
          ].map((s, idx, arr) => (
            <div key={s.id} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={
                  step === s.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }
              >
                {s.label}
              </span>
              {idx < arr.length - 1 && (
                <div className="w-12 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>

        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Lista de Materiais
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Liste seu material de maneira prática!
              </p>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-border p-6 flex gap-6"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-32 h-32 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-muted-foreground text-sm text-center">
                        <img src={item.image} alt="" />
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin size={14} />
                        {item.supplier} • {item.distance}km
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-secondary transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-secondary transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & CO2 */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary mb-2">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-accent mb-4 flex items-center justify-end gap-1">
                        <Leaf size={14} />-{item.co2} CO₂
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Resumo da Compra
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete (10%)</span>
                    <span>R$ {shipping}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Impostos (5%)</span>
                    <span>R$ {tax}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-foreground font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {total}
                  </span>
                </div>

                {/* CO2 Summary */}
                <div className="bg-accent/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="text-accent" size={18} />
                    <span className="font-semibold text-foreground">
                      Impacto Ambiental
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você está evitando{" "}
                    <strong className="text-accent">
                      {totalCO2} kg de CO₂
                    </strong>
                  </p>
                </div>

                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold mb-3"
                >
                  Continuar para Entrega
                </button>
                <Link href="/produtos">
                  <button className="w-full border border-primary text-primary py-3 rounded-lg hover:bg-primary/5 transition font-semibold">
                    Continuar Comprando
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Informações de Entrega
            </h2>

            <div className="bg-white rounded-xl border border-border p-8 space-y-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="João Silva"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="joao@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    placeholder="(63) 98765-4321"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  placeholder="Rua Principal, 123"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="Palmas"
                    className="w-full px-4 py-3 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    placeholder="77000-000"
                    className="w-full px-4 py-3 border border-border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("cart")}
                className="flex-1 border border-primary text-primary py-3 rounded-lg hover:bg-primary/5 transition font-semibold"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep("payment")}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Continuar para Pagamento
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Método de Pagamento
            </h2>

            <div className="bg-white rounded-xl border border-border p-8 space-y-6 mb-6">
              <div className="space-y-4">
                {[
                  { id: "pix", label: "PIX", icon: "₿" },
                  { id: "cartao", label: "Cartão de Crédito", icon: "💳" },
                  { id: "boleto", label: "Boleto Bancário", icon: "📄" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition"
                  >
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked={method.id === "pix"}
                      className="mr-4"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-semibold text-foreground">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Security Info */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
                <Lock className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    Pagamento Seguro
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seus dados são protegidos com criptografia de banco.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-secondary rounded-xl p-6 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="font-semibold">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-semibold">R$ {shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impostos</span>
                  <span className="font-semibold">R$ {tax}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-base">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary">R$ {total}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("checkout")}
                className="flex-1 border border-primary text-primary py-3 rounded-lg hover:bg-primary/5 transition font-semibold"
              >
                Voltar
              </button>
              <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2">
                <Lock size={18} />
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
