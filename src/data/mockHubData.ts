
import { Project, Policy, FinancialResource, StateStrategy } from '@/types/hubTypes';

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: "p001",
    name: "Projeto SAF no Pará",
    description: "Implementação de Sistemas Agroflorestais em áreas degradadas do Pará, integrando produção de açaí, cacau e espécies madeireiras nativas.",
    location: {
      state: "PA",
      city: "Belém",
      coordinates: {
        lat: -1.4558,
        lng: -48.5039
      }
    },
    estimatedValue: 2000000,
    sector: "Sistema Agroflorestal",
    objectives: [
      "Restaurar 100 hectares de áreas degradadas",
      "Gerar renda para 50 famílias locais",
      "Sequestrar 5000 toneladas de CO2 em 5 anos"
    ],
    status: "Em análise",
    startDate: "2024-08-01",
    contact: {
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      phone: "+55 91 98765-4321"
    },
    createdAt: "2024-06-15T14:30:00Z",
    updatedAt: "2024-06-15T14:30:00Z"
  },
  {
    id: "p002",
    name: "Biofábrica de Enzimas",
    description: "Instalação de uma biofábrica para produção de enzimas industriais a partir de resíduos agrícolas, utilizando biotecnologia avançada.",
    location: {
      state: "SP",
      city: "Campinas",
      coordinates: {
        lat: -22.9064,
        lng: -47.0616
      }
    },
    estimatedValue: 8500000,
    sector: "Bioindústria",
    objectives: [
      "Produzir enzimas para indústria de alimentos e biocombustíveis",
      "Reduzir custos de produção em 30%",
      "Aproveitar 2000 toneladas/ano de resíduos agrícolas"
    ],
    status: "Aprovado",
    startDate: "2024-09-15",
    endDate: "2026-09-15",
    contact: {
      name: "Ana Santos",
      email: "ana.santos@exemplo.com"
    },
    createdAt: "2024-05-20T10:15:00Z",
    updatedAt: "2024-06-10T16:45:00Z"
  },
  {
    id: "p003",
    name: "Cadeia do Buriti Sustentável",
    description: "Fortalecimento da cadeia produtiva do buriti no Maranhão, envolvendo comunidades tradicionais e promovendo práticas sustentáveis de coleta e beneficiamento.",
    location: {
      state: "MA",
      city: "Barreirinhas",
      coordinates: {
        lat: -2.7581,
        lng: -42.8317
      }
    },
    estimatedValue: 1200000,
    sector: "Extrativismo Sustentável",
    objectives: [
      "Capacitar 200 extrativistas em práticas sustentáveis",
      "Aumentar em 40% a renda das famílias envolvidas",
      "Certificar produtos com selo de origem sustentável"
    ],
    status: "Em andamento",
    startDate: "2024-03-10",
    endDate: "2025-12-31",
    contact: {
      name: "Maria Oliveira",
      email: "maria.oliveira@exemplo.com",
      phone: "+55 98 98765-1234"
    },
    createdAt: "2024-02-15T09:20:00Z",
    updatedAt: "2024-06-01T11:30:00Z"
  },
  {
    id: "p004",
    name: "Biodigestores para Pequenos Produtores",
    description: "Instalação de biodigestores em propriedades rurais familiares para geração de biogás a partir de resíduos orgânicos da produção animal.",
    location: {
      state: "SC",
      city: "Chapecó",
      coordinates: {
        lat: -27.1004,
        lng: -52.6152
      }
    },
    estimatedValue: 3500000,
    sector: "Bioenergia",
    objectives: [
      "Instalar 100 biodigestores em propriedades rurais",
      "Reduzir emissões de metano em 500 toneladas/ano",
      "Fornecer energia limpa para 100 famílias rurais"
    ],
    status: "Em andamento",
    startDate: "2024-01-20",
    endDate: "2025-06-30",
    contact: {
      name: "Carlos Pereira",
      email: "carlos.pereira@exemplo.com"
    },
    createdAt: "2023-12-10T15:45:00Z",
    updatedAt: "2024-05-22T10:30:00Z"
  },
  {
    id: "p005",
    name: "Bioinsumos da Caatinga",
    description: "Desenvolvimento de bioinsumos a partir da biodiversidade da Caatinga para uso em sistemas agrícolas do semiárido nordestino.",
    location: {
      state: "CE",
      city: "Quixadá",
      coordinates: {
        lat: -4.9676,
        lng: -39.0154
      }
    },
    estimatedValue: 1800000,
    sector: "Biotecnologia",
    objectives: [
      "Desenvolver 5 novos bioinsumos para agricultura",
      "Reduzir uso de insumos químicos em 30%",
      "Criar bancos de germoplasma com espécies nativas"
    ],
    status: "Aprovado",
    startDate: "2024-07-10",
    contact: {
      name: "Fernanda Costa",
      email: "fernanda.costa@exemplo.com",
      phone: "+55 85 99876-5432"
    },
    createdAt: "2024-05-05T13:20:00Z",
    updatedAt: "2024-06-12T09:15:00Z"
  }
];

