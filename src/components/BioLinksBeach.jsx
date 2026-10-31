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
  X,
  ExternalLink,
  Sparkles,
  Ruler,
  Truck,
  ShieldCheck,
  Heart,
  Maximize2
} from "lucide-react";
import { TENERIFE_BEACH_DATA, getWhatsAppUrl } from "../data/beachData.js";
import LogoTenerifeBeach from "./ui/LogoTenerifeBeach.jsx";
import WhatsAppIcon from "./ui/WhatsAppIcon.jsx";

export default function BioLinksBeach() {
  const { brand, products, collection2027 = [], sizeGuide } = TENERIFE_BEACH_DATA;

  // Theme: light (Golden Dunes & Turquoise) vs dark (Volcanic Night & Aqua)
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  // Currency (default official currency EUR)
  const currency = "EUR";

  // Modals state: null | '2026' | '2027'
  const [activeCatalogType, setActiveCatalogType] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const isCatalogModalOpen = Boolean(activeCatalogType);
  const currentCatalogProducts = activeCatalogType === "2027" ? collection2027 : products;

  // Instagram interactions
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isZoomFit, setIsZoomFit] = useState(false);

  // Toast notification for clipboard copy
  const [toastMessage, setToastMessage] = useState("");

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  // Pre-carregamento imediato em background das imagens dos catálogos (elimina qualquer delay/tela preta)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const allImagesToPreload = [
      ...collection2027.map((p) => p.image),
      ...products.map((p) => p.image),
    ].filter(Boolean);

    const warmCache = () => {
      allImagesToPreload.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(warmCache);
    } else {
      setTimeout(warmCache, 100);
    }
  }, []);

  const handlePrewarm = (type) => {
    if (typeof window === "undefined") return;
    const targetList = type === "2027" ? collection2027 : products;
    targetList.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.decoding = "async";
        img.src = item.image;
      }
    });
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? currentCatalogProducts.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === currentCatalogProducts.length - 1 ? 0 : prev + 1));
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
        setActiveCatalogType(null);
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
  }, [isCatalogModalOpen, isSizeGuideOpen, currentCatalogProducts.length]);

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

  const currentProduct = currentCatalogProducts[activeSlide] || currentCatalogProducts[0] || products[0];

  const isCurrentLiked = Boolean(likes[currentProduct?.id]);
  const isCurrentBookmarked = Boolean(bookmarks[currentProduct?.id]);
  const baseLikes = ((activeSlide * 19 + 73) % 180) + 94;
  const likesCount = baseLikes + (isCurrentLiked ? 1 : 0);

  const handleToggleLike = () => {
    setLikes((prev) => ({
      ...prev,
      [currentProduct.id]: !prev[currentProduct.id],
    }));
    if (!isCurrentLiked) {
      showToast(`¡Añadido a tus favoritos! ❤️`);
    }
  };

  const handleDoubleTapLike = () => {
    if (!isCurrentLiked) {
      setLikes((prev) => ({ ...prev, [currentProduct.id]: true }));
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  const handleToggleBookmark = () => {
    setBookmarks((prev) => ({
      ...prev,
      [currentProduct.id]: !prev[currentProduct.id],
    }));
    showToast(!isCurrentBookmarked ? "¡Pieza guardada en tu lista! 🔖" : "Pieza eliminada de guardados");
  };

  const handleShareProduct = async () => {
    const text = `Mira esta pieza de Tenerife Beach: ${currentProduct.name} (${currentProduct.priceEur})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct.name,
          text,
          url: window.location.href,
        });
      } catch (e) {
        console.log("Dismissed", e);
      }
    } else {
      navigator.clipboard.writeText(`${currentProduct.name} - ${window.location.href}`);
      showToast("¡Enlace de la pieza copiado!");
    }
  };

  const primaryLinks = [
    {
      id: "whatsapp-vip",
      name: "Atención VIP WhatsApp",
      actionText: "Hablar con una asesora de estilo ahora",
      badgeColor: "gold",
      icon: WhatsAppIcon,
      isExternal: true,
      href: getWhatsAppUrl("¡Hola Tenerife Beach! Vengo del enlace de la bio y quiero hablar con una asesora para elegir mis piezas."),
    },
    {
      id: "catalogo-interativo",
      name: "Colección & Catálogo 2026",
      actionText: "Ver 11 modelos exclusivos (Bikinis, Bañadores y Packs)",
      badgeColor: "moss",
      icon: ShoppingBag,
      onMouseEnter: () => handlePrewarm("2026"),
      onTouchStart: () => handlePrewarm("2026"),
      onClick: () => {
        setActiveCatalogType("2026");
        setActiveSlide(0);
      },
    },
    {
      id: "catalogo-2027",
      name: "Colección Catálogo 2027",
      actionText: "Mis modelos trajes festival artesanal (€ 248,90)",
      badgeColor: "moss",
      icon: ShoppingBag,
      onMouseEnter: () => handlePrewarm("2027"),
      onTouchStart: () => handlePrewarm("2027"),
      onClick: () => {
        setActiveCatalogType("2027");
        setActiveSlide(0);
      },
    },
    {
      id: "guia-tamanhos",
      name: "Guía de Tallas (Brasil ⇄ España)",
      actionText: "Descubre tu talla exacta (P, M, G vs 34 a 46)",
      badgeColor: "gold",
      icon: Ruler,
      onClick: () => setIsSizeGuideOpen(true),
    },
    {
      id: "envios-tenerife",
      name: "Ventas en línea",
      actionText: "Envíos en 24/72h",
      badgeColor: "moss",
      icon: Truck,
      isExternal: true,
      href: getWhatsAppUrl("¡Hola! Me gustaría saber cómo funcionan los envíos a mi isla o la recogida presencial en Calle Los Calados, 1 (CP 38111)."),
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
            BARRA FLUTUANTE SUPERIOR (Ações: Tema, Compartilhar)
           ========================================================================= */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-end pointer-events-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Alternador de Tema (Light Dunas vs Dark Vulcão) */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2.5 rounded-full beach-glass transition-all shadow-md active:scale-95 flex items-center justify-center cursor-pointer ${
                !isDark
                  ? "bg-white/90 hover:bg-white text-[#0A2540] border border-[#0D9488]/20 hover:text-[#0D9488]"
                  : "bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15"
              }`}
              title={!isDark ? "Cambiar a Modo Noche Volcánica" : "Cambiar a Modo Playa Dorada"}
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
              title="Compartir Perfil"
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
            fetchpriority="high"
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
                  title="Atención en WhatsApp Oficial"
                  aria-label="Atención en WhatsApp Oficial"
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
                      onMouseEnter: link.onMouseEnter,
                      onTouchStart: link.onTouchStart,
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
                        <span
                          className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-tight block ${
                            !isDark ? "text-[#1C3B1E] group-hover:text-[#C59B27]" : "text-white group-hover:text-[#FBBF24]"
                          }`}
                        >
                          {link.name}
                        </span>

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
          aria-label={activeCatalogType === "2027" ? "Colección Catálogo 2027 - Trajes Festival Artesanal" : "Catálogo Tenerife Beach 2026"}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveCatalogType(null);
          }}
        >
          <div
            className={`relative w-full max-w-lg my-auto rounded-[32px] overflow-hidden shadow-2xl border flex flex-col max-h-[92vh] transition-all duration-300 ${
              !isDark ? "bg-[#FFFDF9] border-[#0D9488]/20 text-[#0A2540]" : "bg-[#0F1622] border-white/15 text-white"
            }`}
          >
            {/* Corpo do Modal: Slide do Produto (Imagem posicionada no topo) */}
            <div
              className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* =========================================================================
                  POST VISUAL ESTILO INSTAGRAM (FOTO NO TOPO + INTERAÇÕES SOCIAIS)
                 ========================================================================= */}
              <div className="space-y-2">
                {/* Container da Foto em Tamanho Extra Ampliado (Aspect Ratio 9:13) */}
                <div
                  className={`relative aspect-[9/13] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group select-none cursor-pointer border border-black/5 dark:border-white/10 transition-colors ${
                    !isDark ? "bg-[#EDE5D8]" : "bg-[#162032]"
                  }`}
                  onDoubleClick={handleDoubleTapLike}
                >
                  {/* Botão Fechar (X) Flutuante sobre a Imagem */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCatalogType(null);
                    }}
                    aria-label="Cerrar catálogo"
                    className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-90 cursor-pointer border border-white/20"
                  >
                    <X size={18} />
                  </button>

                  {/* Contador Pílula Flutuante sobre a Imagem */}
                  <div className="absolute top-3 left-3 z-30 pointer-events-none flex items-center gap-1.5">
                    <span className="text-[10.5px] font-extrabold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md tracking-wider border border-white/20 shadow-lg">
                      {activeCatalogType === "2027"
                        ? `Catálogo 2027 • ${activeSlide + 1} / ${currentCatalogProducts.length}`
                        : `${activeSlide + 1} / ${currentCatalogProducts.length}`}
                    </span>
                  </div>
                  {/* Fundo com Blur da Própria Imagem para Garantir Amplo Alcance Sem Barras Negras */}
                  <img
                    src={currentProduct.image}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                  />

                  {/* Foto Principal com Enquadramento Perfeito da Peça */}
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className={`relative z-10 w-full h-full ${
                      isZoomFit ? "object-contain" : "object-cover object-[center_18%]"
                    } transition-all duration-300 group-hover:scale-[1.02]`}
                  />

                  {/* Efeito Visual de Coração Gigante Flutuante ao Dar Dois Toques */}
                  {showHeartAnim && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                      <div className="animate-ping duration-700">
                        <Heart size={84} className="text-white fill-red-500 drop-shadow-[0_12px_30px_rgba(239,68,68,0.8)]" />
                      </div>
                    </div>
                  )}

                  {/* Overlay de Informações (Badges, Título e Descrição) com Blur Preto Suave */}
                  <div className="absolute inset-x-2.5 bottom-2.5 z-20 p-3 sm:p-3.5 rounded-2xl bg-black/20 backdrop-blur-md border border-white/15 text-white shadow-xl space-y-1.5 pointer-events-auto">
                    {/* Linha Superior: Título da Peça e Botão Maximize */}
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13.5px] sm:text-[14.5px] font-black text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex-1">
                        {currentProduct.name}
                      </h4>

                      {/* Botão de Alternar Enquadramento Inteiro/Cover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsZoomFit(!isZoomFit);
                        }}
                        title={isZoomFit ? "Volver al Modo Editorial" : "Ajustar Foto Completa"}
                        className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 active:scale-90 transition-all cursor-pointer shrink-0"
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>

                    {/* Descrição com Blur Suave e Alta Legibilidade */}
                    <p className="text-[11px] sm:text-[11.5px] text-white/95 leading-relaxed font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                      {currentProduct.description}
                    </p>
                  </div>

                  {/* Seta Esquerda Flutuante */}
                  {currentCatalogProducts.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevSlide();
                      }}
                      aria-label="Pieza anterior"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/55 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90 cursor-pointer border border-white/20"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* Seta Direita Flutuante */}
                  {currentCatalogProducts.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextSlide();
                      }}
                      aria-label="Siguiente pieza"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/55 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90 cursor-pointer border border-white/20"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Preço e Botão de Pedido WhatsApp Lado a Lado com Distância de 10% */}
              <div
                className={`pt-2.5 mt-0.5 border-t flex items-center justify-between gap-[10%] ${
                  !isDark ? "border-slate-100" : "border-white/10"
                }`}
              >
                {/* Preço Oficial à Esquerda */}
                <div className="shrink-0">
                  <span className="text-[10px] text-slate-400 block leading-none font-medium">
                    Precio Oficial
                  </span>
                  <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5">
                    <span className={`text-xl sm:text-2xl font-black font-display whitespace-nowrap ${!isDark ? "text-[#0A2540]" : "text-white"}`}>
                      {currency === "EUR" ? currentProduct.priceEur : currentProduct.priceBrl}
                    </span>
                    {currency === "EUR" && currentProduct.oldPriceEur && (
                      <span className="text-xs text-slate-400 line-through whitespace-nowrap">
                        {currentProduct.oldPriceEur}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botão de Pedido WhatsApp ao lado do Preço com 10% de distância */}
                <a
                  href={getWhatsAppUrl(currentProduct.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                  title={`Pedir información sobre ${currentProduct.name}`}
                >
                  <WhatsAppIcon size={18} className="shrink-0 fill-current" />
                  <span className="truncate">Pedir por WhatsApp</span>
                  <ExternalLink size={13} className="shrink-0 opacity-80 hidden xs:inline-block" />
                </a>
              </div>
            </div>

            {/* Rodapé do Modal com Indicador de Pílula */}
            <div
              className={`p-3.5 border-t flex flex-col items-center gap-2 shrink-0 ${
                !isDark ? "border-slate-100 bg-[#F7F3EA]" : "border-white/10 bg-[#162032]"
              }`}
            >
              {/* Bolinhas Indicadoras do Slider */}
              {currentCatalogProducts.length > 1 ? (
                <div className="flex items-center justify-center gap-1.5 py-0.5 flex-wrap max-w-full px-2">
                  {currentCatalogProducts.map((_, idx) => (
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
              ) : (
                <div className="flex items-center justify-center gap-1.5 py-0.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C59B27] dark:text-[#FBBF24]">
                    ★ Colección Exclusiva Catálogo 2027 ★
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setActiveCatalogType(null);
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
                  <span>TABLA DE EQUIVALENCIAS OFICIAL</span>
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
                Los bikinis brasileños se caracterizan por un patronaje anatómico que se adapta al cuerpo. Consulta la siguiente tabla de equivalencia entre España y Brasil:
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
                  💡 <strong>Tip de la Asesora:</strong> Si estás entre dos tallas, para el corte cortinilla clásico elige tu talla habitual si te gusta el estilo brasileño, o una talla más si prefieres mayor cobertura.
                </p>
              </div>

              {/* Botão de Ajuda Direta */}
              <a
                href={getWhatsAppUrl("¡Hola! Tengo dudas sobre mi talla para un bikini o bañador de Tenerife Beach y me gustaría recibir asesoramiento.")}
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
