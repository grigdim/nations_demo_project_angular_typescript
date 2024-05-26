import { CountryStats } from "./countryStats.model";
import { CountryLanguage } from "./language.model";

export class Country {
  countryId: number;
  countryName: string;
  countryArea: number;
  nationalDay: Date;
  countryCode2: string;
  countryCode3: string;
  regionId: number;
  countryLanguages: CountryLanguage[];
  countryStats: CountryStats[];
  year?: number;
  population?: number;
  gdp?: number;
}
