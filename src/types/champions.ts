export interface Champion {
    img: string | Blob | undefined;
    name: string;
    gender: string;
    positions: string[];
    species: string[];
    resource: string;
    rangeType: string;
    region: string[];
    releaseYear: number;
  }