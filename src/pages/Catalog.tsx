import { motion } from 'framer-motion';
import { propertyService } from '../services/propertyService';
import { Link } from 'react-router-dom';
import { MapPin, Maximize, BedDouble, Bath } from 'lucide-react';

export default function Catalog() {
  const properties = propertyService.getProperties();

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-semibold text-white mb-4"
          >
            Catálogo Exclusivo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-2xl font-light"
          >
            Explora nuestra cuidada selección de propiedades premium. Cada proyecto ha sido diseñado pensando en la excelencia y el confort.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col bg-surface border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.mainImage} 
                  alt={property.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider">
                  Disponible
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h2 className="text-2xl font-display text-white mb-2">{property.name}</h2>
                  <div className="flex items-center text-sm text-secondary mb-3">
                    <MapPin size={16} className="mr-1 text-accent" />
                    {property.location}
                  </div>
                  <p className="text-accent text-xl font-medium">{property.price}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-4 mb-6 text-secondary text-sm">
                  <div className="flex flex-col items-center justify-center">
                    <Maximize size={18} className="mb-1 opacity-70" />
                    <span>{property.area}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-x border-white/5">
                    <BedDouble size={18} className="mb-1 opacity-70" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Bath size={18} className="mb-1 opacity-70" />
                    <span>{property.bathrooms}</span>
                  </div>
                </div>

                <Link 
                  to={`/propiedades/${property.id}`}
                  className="mt-auto w-full py-3 text-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm font-medium"
                >
                  VER DETALLES
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
