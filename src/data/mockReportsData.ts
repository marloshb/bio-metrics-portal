
import { 
  ConsolidatedReport, 
  ModuleReport, 
  TrendAnalysis,
  PublicDataSource
} from '@/types/reportTypes';

// Mock data for public data sources
export const publicDataSources: PublicDataSource[] = [
  {
    id: "ibge-1",
    name: "IBGE - Demografia",
    description: "Dados demográficos do Instituto Brasileiro de Geografia e Estatística",
    url: "https://www.ibge.gov.br/estatisticas/sociais/populacao.html",
    lastUpdated: "2023-12-01",
    dataCategories: ["população", "densidade demográfica", "distribuição por idade"]
  },
  {
    id: "ibge-2",
    name: "IBGE - PIB",
    description: "Produto Interno Bruto por região e setor",
    url: "https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais.html",
    lastUpdated: "2023-11-15",
    dataCategories: ["PIB", "PIB per capita", "valor agregado por setor"]
  },
  {
    id: "mapbiomas-1",
    name: "MapBiomas - Uso do Solo",
    description: "Mapeamento anual da cobertura e uso do solo no Brasil",
    url: "https://mapbiomas.org/",
    lastUpdated: "2023-10-30",
    dataCategories: ["cobertura vegetal", "uso agrícola", "desmatamento"]
  },
  {
    id: "bndes-1",
    name: "BNDES - Financiamentos",
    description: "Dados sobre financiamentos do Banco Nacional de Desenvolvimento Econômico e Social",
    url: "https://www.bndes.gov.br/wps/portal/site/home/transparencia/",
    lastUpdated: "2024-01-10",
    dataCategories: ["desembolsos", "projetos aprovados", "setores financiados"]
  },
  {
    id: "ipea-1",
    name: "IPEA - Indicadores Sociais",
    description: "Indicadores sociais do Instituto de Pesquisa Econômica Aplicada",
    url: "https://www.ipea.gov.br/portal/",
    lastUpdated: "2023-09-20",
    dataCategories: ["desigualdade", "renda", "pobreza", "desenvolvimento humano"]
  },
  {
    id: "seeg-1",
    name: "SEEG - Emissões",
    description: "Sistema de Estimativas de Emissões de Gases de Efeito Estufa",
    url: "https://seeg.eco.br/",
    lastUpdated: "2023-11-05",
    dataCategories: ["emissões de GEE", "mudança de uso da terra", "energia"]
  },
  {
    id: "mdic-1",
    name: "MDIC - Comércio",
    description: "Dados de comércio do Ministério do Desenvolvimento, Indústria, Comércio e Serviços",
    url: "https://www.gov.br/mdic/pt-br",
    lastUpdated: "2024-02-01",
    dataCategories: ["exportações", "importações", "balança comercial"]
  },
];

