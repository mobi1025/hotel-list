import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { forkJoin, Observable } from 'rxjs';
import { mergeMapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Hotel, HotelInterface, PriceInterface } from '../models';
import { CurrencyEnum } from './../enums/currency.enum';
import { HotelsSerivce } from './hotels.service';

const CURRENCY_LOCAL_STORAGE_KEY = 'currency';

export type HotelData = {
  hotelDetailsData: HotelInterface[];
  hotelPriceData: PriceInterface[];
};

export interface HotelsState {
  hotelDetailsData: HotelInterface[];
  hotelPriceData: PriceInterface[];
  currentCurrency: CurrencyEnum;
}

@Injectable()
export class HotelsStore extends ComponentStore<HotelsState> {
  constructor(private hotelsService: HotelsSerivce) {
    super({
      hotelDetailsData: [],
      hotelPriceData: [],
      currentCurrency:
        (localStorage.getItem('currency') as CurrencyEnum) ?? CurrencyEnum.USD,
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

  readonly vm$: Observable<{ hotels: Hotel[]; currentCurrency: CurrencyEnum }> =
    this.select(
      this.hotels$,
      this.currentCurrency$,
      (hotels, currentCurrency) => ({ hotels, currentCurrency })
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

  ////// Effect //////
  readonly changeCurrency = this.effect(
    (currency$: Observable<CurrencyEnum>) => {
      return currency$.pipe(
        tap((currency) => {
          localStorage.setItem(CURRENCY_LOCAL_STORAGE_KEY, currency);
          this.setCurrency(currency);
        }),
        switchMap((currency) =>
          this.hotelsService.fetchHotelPrices(currency).pipe(
            tapResponse(
              (hotelPriceData) => this.updateHotelPriceData(hotelPriceData),
              (error: HttpErrorResponse) => {}
            )
          )
        )
      );
    }
  );

  readonly fetchHotelsData = this.effect(
    (refreshClicked$: Observable<void>) => {
      return refreshClicked$.pipe(
        withLatestFrom(this.currentCurrency$),
        switchMap(([, currency]) =>
          forkJoin([
            this.hotelsService.fetchHotels(),
            this.hotelsService.fetchHotelPrices(currency),
          ]).pipe(
            tapResponse(
              ([hotelDetailsData, hotelPriceData]) =>
                this.updateHotelData({ hotelDetailsData, hotelPriceData }),
              (error: HttpErrorResponse) => {}
            )
          )
        )
      );
    }
  );
}
