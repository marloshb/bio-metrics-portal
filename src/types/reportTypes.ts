
// Types for the Reports module

export interface ModuleData {
  id: string;
  name: string;
  value: number;
  trend: number; // percentage change
  unit: string;
}

export interface PublicDataSource {
  id: string;
  name: string;
  description: string;
  url: string;
  lastUpdated: string;
  dataCategories: string[];
}

export interface DataPoint {
  label: string;
  value: number;
  category?: string;
  region?: string;
  date?: string;
  unit?: string;
  source?: string;
}

export interface ChartData {
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'radar' | 'scatter';
  data: DataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  source?: string;
}

export interface MapData {
  title: string;
  description: string;
  regions: {
    name: string;
    value: number;
    coordinates: { lat: number; lng: number };
    color?: string;
  }[];
  legend?: {
    title: string;
    items: { label: string; color: string }[];
  };
  source?: string;
}

export interface ConsolidatedReport {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  modules: {
    name: string;
    data: ModuleData[];
  }[];
  charts: ChartData[];
  maps?: MapData[];
  tables?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
  }[];
  publicSources: string[];
}

export interface ModuleReport {
  id: string;
  moduleName: 'observatory' | 'hub' | 'strategies' | 'valuechain' | 'vocation';
  title: string;
  description: string;
  createdAt: string;
  period: {
    start: string;
    end: string;
  };
  keyMetrics: {
    name: string;
    value: number;
    unit: string;
    trend: number;
    interpretation?: string;
  }[];
  charts: ChartData[];
  maps?: MapData[];
  tables?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
  }[];
  publicSources: {
    name: string;
    dataPoints: string[];
  }[];
  insights: string[];
}

export interface ExportConfig {
  format: 'pdf' | 'excel' | 'csv';
  sections: string[];
  includeCharts: boolean;
  includeMaps: boolean;
  includeTables: boolean;
  includeRawData: boolean;
  fileName: string;
  template?: string;
}

export interface TrendAnalysis {
  id: string;
  title: string;
  description: string;
  period: {
    start: string;
    end: string;
  };
  comparisonPeriod?: {
    start: string;
    end: string;
  };
  metrics: {
    name: string;
    currentValue: number;
    previousValue: number;
    change: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    projection?: number;
    projectionYear?: string;
  }[];
  regionalComparison?: {
    regionName: string;
    metrics: {
      name: string;
      value: number;
      benchmark: number;
      unit: string;
    }[];
  }[];
  correlations?: {
    metric1: string;
    metric2: string;
    correlation: number; // -1 to 1
    significance: number; // p-value
  }[];
  charts: ChartData[];
}
