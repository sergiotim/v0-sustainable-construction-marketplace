"use client"

import type React from "react"

import { Header } from "@/components/header"
import { MessageCircle, Phone, Mail, CheckCircle, Percent, TrendingDown, Zap } from "lucide-react"
import { useState } from "react"

export default function RepresentantePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectScope: "",
    materialTypes: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectScope: "",
        materialTypes: "",
        message: "",
      })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">Fale com um Representante EcoBuild</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 text-balance">
            Negocie descontos e obtenha soluções customizadas para seus projetos de construção sustentável
          </p>
          <p className="text-base md:text-lg opacity-80 text-balance">
            Nossa equipe comercial está pronta para ajudar empresas e grandes projetos a encontrar as melhores soluções
            em materiais ecológicos com preços especiais.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Por que falar com nossos representantes?</h2>

            <div className="space-y-6">
              {[
                {
                  icon: Percent,
                  title: "Descontos Especiais",
                  description: "Negocie descontos exclusivos para grandes volumes e projetos",
                },
                {
                  icon: Zap,
                  title: "Consultoria Especializada",
                  description: "Receba orientação técnica para sua obra específica",
                },
                {
                  icon: TrendingDown,
                  title: "Redução de Custos",
                  description: "Encontre as melhores soluções de preço + sustentabilidade",
                },
                {
                  icon: CheckCircle,
                  title: "Atendimento Prioritário",
                  description: "Suporte direto e personalizado durante todo o projeto",
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <Icon className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-3xl font-bold text-primary mb-1">30%</p>
                <p className="text-sm text-muted-foreground">Desconto Médio</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-3xl font-bold text-primary mb-1">24h</p>
                <p className="text-sm text-muted-foreground">Resposta Rápida</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-3xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Projetos Atendidos</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-3xl font-bold text-primary mb-1">98%</p>
                <p className="text-sm text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Solicitar Contato com Representante</h3>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h4 className="text-xl font-bold text-foreground mb-2">Solicitação Enviada!</h4>
                <p className="text-muted-foreground mb-6">
                  Obrigado! Nosso representante entrará em contato em até 24 horas para discutir descontos e soluções
                  para seu projeto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="João da Silva"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="joao@empresa.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(63) 98765-4321"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Empresa/Empreendimento</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="Sua Empresa ou Nome da Obra"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Escopo do Projeto</label>
                    <select
                      name="projectScope"
                      value={formData.projectScope}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecione...</option>
                      <option value="residential">Residencial</option>
                      <option value="commercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="infrastructure">Infraestrutura</option>
                      <option value="public">Obra Pública</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Tipos de Materiais</label>
                    <select
                      name="materialTypes"
                      value={formData.materialTypes}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecione...</option>
                      <option value="recycled">Reciclados</option>
                      <option value="natural">Naturais</option>
                      <option value="structures">Estruturas</option>
                      <option value="finishing">Acabamentos</option>
                      <option value="multiple">Múltiplos Tipos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Mensagem (Opcional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva seu projeto, volume de materiais, e objetivos de desconto..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Solicitar Contato
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Options */}
        <section className="bg-secondary rounded-2xl p-12 mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">Formas de Contato Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp Business",
                description: "Fale direto com nosso representante comercial",
                action: "Abrir WhatsApp",
                link: "https://wa.me/556333001234",
              },
              {
                icon: Mail,
                title: "Email",
                description: "vendas@ecobuild.com.br",
                action: "Enviar Email",
                link: "mailto:vendas@ecobuild.com.br",
              },
              {
                icon: Phone,
                title: "Telefone",
                description: "(63) 3300-1234 • Seg-Sex 9h-18h",
                action: "Ligar Agora",
                link: "tel:+556333001234",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon
              return (
                <a key={idx} href={contact.link} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition text-center cursor-pointer h-full">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-bold text-foreground mb-2">{contact.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                    <button className="text-primary font-semibold text-sm hover:underline">{contact.action} →</button>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* Process Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: "1",
                title: "Envie sua Solicitação",
                description: "Preencha o formulário ou entre em contato via WhatsApp/Telefone",
              },
              {
                number: "2",
                title: "Análise do Projeto",
                description: "Nosso representante avalia seu escopo e necessidades",
              },
              {
                number: "3",
                title: "Proposta Customizada",
                description: "Receba descontos e soluções personalizadas para sua obra",
              },
              {
                number: "4",
                title: "Suporte Contínuo",
                description: "Acompanhamento total do seu projeto com atendimento prioritário",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {step.number}
                </div>
                <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Negociar Descontos?</h2>
          <p className="text-lg mb-8 opacity-90 text-balance">
            Entre em contato com nossos representantes comerciais para soluções exclusivas e preços especiais para seu
            projeto.
          </p>
          <a href="#contact">
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold inline-flex items-center gap-2">
              Fale Conosco Agora →
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
