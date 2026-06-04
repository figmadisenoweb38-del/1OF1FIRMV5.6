"use client"

import { useState, useEffect, useCallback } from "react"

// Types for editable site texts
export interface SiteTexts {
  // Babadook/Event Detail Hero
  babadookHeroDescription: string
  babadookHeroLine1: string
  babadookHeroLine2: string
  babadookHeroLine3: string
  
  // Ticket Section
  ticketSectionStageTitle: string
  ticketSectionTicketLabel: string
  ticketSectionTicketSubtitle: string
  ticketSectionVipLabel: string
  ticketSectionVipSubtitle: string
  ticketSectionBestSellerBadge: string
  ticketSectionPriceNote: string
  
  // CTA Section
  ctaSectionTitle: string
  ctaSectionSubtitle: string
  ctaSectionButton: string
  
  // Aftermovie Section
  aftermovieLabel: string
  aftermovieButtonText: string
  
  // Footer texts
  footerTagline: string
  footerCopyright: string
  
  // General
  buyButtonText: string
}

// LocalStorage key
const SITE_TEXTS_KEY = "1of1_site_texts"

// Default texts
const defaultSiteTexts: SiteTexts = {
  // Babadook/Event Detail Hero
  babadookHeroDescription: "6TA EDICION",
  babadookHeroLine1: "SEXTO ANIVERSARIO DE 1OF1.",
  babadookHeroLine2: "SEIS AÑOS CONSTRUYENDO",
  babadookHeroLine3: "LA EXPERIENCIA MÁS INMERSIVA DEL PAÍS.",
  
  // Ticket Section
  ticketSectionStageTitle: "Etapa Creyentes",
  ticketSectionTicketLabel: "TICKET",
  ticketSectionTicketSubtitle: "ACCESO GENERAL AL EVENTO",
  ticketSectionVipLabel: "MESA VIP",
  ticketSectionVipSubtitle: "10 PERSONAS",
  ticketSectionBestSellerBadge: "MÁS VENDIDA",
  ticketSectionPriceNote: "PRECIOS EXCLUSIVOS ETAPA CREYENTES. POR TIEMPO LIMITADO.",
  
  // CTA Section
  ctaSectionTitle: "ASEGURA TU LUGAR",
  ctaSectionSubtitle: "LOS CUPOS SON LIMITADOS.",
  ctaSectionButton: "COMPRAR ENTRADAS",
  
  // Aftermovie Section
  aftermovieLabel: "Revive la experiencia",
  aftermovieButtonText: "VER AFTERMOVIE",
  
  // Footer texts
  footerTagline: "EVENTOS EXCLUSIVOS",
  footerCopyright: "© 2026 1 OF 1 FIRM",
  
  // General
  buyButtonText: "COMPRAR"
}

// Helper to get data from localStorage
function getStoredTexts(): SiteTexts {
  if (typeof window === "undefined") return defaultSiteTexts
  try {
    const stored = localStorage.getItem(SITE_TEXTS_KEY)
    if (stored) {
      // Merge with defaults to ensure new fields are always available
      return { ...defaultSiteTexts, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error("Error reading site texts from localStorage:", error)
  }
  return defaultSiteTexts
}

// Helper to save data to localStorage
function saveTexts(data: SiteTexts): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SITE_TEXTS_KEY, JSON.stringify(data))
    // Dispatch custom event to notify other components
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("site-texts-updated", { detail: { timestamp: Date.now() } }))
    }, 0)
  } catch (error) {
    console.error("Error saving site texts to localStorage:", error)
  }
}

