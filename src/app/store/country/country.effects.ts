import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CountryService } from "../../services/country.service";
import * as CountryActions from "./country.actions";

@Injectable()
export class CountryEffects {
  loadCountries = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.LOAD_COUNTRIES),
      switchMap(() =>
        this.countryService.getCountries().pipe(
          map(
            (countries) =>
              new CountryActions.LoadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(new CountryActions.LoadCountriesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