// Mock consolidated report data
export const consolidatedReports: ConsolidatedReport[] = [
  {
    id: "report-consolidated-1",
    title: "Relatório Nacional de Bioeconomia 2023",
    description: "Visão geral da bioeconomia brasileira com dados consolidados de todos os módulos",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-15",
    modules: [
      {
        name: "Painéis Setoriais",
        data: [
          { id: "ps-1", name: "Projetos ativos", value: 500, trend: 12, unit: "projetos" },
          { id: "ps-2", name: "Investimento total", value: 25000000, trend: 8, unit: "BRL" }
        ]
      },
      {
        name: "HUB Bioeconômico",
        data: [
          { id: "hub-1", name: "Iniciativas cadastradas", value: 350, trend: 15, unit: "iniciativas" },
          { id: "hub-2", name: "Recursos disponíveis", value: 15000000, trend: 5, unit: "BRL" }
        ]
      },
      {
        name: "Estratégias Bioeconômicas",
        data: [
          { id: "eb-1", name: "Área restaurada", value: 300, trend: 20, unit: "hectares" },
          { id: "eb-2", name: "Emissões reduzidas", value: 10000, trend: 18, unit: "tCO₂e" }
        ]
      },
      {
        name: "Cadeia de Valor",
        data: [
          { id: "cv-1", name: "Transações", value: 10000000, trend: 22, unit: "BRL" },
          { id: "cv-2", name: "Atores cadastrados", value: 280, trend: 14, unit: "atores" }
        ]
      },
      {
        name: "BioVocação",
        data: [
          { id: "bv-1", name: "Regiões mapeadas", value: 50, trend: 10, unit: "regiões" },
          { id: "bv-2", name: "Área com potencial", value: 1200000, trend: 0, unit: "hectares" }
        ]
      }
    ],
    charts: [
      {
        title: "Distribuição de Projetos por Bioma",
        description: "Número de projetos ativos em cada bioma brasileiro",
        type: "pie",
        data: [
          { label: "Amazônia", value: 180, category: "bioma" },
          { label: "Cerrado", value: 120, category: "bioma" },
          { label: "Mata Atlântica", value: 100, category: "bioma" },
          { label: "Caatinga", value: 50, category: "bioma" },
          { label: "Pampa", value: 30, category: "bioma" },
          { label: "Pantanal", value: 20, category: "bioma" }
        ],
        source: "BioECO + IBGE"
      },
      {
        title: "Investimentos e Retorno por Região",
        description: "Comparação entre investimentos realizados e retornos obtidos por região",
        type: "bar",
        data: [
          { label: "Norte", value: 8000000, category: "investimento", unit: "BRL", region: "Norte" },
          { label: "Norte", value: 9200000, category: "retorno", unit: "BRL", region: "Norte" },
          { label: "Nordeste", value: 6000000, category: "investimento", unit: "BRL", region: "Nordeste" },
          { label: "Nordeste", value: 6500000, category: "retorno", unit: "BRL", region: "Nordeste" },
          { label: "Centro-Oeste", value: 5000000, category: "investimento", unit: "BRL", region: "Centro-Oeste" },
          { label: "Centro-Oeste", value: 5800000, category: "retorno", unit: "BRL", region: "Centro-Oeste" },
          { label: "Sudeste", value: 4000000, category: "investimento", unit: "BRL", region: "Sudeste" },
          { label: "Sudeste", value: 4600000, category: "retorno", unit: "BRL", region: "Sudeste" },
          { label: "Sul", value: 2000000, category: "investimento", unit: "BRL", region: "Sul" },
          { label: "Sul", value: 2300000, category: "retorno", unit: "BRL", region: "Sul" }
        ],
        xAxisLabel: "Região",
        yAxisLabel: "Valor (BRL)",
        source: "BioECO + BNDES"
      },
      {
        title: "Evolução Anual de Áreas Restauradas",
        description: "Total de hectares restaurados por ano através de iniciativas bioeconômicas",
        type: "line",
        data: [
          { label: "2019", value: 50, unit: "hectares", date: "2019-12-31" },
          { label: "2020", value: 120, unit: "hectares", date: "2020-12-31" },
          { label: "2021", value: 180, unit: "hectares", date: "2021-12-31" },
          { label: "2022", value: 220, unit: "hectares", date: "2022-12-31" },
          { label: "2023", value: 300, unit: "hectares", date: "2023-12-31" }
        ],
        xAxisLabel: "Ano",
        yAxisLabel: "Área (hectares)",
        source: "BioECO + MapBiomas"
      }
    ],
    maps: [
      {
        title: "Densidade de Projetos Bioeconômicos",
        description: "Distribuição geográfica dos projetos de bioeconomia no Brasil",
        regions: [
          { name: "Amazonas", value: 85, coordinates: { lat: -3.976318, lng: -64.399582 } },
          { name: "Pará", value: 70, coordinates: { lat: -4.239015, lng: -52.151279 } },
          { name: "Mato Grosso", value: 60, coordinates: { lat: -12.748013, lng: -56.071999 } },
          { name: "Bahia", value: 55, coordinates: { lat: -12.197327, lng: -43.516391 } },
          { name: "Minas Gerais", value: 50, coordinates: { lat: -18.512177, lng: -44.555347 } }
        ],
        legend: {
          title: "Número de Projetos",
          items: [
            { label: "0-20", color: "#E5F5E0" },
            { label: "21-40", color: "#A1D99B" },
            { label: "41-60", color: "#31A354" },
            { label: "61-80", color: "#31723E" },
            { label: ">80", color: "#00441B" }
          ]
        },
        source: "BioECO + IBGE"
      }
    ],
    tables: [
      {
        title: "Top 5 Produtos da Bioeconomia por Volume de Transações",
        headers: ["Produto", "Volume (R$)", "Crescimento Anual (%)", "Principais Regiões Produtoras"],
        rows: [
          ["Açaí", 3500000, 28, "Norte (PA, AM)"],
          ["Castanha do Brasil", 2200000, 15, "Norte (AM, AC, PA)"],
          ["Cacau Orgânico", 1800000, 22, "Nordeste (BA), Norte (PA)"],
          ["Óleos Essenciais", 1500000, 18, "Norte (AM), Nordeste (BA)"],
          ["Madeira Certificada", 1200000, 10, "Norte (PA, RO), Centro-Oeste (MT)"]
        ]
      }
    ],
    publicSources: ["IBGE - Demografia", "IBGE - PIB", "MapBiomas - Uso do Solo", "BNDES - Financiamentos", "SEEG - Emissões"]
  }
];

