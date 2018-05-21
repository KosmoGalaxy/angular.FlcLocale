import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {LocaleService} from "./locale.service";
import {Locale} from "./locale";
import {TranslationObject} from "./translation-object";
import {Subscription} from "rxjs/Subscription";
import * as _ from "lodash";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {

  private _isChange: boolean = true;
  private _lastValue: string | TranslationObject;
  private _lastReturnedValue: string;
  private _localeChangeSub: Subscription;

  constructor(
    private _ref: ChangeDetectorRef,
    private _localeService: LocaleService
  ) {
    this._bindLocaleChange();
  }

  transform(value: any, args?: any): any {
    if (value != this._lastValue) {
      this._lastValue = value;
      this._isChange = true;
    }
    if (this._isChange) {
      this._lastReturnedValue = this._processValue(value);
    }
    this._isChange = false;
    return this._lastReturnedValue;
  }

  ngOnDestroy() {
    this._unbindLocaleChange();
  }

  private _processValue(value: string | TranslationObject): string {
    if (_.isString(value)) {
      return this._processString(value as string);
    } else if (_.isObject(value)) {
      return this._processTranslationObject(value as TranslationObject);
    }
  }

  private _processString(value: string): string {
    const returnedValue: string = this._localeService.getTranslation(value);
    return returnedValue || value;
  }

  private _processTranslationObject(value: TranslationObject): string {
    const locale: Locale = this._localeService.getLocale();
    return value[locale];
  }

  private _bindLocaleChange() {
    this._localeChangeSub = this._localeService.onChange()
    .subscribe(() => {
      this._isChange = true;
      this._ref.detectChanges();
    });
  }

  private _unbindLocaleChange() {
    if (this._localeChangeSub) {
      this._localeChangeSub.unsubscribe();
    }
  }

}
