import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Country } from "../../models/country.model";
import { countryState } from "../../store/country/country.reducer";

@Component({
  selector: "app-country-page",
  templateUrl: "./country-page.component.html",
  styleUrls: ["./country-page.component.scss"],
})
export class CountryPageComponent {
  selectedCountry$: Observable<Country>;

  constructor(private store: Store<{ country: countryState }>) {
    this.selectedCountry$ = this.store.pipe(
      select("country", "selectedCountry")
    );
  }

  ngOnInit() {}
}
