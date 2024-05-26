import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { Language } from "../models/language.model";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private baseUrl = "http://localhost:8080/languages";

  constructor(private http: HttpClient) {}

  fetchLanguages(languages: any[]): Observable<any[]> {
    const languageObservables = languages.map((languageObject: any) => {
      return this.getLanguageById(languageObject.id.languageId).pipe(
        map((language: Language) => {
          return { ...languageObject, languageName: language.languageName };
        })
      );
    });

    return forkJoin(languageObservables);
  }

  getLanguageById(id: number): Observable<Language> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Language>(url);
  }
}
