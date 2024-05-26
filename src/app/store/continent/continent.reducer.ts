import { Region } from "src/app/models/region.model";
import { Continent } from "../../models/continent.model";
import * as ContinentActions from "./continent.actions";

export interface continentState {
  continents: Continent[];
  regions: String[];
  loading: boolean;
  error: any;
}

export const initialState: continentState = {
  continents: [],
  regions: [],
  loading: false,
  error: null,
};

export function continentReducer(
  state = initialState,
  action: ContinentActions.ContinentActions
): continentState {
  switch (action.type) {
    case ContinentActions.LOAD_CONTINENTS:
      return {
        ...state,
        loading: true,
      };

    case ContinentActions.LOAD_CONTINENTS_SUCCESS:
      const sortedContinents = action.payload.continents
        .slice()
        .sort((a, b) => a.continentName.localeCompare(b.continentName))
        .map((continent) => ({
          ...continent,
          collapsed: true,
          regions: continent.regions
            .slice()
            .sort((a, b) => a.regionName.localeCompare(b.regionName))
            .map((region) => ({
              ...region,
              collapsed: true,
              countries: region.countries
                .slice()
                .sort((a, b) => a.countryName.localeCompare(b.countryName))
                .map((country) => ({
                  ...country,
                  collapsed: true,
                  countryStats: country.countryStats
                    .slice()
                    .sort((a, b) => a.id.year - b.id.year),
                })),
            })),
        }));

      const regionNames = sortedContinents.flatMap((continent) =>
        continent.regions.map((region) => region.regionName)
      );

      return {
        ...state,
        continents: sortedContinents,
        regions: regionNames,
        loading: false,
      };

    case ContinentActions.LOAD_CONTINENTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    default:
      return state;
  }
}
