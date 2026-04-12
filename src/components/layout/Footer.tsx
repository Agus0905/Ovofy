import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0f0e0c] border-t border-[#2a2620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-serif font-bold text-white">OVOFY</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Descubrí tu vocación antes de elegirla. La plataforma de orientación vocacional más completa de Argentina.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-amber transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Catálogo de Cursos
                </Link>
              </li>
              <li>
                <Link to="/comparar" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Comparador de Universidades
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Test Vocacional
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Cómo Funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* For Universities */}
          <div>
            <h3 className="text-white font-semibold mb-4">Para Universidades</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Asociación
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Portal Universidad
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Recursos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-amber transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@ovofy.com</li>
              <li>+54 11 1234-5678</li>
              <li>Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#2a2620] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 OVOFY. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-gray-400 hover:text-amber transition-colors">
              Términos
            </Link>
            <Link to="#" className="text-gray-400 hover:text-amber transition-colors">
              Privacidad
            </Link>
            <Link to="#" className="text-gray-400 hover:text-amber transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
