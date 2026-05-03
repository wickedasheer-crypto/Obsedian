// ============================================================
//  OBSEDIAN AGENCY — DATA CONFIGURATION FILE
//  data.js — Edit this file to update pricing, services,
//  and portfolio items WITHOUT touching any HTML.
// ============================================================

const OBSEDIAN_DATA = {

  // ── AGENCY META ──────────────────────────────────────────
  agency: {
    name: "Obsedian",
    tagline: "YOUR DIGITAL STUDIO",
    email: "Studio@obsedian.in",
    phone: "+91 8369456558 / +91 93247 42958",
    location: "Mumbai, India",
    formspreeEndpoint: "https://formspree.io/f/mojyolqp", // ← Replace with your Formspree endpoint
    socialLinks: {
      instagram: "https://instagram.com/obsedian.studio",
      linkedin:  "https://linkedin.com/company/obsedian-studio"
    }
  },

  // ── SERVICES ─────────────────────────────────────────────
  // Used in: Hero service ticker, Services section, Pricing section, Contact form dropdown
  services: [
    {
      id: "cgi",
      icon: "🎯",
      title: "CGI & 3D Visualization",
      subtitle: "Hyper-real. Always on-brand.",
      description: "Product renders that sell before manufacturing begins. Photorealistic CGI for packaging, machinery, and D2C products that converts browsers into buyers.",
      bullets: [
        "Product & Packaging Renders",
        "Industrial & Machinery Visualization",
        "360° Turntable Animations",
        "E-commerce Ready Asset Packs"
      ],
      accentColor: "#FFE000"  // Yellow
    },
    {
      id: "xr",
      icon: "🕶️",
      title: "Immersive Experiences (XR)",
      subtitle: "Reality, upgraded.",
      description: "Web-AR and spatial computing experiences that let your customers interact with your product in their own space. No app download required.",
      bullets: [
        "Web-AR Product Try-On",
        "Spatial Commerce Experiences",
        "Virtual Showrooms",
        "Interactive 3D Configurators"
      ],
      accentColor: "#FF3B3B"  // Red
    },
    {
      id: "post",
      icon: "🎬",
      title: "Post-Production",
      subtitle: "Scroll-stopping. Always.",
      description: "Corporate films and high-impact social edits that don't get skipped. We handle colour grading, motion graphics, and sound design for maximum retention.",
      bullets: [
        "Corporate & Brand Films",
        "High-Impact Social Reels",
        "Motion Graphics & Titles",
        "Colour Grading & Sound Design"
      ],
      accentColor: "#00C8E0"  // Cyan
    },
    {
      id: "growth",
      icon: "📈",
      title: "Growth Strategy",
      subtitle: "ROAS that speaks for itself.",
      description: "Performance marketing and ad management built around your CAC targets. We manage Meta, Google, and programmatic campaigns with weekly ROI reporting.",
      bullets: [
        "Performance Marketing (Meta & Google)",
        "Ad Creative Strategy & Production",
        "Funnel Audits & CRO",
        "Weekly ROI Dashboards"
      ],
      accentColor: "#FF8C00"  // Orange
    }
  ],

  // ── PRICING ──────────────────────────────────────────────
  // "Starts at" packages shown in the Pricing section.
  // Change the `price` string to update displayed pricing.
  pricing: [
    {
      serviceId: "cgi",
      packageName: "CGI Starter",
      price: "₹25,000",
      priceNote: "per project",
      badge: "MOST POPULAR",
      badgeVisible: true,
      includes: [
        "3 Hero Product Renders",
        "2 Revision Rounds",
        "4K Resolution Output",
        "Commercial Usage Rights"
      ],
      cta: "GET A QUOTE"
    },
    {
      serviceId: "xr",
      packageName: "XR Starter",
      price: "₹40,000",
      priceNote: "per experience",
      badge: "CUTTING EDGE",
      badgeVisible: true,
      includes: [
        "1 Web-AR Experience",
        "Compatible with iOS & Android",
        "Embed on Any Website",
        "3 Months Support"
      ],
      cta: "GET A QUOTE"
    },
    {
      serviceId: "post",
      packageName: "Post-Production Starter",
      price: "₹15,000",
      priceNote: "per video",
      badge: "BEST VALUE",
      badgeVisible: true,
      includes: [
        "Up to 60-Second Final Edit",
        "Colour Grade + Sound Mix",
        "1 Social Cut (9:16 Reel)",
        "2 Revision Rounds"
      ],
      cta: "GET A QUOTE"
    },
    {
      serviceId: "growth",
      packageName: "Growth Starter",
      price: "₹25,000",
      priceNote: "/ month",
      badge: "ROI FOCUSED",
      badgeVisible: true,
      includes: [
        "Meta + Google Campaign Management",
        "3 Ad Creatives per Month",
        "Weekly Performance Reports",
        "Dedicated Account Strategist"
      ],
      cta: "GET A QUOTE"
    }
  ],

  // ── STATS / NUMBERS BAR ───────────────────────────────────
  stats: [
    { number: "50+", label: "Projects Delivered" },
    { number: "3.8x",  label: "Avg. ROAS" },
    { number: "8+",   label: "Brands Scaled" },
    { number: "₹70L+", label: "Revenue Generated" }
  ]

};
