
export interface MapPoint {
  id: string;
  type: 'project' | 'policy' | 'finance';
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  sector?: string;
  status?: string;
  amount?: string;
  region: string;
}

export interface BiodiversityMapProps {
  filter: string;
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}
