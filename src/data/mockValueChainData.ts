
import { Actor, ProductOffering, GeoMarketingData, MarketplaceTransaction } from '@/types/valueChainTypes';

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

export const mockProductOfferings: ProductOffering[] = [
  {
    id: "p1",
    name: "Mel Orgânico",
    category: "Produtos Florestais Não-Madeireiros",
    description: "Mel orgânico produzido por abelhas nativas em sistemas agroflorestais da Amazônia. Rico em nutrientes e com sabor único da flora local.",
    quantity: 500,
    unit: "kg",
    price: 35,
    available: true,
    images: ["https://images.unsplash.com/photo-1587049352851-8d4e89133924"],
    certifications: ["Orgânico", "Comércio Justo"],
    harvestDate: "2024-05-15",
    expirationDate: "2025-05-15",
    sustainable_practices: ["Manejo sustentável", "Preservação de polinizadores", "Sistemas agroflorestais"],
    co2_avoided: 150
  },
  {
    id: "p3",
    name: "Óleo Essencial de Copaíba",
    category: "Óleos Essenciais",
    description: "Óleo essencial de copaíba 100% puro, extraído de forma sustentável de árvores nativas da Amazônia. Utilizado para fins medicinais e cosméticos.",
    quantity: 200,
    unit: "L",
    price: 120,
    available: true,
    images: ["https://images.unsplash.com/photo-1617952431087-4ea1829e4e05"],
    certifications: ["Certificação Florestal"],
    harvestDate: "2024-04-10",
    expirationDate: "2026-04-10",
    sustainable_practices: ["Extração tradicional", "Sem derrubada de árvores", "Manejo de baixo impacto"],
    co2_avoided: 300
  },
  {
    id: "p5",
    name: "Castanha-do-Brasil",
    category: "Produtos Florestais Não-Madeireiros",
    description: "Castanha-do-Brasil de alta qualidade, coletada em reserva extrativista do Acre por comunidades tradicionais. Rica em selênio e ômega-3.",
    quantity: 5000,
    unit: "kg",
    price: 18,
    available: true,
    images: ["https://images.unsplash.com/photo-1587049352847-de8e5e973666"],
    certifications: ["Orgânico"],
    harvestDate: "2024-02-10",
    expirationDate: "2024-12-10",
    sustainable_practices: ["Extrativismo sustentável", "Coleta manual", "Apoio às comunidades locais"],
    co2_avoided: 500
  },
  {
    id: "p7",
    name: "Madeira Certificada",
    category: "Madeira",
    description: "Madeira de manejo florestal sustentável com certificação FSC. Diversas espécies disponíveis para construção civil, móveis e outros usos.",
    quantity: 200,
    unit: "m³",
    price: 1800,
    available: true,
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88"],
    certifications: ["FSC"],
    harvestDate: "2024-01-20",
    sustainable_practices: ["Manejo florestal sustentável", "Inventário florestal", "Corte seletivo", "Replantio"],
    co2_avoided: 1200
  },
  {
    id: "p8",
    name: "Baru",
    category: "Produtos Florestais Não-Madeireiros",
    description: "Castanha de baru torrada, rica em proteínas e colhida no Cerrado brasileiro. Sabor diferenciado, ideal para consumo direto ou em preparações culinárias.",
    quantity: 1500,
    unit: "kg",
    price: 65,
    available: true,
    images: ["https://images.unsplash.com/photo-1599321329467-80d1cf266633"],
    certifications: ["Orgânico"],
    harvestDate: "2024-05-01",
    expirationDate: "2025-05-01",
    sustainable_practices: ["Coleta sustentável", "Conservação do Cerrado", "Processamento local"],
    co2_avoided: 850
  },
  {
    id: "p10",
    name: "Embalagens Biodegradáveis",
    category: "Bioplásticos",
    description: "Embalagens 100% biodegradáveis feitas de amido de mandioca. Ideais para alimentos, compostáveis em até 180 dias.",
    quantity: 50000,
    unit: "unidades",
    price: 0.8,
    available: true,
    images: ["https://images.unsplash.com/photo-1603200101667-0304b4f7c7e3"],
    certifications: ["Selo Verde", "Compostável"],
    harvestDate: "2024-06-10",
    sustainable_practices: ["Zero plástico", "Matéria-prima renovável", "Compostável"],
    co2_avoided: 2500
  },
  {
    id: "p11",
    name: "Açúcar Mascavo Orgânico",
    category: "Alimentos Processados",
    description: "Açúcar mascavo produzido de forma orgânica por pequenos produtores de cana-de-açúcar. Processamento artesanal que preserva nutrientes.",
    quantity: 3000,
    unit: "kg",
    price: 15,
    available: true,
    images: ["https://images.unsplash.com/photo-1564260710476-166adbbcb7f6"],
    certifications: ["Orgânico", "Agricultura Familiar"],
    harvestDate: "2024-05-20",
    expirationDate: "2025-05-20",
    sustainable_practices: ["Agricultura orgânica", "Rotação de culturas", "Processamento tradicional"],
    co2_avoided: 400
  },
  {
    id: "p12",
    name: "Farinha de Babaçu",
    category: "Alimentos Processados",
    description: "Farinha de mesocarpo de babaçu, rica em fibras e nutrientes. Produzida por quebradeiras de coco tradicionais do Maranhão.",
    quantity: 800,
    unit: "kg",
    price: 25,
    available: true,
    images: ["https://images.unsplash.com/photo-1590080650262-9e591da6c3a0"],
    certifications: ["Selo Indígena", "Orgânico"],
    harvestDate: "2024-04-05",
    expirationDate: "2025-04-05",
    sustainable_practices: ["Extrativismo tradicional", "Empoderamento feminino", "Conhecimento tradicional"],
    co2_avoided: 320
  }
];

