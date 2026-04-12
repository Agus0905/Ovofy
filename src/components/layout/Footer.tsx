import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0f0e0c] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">OVOFY</h3>
            <p className="text-sm">
              Descubrí tu vocación antes de elegir tu carrera universitaria.
            </p>
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-amber cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-amber cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-amber cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-amber cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/catalogo" className="hover:text-amber">Catálogo</a></li>
              <li><a href="/comparar" className="hover:text-amber">Comparador</a></li>
              <li><a href="/quiz" className="hover:text-amber">Quiz Vocacional</a></li>
              <li><a href="/como-funciona" className="hover:text-amber">Cómo Funciona</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>info@ovofy.com</li>
              <li>+54 11 1234-5678</li>
              <li>Buenos Aires, Argentina</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Recibí novedades sobre nuevas carreras.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 bg-[#1a1814] border border-gray-700 rounded-lg text-sm text-white"
              />
              <button className="btn-primary px-4 py-2">Suscribirse</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2024 OVOFY. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-amber">Términos</a>
            <a href="#" className="hover:text-amber">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
