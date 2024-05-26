import { Action } from "@ngrx/store";
import { Country } from "../../models/country.model";

export const LOAD_COUNTRIES = "[Country] Load Countries";
export const LOAD_COUNTRIES_SUCCESS = "[Country] Load Countries Success";
export const LOAD_COUNTRIES_FAILURE = "[Country] Load Countries Failure";
export const SELECT_COUNTRY = "[Country] Select Country";

export class LoadCountries implements Action {
  readonly type = LOAD_COUNTRIES;
}

export class LoadCountriesSuccess implements Action {
  readonly type = LOAD_COUNTRIES_SUCCESS;
  constructor(public payload: { countries: Country[] }) {}
}

export class LoadCountriesFailure implements Action {
  readonly type = LOAD_COUNTRIES_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class SelectCountry implements Action {
  readonly type = SELECT_COUNTRY;
  constructor(public payload: { country: Country }) {}
}

export type CountryActions =
  | LoadCountries
  | LoadCountriesSuccess
  | LoadCountriesFailure
  | SelectCountry;
