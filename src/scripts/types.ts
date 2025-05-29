export interface BuildTool {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  logo: string;
  website: string;
  popularity: 'high' | 'medium' | 'low' | 'growing';
}

export interface BuildToolsData {
  buildTools: BuildTool[];
}

// Render configuration
export interface RenderOptions {
  containerSelector?: string;
  showCategory?: boolean;
  showPopularity?: boolean;
  groupByCategory?: boolean;
  sortBy?: 'name' | 'popularity' | 'category';
  cardClassName?: string;
  enableSearch?: boolean;
  enableFilters?: boolean;
}

export interface LoadOptions extends RenderOptions {
  jsonPath?: string;
}