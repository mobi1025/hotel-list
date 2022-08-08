import { CurrencyEnum } from '../enums';
import { RoundCurrencyPipe } from './round-currency.pipe';

describe('RoundCurrencyPipe', () => {
  const roundCurrencyPipe = new RoundCurrencyPipe();

  it('should round to nearest dollar for SGD', () => {
    expect(roundCurrencyPipe.transform(212.39, CurrencyEnum.SGD)).toEqual(212);
  });

  it('should round to nearest 100 dollar for KRW', () => {
    expect(roundCurrencyPipe.transform(106427.55, CurrencyEnum.KRW)).toEqual(
      106400
    );
  });
});
