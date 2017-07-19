import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocaleService} from "./locale.service";
import {TranslatePipe} from "./translate.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslatePipe
  ],
  providers: [
    LocaleService
  ],
  exports: [
    TranslatePipe
  ]
})
export class FlcLocaleModule {}