// Mock policies data
export const mockPolicies: Policy[] = [
  {
    id: "pol001",
    title: "Incentivo Fiscal para Bioindústria",
    description: "Redução de ICMS para empresas que desenvolvem bioinsumos e produtos derivados de biomassa renovável.",
    type: "Incentivo Fiscal",
    applicableRegions: ["SP"],
    responsibleAgency: "Secretaria da Fazenda do Estado de São Paulo",
    validUntil: "2026-12-31",
    eligibilityCriteria: [
      "Empresas de bioeconomia com sede no estado",
      "Faturamento anual mínimo de R$ 500.000",
      "Comprovação de uso de matérias-primas sustentáveis"
    ],
    benefits: [
      "Redução de 7% na alíquota de ICMS",
      "Simplificação de processos de licenciamento"
    ],
    documentUrl: "https://exemplo.gov.br/politicas/incentivo-bioeconomia",
    contactInfo: {
      email: "incentivos@fazenda.sp.gov.br",
      phone: "+55 11 3222-3333",
      website: "https://fazenda.sp.gov.br/incentivos"
    },
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2024-01-10T14:45:00Z"
  },
  {
    id: "pol002",
    title: "Programa Amazônia Bioativa",
    description: "Programa de incentivo à pesquisa, desenvolvimento e implantação de projetos de bioeconomia na região amazônica.",
    type: "Programa Governamental",
    applicableRegions: ["AM", "PA", "RO", "RR", "AP", "AC", "TO", "MA", "MT"],
    responsibleAgency: "Ministério do Meio Ambiente",
    validUntil: "2028-12-31",
    eligibilityCriteria: [
      "Projetos realizados nos estados da Amazônia Legal",
      "Envolvimento de comunidades locais",
      "Uso sustentável da biodiversidade"
    ],
    benefits: [
      "Financiamento não-reembolsável de até R$ 3 milhões",
      "Assessoria técnica especializada",
      "Acesso a redes de comercialização"
    ],
    documentUrl: "https://exemplo.gov.br/amazonia-bioativa",
    contactInfo: {
      email: "amazonia.bioativa@mma.gov.br",
      website: "https://mma.gov.br/amazonia-bioativa"
    },
    createdAt: "2023-11-20T09:15:00Z",
    updatedAt: "2024-02-05T11:30:00Z"
  },
  {
    id: "pol003",
    title: "Lei de Impulso à Bioeconomia Circular",
    description: "Marco legal que estabelece diretrizes para promoção da bioeconomia circular, com ênfase no reaproveitamento de resíduos e economia regenerativa.",
    type: "Legislação",
    applicableRegions: ["Nacional"],
    responsibleAgency: "Ministério da Ciência, Tecnologia e Inovação",
    validUntil: "2034-12-31",
    eligibilityCriteria: [
      "Aplicável a todos os setores econômicos",
      "Ênfase em micro e pequenas empresas"
    ],
    benefits: [
      "Depreciação acelerada para investimentos em bioeconomia",
      "Prioridade em compras governamentais",
      "Incentivos para P&D em biotecnologia"
    ],
    documentUrl: "https://exemplo.leg.br/lei-bioeconomia-circular",
    contactInfo: {
      email: "bioeconomia@mcti.gov.br",
      phone: "+55 61 3333-4444",
      website: "https://mcti.gov.br/bioeconomia"
    },
    createdAt: "2024-03-15T16:45:00Z",
    updatedAt: "2024-03-15T16:45:00Z"
  },
  {
    id: "pol004",
    title: "Certificação Produção Bioeconômica",
    description: "Sistema de certificação para produtos da bioeconomia que seguem critérios de sustentabilidade, rastreabilidade e valorização de comunidades locais.",
    type: "Certificação",
    applicableRegions: ["Nacional"],
    responsibleAgency: "INMETRO e MAPA",
    validUntil: "2030-12-31",
    eligibilityCriteria: [
      "Produtos oriundos de processos sustentáveis",
      "Cadastro no SICAR e CAR",
      "Respeito às normas trabalhistas"
    ],
    benefits: [
      "Selo oficial de certificação 'Bio Brasil'",
      "Acesso a mercados internacionais",
      "Vantagens em licitações públicas"
    ],
    contactInfo: {
      email: "certificacao@bioeconomia.gov.br",
      website: "https://bioeconomia.gov.br/certificacao"
    },
    createdAt: "2024-01-10T11:20:00Z",
    updatedAt: "2024-04-22T14:30:00Z"
  }
];

