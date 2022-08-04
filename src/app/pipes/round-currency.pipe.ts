import { CurrencyEnum } from './../enums/currency.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundCurrency',
})
export class RoundCurrencyPipe implements PipeTransform {
  transform(price: number, currency: CurrencyEnum): number {
    switch (currency) {
      case CurrencyEnum.USD:
      case CurrencyEnum.SGD:
      case CurrencyEnum.CNY: {
        // Rounded to the nearest dollar
        return Math.round(price);
      }
      case CurrencyEnum.KRW: {
        // Rouned to the nearest 100 dollar
        return Math.round(price / 100) * 100;
      }
    }
  }
}
