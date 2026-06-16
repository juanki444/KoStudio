import { motion, useScroll, useTransform } from 'framer-motion';
import { propertyService } from '../services/propertyService';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoReal from '../assets/logo-real.jpg';

export default function Home() {
  const featured = propertyService.getFeaturedProperties();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden -mt-20 bg-background">
        <div className="absolute inset-0 z-0 bg-black flex flex-col items-center justify-center">
          <motion.div 
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full max-w-[1400px] mx-auto flex items-center justify-center px-8 pt-32 pb-48 md:px-16 lg:px-24"
          >
            <motion.img 
              src={logoReal} 
              alt="KoStudio" 
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full object-contain opacity-95"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 w-full h-full container mx-auto px-6 flex flex-col justify-end pb-24 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link to="/propiedades" className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-secondary transition-colors duration-300 text-center">
              EXPLORAR PROPIEDADES
            </Link>
            <Link to="/contacto" className="px-8 py-4 bg-transparent border border-white text-white font-medium tracking-wide hover:bg-white/10 transition-colors duration-300 text-center">
              CONTACTAR
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Proyectos Destacados</h2>
              <p className="text-secondary max-w-lg font-light">Descubre nuestras propiedades más exclusivas, donde la arquitectura moderna se encuentra con la naturaleza.</p>
            </div>
            <Link to="/propiedades" className="hidden md:flex items-center text-accent hover:text-white transition-colors">
              Ver todos <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property, index) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden relative h-[400px] w-full bg-surface mb-6">
                  <img 
                    src={property.mainImage} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                    <p className="text-accent text-sm tracking-wider uppercase mb-1">{property.price}</p>
                    <h3 className="text-2xl text-white font-display">{property.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
