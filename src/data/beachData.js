export const TENERIFE_BEACH_DATA = {
  brand: {
    name: "Tenerife Beach",
    title: "TENERIFE BEACH",
    subtitle: "MODA PLAYA BRASILEÑA • CANARIAS",
    tagline: "Lleva la esencia de Brasil a las playas de Canarias",
    description: "Moda praia exclusiva com autêntica modelagem brasileira, kits família coordenados e lycra de alta gramatura com proteção UV50+.",
    badgeVerified: "Tienda Oficial Tenerife",
    handle: "@tenerife_beach",
    instagram: "https://www.instagram.com/tenerife_beach/",
    whatsappNumber: "34612345678",
    whatsappDisplay: "+34 612 34 56 78",
    locationShort: "Tenerife, Islas Canarias",
    locationFull: "Playa de las Américas & Costa Adeje • Tenerife Sur",
    mapsUrl: "https://maps.google.com/?q=Playa+de+las+Americas,+Santa+Cruz+de+Tenerife,+Canarias",
    heroPhoto: "/images/hero_beach.jpg",
    heroAlt: "Modelo Tenerife Beach con moda playa brasileña en playa de Tenerife",
    openingHours: "Atención Lunes a Sábado: 09h às 20h",
    shippingBadge: "Envíos a todas las Islas Canarias y Península",
  },
  products: [
    {
      id: "kit-familia-canarias",
      name: "Kit Família Matching Tropical",
      subType: "Colección Familia",
      highlightBadge: "Bestseller Verano",
      priceEur: "€ 89,90",
      priceBrl: "R$ 490",
      oldPriceEur: "€ 119,00",
      image: "/images/kit_familia.jpg",
      description: "Conjunto coordinado para papá, mamá e hijos con estampas exclusivas de alta definición. Secado ultra-rápido y máxima protección UV50+.",
      features: [
        "Protección Solar UV50+ certificada",
        "Lycra Premium de secado ultra-rápido",
        "Tallas coordinadas Adulto e Infantil",
        "Diseño y corte brasileño anatómico"
      ],
      whatsappMessage: "¡Hola Tenerife Beach! Vi el Kit Família Matching Tropical en su perfil y quiero consultar tallas y disponibilidad.",
    },
    {
      id: "biquini-ripple-turquesa",
      name: "Biquíni Ripple Cortininha Noronha",
      subType: "Modelagem Brasileira",
      highlightBadge: "Empina Bumbum",
      priceEur: "€ 49,90",
      priceBrl: "R$ 270",
      oldPriceEur: "€ 65,00",
      image: "/images/biquini_ripple.jpg",
      description: "El icónico corte brasileño cortininha con detalle ondulado ripple que realza las curvas naturalmente. Forro doble antitransparencia y detalles dorados antioxidantes.",
      features: [
        "Efecto levanta-glúteo anatómico",
        "Forro doble térmico antitransparencia",
        "Herrajes bañados en oro resistentes al mar",
        "Cintas laterales ajustables al milímetro"
      ],
      whatsappMessage: "¡Hola Tenerife Beach! Quiero información sobre el Biquíni Ripple Cortininha Noronha en color turquesa.",
    },
    {
      id: "maio-sculpt-adeje",
      name: "Maiô Sculpt Elegance Costa Adeje",
      subType: "Maiô Modelador",
      highlightBadge: "Efecto Silueta",
      priceEur: "€ 64,90",
      priceBrl: "R$ 350",
      oldPriceEur: "€ 85,00",
      image: "/images/maio_sculpt.jpg",
      description: "Diseño contemporáneo estructurado en color terracota y oliva. Compresión suave que define la cintura con absoluto confort, perfecto de la playa al beach club.",
      features: [
        "Tecnología PowerMesh de compresión suave",
        "Copas removibles con soporte natural",
        "Tejido texturizado acanalado de alta densidad",
        "Versátil para usar como body casual"
      ],
      whatsappMessage: "¡Hola Tenerife Beach! Me encantó el Maiô Sculpt Elegance Costa Adeje. ¿Me ayudan a elegir mi talla?",
    }
  ],
  sizeGuide: [
    { br: "P (36/38)", es: "34 - 36 (XS/S)", busto: "80 - 86 cm", cintura: "62 - 68 cm", cadera: "88 - 94 cm" },
    { br: "M (40)", es: "38 - 40 (M)", busto: "88 - 94 cm", cintura: "70 - 76 cm", cadera: "96 - 102 cm" },
    { br: "G (42/44)", es: "42 - 44 (L)", busto: "96 - 102 cm", cintura: "78 - 84 cm", cadera: "104 - 110 cm" },
    { br: "GG (46)", es: "46 (XL)", busto: "104 - 110 cm", cintura: "86 - 92 cm", cadera: "112 - 118 cm" }
  ]
};

export function getWhatsAppUrl(message, phone = TENERIFE_BEACH_DATA.brand.whatsappNumber) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
