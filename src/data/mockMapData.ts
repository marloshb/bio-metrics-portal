
import { MapPoint } from '@/types/mapTypes';

// Mock data for map points
export const mockMapData: MapPoint[] = [
  {
    id: 'p1',
    type: 'project',
    name: 'Projeto Açaí Sustentável',
    coordinates: { lat: -3.117, lng: -60.025 },
    description: 'Manejo sustentável de açaizais nativos na Amazônia',
    sector: 'Biodiversidade',
    status: 'Em andamento',
    region: 'Norte'
  },
  {
    id: 'p2',
    type: 'project',
    name: 'Biofábrica de Mudas Nativas',
    coordinates: { lat: -15.793, lng: -47.882 },
    description: 'Produção de mudas para restauração do Cerrado',
    sector: 'Produção Sustentável',
    status: 'Concluído',
    region: 'Centro-Oeste'
  },
  {
    id: 'p3',
    type: 'project',
    name: 'Biorefinaria de Cana-de-Açúcar',
    coordinates: { lat: -21.173, lng: -47.810 },
    description: 'Aproveitamento integral da biomassa para biocombustíveis e bioprodutos',
    sector: 'Bioenergia',
    status: 'Em andamento',
    region: 'Sudeste'
  },
  {
    id: 'pol1',
    type: 'policy',
    name: 'Decreto 12.044 - Estratégia Nacional de Bioeconomia',
    coordinates: { lat: -15.799, lng: -47.864 },
    description: 'Marco legal para o desenvolvimento da bioeconomia no Brasil',
    region: 'Nacional'
  },
  {
    id: 'pol2',
    type: 'policy',
    name: 'Política Estadual de Bioeconomia do Amazonas',
    coordinates: { lat: -3.120, lng: -60.021 },
    description: 'Estímulo à economia de base florestal e conhecimentos tradicionais',
    region: 'Norte'
  },
  {
    id: 'f1',
    type: 'finance',
    name: 'BNDES Fundo Clima',
    coordinates: { lat: -22.970, lng: -43.182 },
    description: 'Financiamentos para projetos de mitigação e adaptação às mudanças climáticas',
    amount: 'R$ 500 milhões',
    region: 'Nacional'
  },
  {
    id: 'f2',
    type: 'finance',
    name: 'Fundo Amazônia',
    coordinates: { lat: -1.455, lng: -48.503 },
    description: 'Recursos para projetos de prevenção e combate ao desmatamento na Amazônia',
    amount: 'R$ 3.4 bilhões',
    region: 'Norte'
  }
];

// Brazilian regions for filtering
export const brazilRegions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul', 'Nacional'];
