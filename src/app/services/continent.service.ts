import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContinentService {
  private baseUrl = "http://localhost:8080/continents";

  constructor(private http: HttpClient) {}

  getContinents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
