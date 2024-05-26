import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ContinentService } from "../../services/continent.service";
import * as ContinentActions from "./continent.actions";

@Injectable()
export class ContinentEffects {
  loadContinents = createEffect(() =>
    this.actions$.pipe(
      ofType(ContinentActions.LOAD_CONTINENTS),
      switchMap(() =>
        this.continentService.getContinents().pipe(
          map(
            (continents) =>
              new ContinentActions.LoadContinentsSuccess({ continents })
          ),
          catchError((error) =>
            of(new ContinentActions.LoadContinentsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private continentService: ContinentService
  ) {}
}
