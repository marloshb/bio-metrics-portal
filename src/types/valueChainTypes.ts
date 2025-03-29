
export interface Actor {
  id: string;
  name: string;
  type: 'Produtor' | 'Cooperativa' | 'Indústria' | 'Distribuidor' | 'Comprador' | 'Outro';
  location: {
    state: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  products: ProductOffering[];
  productionCapacity?: string;
  certifications?: string[];
  contact: {
    email: string;
    phone?: string;
    website?: string;
  };
  description: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOffering {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  available: boolean;
  images?: string[];
  certifications?: string[];
  harvestDate?: string;
  expirationDate?: string;
  sustainable_practices?: string[];
  co2_avoided?: number; // in kg
}

export interface GeoMarketingData {
  id: string;
  productCategory: string;
  region: string;
  supplyVolume: number;
  demandVolume: number;
  averagePrice: number;
  unit: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  period: string; // e.g. "Janeiro 2024"
  trends: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
}

export interface MarketplaceTransaction {
  id: string;
  productOffering: string; // reference to ProductOffering.id
  seller: string; // reference to Actor.id
  buyer: string; // reference to Actor.id (optional if just an offer)
  initialPrice: number;
  finalPrice?: number;
  quantity: number;
  status: 'Disponível' | 'Em negociação' | 'Vendido' | 'Cancelado';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  traceabilityCode?: string;
}
