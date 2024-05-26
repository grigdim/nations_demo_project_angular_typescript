import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScreenOneComponent } from "./views/screen-one/screen-one.component";
import { ScreenTwoComponent } from "./views/screen-two/screen-two.component";
import { ScreenThreeComponent } from "./views/screen-three/screen-three.component";
import { CountryPageComponent } from "./views/country-page/country-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/screen_one", pathMatch: "full" },
  { path: "screen_one", component: ScreenOneComponent },
  { path: "screen_two", component: ScreenTwoComponent },
  { path: "screen_three", component: ScreenThreeComponent },
  { path: "countryPage", component: CountryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
