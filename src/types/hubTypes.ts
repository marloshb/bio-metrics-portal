
export interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    state: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  estimatedValue: number;
  sector: string;
  objectives: string[];
  status: 'Em análise' | 'Aprovado' | 'Em andamento' | 'Concluído' | 'Cancelado';
  startDate: string;
  endDate?: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  images?: string[];
  documents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  type: string;
  applicableRegions: string[];
  responsibleAgency: string;
  validUntil: string;
  eligibilityCriteria: string[];
  benefits: string[];
  documentUrl?: string;
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FinancialResource {
  id: string;
  name: string;
  source: 'Público' | 'Privado' | 'Internacional' | 'Misto';
  totalAmount: number;
  availableAmount: number;
  description: string;
  eligibilityCriteria: string[];
  deadlineDate: string;
  applicationProcess: string;
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };
  sectors: string[];
  minimumProjectValue?: number;
  maximumProjectValue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StateStrategy {
  id: string;
  state: string;
  title: string;
  description: string;
  period: {
    start: string;
    end: string;
  };
  focusAreas: {
    name: string;
    description: string;
    goals: {
      description: string;
      metric: string;
      target: string;
    }[];
  }[];
  documentUrl?: string;
  contactInfo: {
    department: string;
    email: string;
    phone?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}
