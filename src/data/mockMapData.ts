
import { MapPoint } from "@/types/mapTypes";

export const mockMapData: MapPoint[] = [
  {
    id: "1",
    type: "project",
    name: "Projeto Açaí Sustentável",
    coordinates: { lat: -3.1, lng: -60.0 },
    description: "Cultivo sustentável de açaí para exportação com certificação orgânica.",
    status: "Em andamento",
    region: "Norte"
  },
  {
    id: "2",
    type: "policy",
    name: "Conservação do Pantanal",
    coordinates: { lat: -18.9, lng: -56.9 },
    description: "Política de conservação das áreas úmidas do Pantanal.",
    status: "Ativo",
    region: "Centro-Oeste"
  },
  {
    id: "3",
    type: "finance",
    name: "Crédito Verde para Pequenos Produtores",
    coordinates: { lat: -10.9, lng: -37.1 },
    description: "Linha de financiamento para agricultura familiar sustentável.",
    amount: "R$ 50 milhões",
    region: "Nordeste"
  },
  {
    id: "4",
    type: "project",
    name: "Reflorestamento Serra do Mar",
    coordinates: { lat: -23.4, lng: -46.5 },
    description: "Projeto de restauração florestal na Mata Atlântica.",
    status: "Em planejamento",
    region: "Sudeste"
  },
  {
    id: "5",
    type: "policy",
    name: "Imposto Verde Florestal",
    coordinates: { lat: -25.4, lng: -49.2 },
    description: "Política fiscal para incentivo à preservação florestal.",
    status: "Em implementação",
    region: "Sul"
  },
  {
    id: "6",
    type: "project",
    name: "Bioeconomia Amazônica",
    coordinates: { lat: -2.5, lng: -65.0 },
    description: "Desenvolvimento de cadeias produtivas sustentáveis na Amazônia.",
    status: "Ativo",
    region: "Norte"
  },
  {
    id: "7",
    type: "finance",
    name: "Fundo Carbono Cerrado",
    coordinates: { lat: -15.8, lng: -47.9 },
    description: "Financiamento para projetos de redução de emissões no Cerrado.",
    amount: "R$ 120 milhões",
    region: "Centro-Oeste"
  },
  {
    id: "8",
    type: "bioindustry",
    name: "Polo de Bioindustrialização do Maranhão",
    coordinates: { lat: -4.3, lng: -45.1 },
    description: "Centro de processamento de biomassa para produção de biocombustíveis.",
    sector: "Energia",
    region: "Nordeste"
  },
  {
    id: "9",
    type: "agriculture",
    name: "Sistemas Agroflorestais em São Paulo",
    coordinates: { lat: -22.2, lng: -48.8 },
    description: "Implementação de SAFs para recuperação de áreas degradadas.",
    sector: "Agricultura",
    region: "Sudeste"
  },
  {
    id: "10",
    type: "forestry",
    name: "Manejo Florestal Sustentável em Rondônia",
    coordinates: { lat: -9.1, lng: -63.1 },
    description: "Projeto de extração madeireira com baixo impacto.",
    sector: "Florestal",
    region: "Norte"
  },
  {
    id: "11",
    type: "decarbonization",
    name: "Hidrogênio Verde Ceará",
    coordinates: { lat: -3.7, lng: -38.5 },
    description: "Usina de produção de hidrogênio verde para exportação.",
    sector: "Energia",
    region: "Nordeste"
  },
  {
    id: "12",
    type: "inclusion",
    name: "Mulheres Extrativistas do Acre",
    coordinates: { lat: -9.9, lng: -67.8 },
    description: "Cooperativa de mulheres para coleta e beneficiamento de produtos da floresta.",
    sector: "Social",
    region: "Norte"
  },
  {
    id: "13",
    type: "agroforestry",
    name: "Café Sombreado da Mata Atlântica",
    coordinates: { lat: -20.3, lng: -41.1 },
    description: "Produção de café de alta qualidade em sistemas agroflorestais.",
    sector: "Agricultura",
    region: "Sudeste"
  }
];

// Legacy export name for backward compatibility
export const mockMapPoints = mockMapData;
