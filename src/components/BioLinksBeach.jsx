import React, { useState, useEffect } from "react";
import {
  Instagram,
  ShoppingBag,
  Share2,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Sun,
  Moon,
  Home,
  X,
  ExternalLink,
  Check,
  Sparkles,
  Ruler,
  Truck,
  ShieldCheck,
  Coins
} from "lucide-react";
import { TENERIFE_BEACH_DATA, getWhatsAppUrl } from "../data/beachData.js";
import LogoTenerifeBeach from "./ui/LogoTenerifeBeach.jsx";
import WhatsAppIcon from "./ui/WhatsAppIcon.jsx";

export default function BioLinksBeach() {
  const { brand, products, sizeGuide } = TENERIFE_BEACH_DATA;

  // Theme: light (Golden Dunes & Turquoise) vs dark (Volcanic Night & Aqua)
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  // Currency: EUR vs BRL
  const [currency, setCurrency] = useState("EUR"); // "EUR" | "BRL"

  // Modals state
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Toast notification for clipboard copy
  const [toastMessage, setToastMessage] = useState("");

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNextSlide();
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide();
    }
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const isAnyModalOpen = isCatalogModalOpen || isSizeGuideOpen;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCatalogModalOpen(false);
        setIsSizeGuideOpen(false);
      } else if (isCatalogModalOpen) {
        if (e.key === "ArrowLeft") handlePrevSlide();
        if (e.key === "ArrowRight") handleNextSlide();
      }
    };

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCatalogModalOpen, isSizeGuideOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${brand.name} - ${brand.tagline}`,
          text: `${brand.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share dismissed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("¡Enlace copiado al portapapeles! 🏖️");
    }
  };

  const currentProduct = products[activeSlide] || products[0];

  const primaryLinks = [
    {
      id: "whatsapp-vip",
      name: "Atendimento VIP WhatsApp",
      actionText: "Falar com uma consultora de estilo agora",
      badge: "Mais Rápido",
      badgeColor: "gold",
      icon: WhatsAppIcon,
      isExternal: true,
      href: getWhatsAppUrl("¡Hola Tenerife Beach! Vengo del enlace de la bio y quiero hablar con una asesora para elegir mis piezas."),
    },
    {
      id: "catalogo-interativo",
      name: "Coleção & Catálogo 2026",
      actionText: "Ver Kits Família, Biquínis & Peças Modeladoras",
      badge: "Catálogo",
      badgeColor: "moss",
      icon: ShoppingBag,
      onClick: () => setIsCatalogModalOpen(true),
    },
    {
      id: "guia-tamanhos",
      name: "Guia de Tamanhos (Brasil ⇄ Espanha)",
      actionText: "Descubra sua numeração exata (P, M, G vs 36 a 44)",
      badge: "Tabela Oficial",
      badgeColor: "gold",
      icon: Ruler,
      onClick: () => setIsSizeGuideOpen(true),
    },
    {
      id: "envios-tenerife",
      name: "Envíos & Retirada en Tienda",
      actionText: "Envíos en 24/72h a Canarias y punto en Tenerife Sur",
      badge: "Islas Canarias",
      badgeColor: "moss",
      icon: Truck,
      isExternal: true,
      href: getWhatsAppUrl("¡Hola! Me gustaría saber cómo funcionan los envíos a mi isla o la recogida presencial en Tenerife."),
    }
  ];

  return (
    <div
      className={`min-h-screen min-h-[100dvh] transition-colors duration-500 flex flex-col items-center justify-start sm:justify-center sm:py-8 px-0 sm:px-4 relative overflow-x-hidden selection:bg-[#0D9488] selection:text-white ${
        !isDark ? "bg-[#F7F3EA]" : "bg-[#090D14]"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 z-50 animate-bounce bg-[#0D9488] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold tracking-wide flex items-center gap-2">
          <Sparkles size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container - Mobile Editorial Frame */}
      <div
        className={`w-full max-w-md min-h-screen min-h-[100dvh] sm:min-h-0 sm:h-auto sm:my-auto sm:rounded-[36px] overflow-hidden flex flex-col justify-between transition-all duration-500 relative flex-1 sm:flex-initial ${
          !isDark
            ? "bg-[#FFFDF9] text-[#0A2540] shadow-[0_20px_60px_rgba(13,148,136,0.12)] sm:border sm:border-[#0D9488]/15"
            : "bg-[#0F1622] text-white shadow-[0_25px_70px_rgba(0,0,0,0.85)] sm:border sm:border-white/10"
        }`}
      >
        {/* =========================================================================
            BARRA FLUTUANTE SUPERIOR (Ações: Home, Moeda, Tema, Compartilhar)
           ========================================================================= */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Voltar ao início / Recarregar */}
          <a
            href="/"
            title="Tenerife Beach"
            className={`p-2.5 rounded-full beach-glass transition-all shadow-md active:scale-95 flex items-center justify-center ${
              !isDark
                ? "bg-white/90 hover:bg-white text-[#0A2540] border border-[#0D9488]/20 hover:text-[#0D9488]"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
            }`}
          >
            <Home size={16} />
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Seletor de Moeda (€ EUR vs R$ BRL) */}
            <button
              onClick={() => {
                const nextCurrency = currency === "EUR" ? "BRL" : "EUR";
                setCurrency(nextCurrency);
                showToast(`Moeda alterada para ${nextCurrency}`);
              }}
              className={`px-2.5 py-1.5 rounded-full beach-glass transition-all shadow-md active:scale-95 flex items-center gap-1 text-[11px] font-extrabold cursor-pointer ${
                !isDark
                  ? "bg-white/90 hover:bg-white text-[#0D9488] border border-[#0D9488]/25"
                  : "bg-white/10 hover:bg-white/20 text-[#2DD4BF] border border-white/15"
              }`}
              title="Alternar entre Euro (€) e Real (R$)"
            >
              <Coins size={13} />
              <span>{currency}</span>
            </button>

            {/* Alternador de Tema (Light Dunas vs Dark Vulcão) */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2.5 rounded-full beach-glass transition-all shadow-md active:scale-95 flex items-center justify-center cursor-pointer ${
                !isDark
                  ? "bg-white/90 hover:bg-white text-[#0A2540] border border-[#0D9488]/20 hover:text-[#0D9488]"
                  : "bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15"
              }`}
              title={!isDark ? "Mudar para Modo Noite Vulcânica" : "Mudar para Modo Praia Dourada"}
            >
              {!isDark ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Compartilhar Perfil */}
            <button
              onClick={handleShare}
              className={`p-2.5 rounded-full beach-glass transition-all shadow-md active:scale-95 flex items-center justify-center cursor-pointer ${
                !isDark
                  ? "bg-white/90 hover:bg-white text-[#0A2540] border border-[#0D9488]/20 hover:text-[#0D9488]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
              }`}
              title="Compartilhar Perfil"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            1. TOPO EDITORIAL: FOTO DE PRAIA EM TENERIFE COM FADE ORGÂNICO
           ========================================================================= */}
        <div className="relative w-full h-[370px] sm:h-[430px] overflow-hidden select-none shrink-0">
          <img
            src={brand.heroPhoto}
            alt={brand.heroAlt}
            className="w-full h-full object-cover object-[center_20%] scale-105 transition-transform duration-700 hover:scale-110"
            fetchPriority="high"
          />

          {/* Camada de Blur Suave que preenche o enquadramento do quadrado com alta transparência */}
          <div
            className={`absolute inset-x-0 top-14 sm:top-16 bottom-0 backdrop-blur-[8px] transition-all pointer-events-none ${
              !isDark
                ? "bg-white/20 border-t border-white/30"
                : "bg-black/30 border-t border-white/10"
            }`}
          />

          {/* Gradiente Inferior de Transição em Fade Suave */}
          <div
            className={`absolute inset-x-0 bottom-0 h-44 sm:h-52 pointer-events-none ${
              !isDark
                ? "bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/90 via-45% to-transparent"
                : "bg-gradient-to-t from-[#0F1622] via-[#0F1622]/90 via-45% to-transparent"
            }`}
          />
        </div>

        {/* =========================================================================
            2. CONTEÚDO PRINCIPAL (IDENTIDADE, LOGO, BOTÕES TÁTEIS E CARDS)
           ========================================================================= */}
        <div className="relative z-10 px-4 sm:px-6 -mt-[300px] sm:-mt-[330px] pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3 sm:space-y-4 my-auto">
            {/* Bloco de Marca: Logo e Selo Oficial */}
            <div className="text-center space-y-2 pointer-events-auto">
              <LogoTenerifeBeach isDark={isDark} />

              <p
                className={`text-[12px] sm:text-[13px] font-bold leading-snug px-3 max-w-[340px] mx-auto transition-colors ${
                  !isDark
                    ? "text-[#1C3B1E] [text-shadow:_0_1px_4px_rgba(255,255,255,0.95)]"
                    : "text-[#E2D4A8] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                }`}
              >
                {brand.tagline}
              </p>

              {/* Tag com Selo de Autenticidade em Verde Musgo & Dourado */}
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-colors shadow-sm ${
                  !isDark
                    ? "bg-[#234E2A]/15 text-[#1C3B1E] border border-[#D4AF37]/60 [text-shadow:_0_1px_2px_rgba(255,255,255,0.9)]"
                    : "bg-[#234E2A]/40 text-[#FBBF24] border border-[#D4AF37]/50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                }`}
              >
                <ShieldCheck size={13} className={!isDark ? "text-[#C59B27] shrink-0" : "text-[#FBBF24] shrink-0"} />
                <span>Modelagem Brasileira Autêntica</span>
              </div>

              {/* Linha dos 3 Botões Táteis de Ação Imediata */}
              <div className="flex items-center justify-center gap-3.5 sm:gap-4 pointer-events-auto shrink-0 pt-1">
                {/* 1. Instagram */}
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram @tenerife_beach"
                  aria-label="Instagram da Tenerife Beach"
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer shrink-0 ${
                    !isDark
                      ? "bg-white border-2 border-[#D4AF37]/40 shadow-[0_6px_18px_rgba(35,78,42,0.12)] text-[#1C3B1E] hover:text-[#C59B27] hover:border-[#C59B27] hover:scale-105 active:scale-95"
                      : "bg-[#162032] border border-[#D4AF37]/40 text-[#FBBF24] shadow-[0_6px_18px_rgba(0,0,0,0.5)] hover:border-[#FBBF24] hover:scale-105 active:scale-95"
                  }`}
                >
                  <Instagram size={22} className="transition-transform group-hover:scale-110" />
                </a>

                {/* 2. WhatsApp VIP (Destaque Central) */}
                <a
                  href={getWhatsAppUrl("¡Hola Tenerife Beach! Vi su perfil de Instagram y me gustaría ver modelos y precios disponibles.")}
                  target="_blank"
                  rel="noreferrer"
                  title="Atendimento no WhatsApp Oficial"
                  aria-label="Atendimento no WhatsApp Oficial"
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer shrink-0 relative ${
                    !isDark
                      ? "bg-white border-2 border-[#25D366] shadow-[0_6px_20px_rgba(37,211,102,0.3)] text-[#25D366] hover:bg-[#25D366] hover:text-white hover:scale-105 active:scale-95"
                      : "bg-[#162032] border border-[#25D366]/60 text-[#25D366] shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:bg-[#25D366] hover:text-white hover:scale-105 active:scale-95"
                  }`}
                >
                  <WhatsAppIcon size={25} className="transition-transform group-hover:scale-110" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-white dark:border-[#0F1622] animate-pulse"></span>
                </a>

                {/* 3. Localização Google Maps */}
                <a
                  href={brand.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Localização: ${brand.locationFull}`}
                  aria-label={`Localização: ${brand.locationFull}`}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer shrink-0 ${
                    !isDark
                      ? "bg-white border-2 border-[#D4AF37]/40 shadow-[0_6px_18px_rgba(35,78,42,0.12)] text-[#1C3B1E] hover:text-[#C59B27] hover:border-[#C59B27] hover:scale-105 active:scale-95"
                      : "bg-[#162032] border border-[#D4AF37]/40 text-[#FBBF24] shadow-[0_6px_18px_rgba(0,0,0,0.5)] hover:border-[#FBBF24] hover:scale-105 active:scale-95"
                  }`}
                >
                  <MapPin size={22} className="transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Container dos Cards de Links de Alta Conversão */}
            <div className="w-full space-y-2.5 sm:space-y-3 mt-2">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isClickableModal = Boolean(link.onClick);
                const Component = isClickableModal ? "button" : "a";
                const componentProps = isClickableModal
                  ? {
                      type: "button",
                      onClick: link.onClick,
                    }
                  : {
                      href: link.href,
                      target: link.isExternal ? "_blank" : "_self",
                      rel: "noreferrer",
                    };

                return (
                  <Component
                    key={link.id}
                    {...componentProps}
                    className={`w-full p-3 sm:p-4 rounded-2xl flex items-center justify-between transition-all duration-300 group cursor-pointer text-left ${
                      !isDark
                        ? "bg-white hover:bg-[#FDFBF7] border border-slate-200/90 hover:border-[#D4AF37]/70 shadow-[0_4px_16px_rgba(35,78,42,0.06)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.18)] hover:scale-[1.01]"
                        : "bg-[#162032]/95 hover:bg-[#1C283E] border border-white/10 hover:border-[#D4AF37]/50 shadow-md hover:shadow-lg hover:scale-[1.01]"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 text-left min-w-0 flex-1">
                      {/* Ícone com Fundo Diferenciado em Verde Musgo & Dourado */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          link.badgeColor === "moss"
                            ? !isDark
                              ? "bg-emerald-50 text-[#234E2A] group-hover:bg-[#234E2A] group-hover:text-[#FBBF24] group-hover:scale-110"
                              : "bg-white/10 text-[#86EFAC] group-hover:scale-110"
                            : !isDark
                            ? "bg-amber-50 text-[#C59B27] group-hover:bg-[#D4AF37] group-hover:text-[#1C3B1E] group-hover:scale-110"
                            : "bg-white/10 text-[#FBBF24] group-hover:scale-110"
                        }`}
                      >
                        <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                      </div>

                      {/* Textos */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-tight ${
                              !isDark ? "text-[#1C3B1E] group-hover:text-[#C59B27]" : "text-white group-hover:text-[#FBBF24]"
                            }`}
                          >
                            {link.name}
                          </span>

                          {/* Badge de Destaque */}
                          <span
                            className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                              link.badgeColor === "moss"
                                ? "bg-[#234E2A]/10 text-[#1C3B1E] border border-[#234E2A]/20 dark:bg-[#234E2A]/40 dark:text-[#86EFAC]"
                                : "bg-amber-100 text-[#92400E] border border-[#D4AF37]/30 dark:bg-amber-950/70 dark:text-amber-300"
                            }`}
                          >
                            {link.badge}
                          </span>
                        </div>

                        <p
                          className={`text-[11.5px] sm:text-[12.5px] font-medium truncate mt-0.5 transition-colors ${
                            !isDark ? "text-slate-600 group-hover:text-slate-800" : "text-slate-400 group-hover:text-slate-300"
                          }`}
                        >
                          {link.actionText}
                        </p>
                      </div>
                    </div>

                    {/* Seta Chevron com Micro-Animação */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${
                        !isDark ? "text-slate-400 group-hover:text-[#C59B27]" : "text-slate-500 group-hover:text-[#FBBF24]"
                      }`}
                    >
                      <ChevronRight size={18} />
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              3. FOOTER INSTITUCIONAL COMPACTO
             ========================================================================= */}
          <footer className="pt-4 pb-2 mt-4 border-t text-center space-y-1 shrink-0 select-none border-slate-200/70 dark:border-white/10">
            <p className="text-[11px] font-bold text-[#234E2A] dark:text-[#FBBF24] uppercase tracking-wider">
              {brand.title} • {brand.locationFull}
            </p>
            <p className={`text-[10px] font-medium ${!isDark ? "text-slate-500" : "text-slate-400"}`}>
              {brand.shippingBadge}
            </p>
            <p className={`text-[9.5px] font-normal ${!isDark ? "text-slate-400" : "text-slate-500"}`}>
              © 2026 {brand.name}. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>

      {/* =========================================================================
          MODAL INTERATIVO: CATÁLOGO EM CARROSSEL COM TOQUE (SWIPE TOUCH)
         ========================================================================= */}
      {isCatalogModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Catálogo Tenerife Beach"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCatalogModalOpen(false);
          }}
        >
          <div
            className={`relative w-full max-w-md my-auto rounded-[32px] overflow-hidden shadow-2xl border flex flex-col max-h-[92vh] transition-all duration-300 ${
              !isDark ? "bg-[#FFFDF9] border-[#0D9488]/20 text-[#0A2540]" : "bg-[#0F1622] border-white/15 text-white"
            }`}
          >
            {/* Header do Modal */}
            <div
              className={`p-4 border-b flex items-center justify-between shrink-0 ${
                !isDark ? "border-slate-100 bg-[#F7F3EA]" : "border-white/10 bg-[#162032]"
              }`}
            >
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 text-[#0D9488] dark:text-[#2DD4BF] text-[10px] font-black uppercase tracking-wider">
                  <Sparkles size={11} className="shrink-0" />
                  <span>COLECCIÓN BRASILEÑA 2026</span>
                </div>
                <h3 className={`text-base sm:text-lg font-black leading-tight ${!isDark ? "text-[#0A2540]" : "text-white"}`}>
                  Catálogo & Peças em Destaque
                </h3>
                <p className={`text-[11px] font-medium leading-none ${!isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Pieza {activeSlide + 1} de {products.length} • Desliza para explorar
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCatalogModalOpen(false)}
                aria-label="Cerrar catálogo"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  !isDark
                    ? "bg-white hover:bg-slate-200 text-slate-700 shadow-sm border border-slate-200"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Corpo do Modal: Slide do Produto */}
            <div
              className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Foto com Setas e Badges */}
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-56 bg-slate-100 shadow-sm group select-none">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Seta Esquerda */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  aria-label="Pieza anterior"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md active:scale-90 cursor-pointer border border-white/20"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Seta Direita */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  aria-label="Siguiente pieza"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md active:scale-90 cursor-pointer border border-white/20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Informações Textuais */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#234E2A]/10 text-[#1C3B1E] border border-[#234E2A]/20 dark:bg-[#234E2A]/30 dark:text-[#86EFAC]">
                      {currentProduct.subType}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-[#92400E] border border-[#D4AF37]/30 dark:bg-amber-950/70 dark:text-amber-300">
                      {currentProduct.highlightBadge}
                    </span>
                  </div>

                  <h4 className={`text-lg font-black leading-snug ${!isDark ? "text-[#0A2540]" : "text-white"}`}>
                    {currentProduct.name}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${!isDark ? "text-slate-600" : "text-slate-300"}`}>
                    {currentProduct.description}
                  </p>
                </div>

                {/* Diferenciais da Peça */}
                <ul className="pt-1 space-y-1">
                  {currentProduct.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-xs font-medium ${
                        !isDark ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      <Check size={13} className="text-[#0D9488] dark:text-[#2DD4BF] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bloco de Preço com Moeda Dinâmica */}
                <div
                  className={`pt-2.5 mt-2.5 border-t flex items-center justify-between ${
                    !isDark ? "border-slate-100" : "border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-none font-medium">
                      Precio Oficial
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className={`text-xl font-black font-display ${!isDark ? "text-[#0A2540]" : "text-white"}`}>
                        {currency === "EUR" ? currentProduct.priceEur : currentProduct.priceBrl}
                      </span>
                      {currency === "EUR" && currentProduct.oldPriceEur && (
                        <span className="text-xs text-slate-400 line-through">
                          {currentProduct.oldPriceEur}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botão de Pedido / Informação no WhatsApp Contextualizado */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(currentProduct.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                    title={`Pedir información sobre ${currentProduct.name}`}
                  >
                    <WhatsAppIcon size={20} className="shrink-0 fill-current" />
                    <span>Pedir por WhatsApp o Consultar Talla</span>
                    <ExternalLink size={14} className="shrink-0 opacity-80" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal com Indicador de Pílula */}
            <div
              className={`p-3.5 border-t flex flex-col items-center gap-2 shrink-0 ${
                !isDark ? "border-slate-100 bg-[#F7F3EA]" : "border-white/10 bg-[#162032]"
              }`}
            >
              {/* Bolinhas Indicadoras do Slider */}
              <div className="flex items-center justify-center gap-1.5 py-0.5">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Ir a pieza ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      activeSlide === idx
                        ? "w-6 h-2 bg-[#0D9488] dark:bg-[#2DD4BF]"
                        : !isDark
                        ? "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                        : "w-2 h-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCatalogModalOpen(false);
                  setIsSizeGuideOpen(true);
                }}
                className={`text-center text-[11px] font-bold transition-colors py-0.5 flex items-center justify-center gap-1 cursor-pointer ${
                  !isDark ? "text-slate-600 hover:text-[#0D9488]" : "text-slate-300 hover:text-[#2DD4BF]"
                }`}
              >
                <span>¿Dudas con la talla? Abre la Guía Brasil ⇄ España</span>
                <Ruler size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL INTERATIVO: GUIA DE MEDIDAS (BRASIL ⇄ ESPANHA)
         ========================================================================= */}
      {isSizeGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Guía de Tallas Tenerife Beach"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSizeGuideOpen(false);
          }}
        >
          <div
            className={`relative w-full max-w-md my-auto rounded-[32px] overflow-hidden shadow-2xl border flex flex-col max-h-[90vh] transition-all duration-300 ${
              !isDark ? "bg-[#FFFDF9] border-[#0D9488]/20 text-[#0A2540]" : "bg-[#0F1622] border-white/15 text-white"
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 border-b flex items-center justify-between shrink-0 ${
                !isDark ? "border-slate-100 bg-[#F7F3EA]" : "border-white/10 bg-[#162032]"
              }`}
            >
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 text-[#F97316] text-[10px] font-black uppercase tracking-wider">
                  <Ruler size={11} className="shrink-0" />
                  <span>TABELA DE EQUIVALÊNCIA OFICIAL</span>
                </div>
                <h3 className={`text-base sm:text-lg font-black leading-tight ${!isDark ? "text-[#0A2540]" : "text-white"}`}>
                  Guía de Tallas (Brasil ⇄ España)
                </h3>
                <p className={`text-[11px] font-medium leading-none ${!isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Encuentra tu ajuste perfecto sin margen de error
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                aria-label="Cerrar guía"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  !isDark
                    ? "bg-white hover:bg-slate-200 text-slate-700 shadow-sm border border-slate-200"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo da Tabela */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              <p className={`text-xs leading-relaxed ${!isDark ? "text-slate-600" : "text-slate-300"}`}>
                Los biquinis brasileños se caracterizan por una modelación anatómica que se adapta al cuerpo. Consulta la siguiente tabla de equivalencia entre España y Brasil:
              </p>

              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={!isDark ? "bg-[#0D9488]/10 text-[#0F766E]" : "bg-[#2DD4BF]/15 text-[#2DD4BF]"}>
                      <th className="p-2.5 font-bold">Talla BR</th>
                      <th className="p-2.5 font-bold">Equivalente ES</th>
                      <th className="p-2.5 font-bold">Busto</th>
                      <th className="p-2.5 font-bold">Cadera</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                    {sizeGuide.map((item, idx) => (
                      <tr
                        key={idx}
                        className={
                          idx % 2 === 0
                            ? !isDark
                              ? "bg-white"
                              : "bg-[#0F1622]"
                            : !isDark
                            ? "bg-slate-50/70"
                            : "bg-white/[0.03]"
                        }
                      >
                        <td className="p-2.5 font-extrabold text-[#0D9488] dark:text-[#2DD4BF]">{item.br}</td>
                        <td className="p-2.5 font-semibold">{item.es}</td>
                        <td className="p-2.5 text-slate-500 dark:text-slate-400">{item.busto}</td>
                        <td className="p-2.5 text-slate-500 dark:text-slate-400">{item.cadera}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40">
                <p className="text-[11.5px] text-orange-900 dark:text-orange-200 font-medium leading-relaxed">
                  💡 <strong>Tip de la Asesora:</strong> Si estás entre dos tallas, para el corte cortininha clásico elige tu talla habitual si te gusta el estilo brasileño, o una talla más si prefieres mayor cobertura.
                </p>
              </div>

              {/* Botão de Ajuda Direta */}
              <a
                href={getWhatsAppUrl("¡Hola! Tengo dudas sobre mi talla para un biquíni/maiô de Tenerife Beach y me gustaría recibir asesoramiento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <WhatsAppIcon size={18} className="shrink-0 fill-current" />
                <span>Asesoramiento Personalizado en WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
