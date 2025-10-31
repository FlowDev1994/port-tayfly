"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      setIsAnimating(true)
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    } else {
      setIsAnimating(false)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isAnimating ? "bg-black/70 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md bg-black/95 border border-white/20 rounded-2xl shadow-2xl transform transition-all duration-700 ease-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          boxShadow: "0 0 50px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="relative p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
            aria-label="Fechar modal de contato"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-6 text-center pr-8">
            Entre em Contato
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {/* WhatsApp Option */}
            <a
              href="https://wa.me/5519996107311?text=Olá%20Tayara!%20Vim%20através%20do%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-glow group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">WhatsApp</h3>
                  <p className="text-green-100 text-xs sm:text-sm truncate">(19) 99610-7311</p>
                </div>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Email Option */}
            <a
              href="mailto:tzampim@gmail.com?subject=Contato%20atrav%C3%A9s%20do%20Portf%C3%B3lio&body=Ol%C3%A1%20Tayara%2C%0D%0A%0D%0AGostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-glow group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Email</h3>
                  <p className="text-blue-100 text-xs sm:text-sm truncate">tzampim@gmail.com</p>
                </div>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm text-center mt-4 sm:mt-6">
            Escolha a melhor forma de entrar em contato
          </p>
        </div>
      </div>
    </div>
  )
}
