import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScreenOneComponent } from "./views/screen-one/screen-one.component";
import { ScreenTwoComponent } from "./views/screen-two/screen-two.component";
import { ScreenThreeComponent } from "./views/screen-three/screen-three.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { countryReducer } from "./store/country/country.reducer";
import { CountryEffects } from "./store/country/country.effects";
import { continentReducer } from "./store/continent/continent.reducer";
import { ContinentEffects } from "./store/continent/continent.effects";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CountryPageComponent } from "./views/country-page/country-page.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ScreenOneComponent,
    ScreenTwoComponent,
    ScreenThreeComponent,
    HeaderComponent,
    CountryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      country: countryReducer,
      continent: continentReducer,
    }),
    EffectsModule.forRoot([CountryEffects, ContinentEffects]),
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
