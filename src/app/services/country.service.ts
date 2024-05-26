import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country.model";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private baseUrl = "http://localhost:8080/countries";

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<Country[]>(this.baseUrl);
  }
  getCountryById(id: number): Observable<any[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country[]>(url);
  }
}