export const mockGeoMarketingData: GeoMarketingData[] = [
  {
    id: "gm1",
    productCategory: "Produtos Florestais Não-Madeireiros",
    region: "Norte",
    supplyVolume: 8500,
    demandVolume: 12000,
    averagePrice: 30,
    unit: "kg",
    coordinates: {
      lat: -3.10,
      lng: -60.00
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 15
    }
  },
  {
    id: "gm2",
    productCategory: "Óleos Essenciais",
    region: "Norte",
    supplyVolume: 1200,
    demandVolume: 3500,
    averagePrice: 95,
    unit: "L",
    coordinates: {
      lat: -2.50,
      lng: -54.70
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 22
    }
  },
  {
    id: "gm3",
    productCategory: "Madeira",
    region: "Norte",
    supplyVolume: 4500,
    demandVolume: 6200,
    averagePrice: 1500,
    unit: "m³",
    coordinates: {
      lat: -8.76,
      lng: -63.90
    },
    period: "Junho 2024",
    trends: {
      direction: "stable",
      percentage: 3
    }
  },
  {
    id: "gm4",
    productCategory: "Produtos Florestais Não-Madeireiros",
    region: "Centro-Oeste",
    supplyVolume: 4200,
    demandVolume: 3800,
    averagePrice: 55,
    unit: "kg",
    coordinates: {
      lat: -14.13,
      lng: -47.51
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 10
    }
  },
  {
    id: "gm5",
    productCategory: "Bioplásticos",
    region: "Sudeste",
    supplyVolume: 120000,
    demandVolume: 180000,
    averagePrice: 0.9,
    unit: "unidades",
    coordinates: {
      lat: -22.90,
      lng: -47.06
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 35
    }
  },
  {
    id: "gm6",
    productCategory: "Alimentos Processados",
    region: "Nordeste",
    supplyVolume: 5500,
    demandVolume: 7800,
    averagePrice: 22,
    unit: "kg",
    coordinates: {
      lat: -5.20,
      lng: -45.38
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 18
    }
  },
  {
    id: "gm7",
    productCategory: "Cosmético Natural",
    region: "Sudeste",
    supplyVolume: 1800,
    demandVolume: 4500,
    averagePrice: 75,
    unit: "kg",
    coordinates: {
      lat: -23.55,
      lng: -46.63
    },
    period: "Junho 2024",
    trends: {
      direction: "up",
      percentage: 28
    }
  }
];

export const mockMarketplaceTransactions: MarketplaceTransaction[] = [
  {
    id: "tx1",
    productOffering: "p1",
    seller: "1",
    buyer: "",
    initialPrice: 35,
    quantity: 50,
    status: "Disponível",
    createdAt: "2024-06-10T10:30:00Z",
    updatedAt: "2024-06-10T10:30:00Z"
  },
  {
    id: "tx2",
    productOffering: "p3",
    seller: "2",
    buyer: "6",
    initialPrice: 120,
    finalPrice: 115,
    quantity: 20,
    status: "Vendido",
    createdAt: "2024-06-05T14:20:00Z",
    updatedAt: "2024-06-07T09:45:00Z",
    completedAt: "2024-06-07T09:45:00Z",
    traceabilityCode: "TX2207090945"
  },
  {
    id: "tx3",
    productOffering: "p5",
    seller: "3",
    buyer: "",
    initialPrice: 18,
    quantity: 500,
    status: "Em negociação",
    createdAt: "2024-06-08T11:15:00Z",
    updatedAt: "2024-06-09T16:30:00Z"
  },
  {
    id: "tx4",
    productOffering: "p7",
    seller: "4",
    buyer: "",
    initialPrice: 1800,
    quantity: 10,
    status: "Disponível",
    createdAt: "2024-06-01T09:20:00Z",
    updatedAt: "2024-06-01T09:20:00Z"
  },
  {
    id: "tx5",
    productOffering: "p8",
    seller: "5",
    buyer: "1",
    initialPrice: 65,
    finalPrice: 60,
    quantity: 100,
    status: "Vendido",
    createdAt: "2024-05-28T13:40:00Z",
    updatedAt: "2024-06-02T10:15:00Z",
    completedAt: "2024-06-02T10:15:00Z",
    traceabilityCode: "TX0206021015"
  }
];
