import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { EMPTY, Observable, catchError, map, of } from "rxjs";
import { Country } from "../../models/country.model";
import { countryState } from "../../store/country/country.reducer";
import * as CountryActions from "../../store/country/country.actions";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/services/language.service";
import { CountryLanguage } from "src/app/models/language.model";

@Component({
  selector: "app-screen-one",
  templateUrl: "./screen-one.component.html",
  styleUrls: ["./screen-one.component.scss"],
})
export class ScreenOneComponent {
  countries$: Observable<Country[]>;
  page: number = 0;
  countriesPerPage: number = 10;

  selectCountry(country: Country) {
    if (country) {
      this.languageService
        .fetchLanguages(country.countryLanguages)
        .pipe(
          map((languages: CountryLanguage[]) => {
            const updatedCountry = { ...country, countryLanguages: languages };
            this.store.dispatch(
              new CountryActions.SelectCountry({ country: updatedCountry })
            );
            this.router.navigate(["/countryPage"]);
          }),
          catchError((error) => {
            console.error("Error fetching languages:", error);
            return EMPTY;
          })
        )
        .subscribe();
    }
    this.store.dispatch(new CountryActions.SelectCountry({ country }));
  }

  constructor(
    private store: Store<{ country: countryState }>,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.countries$ = this.store.pipe(select("country", "countries"));

    this.store
      .pipe(select("country", "countries"))
      .subscribe((countries: Country[]) => {
        this.countries$ = this.paginateCountries(
          countries,
          this.page,
          this.countriesPerPage
        );
      });
  }

  paginateCountries(
    countries: Country[],
    page: number,
    perPage: number
  ): Observable<Country[]> {
    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;
    return of(countries.slice(startIndex, endIndex));
  }

  ngOnInit() {
    this.store.dispatch(new CountryActions.LoadCountries());
  }

  onChangePage(direction: string) {
    if (this.page >= 0)
      switch (direction) {
        case "right":
          this.page += 1;
          this.store
            .pipe(select("country", "countries"))
            .subscribe((countries: Country[]) => {
              this.countries$ = this.paginateCountries(
                countries,
                this.page,
                this.countriesPerPage
              );
            });
          break;
        case "left":
          if (this.page > 0) this.page -= 1;
          this.store
            .pipe(select("country", "countries"))
            .subscribe((countries: Country[]) => {
              this.countries$ = this.paginateCountries(
                countries,
                this.page,
                this.countriesPerPage
              );
            });
          break;

        default:
          break;
      }
  }

  onChangeCountriesPerPage(number: number) {
    this.countriesPerPage = number;
    this.store
      .pipe(select("country", "countries"))
      .subscribe((countries: Country[]) => {
        this.countries$ = this.paginateCountries(
          countries,
          this.page,
          this.countriesPerPage
        );
      });
  }
}
