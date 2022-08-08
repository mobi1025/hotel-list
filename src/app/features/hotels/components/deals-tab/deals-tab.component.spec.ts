import { CurrencyPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TuiHintModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { CurrencyEnum } from './../../enums/currency.enum';
import { RoundCurrencyPipe } from './../../pipes/round-currency.pipe';
import { MessageComponent } from './../message/message.component';
import { DealsInterface, DealsTabComponent } from './deals-tab.component';

describe('DealsTabComponent', () => {
  let component: DealsTabComponent;
  let fixture: ComponentFixture<DealsTabComponent>;
  let debugElement: DebugElement;
  let currencyPipe: CurrencyPipe;
  const roundCurrencyPipe = new RoundCurrencyPipe();
  const testData = {
    price: 164,
    competitorPrices: { Traveloka: 190, Expedia: 163 },
    taxesAndFees: { tax: 13.12, hotel_fees: 16.4 },
    currency: CurrencyEnum.SGD,
  };
  const checkDealItem = (
    dealComponents: DebugElement[],
    deals: DealsInterface[],
    checkForTaxesAndFees = false
  ) => {
    for (let i = 0; i < dealComponents.length; i++) {
      const dealComponent = dealComponents[i];
      const dealName = dealComponent.query(By.css('h5'));
      const price = dealComponent.query(By.css('div h4'));
      const taxesAndFees = dealComponent.query(By.css('div div span'));

      expect((dealName.nativeElement as HTMLHeadingElement).innerText).toEqual(
        deals[i].name
      );

      expect((price.nativeElement as HTMLHeadingElement).innerText).toEqual(
        currencyPipe.transform(
          roundCurrencyPipe.transform(deals[i].price, testData.currency),
          testData.currency,
          'symbol',
          '1.0-0'
        ) as string
      );

      if (checkForTaxesAndFees && deals[i].taxesAndFees) {
        expect(taxesAndFees).toBeDefined();
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TuiIslandModule, TuiTooltipModule, TuiHintModule],
      declarations: [MessageComponent, RoundCurrencyPipe, DealsTabComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        CurrencyPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsTabComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    currencyPipe = TestBed.inject(CurrencyPipe);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show no deals', () => {
    component.currency = testData.currency;

    component.ngOnChanges();

    fixture.detectChanges();

    const message = debugElement.query(By.css('app-message'));

    expect(message).toBeDefined();
  });

  it('should show only our deal', () => {
    component.currency = testData.currency;
    component.price = testData.price;

    component.ngOnChanges();

    const deals = component.deals;
    expect(deals.length).toEqual(1);

    fixture.detectChanges();

    const dealComponents = debugElement.queryAll(By.css('tui-island'));

    expect(dealComponents.length).toBeDefined(component.deals.length);

    checkDealItem(dealComponents, deals);
  });

  it('should show deals', () => {
    component.currency = testData.currency;
    component.price = testData.price;
    component.competitorPrices = testData.competitorPrices;
    component.taxesAndFees = testData.taxesAndFees;

    component.ngOnChanges();

    const deals = component.deals;
    expect(deals.length).toEqual(3);

    fixture.detectChanges();

    const dealComponents = debugElement.queryAll(By.css('tui-island'));

    expect(dealComponents.length).toBeDefined(component.deals.length);

    checkDealItem(dealComponents, deals, true);
  });
});
