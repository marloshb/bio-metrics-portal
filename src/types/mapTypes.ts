
export interface MapPoint {
  id: string;
  type: 'project' | 'policy' | 'finance' | 'bioindustry' | 'agriculture' | 'forestry' | 'decarbonization' | 'inclusion' | 'agroforestry';
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  sector?: string;
  status?: string;
  amount?: string;
  region: string;
  // Additional fields for Vocação Bioeconômica
  riskLevel?: 'low' | 'medium' | 'high';
  opportunity?: string;
  potential?: string;
  fragility?: string;
  impact?: string;
  socialMetrics?: {
    labor?: number;
    communities?: number;
    indigenous?: boolean;
    women?: number;
    youth?: number;
  };
  environmentalMetrics?: {
    protectedArea?: boolean;
    ecologicalCorridor?: boolean;
    restorationZone?: boolean;
    app?: boolean; // Área de Preservação Permanente
  };
  economicMetrics?: {
    infrastructure?: string[];
    marketDemand?: number; // 0-100 scale
    investmentPotential?: number; // in millions USD
  };
}

export interface BiodiversityMapProps {
  filter: string;
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

export interface BioeconomicVocationMapProps {
  selectedComponent: 'social' | 'environmental' | 'economic' | 'all';
  selectedTheme: string | null;
  onComponentSelect: (component: 'social' | 'environmental' | 'economic' | 'all') => void;
  onThemeSelect: (theme: string) => void;
}
