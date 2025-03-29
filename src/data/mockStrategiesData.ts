
import { BioeconomicAction, BiodiversityActivity, SocialEnvironmentalAction } from '@/types/strategiesTypes';

export const mockBioeconomicActions: BioeconomicAction[] = [
  {
    id: "1",
    title: "Restauração de Matas Ciliares no Cerrado",
    description: "Projeto de restauração de 100 hectares de matas ciliares em áreas degradadas do Cerrado, utilizando espécies nativas e SAFs.",
    currentStage: "Fazer",
    status: "Em andamento",
    progress: 40,
    startDate: "2024-01-15",
    endDate: "2026-01-15",
    region: "Centro-Oeste",
    state: "GO",
    municipality: "Goiânia",
    budget: 1000000,
    responsibleEntity: "Secretaria Estadual de Meio Ambiente",
    responsiblePerson: "Ana Silva",
    contact: "ana.silva@meioambiente.gov.br",
    targets: [
      {
        id: "t1",
        description: "Área restaurada",
        unit: "hectares",
        value: 100,
        deadline: "2026-01-15",
        progress: 40
      },
      {
        id: "t2",
        description: "Mudas plantadas",
        unit: "unidades",
        value: 50000,
        deadline: "2025-06-15",
        progress: 45
      }
    ],
    activities: [
      {
        id: "a1",
        description: "Preparação do solo",
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        status: "Concluída",
        progress: 100,
        evidences: [
          {
            id: "e1",
            type: "Foto",
            title: "Áreas preparadas",
            description: "Fotos das áreas após preparação do solo",
            fileUrl: "/images/solo-preparado.jpg",
            uploadDate: "2024-03-20"
          }
        ]
      },
      {
        id: "a2",
        description: "Plantio de mudas",
        startDate: "2024-03-20",
        endDate: "2024-08-30",
        status: "Em andamento",
        progress: 60,
        evidences: [
          {
            id: "e2",
            type: "Relatório",
            title: "Relatório parcial de plantio",
            description: "Documento com detalhes do progresso do plantio",
            fileUrl: "/docs/relatorio-plantio.pdf",
            uploadDate: "2024-06-15"
          }
        ]
      }
    ],
    indicators: [
      {
        id: "i1",
        name: "Área restaurada",
        unit: "hectares",
        target: 100,
        current: 40,
        progress: 40,
        lastUpdated: "2024-06-20",
        category: "Ambiental"
      },
      {
        id: "i2",
        name: "CO2 sequestrado",
        unit: "toneladas",
        target: 500,
        current: 150,
        progress: 30,
        lastUpdated: "2024-06-20",
        category: "Ambiental"
      },
      {
        id: "i3",
        name: "Famílias beneficiadas",
        unit: "famílias",
        target: 50,
        current: 35,
        progress: 70,
        lastUpdated: "2024-06-20",
        category: "Social"
      }
    ],
    suggestions: [
      {
        id: "s1",
        content: "Ajustar sistema de irrigação para aumentar taxa de sobrevivência das mudas",
        category: "Ajuste",
        createdAt: "2024-06-18",
        applied: false
      },
      {
        id: "s2",
        content: "Aumentar envolvimento de comunidades locais no monitoramento",
        category: "Melhoria",
        createdAt: "2024-06-10",
        applied: true,
        appliedAt: "2024-06-15"
      }
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-06-21"
  },
  {
    id: "2",
    title: "Manejo Sustentável de Castanhais na Amazônia",
    description: "Implementação de práticas de manejo sustentável em castanhais nativos da Amazônia, envolvendo comunidades tradicionais.",
    currentStage: "Checar",
    status: "Em andamento",
    progress: 65,
    startDate: "2023-08-10",
    endDate: "2025-08-10",
    region: "Norte",
    state: "PA",
    municipality: "Altamira",
    budget: 750000,
    responsibleEntity: "Instituto Floresta Viva",
    responsiblePerson: "João Pereira",
    contact: "joao@florestava.org",
    targets: [
      {
        id: "t3",
        description: "Área sob manejo sustentável",
        unit: "hectares",
        value: 500,
        deadline: "2025-08-10",
        progress: 70
      },
      {
        id: "t4",
        description: "Produção de castanha",
        unit: "toneladas/ano",
        value: 50,
        deadline: "2025-02-28",
        progress: 60
      }
    ],
    activities: [
      {
        id: "a3",
        description: "Mapeamento dos castanhais",
        startDate: "2023-08-10",
        endDate: "2023-11-30",
        status: "Concluída",
        progress: 100,
        evidences: [
          {
            id: "e3",
            type: "Relatório",
            title: "Mapa dos castanhais",
            description: "Mapeamento georreferenciado dos castanhais da região",
            fileUrl: "/docs/mapa-castanhais.pdf",
            uploadDate: "2023-12-05"
          }
        ]
      },
      {
        id: "a4",
        description: "Capacitação das comunidades",
        startDate: "2023-12-10",
        endDate: "2024-03-15",
        status: "Concluída",
        progress: 100,
        evidences: [
          {
            id: "e4",
            type: "Foto",
            title: "Oficinas de capacitação",
            description: "Registros das oficinas realizadas com as comunidades",
            fileUrl: "/images/oficinas.jpg",
            uploadDate: "2024-03-20"
          }
        ]
      },
      {
        id: "a5",
        description: "Implementação do manejo",
        startDate: "2024-03-20",
        endDate: "2025-06-30",
        status: "Em andamento",
        progress: 50,
        notes: "Processo iniciado com 10 comunidades"
      }
    ],
    indicators: [
      {
        id: "i4",
        name: "Produção de castanha",
        unit: "toneladas",
        target: 50,
        current: 30,
        progress: 60,
        lastUpdated: "2024-06-15",
        category: "Econômico"
      },
      {
        id: "i5",
        name: "Renda gerada",
        unit: "R$",
        target: 500000,
        current: 280000,
        progress: 56,
        lastUpdated: "2024-06-15",
        category: "Econômico"
      },
      {
        id: "i6",
        name: "Famílias envolvidas",
        unit: "famílias",
        target: 100,
        current: 80,
        progress: 80,
        lastUpdated: "2024-06-15",
        category: "Social"
      }
    ],
    suggestions: [
      {
        id: "s3",
        content: "Implementar sistema de rastreabilidade para a castanha",
        category: "Melhoria",
        createdAt: "2024-05-20",
        applied: false
      }
    ],
    createdAt: "2023-07-15",
    updatedAt: "2024-06-15"
  },
  {
    id: "3",
    title: "Cultivo Biointensivo de Plantas Medicinais na Caatinga",
    description: "Promoção do cultivo sustentável de plantas medicinais nativas na Caatinga com comunidades rurais.",
    currentStage: "Planejar",
    status: "Não iniciada",
    progress: 15,
    startDate: "2024-08-01",
    endDate: "2026-07-31",
    region: "Nordeste",
    state: "CE",
    municipality: "Quixadá",
    budget: 350000,
    responsibleEntity: "Associação Plantas do Sertão",
    responsiblePerson: "Maria Lúcia Santos",
    contact: "maria@plantasdosertao.org.br",
    targets: [
      {
        id: "t5",
        description: "Área cultivada",
        unit: "hectares",
        value: 20,
        deadline: "2026-07-31",
        progress: 0
      },
      {
        id: "t6",
        description: "Produção de fitoterápicos",
        unit: "kg/ano",
        value: 500,
        deadline: "2026-07-31",
        progress: 0
      }
    ],
    activities: [
      {
        id: "a6",
        description: "Elaboração do plano de cultivo",
        startDate: "2024-08-01",
        endDate: "2024-10-31",
        status: "Pendente",
        progress: 0
      }
    ],
    indicators: [
      {
        id: "i7",
        name: "Famílias participantes",
        unit: "famílias",
        target: 30,
        current: 0,
        progress: 0,
        lastUpdated: "2024-06-20",
        category: "Social"
      }
    ],
    suggestions: [],
    createdAt: "2024-06-01",
    updatedAt: "2024-06-20"
  }
];

export const mockBiodiversityActivities: BiodiversityActivity[] = [
  {
    id: "1",
    name: "Produção de Biofertilizantes a partir de Resíduos Orgânicos",
    description: "Processamento de resíduos orgânicos agrícolas para produção de biofertilizantes comerciais.",
    sector: "Agricultura",
    region: "Nordeste",
    state: "PE",
    municipality: "Petrolina",
    coordinates: {
      lat: -9.3894,
      lng: -40.5021
    },
    localResources: ["Resíduos agrícolas", "Esterco bovino", "Microorganismos nativos"],
    targetMarkets: ["Agricultura familiar", "Produção orgânica", "Fruticultura irrigada"],
    startDate: "2023-11-15",
    implementationProgress: 50,
    economicImpact: {
      salesTarget: 500000,
      currentSales: 250000,
      jobsTarget: 20,
      currentJobs: 12
    },
    environmentalImpact: {
      co2ReductionTarget: 300,
      currentCo2Reduction: 140,
      areaRestoredTarget: 0,
      currentAreaRestored: 0
    },
    createdAt: "2023-10-01",
    updatedAt: "2024-06-15"
  },
  {
    id: "2",
    name: "Cosméticos Naturais da Amazônia",
    description: "Desenvolvimento e produção de cosméticos naturais a partir de óleos essenciais e extratos da biodiversidade amazônica.",
    sector: "Cosmético",
    region: "Norte",
    state: "AM",
    municipality: "Manaus",
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    localResources: ["Andiroba", "Copaíba", "Açaí", "Castanha-do-brasil"],
    targetMarkets: ["Mercado nacional", "Exportação", "Lojas especializadas"],
    startDate: "2023-06-10",
    implementationProgress: 75,
    economicImpact: {
      salesTarget: 2000000,
      currentSales: 1200000,
      jobsTarget: 50,
      currentJobs: 35
    },
    environmentalImpact: {
      areaRestoredTarget: 500,
      currentAreaRestored: 350
    },
    createdAt: "2023-05-01",
    updatedAt: "2024-06-10"
  },
  {
    id: "3",
    name: "Bioenergia de Resíduos da Cana-de-açúcar",
    description: "Aproveitamento de resíduos da cana-de-açúcar para produção de bioenergia e biogás.",
    sector: "Bioenergia",
    region: "Sudeste",
    state: "SP",
    municipality: "Ribeirão Preto",
    coordinates: {
      lat: -21.1699,
      lng: -47.8099
    },
    localResources: ["Bagaço de cana", "Palha de cana", "Vinhaça"],
    targetMarkets: ["Usinas de açúcar e álcool", "Rede elétrica", "Indústrias locais"],
    startDate: "2023-04-15",
    implementationProgress: 85,
    economicImpact: {
      salesTarget: 5000000,
      currentSales: 4200000,
      jobsTarget: 60,
      currentJobs: 55
    },
    environmentalImpact: {
      co2ReductionTarget: 10000,
      currentCo2Reduction: 8500
    },
    createdAt: "2023-03-01",
    updatedAt: "2024-06-05"
  },
  {
    id: "4",
    name: "Produtos Alimentícios do Cerrado",
    description: "Beneficiamento e comercialização de frutos nativos do Cerrado para produção de alimentos.",
    sector: "Alimentos",
    region: "Centro-Oeste",
    state: "GO",
    municipality: "Pirenópolis",
    coordinates: {
      lat: -15.8505,
      lng: -48.9590
    },
    localResources: ["Pequi", "Baru", "Buriti", "Cagaita"],
    targetMarkets: ["Supermercados", "Restaurantes", "Exportação"],
    startDate: "2023-08-20",
    implementationProgress: 60,
    economicImpact: {
      salesTarget: 800000,
      currentSales: 450000,
      jobsTarget: 30,
      currentJobs: 22
    },
    environmentalImpact: {
      areaRestoredTarget: 200,
      currentAreaRestored: 120
    },
    createdAt: "2023-07-10",
    updatedAt: "2024-06-01"
  }
];

export const mockSocialEnvironmentalActions: SocialEnvironmentalAction[] = [
  {
    id: "1",
    title: "Sistemas Agroflorestais com Famílias do Mato Grosso",
    description: "Implementação de SAFs em áreas degradadas, envolvendo famílias locais na produção sustentável.",
    region: "Centro-Oeste",
    state: "MT",
    municipality: "Alta Floresta",
    coordinates: {
      lat: -9.8756,
      lng: -56.0861
    },
    status: "Implementação",
    startDate: "2023-09-15",
    socialImpact: {
      familiesTarget: 200,
      currentFamiliesInvolved: 150,
      womenPercentage: 60,
      youthPercentage: 40,
      averageIncomeIncrease: 35
    },
    environmentalImpact: {
      areaTarget: 200,
      currentAreaRestored: 150,
      nativeSpeciesUsed: ["Jatobá", "Ipê", "Mogno", "Castanheira", "Açaí"],
      biodiversityConservation: "Criação de corredores ecológicos entre fragmentos florestais"
    },
    partnerships: [
      {
        name: "Instituto Floresta Viva",
        type: "ONG",
        contribution: "Apoio técnico e capacitação"
      },
      {
        name: "Prefeitura de Alta Floresta",
        type: "Público",
        contribution: "Apoio logístico e infraestrutura"
      },
      {
        name: "Cooperativa dos Produtores Florestais",
        type: "Comunidade",
        contribution: "Mobilização e organização comunitária"
      }
    ],
    createdAt: "2023-08-01",
    updatedAt: "2024-06-20"
  },
  {
    id: "2",
    title: "Manejo Comunitário de Pesca na Amazônia",
    description: "Implementação de práticas de pesca sustentável com comunidades ribeirinhas, com foco na conservação de espécies nativas.",
    region: "Norte",
    state: "AM",
    municipality: "Tefé",
    coordinates: {
      lat: -3.3684,
      lng: -64.7068
    },
    status: "Implementação",
    startDate: "2023-05-10",
    socialImpact: {
      familiesTarget: 150,
      currentFamiliesInvolved: 120,
      womenPercentage: 45,
      indigenousPercentage: 60,
      averageIncomeIncrease: 25
    },
    environmentalImpact: {
      areaTarget: 5000,
      currentAreaRestored: 5000,
      nativeSpeciesUsed: ["Pirarucu", "Tambaqui", "Jaraqui"],
      biodiversityConservation: "Proteção de áreas de reprodução e manejo de lagos"
    },
    partnerships: [
      {
        name: "Instituto Mamirauá",
        type: "ONG",
        contribution: "Pesquisa e capacitação técnica"
      },
      {
        name: "Associação de Pescadores",
        type: "Comunidade",
        contribution: "Implementação e monitoramento"
      }
    ],
    createdAt: "2023-04-01",
    updatedAt: "2024-06-15"
  },
  {
    id: "3",
    title: "Recuperação de Matas Ciliares com Comunidades Tradicionais",
    description: "Restauração de matas ciliares em áreas degradadas, utilizando conhecimentos tradicionais e envolvendo comunidades locais.",
    region: "Sudeste",
    state: "MG",
    municipality: "Araçuaí",
    coordinates: {
      lat: -16.8531,
      lng: -42.0689
    },
    status: "Planejamento",
    startDate: "2024-09-01",
    socialImpact: {
      familiesTarget: 100,
      currentFamiliesInvolved: 0,
      womenPercentage: 50,
      youthPercentage: 30
    },
    environmentalImpact: {
      areaTarget: 50,
      currentAreaRestored: 0,
      nativeSpeciesUsed: ["Aroeira", "Ipê-amarelo", "Jatobá", "Angico"]
    },
    partnerships: [
      {
        name: "Universidade Federal de Minas Gerais",
        type: "Público",
        contribution: "Pesquisa e monitoramento"
      },
      {
        name: "Fundação Pró-Natureza",
        type: "ONG",
        contribution: "Financiamento e apoio técnico"
      }
    ],
    createdAt: "2024-06-01",
    updatedAt: "2024-06-20"
  }
];