// Mock financial resources data
export const mockFinancialResources: FinancialResource[] = [
  {
    id: "fund001",
    name: "Fundo Amazônia",
    source: "Público",
    totalAmount: 100000000,
    availableAmount: 45000000,
    description: "Financiamento não-reembolsável para projetos de conservação e uso sustentável na Amazônia.",
    eligibilityCriteria: [
      "Projetos na Amazônia Legal",
      "Alinhamento com Plano de Prevenção e Controle do Desmatamento",
      "Participação de comunidades locais"
    ],
    deadlineDate: "2025-12-31",
    applicationProcess: "Edital anual com duas chamadas semestrais. Propostas avaliadas por comitê técnico.",
    contactInfo: {
      email: "fundoamazonia@bndes.gov.br",
      phone: "+55 21 3747-9700",
      website: "http://www.fundoamazonia.gov.br"
    },
    sectors: ["Conservação", "Manejo Florestal", "Extrativismo Sustentável", "Agricultura Regenerativa"],
    minimumProjectValue: 500000,
    maximumProjectValue: 10000000,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-06-10T15:30:00Z"
  },
  {
    id: "fund002",
    name: "Linha de Crédito Bioindústria",
    source: "Público",
    totalAmount: 250000000,
    availableAmount: 180000000,
    description: "Financiamento com juros subsidiados para empresas que desenvolvem produtos e processos baseados em recursos biológicos renováveis.",
    eligibilityCriteria: [
      "Empresas de biotecnologia",
      "Projetos com TRL 4 ou superior",
      "Comprovação de viabilidade econômica"
    ],
    deadlineDate: "2025-06-30",
    applicationProcess: "Fluxo contínuo. Submissão online com análise em até 60 dias.",
    contactInfo: {
      email: "bioeconomia@finep.gov.br",
      website: "https://finep.gov.br/bioeconomia"
    },
    sectors: ["Biotecnologia", "Bioindústria", "Química Verde", "Biofármacos"],
    minimumProjectValue: 1000000,
    maximumProjectValue: 25000000,
    createdAt: "2023-10-10T14:20:00Z",
    updatedAt: "2024-05-15T09:45:00Z"
  },
  {
    id: "fund003",
    name: "Programa Agroecológico",
    source: "Misto",
    totalAmount: 75000000,
    availableAmount: 50000000,
    description: "Financiamento para produtores rurais que adotam práticas agroecológicas, sistemas agroflorestais e agricultura de baixo carbono.",
    eligibilityCriteria: [
      "Produtores rurais (individuais ou cooperativas)",
      "DAP ativa (Declaração de Aptidão ao Pronaf)",
      "Plano de transição agroecológica aprovado"
    ],
    deadlineDate: "2026-03-31",
    applicationProcess: "Via agências do Banco do Brasil e cooperativas de crédito credenciadas.",
    contactInfo: {
      email: "programaagroecologico@agricultura.gov.br",
      phone: "+55 61 3218-2828",
      website: "https://agricultura.gov.br/agroecologico"
    },
    sectors: ["Agricultura Familiar", "Sistemas Agroflorestais", "Agroecologia"],
    minimumProjectValue: 20000,
    maximumProjectValue: 500000,
    createdAt: "2024-02-20T11:15:00Z",
    updatedAt: "2024-04-30T16:45:00Z"
  },
  {
    id: "fund004",
    name: "Fundo de Investimento em Bioeconomia",
    source: "Privado",
    totalAmount: 350000000,
    availableAmount: 280000000,
    description: "Fundo de venture capital para startups e scale-ups com soluções inovadoras em bioeconomia e sustentabilidade.",
    eligibilityCriteria: [
      "Startups com MVP validado",
      "Solução de base biológica inovadora",
      "Potencial de escala internacional"
    ],
    deadlineDate: "2026-12-31",
    applicationProcess: "Pitch deck + entrevista com comitê de investimentos.",
    contactInfo: {
      email: "ventures@biofund.com.br",
      website: "https://biofund.com.br"
    },
    sectors: ["Biocombustíveis", "Biomateriais", "Biotecnologia", "Bioenergia", "Bioinformática"],
    minimumProjectValue: 2000000,
    maximumProjectValue: 40000000,
    createdAt: "2023-12-15T15:30:00Z",
    updatedAt: "2024-05-20T10:15:00Z"
  },
  {
    id: "fund005",
    name: "GEF Pequenos Projetos",
    source: "Internacional",
    totalAmount: 30000000,
    availableAmount: 18000000,
    description: "Financiamento para iniciativas comunitárias que combinam conservação da biodiversidade e desenvolvimento sustentável.",
    eligibilityCriteria: [
      "ONGs e organizações comunitárias",
      "Projetos com foco em biodiversidade e meios de vida",
      "Benefício direto para comunidades vulneráveis"
    ],
    deadlineDate: "2025-11-30",
    applicationProcess: "Inscrição via formulário online com dois ciclos anuais de avaliação.",
    contactInfo: {
      email: "sgp.brasil@undp.org",
      website: "https://sgp.undp.org/brazil"
    },
    sectors: ["Conservação", "Comunidades Tradicionais", "Extrativismo Sustentável"],
    maximumProjectValue: 150000,
    createdAt: "2024-01-25T09:40:00Z",
    updatedAt: "2024-06-05T11:20:00Z"
  }
];

