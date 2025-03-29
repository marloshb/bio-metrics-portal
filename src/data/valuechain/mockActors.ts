
import { Actor } from '@/types/valueChainTypes';

export const mockActors: Actor[] = [
  {
    id: "1",
    name: "Cooperativa Verde Amazônia",
    type: "Cooperativa",
    location: {
      state: "PA",
      city: "Belém",
      coordinates: {
        lat: -1.45,
        lng: -48.5
      }
    },
    products: [
      {
        id: "p1",
        name: "Mel Orgânico",
        category: "Produtos Florestais Não-Madeireiros",
        description: "Mel orgânico produzido por abelhas nativas em sistemas agroflorestais",
        quantity: 500,
        unit: "kg",
        price: 35,
        available: true,
        certifications: ["Orgânico", "Comércio Justo"],
        harvestDate: "2024-05-15"
      },
      {
        id: "p2",
        name: "Polpa de Açaí",
        category: "Produtos Florestais Não-Madeireiros",
        description: "Polpa de açaí congelada, colhida por comunidades tradicionais",
        quantity: 1200,
        unit: "kg",
        price: 25,
        available: true,
        harvestDate: "2024-06-02"
      }
    ],
    productionCapacity: "2 toneladas/ano de mel, 15 toneladas/ano de açaí",
    certifications: ["Orgânico", "Comércio Justo", "Certificação Florestal"],
    contact: {
      email: "contato@coopveramazonia.org",
      phone: "+55 91 98765-4321",
      website: "www.coopveramazonia.org"
    },
    description: "Cooperativa de produtores da agricultura familiar que trabalha com diversos produtos florestais não-madeireiros na região amazônica, com foco em sustentabilidade e comércio justo.",
    profileImage: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2024-06-10T14:45:00Z"
  },
  {
    id: "2",
    name: "Agroflora Bioindústria",
    type: "Indústria",
    location: {
      state: "AM",
      city: "Manaus",
      coordinates: {
        lat: -3.1,
        lng: -60.0
      }
    },
    products: [
      {
        id: "p3",
        name: "Óleo Essencial de Copaíba",
        category: "Óleos Essenciais",
        description: "Óleo essencial de copaíba 100% puro, extraído de forma sustentável",
        quantity: 200,
        unit: "L",
        price: 120,
        available: true,
        certifications: ["Certificação Florestal"],
        harvestDate: "2024-04-10"
      },
      {
        id: "p4",
        name: "Manteiga de Cupuaçu",
        category: "Cosmético Natural",
        description: "Manteiga de cupuaçu pura para uso cosmético",
        quantity: 300,
        unit: "kg",
        price: 85,
        available: true,
        harvestDate: "2024-03-20"
      }
    ],
    certifications: ["ISO 9001", "Certificação Florestal"],
    contact: {
      email: "comercial@agroflorabio.com.br",
      phone: "+55 92 3456-7890",
      website: "www.agroflorabio.com.br"
    },
    description: "Bioindústria especializada em processar e comercializar produtos amazônicos de alto valor agregado para os mercados de cosmética e farmacêutica, com compromisso com a sustentabilidade.",
    createdAt: "2023-05-20T09:15:00Z",
    updatedAt: "2024-05-25T11:20:00Z"
  },
  {
    id: "3",
    name: "Comunidade São Francisco",
    type: "Produtor",
    location: {
      state: "AC",
      city: "Xapuri",
      coordinates: {
        lat: -10.65,
        lng: -68.5
      }
    },
    products: [
      {
        id: "p5",
        name: "Castanha-do-Brasil",
        category: "Produtos Florestais Não-Madeireiros",
        description: "Castanha-do-Brasil de alta qualidade, coletada em reserva extrativista",
        quantity: 5000,
        unit: "kg",
        price: 18,
        available: true,
        certifications: ["Orgânico"],
        harvestDate: "2024-02-10"
      },
      {
        id: "p6",
        name: "Látex Natural",
        category: "Produtos Florestais Não-Madeireiros",
        description: "Látex extraído de seringueiras nativas",
        quantity: 800,
        unit: "L",
        price: 40,
        available: true,
        harvestDate: "2024-04-15"
      }
    ],
    productionCapacity: "8 toneladas/ano de castanha, 1,5 tonelada/ano de látex",
    contact: {
      email: "comunidadesaofrancisco@gmail.com",
      phone: "+55 68 98765-4321"
    },
    description: "Comunidade tradicional de seringueiros que pratica extrativismo sustentável na floresta amazônica, mantendo as tradições seringalistas e coletando produtos florestais não-madeireiros.",
    createdAt: "2023-11-05T08:30:00Z",
    updatedAt: "2024-05-12T10:45:00Z"
  },
  {
    id: "4",
    name: "BioMadeiras Sustentáveis",
    type: "Produtor",
    location: {
      state: "RO",
      city: "Porto Velho",
      coordinates: {
        lat: -8.76,
        lng: -63.9
      }
    },
    products: [
      {
        id: "p7",
        name: "Madeira Certificada",
        category: "Madeira",
        description: "Madeira de manejo florestal sustentável com certificação FSC",
        quantity: 200,
        unit: "m³",
        price: 1800,
        available: true,
        certifications: ["FSC"],
        harvestDate: "2024-01-20"
      }
    ],
    productionCapacity: "1000 m³/ano",
    certifications: ["FSC", "Madeira Legal"],
    contact: {
      email: "comercial@biomadeiras.com.br",
      phone: "+55 69 3456-7890",
      website: "www.biomadeiras.com.br"
    },
    description: "Empresa especializada em manejo florestal de baixo impacto e produção de madeira certificada para diversos fins, garantindo rastreabilidade e origem legal.",
    createdAt: "2023-03-10T14:20:00Z",
    updatedAt: "2024-04-05T09:30:00Z"
  },
  {
    id: "5",
    name: "Rede de Agricultores do Cerrado",
    type: "Cooperativa",
    location: {
      state: "GO",
      city: "Alto Paraíso",
      coordinates: {
        lat: -14.13,
        lng: -47.51
      }
    },
    products: [
      {
        id: "p8",
        name: "Baru",
        category: "Produtos Florestais Não-Madeireiros",
        description: "Castanha de baru torrada, rica em proteínas e colhida no Cerrado",
        quantity: 1500,
        unit: "kg",
        price: 65,
        available: true,
        certifications: ["Orgânico"],
        harvestDate: "2024-05-01"
      },
      {
        id: "p9",
        name: "Pequi em Conserva",
        category: "Alimentos Processados",
        description: "Pequi em conserva produzido artesanalmente",
        quantity: 800,
        unit: "kg",
        price: 38,
        available: true,
        harvestDate: "2024-03-15"
      }
    ],
    productionCapacity: "3 toneladas/ano de baru, 2 toneladas/ano de pequi",
    certifications: ["Orgânico"],
    contact: {
      email: "contato@redeagricerrado.org.br",
      phone: "+55 62 98765-4321",
      website: "www.redeagricerrado.org.br"
    },
    description: "Cooperativa de agricultores familiares e agroextrativistas do Cerrado que trabalha na coleta e processamento de frutas nativas, promovendo a conservação do bioma através do uso sustentável.",
    createdAt: "2023-07-18T11:40:00Z",
    updatedAt: "2024-06-02T15:15:00Z"
  },
  {
    id: "6",
    name: "BioPlásticos Verdes S.A.",
    type: "Indústria",
    location: {
      state: "SP",
      city: "Campinas",
      coordinates: {
        lat: -22.9,
        lng: -47.06
      }
    },
    products: [
      {
        id: "p10",
        name: "Embalagens Biodegradáveis",
        category: "Bioplásticos",
        description: "Embalagens 100% biodegradáveis feitas de amido de mandioca",
        quantity: 50000,
        unit: "unidades",
        price: 0.8,
        available: true,
        certifications: ["Selo Verde", "Compostável"],
        harvestDate: "2024-06-10"
      }
    ],
    certifications: ["ISO 14001", "Selo Verde", "Compostável"],
    contact: {
      email: "contato@bioplasticosverdes.com.br",
      phone: "+55 19 3456-7890",
      website: "www.bioplasticosverdes.com.br"
    },
    description: "Indústria de bioplásticos que desenvolve e produz embalagens sustentáveis a partir de matérias-primas renováveis, oferecendo alternativas aos plásticos convencionais.",
    createdAt: "2022-12-05T10:20:00Z",
    updatedAt: "2024-05-30T09:10:00Z"
  }
];
