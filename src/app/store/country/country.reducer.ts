import { Country } from "../../models/country.model";
import * as CountryActions from "./country.actions";

export interface countryState {
  countries: Country[];
  selectedCountry: Country;
  loading: boolean;
  error: any;
}

export const initialState: countryState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null,
};

export function countryReducer(
  state = initialState,
  action: CountryActions.CountryActions
): countryState {
  switch (action.type) {
    case CountryActions.LOAD_COUNTRIES:
      return {
        ...state,
        loading: true,
      };

    case CountryActions.LOAD_COUNTRIES_SUCCESS:
      let countries: Country[] = action.payload.countries
        .slice()
        .sort((a, b) => {
          if (a.countryName > b.countryName) {
            return 1;
          } else if (a.countryName < b.countryName) {
            return -1;
          } else {
            return 0;
          }
        });

      return {
        ...state,
        countries: countries,
      };

    case CountryActions.LOAD_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case CountryActions.SELECT_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload.country,
      };

    default:
      return state;
  }
}
