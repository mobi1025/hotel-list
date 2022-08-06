import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CurrencyEnum } from '../../../enums';
import { HotelInterface, PriceInterface, Hotel } from '../../../models';
import { HotelsSerivce } from '../../../services';

const CURRENCY_LOCAL_STORAGE_KEY = 'currency';

export type HotelData = {
  hotelDetailsData: HotelInterface[];
  hotelPriceData: PriceInterface[];
};

export interface HotelsState {
  hotelDetailsData: HotelInterface[];
  hotelPriceData: PriceInterface[];
  currentCurrency: CurrencyEnum;
  isFetchingData: boolean;
}

@Injectable()
export class HotelsStore extends ComponentStore<HotelsState> {
  constructor(private hotelsService: HotelsSerivce) {
    super({
      hotelDetailsData: [],
      hotelPriceData: [],
      currentCurrency:
        (localStorage.getItem('currency') as CurrencyEnum) ?? CurrencyEnum.USD,
      isFetchingData: false,
    });
  }

  ////// Selector //////
  private readonly hotelDetailsData$: Observable<HotelInterface[]> =
    this.select((state) => state.hotelDetailsData);
  private readonly hotelPriceData$: Observable<PriceInterface[]> = this.select(
    (state) => state.hotelPriceData
  );

  private readonly currentCurrency$: Observable<CurrencyEnum> = this.select(
    (state) => state.currentCurrency
  );

  private readonly hotels$: Observable<Hotel[]> = this.select(
    this.hotelDetailsData$,
    this.hotelPriceData$,
    (hotelDetails, hotelPrice) => {
      const hotelPriceById = hotelPrice.reduce(
        (hotelPriceById, currentPrice) => {
          const { id, ...price } = { ...currentPrice };

          hotelPriceById[id] = price;

          return hotelPriceById;
        },
        {} as { [id: number]: Omit<PriceInterface, 'id'> }
      );

      return hotelDetails.reduce((hotels, hotelDetail) => {
        const hotelPrice = hotelPriceById[hotelDetail.id];

        if (hotelPrice && hotelPrice.price) {
          hotels.unshift({ ...hotelDetail, hotelPrice: { ...hotelPrice } });
        } else if (!hotelPrice) {
          hotels.push({ ...hotelDetail });
        }

        return hotels;
      }, [] as Hotel[]);
    }
  );

  private readonly isFetchingData$: Observable<boolean> = this.select(
    (state) => state.isFetchingData
  );

  readonly vm$: Observable<{
    hotels: Hotel[];
    currentCurrency: CurrencyEnum;
    isFetchingData: boolean;
  }> = this.select(
    this.hotels$,
    this.currentCurrency$,
    this.isFetchingData$,
    (hotels, currentCurrency, isFetchingData) => ({
      hotels,
      currentCurrency,
      isFetchingData,
    })
  );

  ////// Updater //////
  readonly setCurrency = this.updater((state, currency: CurrencyEnum) => ({
    ...state,
    currentCurrency: currency,
  }));

  readonly updateHotelPriceData = this.updater(
    (state, hotelPriceData: PriceInterface[]) => ({
      ...state,
      hotelPriceData,
    })
  );

  readonly updateHotelData = this.updater(
    (state, { hotelDetailsData, hotelPriceData }: HotelData) => ({
      ...state,
      hotelDetailsData,
      hotelPriceData,
    })
  );

  readonly toggleIsFetchingData = this.updater(
    (state, isFetchingData: boolean) => ({
      ...state,
      isFetchingData,
    })
  );

  ////// Effect //////
  readonly changeCurrency = this.effect(
    (currency$: Observable<CurrencyEnum>) => {
      return currency$.pipe(
        tap((currency) => {
          this.toggleIsFetchingData(true);
          localStorage.setItem(CURRENCY_LOCAL_STORAGE_KEY, currency);
          this.setCurrency(currency);
        }),
        switchMap((currency) =>
          this.hotelsService.fetchHotelPrices(currency).pipe(
            tapResponse(
              (hotelPriceData) => {
                this.updateHotelPriceData(hotelPriceData);
                this.toggleIsFetchingData(false);
              },
              () => {
                this.toggleIsFetchingData(false);
              }
            )
          )
        )
      );
    }
  );

  readonly fetchHotelsData = this.effect(
    (refreshClicked$: Observable<void>) => {
      return refreshClicked$.pipe(
        tap(() => this.toggleIsFetchingData(true)),
        withLatestFrom(this.currentCurrency$),
        switchMap(([, currency]) =>
          forkJoin([
            this.hotelsService.fetchHotels(),
            this.hotelsService.fetchHotelPrices(currency),
          ]).pipe(
            tapResponse(
              ([hotelDetailsData, hotelPriceData]) => {
                this.updateHotelData({ hotelDetailsData, hotelPriceData });
                this.toggleIsFetchingData(false);
              },
              () => {
                this.toggleIsFetchingData(false);
              }
            )
          )
        )
      );
    }
  );
}
