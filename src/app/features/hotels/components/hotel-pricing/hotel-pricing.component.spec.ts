import { CurrencyPipe, PercentPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { first } from 'rxjs/operators';
import { CurrencyEnum } from './../../enums/currency.enum';
import { RoundCurrencyPipe } from './../../pipes/round-currency.pipe';
import { HotelPricingComponent } from './hotel-pricing.component';

describe('HotelPricingComponent', () => {
  let component: HotelPricingComponent;
  let fixture: ComponentFixture<HotelPricingComponent>;
  let debugElement: DebugElement;
  let hotelPricingContainer: DebugElement;
  let currencyPipe: CurrencyPipe;
  let percentPipe: PercentPipe;
  const roundCurrencyPipe = new RoundCurrencyPipe();
  const selectedCurrency = CurrencyEnum.SGD;

  const formatRate = (value: number, currency: CurrencyEnum) => {
    return currencyPipe.transform(
      roundCurrencyPipe.transform(value, currency),
      selectedCurrency,
      'symbol',
      '1.0-0'
    ) as string;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TuiButtonModule, TuiTooltipModule, TuiHintModule],
      declarations: [RoundCurrencyPipe, HotelPricingComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        CurrencyPipe,
        PercentPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPricingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    hotelPricingContainer = debugElement.query(By.css('div'));
    currencyPipe = TestBed.inject(CurrencyPipe);
    percentPipe = TestBed.inject(PercentPipe);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show no rate', () => {
    expect(component).toBeDefined();

    const noRateMessage = hotelPricingContainer.query(By.css('h4'));

    expect(
      (
        hotelPricingContainer.nativeElement as HTMLDivElement
      ).className.includes('justify-center text-center')
    ).toBeTruthy();

    expect(
      (noRateMessage.nativeElement as HTMLHeadingElement).innerText
    ).toEqual('Rates unavailable');
  });

  it('should show only our price', () => {
    const testData = {
      price: 164,
    };

    component.currency = selectedCurrency;
    component.hotelPrice = testData;

    fixture.detectChanges();

    expect(component.currency).toEqual(selectedCurrency);
    expect(component.hotelPrice).toEqual(testData);
    expect(component.savePercentage).not.toBeDefined();
    expect(component.highestPrice).not.toBeDefined();

    const highestPriceElement = hotelPricingContainer.query(
      By.css('p.strikethrough')
    );
    const priceElement = hotelPricingContainer.query(By.css('h4'));
    const savePercentageElement = hotelPricingContainer.query(
      By.css('div.rounded.border-green-600')
    );
    const taxesAndFeesElement = hotelPricingContainer.query(
      By.css('div.flex.items-center:not(.rounded) span')
    );

    expect(
      (priceElement.nativeElement as HTMLHeadingElement).innerText
    ).toEqual(formatRate(testData.price, selectedCurrency));
    expect(highestPriceElement).toBeNull();
    expect(savePercentageElement).toBeNull();
    expect(taxesAndFeesElement).toBeNull();
  });

  it('should show our price, competior price, saving, taxes and fees', () => {
    const testData = {
      price: 164,
      competitors: { Traveloka: 190, Expedia: 163 },
      taxes_and_fees: { tax: 13.12, hotel_fees: 16.4 },
    };

    component.currency = selectedCurrency;
    component.hotelPrice = testData;

    fixture.detectChanges();

    expect(component.currency).toEqual(selectedCurrency);
    expect(component.hotelPrice).toEqual(testData);
    expect(component.savePercentage).toEqual(
      (190 - testData.price) / testData.price
    );
    expect(component.highestPrice).toEqual(190);

    const highestPriceElement = hotelPricingContainer.query(
      By.css('p.strikethrough')
    );
    const priceElement = hotelPricingContainer.query(By.css('h4'));
    const savePercentageElement = hotelPricingContainer.query(
      By.css('div.rounded.border-green-600 span:nth-child(2)')
    );
    const taxesAndFeesElement = hotelPricingContainer.query(
      By.css('div.flex.items-center:not(.rounded) span')
    );

    expect(highestPriceElement).toBeDefined();
    expect(
      (highestPriceElement.nativeElement as HTMLParagraphElement).innerText
    ).toEqual(formatRate(190, selectedCurrency));

    expect(priceElement).toBeDefined();
    expect(
      (priceElement.nativeElement as HTMLHeadingElement).innerText
    ).toEqual(formatRate(testData.price, selectedCurrency));

    expect(savePercentageElement).toBeDefined();
    expect(
      (savePercentageElement.nativeElement as HTMLSpanElement).innerText
    ).toEqual(
      percentPipe.transform((190 - testData.price) / testData.price) as string
    );

    expect(taxesAndFeesElement).toBeDefined();
    expect(
      (taxesAndFeesElement.nativeElement as HTMLSpanElement).innerText
    ).toEqual('inclued taxes and fees');
  });

  it('should emit viewDeal event when clicked on viewDeal button', (done) => {
    const testData = {
      price: 164,
    };

    component.hotelPrice = testData;

    fixture.detectChanges();

    component.viewDealClicked.pipe(first()).subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    const button = debugElement.query(By.css('button[tuiButton]'));

    button.triggerEventHandler('click', new Event('click'));
  });
});
