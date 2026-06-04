"use client"

import { useState } from "react"
import { X, Calendar, MapPin, Ticket } from "lucide-react"

interface Event {
  id: string
  name: string
  date: string
  location: string
  image: string
  ticketTypes: {
    name: string
    price: string
    description: string
  }[]
  whatsappNumber: string
  accentColor: string
}

interface EventCategory {
  id: string
  name: string
  events: Event[]
}

const eventCategories: EventCategory[] = [
  {
    id: "signature",
    name: "SIGNATURE EVENTS",
    events: [
      {
        id: "championship",
        name: "THE 1 OF 1 CHAMPIONSHIP",
        date: "Próximamente",
        location: "Barranquilla",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/CHAMPtarj2.jpg",
        ticketTypes: [
          { name: "Full Pass", price: "$250.000 COP", description: "Acceso a las 4 fechas y todos los combates" },
          { name: "Fight Pass", price: "$100.000 COP", description: "Acceso a 1 fecha y todos los combates" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "red",
      },
      {
        id: "celestial",
        name: "MISS 1 OF 1 CELESTIAL",
        date: "Próximamente",
        location: "Barranquilla",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/MChome.png",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP", price: "$500.000 COP", description: "Mesa VIP para 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "amber",
      },
      {
        id: "animal",
        name: "ANIMAL",
        date: "17 Mayo 2027",
        location: "Discolo Night Club, Barranquilla",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/ANexp.jpg",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP 10 Personas", price: "$500.000 COP", description: "Experiencia VIP para grupos de 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "amber",
      },
      {
        id: "la-festa",
        name: "LA FESTA",
        date: "15 Febrero 2027",
        location: "Barranquilla",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/LFESTAhome.png",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP", price: "$500.000 COP", description: "Mesa VIP para 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "pink",
      },
      {
        id: "luna-llena",
        name: "LUNA LLENA",
        date: "Próximamente",
        location: "Barranquilla",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/LLback.png",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP", price: "$500.000 COP", description: "Mesa VIP para 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "purple",
      },
      {
        id: "babadook",
        name: "BABADOOK",
        date: "31 Octubre 2027",
        location: "Por confirmar",
        image: "https://f005.backblazeb2.com/file/b21of1firm/background/BDsig.png",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP", price: "$500.000 COP", description: "Mesa VIP para 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "orange",
      },
    ]
  },
  {
    id: "weekend",
    name: "WEEKEND EVENTS",
    events: [
      {
        id: "elite-weekend-viernes",
        name: "ELITE WEEKEND - VIERNES",
        date: "Viernes 16 de Mayo",
        location: "Discolo Night Club, Barranquilla",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP 10 Personas", price: "$500.000 COP", description: "Experiencia VIP para grupos de 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "amber",
      },
      {
        id: "secret-party-sabado",
        name: "SECRET PARTY VIP - SÁBADO",
        date: "Sábado 17 de Mayo",
        location: "Discolo Night Club, Barranquilla",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP 10 Personas", price: "$500.000 COP", description: "Experiencia VIP para grupos de 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "amber",
      },
      {
        id: "animal-aftermovie-domingo",
        name: "ANIMAL AFTERMOVIE - DOMINGO",
        date: "Domingo 18 de Mayo",
        location: "Discolo Night Club, Barranquilla",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
        ticketTypes: [
          { name: "Ticket", price: "$45.000 COP", description: "Acceso general al evento" },
          { name: "Mesa VIP 10 Personas", price: "$500.000 COP", description: "Experiencia VIP para grupos de 10 personas" },
        ],
        whatsappNumber: "573003676521",
        accentColor: "amber",
      },
    ]
  }
]

// Helper to get all events flat
const getAllEvents = () => eventCategories.flatMap(cat => cat.events)

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface TicketSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  preSelectedEvent?: string
}

export default function TicketSelectorModal({ isOpen, onClose, preSelectedEvent }: TicketSelectorModalProps) {
  const allEvents = getAllEvents()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    preSelectedEvent ? allEvents.find(e => e.id === preSelectedEvent) || null : null
  )
  const [selectedTicket, setSelectedTicket] = useState<{ name: string; price: string; description: string } | null>(null)

  if (!isOpen) return null

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setSelectedTicket(null)
  }

  const handleSelectTicket = (ticket: { name: string; price: string; description: string }) => {
    setSelectedTicket(ticket)
  }

  const handleWhatsAppRedirect = () => {
    if (selectedEvent && selectedTicket) {
      const message = encodeURIComponent(
        `Hola! Estoy interesado en comprar entrada para ${selectedEvent.name}.\n\nTipo de entrada: ${selectedTicket.name}\nPrecio: ${selectedTicket.price}\n\nPor favor, confirmen disponibilidad.`
      )
      window.open(`https://wa.me/${selectedEvent.whatsappNumber}?text=${message}`, "_blank")
    }
  }

  const getAccentClasses = (color: string, type: "bg" | "border" | "text" | "hover") => {
    const colors: Record<string, Record<string, string>> = {
      red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500", hover: "hover:bg-red-600" },
      amber: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-500", hover: "hover:bg-amber-600" },
      pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-500", hover: "hover:bg-pink-600" },
      purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500", hover: "hover:bg-purple-600" },
      orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500", hover: "hover:bg-orange-600" },
    }
    return colors[color]?.[type] || colors.amber[type]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full sm:max-w-4xl h-[85vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-neutral-950 border-t sm:border border-white/10 rounded-t-2xl sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 sm:p-6 bg-neutral-950 border-b border-white/10">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-base sm:text-2xl font-light tracking-wider text-white truncate">
              {selectedEvent ? "SELECCIONA TU ENTRADA" : "SELECCIONA UN EVENTO"}
            </h2>
            <p className="text-white/50 text-[10px] sm:text-sm tracking-wider mt-0.5 sm:mt-1 truncate">
              {selectedEvent ? selectedEvent.name : "SELECCIONA UNA CATEGORIA"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 p-1.5 sm:p-2 text-white/60 hover:text-white transition-colors bg-white/5 rounded-full"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          {!selectedEvent ? (
            /* Event Selection by Categories */
            <div className="space-y-6 sm:space-y-8">
              {eventCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-amber-500 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 border-b border-white/10 pb-2">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                    {category.events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => handleSelectEvent(event)}
                        className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 active:scale-[0.98]"
                      >
                        <div className="aspect-[3/4] sm:aspect-[4/3] relative">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                          <h3 className={`text-[10px] sm:text-base font-bold tracking-wide sm:tracking-wider leading-tight ${getAccentClasses(event.accentColor, "text")}`}>
                            {event.name}
                          </h3>
                          <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1 text-white/60 text-[8px] sm:text-xs">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                            <span className="truncate">{event.date}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : !selectedTicket ? (
            /* Ticket Selection */
            <div>
              {/* Back button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white text-xs sm:text-sm mb-4 sm:mb-6 transition-colors"
              >
                <span>&larr;</span>
                <span>Volver a eventos</span>
              </button>

              {/* Event Info */}
              <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-48 sm:h-auto sm:aspect-square rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm sm:text-xl font-bold tracking-wider leading-tight ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                    {selectedEvent.name}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-white/60 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-white/60 text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-white/80 text-xs sm:text-sm tracking-wider mb-3 sm:mb-4">TIPOS DE ENTRADA</h4>
                {selectedEvent.ticketTypes.map((ticket, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectTicket(ticket)}
                    className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-all duration-300 hover:border-white/40 active:scale-[0.99] ${
                      selectedTicket?.name === ticket.name 
                        ? `${getAccentClasses(selectedEvent.accentColor, "border")} bg-white/5` 
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                        <Ticket className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0 ${getAccentClasses(selectedEvent.accentColor, "text")}`} />
                        <div className="min-w-0">
                          <p className="text-white font-medium text-sm sm:text-base">{ticket.name}</p>
                          <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 line-clamp-2">{ticket.description}</p>
                        </div>
                      </div>
                      <p className={`text-sm sm:text-lg font-bold flex-shrink-0 ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                        {ticket.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Confirmation */
            <div>
              {/* Back button */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white text-xs sm:text-sm mb-4 sm:mb-6 transition-colors"
              >
                <span>&larr;</span>
                <span>Volver a entradas</span>
              </button>

              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
                <h4 className="text-white/80 text-xs sm:text-sm tracking-wider mb-3 sm:mb-4">RESUMEN DE TU COMPRA</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-white/60 text-xs sm:text-base">Evento</span>
                    <span className={`font-medium text-xs sm:text-base text-right ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                      {selectedEvent.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-white/60 text-xs sm:text-base">Fecha</span>
                    <span className="text-white text-xs sm:text-base">{selectedEvent.date}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-white/60 text-xs sm:text-base">Tipo de entrada</span>
                    <span className="text-white text-xs sm:text-base">{selectedTicket.name}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 sm:pt-3 mt-2 sm:mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm sm:text-base">Total</span>
                      <span className={`text-lg sm:text-xl font-bold ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                        {selectedTicket.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppRedirect}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 ${getAccentClasses(selectedEvent.accentColor, "bg")} ${getAccentClasses(selectedEvent.accentColor, "hover")} text-black font-bold text-sm sm:text-base tracking-wider rounded-lg transition-all duration-300 active:scale-[0.98]`}
              >
                <WhatsAppIcon />
                <span>COMPRAR POR WHATSAPP</span>
              </button>

              <p className="text-center text-white/40 text-[10px] sm:text-xs mt-3 sm:mt-4">
                Serás redirigido a WhatsApp para completar tu compra
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
