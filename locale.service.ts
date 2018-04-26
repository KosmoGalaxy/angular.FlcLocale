import {Injectable} from '@angular/core';
import {Locale} from "./locale";
import {TranslationMap} from "./translation-map";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/filter";

@Injectable()
export class LocaleService {

  private _locale$: BehaviorSubject<Locale> = new BehaviorSubject(null);
  private _update$: Subject<null> = new Subject();
  private _change$: Subject<Locale> = new Subject();
  private _translationMaps: Map<Locale, TranslationMap> = new Map();

  constructor() {
    this._bindChange();
  }

  setLocale(locale: Locale) {
    this._locale$.next(locale);
  }

  getLocale(): Locale {
    return this._locale$.value;
  }

  getLocale$(): Observable<Locale> {
    return this._locale$
      .asObservable()
      .filter(l => l !== null);
  }

  setTranslation(locale: Locale, key: string, value: string) {
    this._getTranslationMap(locale).setTranslation(key, value);
    this._update();
  }

  setTranslationsFromText(locale: Locale, text: string) {
    this._getTranslationMap(locale).setTranslationsFromText(text);
    this._update();
  }

  getTranslation(key: string, locale: Locale = null): string {
    locale = locale || this._locale$.value;
    return locale ? this._getTranslationMap(locale).getTranslation(key) : null;
  }

  onChange(): Observable<Locale> {
    return this._change$.asObservable();
  }

  private _update() {
    this._update$.next();
  }

  private _bindChange() {
    Observable.combineLatest(
      this._locale$,
      this._update$,
      locale => locale
    )
    .filter(locale => !!locale)
    .subscribe(this._change$);
  }

  private _getTranslationMap(locale: Locale): TranslationMap {
    if (!this._translationMaps.has(locale)) {
      this._translationMaps.set(locale, new TranslationMap());
    }
    return this._translationMaps.get(locale);
  }

}
