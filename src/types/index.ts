export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  price?: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  videoUrls?: string[];
  is_published?: boolean;
}
