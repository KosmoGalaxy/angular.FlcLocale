import {Injectable} from '@angular/core';
import {Locale} from "./locale";
import {TranslationMap} from "./translation-map";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LocaleService {

  private _locale$: BehaviorSubject<Locale> = new BehaviorSubject(null);
  private _translationMaps: Map<Locale, TranslationMap> = new Map();

  constructor() {}

  setLocale(locale: Locale) {
    this._locale$.next(locale);
  }

  setTranslation(locale: Locale, key: string, value: string) {
    this.getTranslationMap(locale).setTranslation(key, value);
  }

  setTranslationsFromText(locale: Locale, text: string) {
    this.getTranslationMap(locale).setTranslationsFromText(text);
  }

  getTranslation(locale: Locale, key: string): string {
    return this.getTranslationMap(locale).getTranslation(key);
  }

  onLocale(): Observable<Locale> {
    return this._locale$.asObservable();
  }

  private getTranslationMap(locale: Locale): TranslationMap {
    if (!this._translationMaps.has(locale))
      this._translationMaps.set(locale, new TranslationMap());

    return this._translationMaps.get(locale);
  }

}
