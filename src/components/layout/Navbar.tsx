import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoSrc from '../../assets/logo-real.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Propiedades', path: '/propiedades' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center z-50" onClick={closeMenu}>
          <img 
            src={logoSrc} 
            alt="Promotora Logo" 
            className="h-8 md:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm tracking-wide uppercase transition-colors hover:text-accent ${
                location.pathname === link.path ? 'text-accent font-medium' : 'text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contacto"
            className="px-6 py-2 bg-white text-black font-medium text-sm tracking-wide hover:bg-accent hover:text-white transition-all duration-300"
          >
            AGENDAR VISITA
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-dark border-t border-white/10 py-6 md:hidden flex flex-col items-center space-y-6"
          >
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={closeMenu}
                className="text-lg tracking-wider text-white hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contacto"
              onClick={closeMenu}
              className="px-8 py-3 bg-white text-black font-medium tracking-wide w-[80%] text-center"
            >
              AGENDAR VISITA
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
