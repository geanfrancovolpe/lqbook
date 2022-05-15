import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LANGUAGES } from "src/app/lang/languages";

/**
 * Language interface
 */
interface ILanguage {
  actualLanguage:string;
  languageObject:any;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language: BehaviorSubject<ILanguage> = new BehaviorSubject<ILanguage>(
    {
      "actualLanguage":  "ENG",
      "languageObject":  LANGUAGES["ENG"]
    }
  );

  constructor() { }

  /**
   * Setter & getter for language
   *
   * @param value
   */
  set language(value: string)
  {
      // Store the value
      this._language.next(
        { 
          "actualLanguage": value,
          "languageObject": LANGUAGES[value]
        }
      );
  }
 
  /**
    * Make language data available to every component
    */
  get language$(): Observable<any>
  {
      return this._language.asObservable();
  }

}
