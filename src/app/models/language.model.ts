export class Language {
  "languageId": number;
  "languageName": String;
}

export class CountryLanguage {
  "id": { countryId: number; languageId: number };
  "official": boolean;
  "languageName"?: string;
  "languageFlag"?: string;
}