// Mock module-specific reports
export const moduleReports: ModuleReport[] = [
  {
    id: "report-module-observatory-1",
    moduleName: "observatory",
    title: "Relatório dos Painéis Setoriais 2023",
    description: "Análise detalhada dos projetos, incentivos e radar setorial",
    createdAt: "2024-01-10",
    period: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    keyMetrics: [
      { name: "Projetos ativos", value: 500, unit: "projetos", trend: 12, interpretation: "Crescimento saudável do número de projetos" },
      { name: "Em áreas protegidas", value: 80, unit: "%", trend: 5, interpretation: "Forte presença em áreas de conservação" },
      { name: "Valor médio", value: 50000, unit: "BRL/projeto", trend: -2, interpretation: "Leve queda no valor médio dos projetos" }
    ],
    charts: [
      {
        title: "Distribuição de Projetos por Estado",
        description: "Número de projetos ativos por estado brasileiro",
        type: "bar",
        data: [
          { label: "AM", value: 85, region: "Amazonas" },
          { label: "PA", value: 70, region: "Pará" },
          { label: "MT", value: 60, region: "Mato Grosso" },
          { label: "BA", value: 55, region: "Bahia" },
          { label: "MG", value: 50, region: "Minas Gerais" },
          { label: "SP", value: 45, region: "São Paulo" },
          { label: "PR", value: 40, region: "Paraná" },
          { label: "AC", value: 35, region: "Acre" },
          { label: "TO", value: 30, region: "Tocantins" },
          { label: "MA", value: 30, region: "Maranhão" }
        ],
        xAxisLabel: "Estado",
        yAxisLabel: "Número de Projetos",
        source: "BioECO"
      },
      {
        title: "Fontes de Financiamento",
        description: "Participação das diversas fontes no financiamento dos projetos",
        type: "pie",
        data: [
          { label: "Fundo Amazônia", value: 35, category: "financiamento" },
          { label: "BNDES", value: 25, category: "financiamento" },
          { label: "Investimento Privado", value: 20, category: "financiamento" },
          { label: "Financiamento Internacional", value: 15, category: "financiamento" },
          { label: "Outros", value: 5, category: "financiamento" }
        ],
        source: "BioECO + BNDES"
      }
    ],
    maps: [
      {
        title: "Projetos em Áreas Protegidas",
        description: "Localização dos projetos em relação a áreas de proteção ambiental",
        regions: [
          { name: "Amazonas", value: 90, coordinates: { lat: -3.976318, lng: -64.399582 } },
          { name: "Pará", value: 85, coordinates: { lat: -4.239015, lng: -52.151279 } },
          { name: "Mato Grosso", value: 65, coordinates: { lat: -12.748013, lng: -56.071999 } },
          { name: "Acre", value: 80, coordinates: { lat: -9.026242, lng: -70.811825 } },
          { name: "Amapá", value: 95, coordinates: { lat: 1.358976, lng: -51.796253 } }
        ],
        legend: {
          title: "% em Áreas Protegidas",
          items: [
            { label: "0-20%", color: "#FEE5D9" },
            { label: "21-40%", color: "#FCBBA1" },
            { label: "41-60%", color: "#FC9272" },
            { label: "61-80%", color: "#FB6A4A" },
            { label: "81-100%", color: "#CB181D" }
          ]
        },
        source: "BioECO + MapBiomas"
      }
    ],
    publicSources: [
      { name: "MapBiomas", dataPoints: ["áreas protegidas", "cobertura vegetal"] },
      { name: "BNDES", dataPoints: ["linhas de financiamento", "valores aprovados"] },
      { name: "MMA", dataPoints: ["políticas ambientais", "unidades de conservação"] }
    ],
    insights: [
      "A região Norte concentra 45% de todos os projetos, com forte presença na Amazônia",
      "80% dos projetos estão localizados em áreas de proteção ou seu entorno",
      "O Fundo Amazônia continua sendo a principal fonte de recursos para iniciativas de bioeconomia"
    ]
  },
  {
    id: "report-module-hub-1",
    moduleName: "hub",
    title: "Relatório do HUB Bioeconômico 2023",
    description: "Análise das iniciativas, políticas de incentivo e recursos financeiros",
    createdAt: "2024-01-12",
    period: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    keyMetrics: [
      { name: "Iniciativas cadastradas", value: 350, unit: "iniciativas", trend: 15, interpretation: "Aumento significativo no interesse" },
      { name: "Políticas aplicáveis", value: 28, unit: "políticas", trend: 8, interpretation: "Novas políticas de incentivo criadas" },
      { name: "Recursos disponíveis", value: 15000000, unit: "BRL", trend: 5, interpretation: "Recursos crescentes, mas em ritmo menor que a demanda" }
    ],
    charts: [
      {
        title: "Iniciativas por Setor",
        description: "Distribuição das iniciativas por setor da bioeconomia",
        type: "bar",
        data: [
          { label: "Agricultura Sustentável", value: 95, category: "setor" },
          { label: "Extrativismo", value: 85, category: "setor" },
          { label: "Biotecnologia", value: 60, category: "setor" },
          { label: "Florestal", value: 55, category: "setor" },
          { label: "Pesca Sustentável", value: 35, category: "setor" },
          { label: "Ecoturismo", value: 20, category: "setor" }
        ],
        xAxisLabel: "Setor",
        yAxisLabel: "Número de Iniciativas",
        source: "BioECO"
      },
      {
        title: "Elegibilidade a Incentivos",
        description: "Percentual de iniciativas elegíveis a diferentes tipos de incentivos",
        type: "pie",
        data: [
          { label: "Fiscais", value: 70, category: "incentivo" },
          { label: "Crédito Facilitado", value: 60, category: "incentivo" },
          { label: "Subsídios", value: 35, category: "incentivo" },
          { label: "Assistência Técnica", value: 85, category: "incentivo" },
          { label: "Acesso a Mercados", value: 50, category: "incentivo" }
        ],
        source: "BioECO + Receita Federal"
      }
    ],
    publicSources: [
      { name: "Receita Federal", dataPoints: ["incentivos fiscais", "regimes tributários especiais"] },
      { name: "BNDES", dataPoints: ["linhas de crédito", "programas setoriais"] },
      { name: "FINEP", dataPoints: ["editais de inovação", "subvenção econômica"] }
    ],
    insights: [
      "70% das iniciativas são elegíveis a pelo menos um tipo de incentivo fiscal",
      "Agricultura Sustentável representa o principal setor em número de iniciativas",
      "O Nordeste apresenta o maior crescimento (35%) no número de novos cadastros"
    ]
  },
  {
    id: "report-module-strategies-1",
    moduleName: "strategies",
    title: "Relatório de Estratégias Bioeconômicas 2023",
    description: "Análise do progresso PDCA, atividades baseadas em biodiversidade e inclusão social",
    createdAt: "2024-01-08",
    period: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    keyMetrics: [
      { name: "Área restaurada", value: 300, unit: "hectares", trend: 20, interpretation: "Aceleração significativa nos esforços de restauração" },
      { name: "CO₂ reduzido", value: 10000, unit: "tCO₂e", trend: 18, interpretation: "Bom progresso na redução de emissões" },
      { name: "Famílias incluídas", value: 580, unit: "famílias", trend: 25, interpretation: "Forte componente social nas estratégias" }
    ],
    charts: [
      {
        title: "Progresso PDCA por Região",
        description: "Percentual médio de conclusão das etapas PDCA por região",
        type: "radar",
        data: [
          { label: "Norte", value: 75, category: "Planejar", region: "Norte" },
          { label: "Norte", value: 70, category: "Fazer", region: "Norte" },
          { label: "Norte", value: 65, category: "Checar", region: "Norte" },
          { label: "Norte", value: 60, category: "Agir", region: "Norte" },
          { label: "Nordeste", value: 80, category: "Planejar", region: "Nordeste" },
          { label: "Nordeste", value: 65, category: "Fazer", region: "Nordeste" },
          { label: "Nordeste", value: 60, category: "Checar", region: "Nordeste" },
          { label: "Nordeste", value: 55, category: "Agir", region: "Nordeste" },
          { label: "Centro-Oeste", value: 85, category: "Planejar", region: "Centro-Oeste" },
          { label: "Centro-Oeste", value: 75, category: "Fazer", region: "Centro-Oeste" },
          { label: "Centro-Oeste", value: 70, category: "Checar", region: "Centro-Oeste" },
          { label: "Centro-Oeste", value: 65, category: "Agir", region: "Centro-Oeste" }
        ],
        source: "BioECO"
      },
      {
        title: "Redução de Emissões por Hectare",
        description: "Toneladas de CO₂ evitadas por hectare em diferentes estratégias",
        type: "bar",
        data: [
          { label: "Sistemas Agroflorestais", value: 12, unit: "tCO₂e/ha", category: "estratégia" },
          { label: "Restauração Florestal", value: 15, unit: "tCO₂e/ha", category: "estratégia" },
          { label: "Manejo Sustentável", value: 8, unit: "tCO₂e/ha", category: "estratégia" },
          { label: "Agroecologia", value: 10, unit: "tCO₂e/ha", category: "estratégia" },
          { label: "Pastagem Ecológica", value: 5, unit: "tCO₂e/ha", category: "estratégia" }
        ],
        xAxisLabel: "Estratégia",
        yAxisLabel: "tCO₂e/ha",
        source: "BioECO + SEEG"
      }
    ],
    publicSources: [
      { name: "SEEG", dataPoints: ["emissões por uso da terra", "potencial de mitigação"] },
      { name: "IBGE", dataPoints: ["dados demográficos", "renda familiar"] },
      { name: "IPEA", dataPoints: ["indicadores sociais", "desenvolvimento regional"] }
    ],
    insights: [
      "As estratégias com componente social apresentam 30% mais eficácia na implementação",
      "Há forte correlação (0.82) entre diversidade de espécies e resiliência climática",
      "Comunidades com participação feminina acima de 50% têm implementação mais rápida e eficaz"
    ]
  },
  {
    id: "report-module-valuechain-1",
    moduleName: "valuechain",
    title: "Relatório da Cadeia de Valor 2023",
    description: "Análise dos atores, geomarketing e marketplace bioeconômico",
    createdAt: "2024-01-05",
    period: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    keyMetrics: [
      { name: "Transações", value: 10000000, unit: "BRL", trend: 22, interpretation: "Forte crescimento do volume comercializado" },
      { name: "Atores cadastrados", value: 280, unit: "atores", trend: 14, interpretation: "Ampliação consistente da rede" },
      { name: "Preço médio", value: 15, unit: "BRL/kg", trend: 8, interpretation: "Valorização dos produtos da bioeconomia" }
    ],
    charts: [
      {
        title: "Transações por Categoria",
        description: "Volume financeiro de transações por categoria de produto",
        type: "pie",
        data: [
          { label: "Produtos Florestais", value: 3800000, category: "categoria" },
          { label: "Frutos Nativos", value: 2500000, category: "categoria" },
          { label: "Fibras Naturais", value: 1200000, category: "categoria" },
          { label: "Óleos e Resinas", value: 1500000, category: "categoria" },
          { label: "Pescados Sustentáveis", value: 1000000, category: "categoria" }
        ],
        source: "BioECO"
      },
      {
        title: "Evolução Mensal de Transações",
        description: "Volume financeiro de transações ao longo do ano",
        type: "line",
        data: [
          { label: "Jan", value: 650000, date: "2023-01-31" },
          { label: "Fev", value: 720000, date: "2023-02-28" },
          { label: "Mar", value: 850000, date: "2023-03-31" },
          { label: "Abr", value: 920000, date: "2023-04-30" },
          { label: "Mai", value: 880000, date: "2023-05-31" },
          { label: "Jun", value: 750000, date: "2023-06-30" },
          { label: "Jul", value: 820000, date: "2023-07-31" },
          { label: "Ago", value: 950000, date: "2023-08-31" },
          { label: "Set", value: 1050000, date: "2023-09-30" },
          { label: "Out", value: 980000, date: "2023-10-31" },
          { label: "Nov", value: 1120000, date: "2023-11-30" },
          { label: "Dez", value: 1310000, date: "2023-12-31" }
        ],
        xAxisLabel: "Mês",
        yAxisLabel: "Volume (BRL)",
        source: "BioECO"
      }
    ],
    maps: [
      {
        title: "Oferta vs Demanda de Açaí",
        description: "Comparativo regional entre oferta e demanda de açaí",
        regions: [
          { name: "Pará", value: 120, coordinates: { lat: -4.239015, lng: -52.151279 } }, // oferta > demanda
          { name: "Amazonas", value: 110, coordinates: { lat: -3.976318, lng: -64.399582 } }, // oferta > demanda
          { name: "São Paulo", value: -80, coordinates: { lat: -22.763116, lng: -47.928289 } }, // demanda > oferta
          { name: "Rio de Janeiro", value: -70, coordinates: { lat: -22.122429, lng: -43.226906 } }, // demanda > oferta
          { name: "Distrito Federal", value: -60, coordinates: { lat: -15.826691, lng: -47.921822 } } // demanda > oferta
        ],
        legend: {
          title: "Balanço Oferta-Demanda",
          items: [
            { label: "Alta Demanda", color: "#D7301F" },
            { label: "Demanda Moderada", color: "#FC8D59" },
            { label: "Equilíbrio", color: "#FFFFBF" },
            { label: "Oferta Moderada", color: "#91BFDB" },
            { label: "Alta Oferta", color: "#0570B0" }
          ]
        },
        source: "BioECO + MDIC"
      }
    ],
    publicSources: [
      { name: "MDIC", dataPoints: ["comércio regional", "exportações de produtos da bioeconomia"] },
      { name: "IBGE", dataPoints: ["produção extrativista", "produção agrícola"] },
      { name: "CONAB", dataPoints: ["preços médios", "volume de produção"] }
    ],
    insights: [
      "Produtos florestais não madeireiros representam 38% do valor total transacionado",
      "Há crescente demanda (35% ao ano) por produtos certificados nos grandes centros urbanos",
      "O marketplace facilitou o acesso direto ao consumidor, elevando em 22% a margem dos produtores"
    ]
  },
  {
    id: "report-module-vocation-1",
    moduleName: "vocation",
    title: "Relatório de BioVocação Territorial 2023",
    description: "Análise de riscos, oportunidades e vocações bioeconômicas por território",
    createdAt: "2024-01-03",
    period: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    keyMetrics: [
      { name: "Regiões mapeadas", value: 50, unit: "regiões", trend: 10, interpretation: "Ampliação do mapeamento territorial" },
      { name: "Área com alto potencial", value: 1200000, unit: "hectares", trend: 0, interpretation: "Áreas identificadas mantiveram-se estáveis" },
      { name: "Aptidão média", value: 72, unit: "%", trend: 5, interpretation: "Melhoria na adequação bioeconômica dos territórios" }
    ],
    charts: [
      {
        title: "Potencial Bioeconômico por Estado",
        description: "Índice de potencial bioeconômico (0-100) por estado",
        type: "bar",
        data: [
          { label: "AM", value: 85, region: "Amazonas" },
          { label: "PA", value: 82, region: "Pará" },
          { label: "AC", value: 80, region: "Acre" },
          { label: "AP", value: 78, region: "Amapá" },
          { label: "MT", value: 76, region: "Mato Grosso" },
          { label: "BA", value: 70, region: "Bahia" },
          { label: "TO", value: 68, region: "Tocantins" },
          { label: "MA", value: 65, region: "Maranhão" },
          { label: "RO", value: 64, region: "Rondônia" },
          { label: "MS", value: 62, region: "Mato Grosso do Sul" }
        ],
        xAxisLabel: "Estado",
        yAxisLabel: "Índice de Potencial (0-100)",
        source: "BioECO"
      },
      {
        title: "Riscos vs. Oportunidades",
        description: "Comparação entre níveis de risco e potencial de oportunidade por bioma",
        type: "scatter",
        data: [
          { label: "Amazônia", value: 85, category: "oportunidade", region: "Amazônia" },
          { label: "Amazônia", value: 65, category: "risco", region: "Amazônia" },
          { label: "Cerrado", value: 75, category: "oportunidade", region: "Cerrado" },
          { label: "Cerrado", value: 60, category: "risco", region: "Cerrado" },
          { label: "Mata Atlântica", value: 65, category: "oportunidade", region: "Mata Atlântica" },
          { label: "Mata Atlântica", value: 50, category: "risco", region: "Mata Atlântica" },
          { label: "Caatinga", value: 70, category: "oportunidade", region: "Caatinga" },
          { label: "Caatinga", value: 80, category: "risco", region: "Caatinga" },
          { label: "Pantanal", value: 75, category: "oportunidade", region: "Pantanal" },
          { label: "Pantanal", value: 70, category: "risco", region: "Pantanal" }
        ],
        xAxisLabel: "Risco",
        yAxisLabel: "Oportunidade",
        source: "BioECO + MapBiomas"
      }
    ],
    maps: [
      {
        title: "Aptidão para Sistemas Agroflorestais",
        description: "Percentual do território com aptidão para Sistemas Agroflorestais",
        regions: [
          { name: "Mato Grosso", value: 65, coordinates: { lat: -12.748013, lng: -56.071999 } },
          { name: "Pará", value: 70, coordinates: { lat: -4.239015, lng: -52.151279 } },
          { name: "Amazonas", value: 75, coordinates: { lat: -3.976318, lng: -64.399582 } },
          { name: "Bahia", value: 55, coordinates: { lat: -12.197327, lng: -43.516391 } },
          { name: "Rondônia", value: 60, coordinates: { lat: -10.943364, lng: -62.800964 } }
        ],
        legend: {
          title: "% de Aptidão para SAF",
          items: [
            { label: "0-20%", color: "#EDF8FB" },
            { label: "21-40%", color: "#B2E2E2" },
            { label: "41-60%", color: "#66C2A4" },
            { label: "61-80%", color: "#2CA25F" },
            { label: ">80%", color: "#006D2C" }
          ]
        },
        source: "BioECO + MapBiomas"
      }
    ],
    publicSources: [
      { name: "MapBiomas", dataPoints: ["uso do solo", "mudanças de cobertura"] },
      { name: "INPE", dataPoints: ["dados climáticos", "alertas de desmatamento"] },
      { name: "Embrapa", dataPoints: ["aptidão agrícola", "zoneamento agroecológico"] }
    ],
    insights: [
      "50% do território de Mato Grosso tem alta aptidão para sistemas agroflorestais",
      "Regiões com maior risco climático apresentam 35% mais diversificação produtiva",
      "Áreas de transição entre biomas mostram maior potencial para iniciativas inovadoras"
    ]
  }
];

