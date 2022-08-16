import {LOCALE_ID, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig} from 'ng2-currency-mask';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AppLayoutModule} from './core/theme/app.layout.module';

import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {MessageService} from "primeng/api";

registerLocaleData(localePt, 'pt-BR');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  imports: [
    AppRoutingModule,
    AppLayoutModule
  ],
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