// Mock state strategies data
export const mockStateStrategies: StateStrategy[] = [
  {
    id: "strat001",
    state: "MT",
    title: "Plano Mato Grosso Bioeconomia 2024-2030",
    description: "Estratégia estadual para transição para uma economia de base biológica, com ênfase em sistemas agroflorestais e descarbonização do agronegócio.",
    period: {
      start: "2024-01-01",
      end: "2030-12-31"
    },
    focusAreas: [
      {
        name: "Agricultura Regenerativa",
        description: "Adoção de práticas agrícolas que recuperam solos e aumentam a biodiversidade.",
        goals: [
          {
            description: "Expansão de Sistemas Agroflorestais",
            metric: "Hectares implementados",
            target: "500 ha até 2026, 2000 ha até 2030"
          },
          {
            description: "Redução de emissões de GEE",
            metric: "Toneladas de CO2eq/ano",
            target: "Redução de 15% até 2030 (linha base 2022)"
          }
        ]
      },
      {
        name: "Bioinsumos",
        description: "Desenvolvimento de insumos biológicos para substituição de químicos sintéticos.",
        goals: [
          {
            description: "Biofábricas regionais",
            metric: "Unidades instaladas",
            target: "10 unidades até 2028"
          },
          {
            description: "Uso de controle biológico",
            metric: "Área tratada com bioinsumos",
            target: "30% da área cultivada até 2030"
          }
        ]
      }
    ],
    documentUrl: "https://www.mt.gov.br/bioeconomia2030",
    contactInfo: {
      department: "Secretaria de Desenvolvimento Econômico",
      email: "bioeconomia@mt.gov.br",
      phone: "+55 65 3613-3500",
      website: "https://www.mt.gov.br/bioeconomia"
    },
    createdAt: "2023-11-10T14:20:00Z",
    updatedAt: "2024-02-15T10:30:00Z"
  },
  {
    id: "strat002",
    state: "AM",
    title: "Amazonas Bioeconomia Florestal",
    description: "Plano estadual focado na valorização de produtos da sociobiodiversidade e bioindústria baseada em recursos da floresta amazônica.",
    period: {
      start: "2023-06-01",
      end: "2027-12-31"
    },
    focusAreas: [
      {
        name: "Cadeias Produtivas da Sociobiodiversidade",
        description: "Desenvolvimento e consolidação de cadeias de valor para produtos florestais não-madeireiros.",
        goals: [
          {
            description: "Estruturação de cadeias prioritárias",
            metric: "Número de cadeias estruturadas",
            target: "5 cadeias até 2025 (açaí, castanha, copaíba, andiroba, guaraná)"
          },
          {
            description: "Aumento de renda para extrativistas",
            metric: "Renda média mensal",
            target: "Incremento de 40% até 2027"
          }
        ]
      },
      {
        name: "Bioindústria Amazônica",
        description: "Atração e desenvolvimento de indústrias baseadas em recursos da biodiversidade amazônica.",
        goals: [
          {
            description: "Distrito Bioindustrial de Manaus",
            metric: "Empresas instaladas",
            target: "15 novas empresas até 2027"
          },
          {
            description: "Patenteamento de produtos e processos",
            metric: "Patentes registradas",
            target: "50 patentes até 2027"
          }
        ]
      }
    ],
    documentUrl: "https://www.amazonas.am.gov.br/bioeconomia",
    contactInfo: {
      department: "Secretaria de Estado do Meio Ambiente",
      email: "bioeconomia@sema.am.gov.br",
      website: "https://www.sema.am.gov.br"
    },
    createdAt: "2023-05-20T11:45:00Z",
    updatedAt: "2024-03-10T09:15:00Z"
  },
  {
    id: "strat003",
    state: "MG",
    title: "Programa Minas Bioinovação",
    description: "Estratégia focada na bioeconomia de base tecnológica, com ênfase em biomateriais, bioenergia e aproveitamento de resíduos da mineração e agropecuária.",
    period: {
      start: "2024-03-01",
      end: "2029-02-28"
    },
    focusAreas: [
      {
        name: "Bioenergia",
        description: "Ampliação da matriz energética renovável baseada em biomassa e resíduos orgânicos.",
        goals: [
          {
            description: "Usinas de biogás",
            metric: "MW instalados",
            target: "100 MW até 2029"
          },
          {
            description: "Aproveitamento de resíduos agropecuários",
            metric: "Toneladas processadas/ano",
            target: "500.000 toneladas/ano até 2029"
          }
        ]
      },
      {
        name: "Biomateriais",
        description: "Desenvolvimento de novos materiais baseados em recursos biológicos renováveis.",
        goals: [
          {
            description: "Centro de P&D em Biomateriais",
            metric: "Centros estabelecidos",
            target: "1 centro em operação até 2025"
          },
          {
            description: "Startups de biomateriais",
            metric: "Empresas incubadas",
            target: "20 startups até 2029"
          }
        ]
      }
    ],
    documentUrl: "https://www.mg.gov.br/bioinovacao",
    contactInfo: {
      department: "Secretaria de Estado de Ciência, Tecnologia e Inovação",
      email: "bioinovacao@secti.mg.gov.br",
      phone: "+55 31 3915-2000",
      website: "https://www.secti.mg.gov.br"
    },
    createdAt: "2024-02-25T16:30:00Z",
    updatedAt: "2024-04-12T10:45:00Z"
  },
  {
    id: "strat004",
    state: "CE",
    title: "Ceará Bioeconomia do Semiárido",
    description: "Plano estadual voltado para o desenvolvimento de soluções bioeconômicas adaptadas ao semiárido, com foco na convivência com a seca e aproveitamento de espécies nativas.",
    period: {
      start: "2023-09-01",
      end: "2028-08-31"
    },
    focusAreas: [
      {
        name: "Bioinsumos da Caatinga",
        description: "Desenvolvimento de insumos biológicos a partir da biodiversidade da Caatinga.",
        goals: [
          {
            description: "Bioprospecção de espécies nativas",
            metric: "Espécies mapeadas e estudadas",
            target: "100 espécies até 2026"
          },
          {
            description: "Produção de bioinsumos",
            metric: "Unidades produtivas",
            target: "5 unidades descentralizadas até 2028"
          }
        ]
      },
      {
        name: "Agricultura Resiliente",
        description: "Sistemas produtivos adaptados às condições do semiárido.",
        goals: [
          {
            description: "Sistemas agrossilvipastoris",
            metric: "Propriedades implementadas",
            target: "1.000 propriedades até 2028"
          },
          {
            description: "Eficiência hídrica",
            metric: "Redução no consumo de água",
            target: "Redução de 30% no uso agrícola até 2028"
          }
        ]
      }
    ],
    documentUrl: "https://www.ceara.gov.br/bioeconomia-semiarido",
    contactInfo: {
      department: "Secretaria do Desenvolvimento Agrário",
      email: "bioeconomia@sda.ce.gov.br",
      website: "https://www.sda.ce.gov.br"
    },
    createdAt: "2023-08-15T13:20:00Z",
    updatedAt: "2024-01-22T09:30:00Z"
  }
];
