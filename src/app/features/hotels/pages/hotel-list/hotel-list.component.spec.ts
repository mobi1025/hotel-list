import { MOCK_HOTEL_PRICES_DATA_USD } from './../../../../tests/mock-data';
import { CurrencyEnum } from './../../enums/currency.enum';
import { MessageComponent } from './../../components/message/message.component';
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
  TuiTabsModule,
} from '@taiga-ui/kit';
import { of } from 'rxjs';
import {
  DealsTabComponent,
  HotelItemComponent,
  HotelPricingComponent,
  InfoTabComponent,
  RatingBadgeComponent,
} from '../../components';
import {
  BypassSanitizerPipe,
  RoundCurrencyPipe,
  ShortLocationPipe,
} from '../../pipes';
import { HotelsSerivce } from '../../services';
import { HotelListComponent } from './hotel-list.component';
import {
  MOCK_HOTELS_DATA,
  MOCK_HOTEL_PRICES_DATA,
} from 'src/app/tests/mock-data';
import { HotelInterface, PriceInterface } from '../../models';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let debugElement: DebugElement;

  const hotelsService = jasmine.createSpyObj<HotelsSerivce>('HotelsSerivce', [
    'fetchHotels',
    'fetchHotelPrices',
  ]);

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
        HotelListComponent,
        RoundCurrencyPipe,
        RatingBadgeComponent,
        HotelItemComponent,
        ShortLocationPipe,
        HotelPricingComponent,
        InfoTabComponent,
        DealsTabComponent,
        BypassSanitizerPipe,
        MessageComponent,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HotelsSerivce, useValue: hotelsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  const filterHotelWithoutPrice = (hotelItemElement: DebugElement) => {
    const hotelPricing = hotelItemElement.query(By.css('app-hotel-pricing'));
    return !(hotelPricing.componentInstance as HotelPricingComponent)
      .hotelPrice;
  };

  it('should show empty message when there are not hotels item', () => {
    hotelsService.fetchHotelPrices.and.returnValue(of([]));

    hotelsService.fetchHotels.and.returnValue(of([]));

    component.refreshList();

    fixture.detectChanges();

    const messageComponent = debugElement.query(By.css('app-message'));
    expect(messageComponent).toBeDefined();
  });

  it('should show hotel list corresponding to hotel data and language', () => {
    hotelsService.fetchHotelPrices.and.returnValue(
      of(MOCK_HOTEL_PRICES_DATA as PriceInterface[])
    );

    hotelsService.fetchHotels.and.returnValue(
      of(MOCK_HOTELS_DATA as HotelInterface[])
    );

    component.refreshList();

    fixture.detectChanges();

    const hotelItemElements = debugElement.queryAll(By.css('app-hotel-item'));
    expect(hotelItemElements.length).toEqual(6);
    const hotelItemWithoutPriceElements = hotelItemElements.filter(
      filterHotelWithoutPrice
    );
    expect(hotelItemWithoutPriceElements.length).toEqual(4);
  });

  it('should show correct hotel list when changing language', () => {
    hotelsService.fetchHotelPrices.and.returnValues(
      of(MOCK_HOTEL_PRICES_DATA as PriceInterface[]),
      of(MOCK_HOTEL_PRICES_DATA_USD as PriceInterface[])
    );

    hotelsService.fetchHotels.and.returnValue(
      of(MOCK_HOTELS_DATA as HotelInterface[])
    );

    component.refreshList();

    fixture.detectChanges();

    let hotelItemElements = debugElement.queryAll(By.css('app-hotel-item'));
    expect(hotelItemElements.length).toEqual(6);
    let hotelItemWithoutPriceElements = hotelItemElements.filter(
      filterHotelWithoutPrice
    );
    expect(hotelItemWithoutPriceElements.length).toEqual(4);

    component.updateCurrency(CurrencyEnum.USD);

    fixture.detectChanges();

    hotelItemElements = debugElement.queryAll(By.css('app-hotel-item'));
    hotelItemWithoutPriceElements = hotelItemElements.filter(
      filterHotelWithoutPrice
    );
    expect(hotelItemWithoutPriceElements.length).toEqual(5);
  });
});