// Mock trend analysis data
export const trendAnalysis: TrendAnalysis[] = [
  {
    id: "trend-1",
    title: "Análise de Tendências da Bioeconomia 2021-2023",
    description: "Comparação de principais indicadores ao longo dos últimos 3 anos com projeções",
    period: {
      start: "2021-01-01",
      end: "2023-12-31"
    },
    comparisonPeriod: {
      start: "2018-01-01",
      end: "2020-12-31"
    },
    metrics: [
      { 
        name: "Projetos de Bioeconomia",
        currentValue: 500,
        previousValue: 320,
        change: 56.25,
        unit: "projetos",
        trend: "up",
        projection: 720,
        projectionYear: "2025"
      },
      { 
        name: "Volume de Transações",
        currentValue: 10000000,
        previousValue: 6500000,
        change: 53.85,
        unit: "BRL",
        trend: "up",
        projection: 16000000,
        projectionYear: "2025"
      },
      { 
        name: "Área Restaurada",
        currentValue: 300,
        previousValue: 180,
        change: 66.67,
        unit: "hectares",
        trend: "up",
        projection: 550,
        projectionYear: "2025"
      },
      { 
        name: "Comunidades Envolvidas",
        currentValue: 120,
        previousValue: 70,
        change: 71.43,
        unit: "comunidades",
        trend: "up",
        projection: 200,
        projectionYear: "2025"
      },
      { 
        name: "Emissões Evitadas",
        currentValue: 10000,
        previousValue: 5500,
        change: 81.82,
        unit: "tCO₂e",
        trend: "up",
        projection: 18000,
        projectionYear: "2025"
      }
    ],
    regionalComparison: [
      {
        regionName: "Norte",
        metrics: [
          { name: "Projetos", value: 200, benchmark: 125, unit: "projetos" },
          { name: "Transações", value: 4500000, benchmark: 3000000, unit: "BRL" },
          { name: "Área Restaurada", value: 120, benchmark: 75, unit: "hectares" }
        ]
      },
      {
        regionName: "Nordeste",
        metrics: [
          { name: "Projetos", value: 150, benchmark: 85, unit: "projetos" },
          { name: "Transações", value: 2800000, benchmark: 1800000, unit: "BRL" },
          { name: "Área Restaurada", value: 80, benchmark: 45, unit: "hectares" }
        ]
      },
      {
        regionName: "Centro-Oeste",
        metrics: [
          { name: "Projetos", value: 90, benchmark: 60, unit: "projetos" },
          { name: "Transações", value: 1500000, benchmark: 1000000, unit: "BRL" },
          { name: "Área Restaurada", value: 50, benchmark: 35, unit: "hectares" }
        ]
      },
      {
        regionName: "Sudeste",
        metrics: [
          { name: "Projetos", value: 40, benchmark: 35, unit: "projetos" },
          { name: "Transações", value: 800000, benchmark: 500000, unit: "BRL" },
          { name: "Área Restaurada", value: 30, benchmark: 15, unit: "hectares" }
        ]
      },
      {
        regionName: "Sul",
        metrics: [
          { name: "Projetos", value: 20, benchmark: 15, unit: "projetos" },
          { name: "Transações", value: 400000, benchmark: 200000, unit: "BRL" },
          { name: "Área Restaurada", value: 20, benchmark: 10, unit: "hectares" }
        ]
      }
    ],
    correlations: [
      {
        metric1: "Projetos com Participação Comunitária",
        metric2: "Taxa de Sucesso",
        correlation: 0.85,
        significance: 0.001
      },
      {
        metric1: "Diversidade de Espécies",
        metric2: "Resiliência a Eventos Climáticos",
        correlation: 0.78,
        significance: 0.005
      },
      {
        metric1: "Investimento em Capacitação",
        metric2: "Produtividade",
        correlation: 0.72,
        significance: 0.01
      },
      {
        metric1: "Participação Feminina",
        metric2: "Inclusão Social",
        correlation: 0.81,
        significance: 0.002
      },
      {
        metric1: "Certificações",
        metric2: "Valor de Mercado",
        correlation: 0.76,
        significance: 0.007
      }
    ],
    charts: [
      {
        title: "Evolução de Indicadores-Chave",
        description: "Crescimento percentual dos principais indicadores (2021-2023)",
        type: "bar",
        data: [
          { label: "Projetos", value: 56.25, category: "crescimento" },
          { label: "Transações", value: 53.85, category: "crescimento" },
          { label: "Área Restaurada", value: 66.67, category: "crescimento" },
          { label: "Comunidades", value: 71.43, category: "crescimento" },
          { label: "Emissões Evitadas", value: 81.82, category: "crescimento" }
        ],
        xAxisLabel: "Indicador",
        yAxisLabel: "Crescimento (%)",
        source: "BioECO"
      },
      {
        title: "Projeções para 2025",
        description: "Valores atuais vs. projeções para principais métricas",
        type: "bar",
        data: [
          { label: "Projetos", value: 500, category: "atual" },
          { label: "Projetos", value: 720, category: "projeção" },
          { label: "Transações (milhões R$)", value: 10, category: "atual" },
          { label: "Transações (milhões R$)", value: 16, category: "projeção" },
          { label: "Área Rest. (ha x10)", value: 30, category: "atual" },
          { label: "Área Rest. (ha x10)", value: 55, category: "projeção" },
          { label: "Comunidades", value: 120, category: "atual" },
          { label: "Comunidades", value: 200, category: "projeção" },
          { label: "Emissões (tCO₂e x1000)", value: 10, category: "atual" },
          { label: "Emissões (tCO₂e x1000)", value: 18, category: "projeção" }
        ],
        xAxisLabel: "Métrica",
        yAxisLabel: "Valor",
        source: "BioECO (projeções baseadas em tendências históricas)"
      }
    ]
  }
];
