import { Action } from "@ngrx/store";
import { Continent } from "../../models/continent.model";

export const LOAD_CONTINENTS = "[Continent] Load Continents";
export const LOAD_CONTINENTS_SUCCESS = "[Continent] Load Continents Success";
export const LOAD_CONTINENTS_FAILURE = "[Continent] Load Continents Failure";

export class LoadContinents implements Action {
  readonly type = LOAD_CONTINENTS;
}

export class LoadContinentsSuccess implements Action {
  readonly type = LOAD_CONTINENTS_SUCCESS;
  constructor(public payload: { continents: Continent[] }) {}
}

export class LoadContinentsFailure implements Action {
  readonly type = LOAD_CONTINENTS_FAILURE;
  constructor(public payload: { error: any }) {}
}

export type ContinentActions =
  | LoadContinents
  | LoadContinentsSuccess
  | LoadContinentsFailure;
