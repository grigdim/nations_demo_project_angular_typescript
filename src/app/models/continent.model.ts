import { Region } from "./region.model";

export class Continent {
  continentId: number;
  continentName: string;
  regions: Region[];
  currentPage?: number;
}