// Hook for site texts
export function useSiteTexts() {
  const [texts, setTexts] = useState<SiteTexts>(defaultSiteTexts)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getStoredTexts()
    setTexts(stored)
    setIsLoaded(true)
  }, [])

  // Listen for updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      const stored = getStoredTexts()
      setTexts(stored)
    }
    window.addEventListener("site-texts-updated", handleUpdate)
    return () => window.removeEventListener("site-texts-updated", handleUpdate)
  }, [])

  const updateText = useCallback((key: keyof SiteTexts, value: string) => {
    setTexts(prev => {
      const newTexts = { ...prev, [key]: value }
      saveTexts(newTexts)
      return newTexts
    })
  }, [])

  const updateMultipleTexts = useCallback((updates: Partial<SiteTexts>) => {
    setTexts(prev => {
      const newTexts = { ...prev, ...updates }
      saveTexts(newTexts)
      return newTexts
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setTexts(defaultSiteTexts)
    saveTexts(defaultSiteTexts)
  }, [])

  return { texts, updateText, updateMultipleTexts, resetToDefaults, isLoaded, defaultTexts: defaultSiteTexts }
}

// Text field configuration for admin panel
export interface TextFieldConfig {
  key: keyof SiteTexts
  label: string
  description: string
  multiline?: boolean
  section: "hero" | "tickets" | "cta" | "aftermovie" | "footer" | "general"
}

export const textFieldsConfig: TextFieldConfig[] = [
  // Hero Section
  { key: "babadookHeroDescription", label: "Descripción del Evento", description: "Texto pequeño debajo del título (ej: '6TA EDICION')", section: "hero" },
  { key: "babadookHeroLine1", label: "Línea 1 del Hero", description: "Primera línea del texto descriptivo", section: "hero" },
  { key: "babadookHeroLine2", label: "Línea 2 del Hero", description: "Segunda línea del texto descriptivo", section: "hero" },
  { key: "babadookHeroLine3", label: "Línea 3 del Hero", description: "Tercera línea del texto descriptivo", section: "hero" },
  
  // Tickets Section
  { key: "ticketSectionStageTitle", label: "Título de Etapa", description: "Nombre de la etapa actual de venta", section: "tickets" },
  { key: "ticketSectionTicketLabel", label: "Etiqueta Ticket", description: "Texto del título del ticket regular", section: "tickets" },
  { key: "ticketSectionTicketSubtitle", label: "Subtítulo Ticket", description: "Descripción del ticket regular", section: "tickets" },
  { key: "ticketSectionVipLabel", label: "Etiqueta VIP", description: "Texto del título del ticket VIP", section: "tickets" },
  { key: "ticketSectionVipSubtitle", label: "Subtítulo VIP", description: "Descripción del ticket VIP", section: "tickets" },
  { key: "ticketSectionBestSellerBadge", label: "Badge Más Vendida", description: "Texto del badge de más vendida", section: "tickets" },
  { key: "ticketSectionPriceNote", label: "Nota de Precios", description: "Texto de la nota de precios exclusivos", section: "tickets", multiline: true },
  
  // CTA Section
  { key: "ctaSectionTitle", label: "Título CTA", description: "Título de la sección de llamada a la acción", section: "cta" },
  { key: "ctaSectionSubtitle", label: "Subtítulo CTA", description: "Subtítulo de la sección CTA", section: "cta" },
  { key: "ctaSectionButton", label: "Texto Botón CTA", description: "Texto del botón principal", section: "cta" },
  
  // Aftermovie Section
  { key: "aftermovieLabel", label: "Etiqueta Aftermovie", description: "Texto pequeño sobre el título", section: "aftermovie" },
  { key: "aftermovieButtonText", label: "Texto Botón Aftermovie", description: "Texto del botón para ver aftermovie", section: "aftermovie" },
  
  // Footer
  { key: "footerTagline", label: "Tagline Footer", description: "Texto del tagline en el footer", section: "footer" },
  { key: "footerCopyright", label: "Copyright", description: "Texto del copyright", section: "footer" },
  
  // General
  { key: "buyButtonText", label: "Texto Comprar", description: "Texto general para botones de compra", section: "general" },
]

export const sectionLabels: Record<TextFieldConfig["section"], string> = {
  hero: "HERO / ENCABEZADO",
  tickets: "SECCIÓN DE TICKETS",
  cta: "LLAMADA A LA ACCIÓN",
  aftermovie: "AFTERMOVIE",
  footer: "FOOTER",
  general: "GENERAL"
}
