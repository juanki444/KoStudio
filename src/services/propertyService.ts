import informationRaw from '../assets/information.md?raw';
import type { Property } from '../types';

// Cargar todas las imágenes y videos de assets estáticamente
const imagesGlob = import.meta.glob('../assets/*.jpg', { eager: true, import: 'default' });
const pngGlob = import.meta.glob('../assets/*.png', { eager: true, import: 'default' });
const videosGlob = import.meta.glob('../assets/*.mp4', { eager: true, import: 'default' });

const allImages = { ...imagesGlob, ...pngGlob } as Record<string, string>;
const allVideos = videosGlob as Record<string, string>;

// Parser robusto del archivo markdown
const parseInformation = (): Property[] => {
  // Manejo de fallback si el markdown está vacío o corrupto
  if (!informationRaw) return [];
  
  const blocks = informationRaw.split('---').map(b => b.trim()).filter(Boolean);
  
  return blocks.map((block, index) => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const titleLine = lines.find(l => l.startsWith('# '));
    const name = titleLine ? titleLine.replace('# ', '') : `Propiedad ${index + 1}`;
    
    // Extraer prefijo para cruzar con nombres de archivos (ej. 'alameda', 'oasis')
    let slugKey = name.toLowerCase().split(' ')[0];
    
    let description = '';
    const details: Record<string, string> = {};
    
    lines.forEach(line => {
      if (line.startsWith('# ')) return;
      if (line.includes(': ')) {
        const [key, ...rest] = line.split(': ');
        details[key.toLowerCase()] = rest.join(': ').trim();
      } else {
        description += line + ' ';
      }
    });

    // Recopilar imágenes correspondientes
    const propertyImages: string[] = [];
    Object.keys(allImages).forEach(path => {
      const filename = path.split('/').pop()?.toLowerCase() || '';
      // Si el archivo empieza por el slugKey (ej. 'alameda-contenido1.jpg')
      if (filename.startsWith(slugKey)) {
        propertyImages.push(allImages[path]);
      }
    });

    // Ordenar alfabéticamente garantiza que contenido1 sea portada, contenido2,3 galería
    propertyImages.sort();
    
    const mainImage = propertyImages.length > 0 ? propertyImages[0] : '';
    const gallery = propertyImages.length > 1 ? propertyImages.slice(1) : [];

    // Recopilar videos correspondientes
    const propertyVideos: string[] = [];
    Object.keys(allVideos).forEach(path => {
      const filename = path.split('/').pop()?.toLowerCase() || '';
      // Si el archivo empieza por 'video-slugKey' (ej. 'video-alameda1.mp4')
      if (filename.startsWith(`video-${slugKey}`)) {
        propertyVideos.push(allVideos[path]);
      }
    });
    propertyVideos.sort();

    return {
      id: `prop-${index + 1}`,
      name: name,
      slug: slugKey,
      description: description.trim(),
      location: details['ubicación'] || details['ubicacion'] || 'Sector Exclusivo',
      price: details['precio'] || 'Consultar',
      area: details['area'] || details['área'] || '',
      bedrooms: parseInt(details['habitaciones']) || 0,
      bathrooms: parseInt(details['baños']) || parseInt(details['banos']) || 0,
      features: details['características'] ? details['características'].split(',').map(f => f.trim()) : [],
      mainImage,
      gallery,
      videoUrls: propertyVideos,
      is_published: true
    };
  });
};

const propertiesData = parseInformation();

export const propertyService = {
  getProperties: (): Property[] => {
    return propertiesData;
  },

  getPropertyById: (idOrSlug: string): Property | null => {
    return propertiesData.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  },

  getFeaturedProperties: (): Property[] => {
    return propertiesData.slice(0, 3);
  }
};
