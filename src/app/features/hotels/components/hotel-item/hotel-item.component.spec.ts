import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiIslandModule,
  TuiRatingModule,
  TuiSelectModule,
  TuiTabsComponent,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { of } from 'rxjs';
import { MOCK_LOCATIONS } from 'src/app/tests/mock-data';
import { CurrencyEnum } from '../../enums';
import { Hotel } from '../../models';
import { BypassSanitizerPipe, ShortLocationPipe } from '../../pipes';
import { LocationSearchService } from '../../services';
import { DealsTabComponent } from '../deals-tab/deals-tab.component';
import { HotelPricingComponent } from '../hotel-pricing/hotel-pricing.component';
import { InfoTabComponent } from '../info-tab/info-tab.component';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';
import { RoundCurrencyPipe } from './../../pipes/round-currency.pipe';
import { HotelItemComponent } from './hotel-item.component';

describe('HotelItemComponent', () => {
  let component: HotelItemComponent;
  let fixture: ComponentFixture<HotelItemComponent>;
  let debugElement: DebugElement;
  const shortLocationPipe = new ShortLocationPipe();
  const selectedCurrency = CurrencyEnum.SGD;
  const hotelItem: Hotel = {
    id: 1,
    name: 'Shinagawa Prince Hotel',
    rating: 7.7,
    stars: 4,
    address: '108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    description:
      '<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>',
    hotelPrice: {
      price: 164,
      competitors: { Traveloka: 190, Expedia: 163 },
      taxes_and_fees: { tax: 13.12, hotel_fees: 16.4 },
    },
  };

  const locationSearchService = jasmine.createSpyObj<LocationSearchService>(
    'LocationSearchService',
    ['searchLocation']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        TuiButtonModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiSvgModule,
        TuiIslandModule,
        TuiExpandModule,
        TuiRatingModule,
        TuiTooltipModule,
        TuiHintModule,
        TuiTabsModule,
        LeafletModule,
        TuiDataListWrapperModule,
      ],
      declarations: [
        RoundCurrencyPipe,
        RatingBadgeComponent,
        HotelItemComponent,
        ShortLocationPipe,
        HotelPricingComponent,
        InfoTabComponent,
        DealsTabComponent,
        BypassSanitizerPipe,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: LocationSearchService, useValue: locationSearchService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.hotel = hotelItem;
    component.currency = selectedCurrency;
    locationSearchService.searchLocation.and.returnValue(of(MOCK_LOCATIONS));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should expand panel when click on toggleExpand', () => {
    const toggleExpandContainer = debugElement.query(
      By.css('div.flex.items-center.justify-center.px-4.py-2.text-tui-text-02')
    );
    const toggleExpandText = toggleExpandContainer.query(By.css('p'));

    expect(component.expanded).toBeFalse();
    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Show hotel details');

    toggleExpandContainer.triggerEventHandler('click', new Event('click'));
    expect(component.expanded).toBeTrue();
    expect(component.activeTabIndex).toEqual(0);

    fixture.detectChanges();

    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Hide hotel details');

    const tuiExpandComponent = debugElement.query(By.css('tui-expand'));
    const tabButtons = tuiExpandComponent.queryAll(
      By.css('tui-tabs button[tuitab]')
    );
    const infoTab = tuiExpandComponent.query(By.css('app-info-tab'));
    const dealsTab = tuiExpandComponent.query(By.css('app-deals-tab'));

    expect(tabButtons.length).toEqual(2);
    expect(
      (tabButtons[0].nativeElement as HTMLButtonElement).className.includes(
        '_active'
      )
    ).toBeTrue();
    expect(infoTab).toBeDefined();
    expect(dealsTab).toBeNull();
  });

  it('should hide panel when click on toggleExpand and expand is open', () => {
    const toggleExpandContainer = debugElement.query(
      By.css('div.flex.items-center.justify-center.px-4.py-2.text-tui-text-02')
    );
    const toggleExpandText = toggleExpandContainer.query(By.css('p'));

    expect(component.expanded).toBeFalse();
    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Show hotel details');

    toggleExpandContainer.triggerEventHandler('click', new Event('click'));
    expect(component.expanded).toBeTrue();
    expect(component.activeTabIndex).toEqual(0);

    fixture.detectChanges();

    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Hide hotel details');

    toggleExpandContainer.triggerEventHandler('click', new Event('click'));
    expect(component.expanded).toBeFalse();

    fixture.detectChanges(true);

    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Show hotel details');
  });

  it('should change tab when click on tab button', () => {
    const toggleExpandContainer = debugElement.query(
      By.css('div.flex.items-center.justify-center.px-4.py-2.text-tui-text-02')
    );
    const toggleExpandText = toggleExpandContainer.query(By.css('p'));

    expect(component.expanded).toBeFalse();
    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Show hotel details');

    toggleExpandContainer.triggerEventHandler('click', new Event('click'));
    expect(component.expanded).toBeTrue();
    expect(component.activeTabIndex).toEqual(0);

    fixture.detectChanges();

    const tuiExpandComponent = debugElement.query(By.css('tui-expand'));
    const tuiTabs = tuiExpandComponent.query(By.css('tui-tabs'));
    const tabButtons = tuiTabs.queryAll(By.css('button[tuitab]'));
    expect(tabButtons.length).toEqual(2);

    fixture.detectChanges();

    (tabButtons[1].nativeElement as HTMLButtonElement).dispatchEvent(
      new Event('click')
    );

    const tuiTabsComponent = tuiTabs.componentInstance as TuiTabsComponent;
    tuiTabsComponent.activeItemIndex = 1;
    tuiTabsComponent.activeItemIndexChange.emit(1);

    fixture.detectChanges();

    expect(component.activeTabIndex).toEqual(1);

    const infoTab = tuiExpandComponent.query(By.css('app-info-tab'));
    const dealsTab = tuiExpandComponent.query(By.css('app-deals-tab'));

    expect(
      (tabButtons[1].nativeElement as HTMLButtonElement).className.includes(
        '_active'
      )
    ).toBeTrue();
    expect(infoTab).toBeNull();
    expect(dealsTab).toBeDefined();
  });

  it('should open tab and select deal tab when clicked on view deal', () => {
    const toggleExpandContainer = debugElement.query(
      By.css('div.flex.items-center.justify-center.px-4.py-2.text-tui-text-02')
    );
    const toggleExpandText = toggleExpandContainer.query(By.css('p'));

    expect(component.expanded).toBeFalse();
    expect(
      (toggleExpandText.nativeElement as HTMLParagraphElement).innerHTML
    ).toEqual('Show hotel details');

    const viewDealButton = debugElement.query(
      By.css('app-hotel-pricing button[tuiButton]')
    );
    viewDealButton.triggerEventHandler('click', new Event('click'));
    expect(component.expanded).toBeTrue();
    expect(component.activeTabIndex).toEqual(1);

    fixture.detectChanges();

    const tuiExpandComponent = debugElement.query(By.css('tui-expand'));
    const tuiTabs = tuiExpandComponent.query(By.css('tui-tabs'));
    const tabButtons = tuiTabs.queryAll(By.css('button[tuitab]'));
    expect(tabButtons.length).toEqual(2);

    fixture.detectChanges();

    const infoTab = tuiExpandComponent.query(By.css('app-info-tab'));
    const dealsTab = tuiExpandComponent.query(By.css('app-deals-tab'));

    expect(
      (tabButtons[1].nativeElement as HTMLButtonElement).className.includes(
        '_active'
      )
    ).toBeTrue();
    expect(infoTab).toBeNull();
    expect(dealsTab).toBeDefined();
  });
});
