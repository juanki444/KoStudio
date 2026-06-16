import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { propertyService } from '../services/propertyService';
import { socialConfig } from '../config/social';
import { MapPin, Maximize, BedDouble, Bath, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = id ? propertyService.getPropertyById(id) : null;
  const featured = propertyService.getFeaturedProperties();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleNextVideo = () => {
    if (property?.videoUrls && activeVideoIndex < property.videoUrls.length - 1) {
      if (videoRefs.current[activeVideoIndex]) {
        videoRefs.current[activeVideoIndex]?.pause();
      }
      setActiveVideoIndex(prev => prev + 1);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex > 0) {
      if (videoRefs.current[activeVideoIndex]) {
        videoRefs.current[activeVideoIndex]?.pause();
      }
      setActiveVideoIndex(prev => prev - 1);
    }
  };

  const related = featured.filter(p => p.id !== id).slice(0, 2);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <h2>Propiedad no encontrada</h2>
      </div>
    );
  }

  const allImages = [property.mainImage, ...property.gallery];

  const renderGallery = () => {
    if (allImages.length === 1) {
      return (
        <div className="h-[60vh] w-full" onClick={() => setLightboxIndex(0)}>
          <img src={allImages[0]} className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" alt="Gallery" />
        </div>
      );
    }
    if (allImages.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[60vh] gap-1 bg-surface">
          {allImages.map((img, idx) => (
            <div key={idx} className="relative overflow-hidden" onClick={() => setLightboxIndex(idx)}>
              <img src={img} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt={`Gallery ${idx}`} />
            </div>
          ))}
        </div>
      );
    }
    if (allImages.length === 3) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 h-[60vh] gap-1 bg-surface">
          <div className="md:row-span-2 relative overflow-hidden" onClick={() => setLightboxIndex(0)}>
            <img src={allImages[0]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 0" />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-xs tracking-widest uppercase md:hidden pointer-events-none border border-white/10">
              1 / {allImages.length}
            </div>
          </div>
          <div className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(1)}>
            <img src={allImages[1]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
          </div>
          <div className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(2)}>
            <img src={allImages[2]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 2" />
          </div>
        </div>
      );
    }
    if (allImages.length === 4) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[60vh] gap-1 bg-surface">
          <div className="md:col-span-2 row-span-2 relative overflow-hidden" onClick={() => setLightboxIndex(0)}>
            <img src={allImages[0]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 0" />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-xs tracking-widest uppercase md:hidden pointer-events-none border border-white/10">
              1 / {allImages.length}
            </div>
          </div>
          <div className="md:col-span-2 relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(1)}>
            <img src={allImages[1]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
          </div>
          <div className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(2)}>
            <img src={allImages[2]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 2" />
          </div>
          <div className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(3)}>
            <img src={allImages[3]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 3" />
          </div>
        </div>
      );
    }
    // 5+ images
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[60vh] gap-1 bg-surface">
        <div className="md:col-span-2 row-span-2 relative overflow-hidden" onClick={() => setLightboxIndex(0)}>
          <img src={allImages[0]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 0" />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-xs tracking-widest uppercase md:hidden pointer-events-none border border-white/10">
            1 / {allImages.length}
          </div>
        </div>
        {allImages.slice(1, 4).map((img, idx) => (
          <div key={idx} className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(idx + 1)}>
            <img src={img} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt={`Gallery ${idx + 1}`} />
          </div>
        ))}
        <div className="relative overflow-hidden hidden md:block" onClick={() => setLightboxIndex(4)}>
          <img src={allImages[4]} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700" alt="Gallery 4" />
          {allImages.length > 5 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
              <span className="text-white text-xl font-medium tracking-widest">+{allImages.length - 5}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background pb-24">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={36} />
            </button>
            
            <button 
              className="absolute left-2 md:left-6 text-white/70 hover:text-white transition-colors p-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : allImages.length - 1));
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={allImages[lightboxIndex]} 
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <button 
              className="absolute right-2 md:right-6 text-white/70 hover:text-white transition-colors p-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! < allImages.length - 1 ? prev! + 1 : 0));
              }}
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Gallery */}
      {renderGallery()}

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-2">{property.name}</h1>
                  <div className="flex items-center text-secondary">
                    <MapPin size={18} className="mr-2 text-accent" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-secondary uppercase tracking-wider mb-1">Precio desde</p>
                  <p className="text-3xl text-accent font-medium">{property.price}</p>
                </div>
              </div>

              {/* Stats Bar */}
              {(property.area || (property.bedrooms ?? 0) > 0 || (property.bathrooms ?? 0) > 0) && (
                <div className="flex flex-wrap gap-8 py-8 border-y border-white/10 my-10 text-white">
                  {property.area && (
                    <div className="flex items-center">
                      <Maximize className="mr-3 text-secondary" size={24} />
                      <div>
                        <p className="text-xs text-secondary uppercase tracking-wider">Área</p>
                        <p className="font-medium text-lg">{property.area}</p>
                      </div>
                    </div>
                  )}
                  {(property.bedrooms ?? 0) > 0 && (
                    <div className="flex items-center">
                      <BedDouble className="mr-3 text-secondary" size={24} />
                      <div>
                        <p className="text-xs text-secondary uppercase tracking-wider">Habitaciones</p>
                        <p className="font-medium text-lg">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {(property.bathrooms ?? 0) > 0 && (
                    <div className="flex items-center">
                      <Bath className="mr-3 text-secondary" size={24} />
                      <div>
                        <p className="text-xs text-secondary uppercase tracking-wider">Baños</p>
                        <p className="font-medium text-lg">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {property.description && (
                <div className="mb-12">
                  <h3 className="text-2xl font-display text-white mb-6">Acerca de esta propiedad</h3>
                  <p className="text-secondary font-light leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}



              {/* Galería Multimedia (Videos Carrusel Premium) */}
              {property.videoUrls && property.videoUrls.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-display text-white mb-6">Galería Multimedia</h3>
                  <div className="relative w-full overflow-hidden rounded-sm border border-white/10 bg-black aspect-video group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeVideoIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <video 
                          ref={el => { videoRefs.current[activeVideoIndex] = el; }}
                          src={property.videoUrls[activeVideoIndex]} 
                          controls 
                          controlsList="nodownload"
                          preload="metadata"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Controles de Navegación */}
                    {activeVideoIndex > 0 && (
                      <button 
                        onClick={handlePrevVideo}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-accent/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Video anterior"
                      >
                        <ChevronLeft size={28} />
                      </button>
                    )}

                    {activeVideoIndex < property.videoUrls.length - 1 && (
                      <button 
                        onClick={handleNextVideo}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-accent/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Video siguiente"
                      >
                        <ChevronRight size={28} />
                      </button>
                    )}
                  </div>
                  
                  {/* Indicadores */}
                  <div className="flex justify-center items-center mt-4 text-secondary/70 font-light tracking-widest text-sm">
                    {activeVideoIndex + 1} <span className="mx-2">/</span> {property.videoUrls.length}
                  </div>
                </div>
              )}

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 glass-dark p-8">
              <h3 className="text-xl font-display text-white mb-2">¿Interesado?</h3>
              <p className="text-sm text-secondary font-light mb-6">Déjanos tus datos y un asesor premium se contactará contigo.</p>
              
              <div className="space-y-4 flex flex-col mt-4">
                <a 
                  href={`${socialConfig.whatsappUrl}?text=${encodeURIComponent(`Hola.\n\nEstoy interesado en la propiedad:\n*${property.name}*\n\n¿Podrían brindarme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-black font-medium text-center tracking-wide hover:bg-accent hover:text-white transition-colors duration-300 flex justify-center items-center"
                >
                  SOLICITAR INFORMACIÓN
                </a>
                
                <a 
                  href={`${socialConfig.whatsappUrl}?text=${encodeURIComponent(`Hola.\n\nEstoy interesado en programar una visita para la propiedad:\n*${property.name}*\n\n¿Podrían indicarme la disponibilidad?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-transparent border border-white/20 text-white font-medium text-center tracking-wide hover:bg-white/10 transition-colors duration-300 flex justify-center items-center"
                >
                  AGENDAR VISITA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <h3 className="text-3xl font-display text-white mb-10">Propiedades Similares</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map(p => (
              <Link to={`/propiedades/${p.id}`} key={p.id} className="group flex flex-col sm:flex-row bg-surface h-auto sm:h-40 overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                <div className="w-full sm:w-2/5 h-48 sm:h-full overflow-hidden">
                  <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-6 flex flex-col justify-center flex-grow">
                  <h4 className="text-xl font-display text-white mb-1">{p.name}</h4>
                  <p className="text-sm text-secondary mb-3">{p.location}</p>
                  <p className="text-accent font-medium">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
