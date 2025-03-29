
export type PDCAStage = 'Planejar' | 'Fazer' | 'Checar' | 'Agir';

export type ActionStatus = 'Não iniciada' | 'Em andamento' | 'Concluída' | 'Atrasada' | 'Requer ajustes';

export interface BioeconomicAction {
  id: string;
  title: string;
  description: string;
  currentStage: PDCAStage;
  status: ActionStatus;
  progress: number; // 0-100
  startDate: string;
  endDate: string;
  region: string;
  state: string;
  municipality?: string;
  budget: number; // in BRL
  responsibleEntity: string;
  responsiblePerson?: string;
  contact?: string;
  targets: ActionTarget[];
  activities: ActionActivity[];
  indicators: ActionIndicator[];
  suggestions: ActionSuggestion[];
  createdAt: string;
  updatedAt: string;
}

export interface ActionTarget {
  id: string;
  description: string;
  unit: string;
  value: number;
  deadline: string;
  progress: number; // 0-100
}

export interface ActionActivity {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída' | 'Atrasada';
  progress: number; // 0-100
  notes?: string;
  evidences?: Evidence[];
}

export interface Evidence {
  id: string;
  type: 'Foto' | 'Documento' | 'Vídeo' | 'Relatório';
  title: string;
  description?: string;
  fileUrl?: string;
  uploadDate: string;
}

export interface ActionIndicator {
  id: string;
  name: string;
  description?: string;
  unit: string;
  target: number;
  current: number;
  progress: number; // 0-100
  lastUpdated: string;
  category: 'Ambiental' | 'Social' | 'Econômico';
}

export interface ActionSuggestion {
  id: string;
  content: string;
  category: 'Ajuste' | 'Melhoria' | 'Alerta';
  createdAt: string;
  applied: boolean;
  appliedAt?: string;
}

export interface BiodiversityActivity {
  id: string;
  name: string;
  description: string;
  sector: 'Agricultura' | 'Florestas' | 'Pecuária' | 'Pesca' | 'Alimentos' | 'Farmacêutico' | 'Cosmético' | 'Químico' | 'Bioenergia' | 'Outro';
  region: string;
  state: string;
  municipality?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  localResources: string[];
  targetMarkets: string[];
  startDate: string;
  implementationProgress: number; // 0-100
  economicImpact: {
    salesTarget: number; // in BRL
    currentSales: number; // in BRL
    jobsTarget: number;
    currentJobs: number;
  };
  environmentalImpact: {
    co2ReductionTarget?: number; // in tons
    currentCo2Reduction?: number; // in tons
    areaRestoredTarget?: number; // in hectares
    currentAreaRestored?: number; // in hectares
  };
  createdAt: string;
  updatedAt: string;
}

export interface SocialEnvironmentalAction {
  id: string;
  title: string;
  description: string;
  region: string;
  state: string;
  municipality?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'Planejamento' | 'Implementação' | 'Concluída';
  startDate: string;
  endDate?: string;
  socialImpact: {
    familiesTarget: number;
    currentFamiliesInvolved: number;
    womenPercentage: number;
    youthPercentage?: number;
    indigenousPercentage?: number;
    averageIncomeIncrease?: number; // in percentage
  };
  environmentalImpact: {
    areaTarget: number; // in hectares
    currentAreaRestored: number; // in hectares
    nativeSpeciesUsed: string[];
    biodiversityConservation?: string;
  };
  partnerships: {
    name: string;
    type: 'Público' | 'Privado' | 'ONG' | 'Comunidade' | 'Outro';
    contribution: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
