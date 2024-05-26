import { Country } from "./country.model";

export class Region {
  regionId: number;
  regionName: string;
  countries: Country[];
  currentPage?: number;
}
