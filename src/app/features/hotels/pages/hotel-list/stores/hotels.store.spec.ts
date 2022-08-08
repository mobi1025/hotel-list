import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MOCK_HOTELS_DATA } from 'src/app/tests/mock-data';
import { CurrencyEnum } from '../../../enums';
import { HotelInterface } from '../../../models';
import { MOCK_HOTEL_PRICES_DATA } from './../../../../../tests/mock-data';
import { PriceInterface } from './../../../models/price.model';
import { HotelsSerivce } from './../../../services/hotels.service';
import { HotelsStore } from './hotels.store';

describe('HotelsStore', () => {
  const hotelsService = jasmine.createSpyObj<HotelsSerivce>('HotelsSerivce', [
    'fetchHotels',
    'fetchHotelPrices',
  ]);
  let hotelsStore: HotelsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HotelsSerivce, useValue: hotelsService },
        HotelsStore,
      ],
    });

    hotelsStore = TestBed.inject(HotelsStore);
  });

  it('store should be created', () => {
    expect(hotelsStore).toBeTruthy();
  });

  describe('changeCurrency Effect', () => {
    const setupStore = (
      defaultHotelDetailData: HotelInterface[] = MOCK_HOTELS_DATA
    ) => {
      // Set initial hotel data
      hotelsStore.patchState({
        hotelDetailsData: defaultHotelDetailData,
      });

      hotelsService.fetchHotelPrices.and.returnValue(
        of(MOCK_HOTEL_PRICES_DATA as PriceInterface[])
      );

      hotelsStore.changeCurrency(CurrencyEnum.SGD);

      expect(hotelsService.fetchHotelPrices).toHaveBeenCalled();
    };

    it('change currency with hotel data', (done) => {
      setupStore();

      hotelsStore.vm$.subscribe(
        ({ currentCurrency, hotels, isFetchingData }) => {
          expect(currentCurrency).toEqual(CurrencyEnum.SGD);

          expect(isFetchingData).toBeFalsy();

          expect(hotels.length).toEqual(6);

          expect(hotels.filter((hotel) => !!hotel.hotelPrice).length).toEqual(
            2
          );

          done();
        }
      );
    });

    it('change currency with empty hotel data', (done) => {
      setupStore([]);

      hotelsStore.vm$.subscribe(
        ({ currentCurrency, hotels, isFetchingData }) => {
          expect(currentCurrency).toEqual(CurrencyEnum.SGD);

          expect(isFetchingData).toBeFalsy();

          expect(hotels.length).toEqual(0);

          done();
        }
      );
    });
  });

  describe('fetchHotelsData Effect', () => {
    const setupStore = (
      defaultHotelDetailData: HotelInterface[] = MOCK_HOTELS_DATA,
      defaultHotelPriceData: PriceInterface[] = MOCK_HOTEL_PRICES_DATA as PriceInterface[]
    ) => {
      hotelsService.fetchHotelPrices.and.returnValue(of(defaultHotelPriceData));

      hotelsService.fetchHotels.and.returnValue(of(defaultHotelDetailData));

      hotelsStore.changeCurrency(CurrencyEnum.SGD);

      hotelsStore.fetchHotelsData();

      expect(hotelsService.fetchHotelPrices).toHaveBeenCalled();
      expect(hotelsService.fetchHotels).toHaveBeenCalled();
    };

    it('should fetch hotel data successful', (done) => {
      setupStore();

      hotelsStore.vm$.subscribe(
        ({ currentCurrency, hotels, isFetchingData }) => {
          expect(currentCurrency).toEqual(CurrencyEnum.SGD);

          expect(isFetchingData).toBeFalsy();

          expect(hotels.length).toEqual(6);

          expect(hotels.filter((hotel) => !!hotel.hotelPrice).length).toEqual(
            2
          );

          done();
        }
      );
    });

    it('should fetch hotel data with empty hotel price', (done) => {
      setupStore(undefined, []);

      hotelsStore.vm$.subscribe(
        ({ currentCurrency, hotels, isFetchingData }) => {
          expect(currentCurrency).toEqual(CurrencyEnum.SGD);

          expect(isFetchingData).toBeFalsy();

          expect(hotels.length).toEqual(6);

          expect(hotels.filter((hotel) => !!hotel.hotelPrice).length).toEqual(
            0
          );

          done();
        }
      );
    });

    it('should fetch hotel data with empty hotel data', (done) => {
      setupStore([]);

      hotelsStore.vm$.subscribe(
        ({ currentCurrency, hotels, isFetchingData }) => {
          expect(currentCurrency).toEqual(CurrencyEnum.SGD);

          expect(isFetchingData).toBeFalsy();

          expect(hotels.length).toEqual(0);

          done();
        }
      );
    });
  });
});
