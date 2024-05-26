import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, map, tap } from "rxjs";
import { Continent } from "../../models/continent.model";
import { continentState } from "../../store/continent/continent.reducer";
import * as ContinentActions from "../../store/continent/continent.actions";

@Component({
  selector: "app-screen-three",
  templateUrl: "./screen-three.component.html",
  styleUrls: ["./screen-three.component.scss"],
})
export class ScreenThreeComponent {
  continents$: Observable<Continent[]>;
  regions: String[];
  collapsed: any;
  loading: boolean = true;
  selectedRegion: string = "";
  years: number[] = [];
  selectedStartYear: number = null;
  selectedEndYear: number = null;

  constructor(private store: Store<{ continent: continentState }>) {
    this.continents$ = this.store.pipe(
      select("continent", "continents"),
      tap((continents) => {
        if (continents.length > 0) {
          const collapsedContinents = continents.map((continent) => ({
            [continent.continentName]: true,
          }));

          const collapsedRegions = continents.reduce((acc, continent) => {
            acc.push(
              ...continent.regions.map((region) => ({
                [region.regionName]: true,
              }))
            );
            return acc;
          }, []);

          const collapsedCountries = continents.reduce((acc, continent) => {
            continent.regions.forEach((region) => {
              acc.push(
                ...region.countries.map((country) => ({
                  [country.countryName]: true,
                }))
              );
            });
            return acc;
          }, []);

          this.collapsed = {
            ...this.collapsed,
            continents: collapsedContinents,
            regions: collapsedRegions,
            countries: collapsedCountries,
          };

          this.loading = false;
        }
      })
    );
    this.store.pipe(select("continent", "regions")).subscribe((regions) => {
      this.regions = regions;
    });
    for (let i = 2024; i >= 1900; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.store.dispatch(new ContinentActions.LoadContinents());
    window.alert("Click on each Continent/Region/Country to expand");
  }

  filterContinents() {
    this.continents$ = this.store.pipe(
      select("continent", "continents"),
      map((continents) =>
        continents
          .filter(
            (continent) =>
              !this.selectedRegion ||
              continent.regions.some(
                (region) => region.regionName === this.selectedRegion
              )
          )
          .map((continent) => {
            return {
              ...continent,
              regions: continent.regions
                .filter(
                  (region) =>
                    !this.selectedRegion ||
                    region.regionName === this.selectedRegion
                )
                .map((region) => {
                  return {
                    ...region,
                    countries: region.countries.map((country) => {
                      return {
                        ...country,
                        countryStats: country.countryStats.filter(
                          (stat) =>
                            (!this.selectedStartYear ||
                              stat.id.year >= this.selectedStartYear) &&
                            (!this.selectedEndYear ||
                              stat.id.year <= this.selectedEndYear)
                        ),
                      };
                    }),
                  };
                }),
            };
          })
      )
    );
  }

  onRegionSelected(target: EventTarget) {
    this.selectedRegion = (target as HTMLSelectElement).value;
    this.filterContinents();
  }

  onStartYearSelected(target: EventTarget) {
    const startYear = +(target as HTMLSelectElement).value;
    if (startYear > this.selectedEndYear) {
      this.selectedEndYear = null;
    }
    this.selectedStartYear = startYear;
    this.filterContinents();
  }

  onEndYearSelected(target: EventTarget) {
    const endYear = +(target as HTMLSelectElement).value;
    if (endYear < this.selectedStartYear) {
      this.selectedStartYear = null;
    }
    this.selectedEndYear = endYear;
    this.filterContinents();
  }

  shouldHideElement(name: string, location: string) {
    let elementToCheck: any;
    switch (location) {
      case "continent":
        elementToCheck = this.collapsed.continents.filter((c: {}) =>
          Object.keys(c).includes(name)
        )[0];
        return Object.values(elementToCheck)[0];
      case "region":
        elementToCheck = this.collapsed.regions.filter((c: {}) =>
          Object.keys(c).includes(name)
        )[0];
        return Object.values(elementToCheck)[0];
      case "country":
        elementToCheck = this.collapsed.countries.filter((c: {}) =>
          Object.keys(c).includes(name)
        )[0];
        return Object.values(elementToCheck)[0];
      default:
        return null;
    }
  }

  toggleVisibility(name: string, location: string) {
    switch (location) {
      case "continent":
        this.collapsed.continents = this.collapsed.continents.map((c: any) => {
          if (c.hasOwnProperty(name)) {
            c[name] = !c[name];
          }
          return c;
        });
        break;
      case "region":
        this.collapsed.regions = this.collapsed.regions.map((c: any) => {
          if (c.hasOwnProperty(name)) {
            c[name] = !c[name];
          }
          return c;
        });
        break;
      case "country":
        this.collapsed.countries = this.collapsed.countries.map((c: any) => {
          if (c.hasOwnProperty(name)) {
            c[name] = !c[name];
          }
          return c;
        });
        break;
      default:
        break;
    }
  }
}
