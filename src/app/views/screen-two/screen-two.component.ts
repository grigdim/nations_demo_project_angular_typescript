import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Country } from "../../models/country.model";
import { countryState } from "../../store/country/country.reducer";
import * as CountryActions from "../../store/country/country.actions";
import { map } from "rxjs/operators";

@Component({
  selector: "app-screen-two",
  templateUrl: "./screen-two.component.html",
  styleUrls: ["./screen-two.component.scss"],
})
export class ScreenTwoComponent implements OnInit {
  countries$: Observable<Country[]>;

  constructor(private store: Store<{ country: countryState }>) {
    this.countries$ = this.store.pipe(
      select("country", "countries"),
      map((countries) =>
        countries.map((country) => {
          if (country.countryStats.length > 0) {
            let statToRender = country.countryStats[0];
            country.countryStats.forEach((stat) => {
              if (
                stat.gdp / stat.population >=
                statToRender.gdp / statToRender.population
              ) {
                statToRender = stat;
              }
            });
            country = {
              ...country,
              year: statToRender.id.year,
              population: statToRender.population,
              gdp: statToRender.gdp,
            };
          }
          return country;
        })
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(new CountryActions.LoadCountries());
  }
}
