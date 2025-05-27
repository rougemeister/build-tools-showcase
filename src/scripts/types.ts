export interface BuildToolList {
    buildTools: BuildTool[];
  }

export interface BuildTool {
    id: string;
    name: string;
    description: string;
    category: string;
    color: string;
    logo: string;
    website: string;
    popularity: string;
}
  