import { LocationSearchService } from './location-search.service';
import { LatLng, latLng } from 'leaflet';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap, mergeMapTo } from 'rxjs/operators';
import { CurrencyEnum } from '../enums';
import { Hotel, PriceInterface } from '../models';
import { HotelData } from './hotels.store';

export interface InfoTabState {
  address: string;
  hotelName: string;
  description: string;
  locationLatLng?: LatLng;
}

@Injectable()
export class InfoTabStore extends ComponentStore<InfoTabState> {
  constructor(private locationSearchService: LocationSearchService) {
    super({ address: '', hotelName: '', description: '' });

    // Fetch hotel location when hotel name changed
    this.getLocationLatLng(this.hotelName$);
  }

  ////// Selector //////
  private readonly address$: Observable<string> = this.select(
    (state) => state.address
  );

  private readonly hotelName$: Observable<string> = this.select(
    (state) => state.hotelName
  );

  private readonly description$: Observable<string> = this.select(
    (state) => state.description
  );

  readonly locationLatLng$: Observable<LatLng | undefined> = this.select(
    (state) => state.locationLatLng
  );

  readonly vm$: Observable<{
    address: string;
    hotelName: string;
    description: string;
  }> = this.select(
    this.address$,
    this.hotelName$,
    this.description$,
    (address, hotelName, description) => ({ address, hotelName, description })
  );

  ////// Updater //////
  readonly setAddress = this.updater((state, address: string) => ({
    ...state,
    address,
  }));

  readonly setHotelName = this.updater((state, hotelName: string) => ({
    ...state,
    hotelName,
  }));

  readonly setDescription = this.updater((state, description: string) => ({
    ...state,
    description,
  }));

  readonly setLocationLatLng = this.updater(
    (state, locationLatLng: LatLng | undefined) => ({
      ...state,
      locationLatLng,
    })
  );

  ////// Effect //////
  readonly getLocationLatLng = this.effect((hotelName$: Observable<string>) => {
    return hotelName$.pipe(
      switchMap((hotelName) =>
        this.locationSearchService.searchLocation(hotelName).pipe(
          tapResponse(
            (locationDetails) =>
              this.setLocationLatLng(
                locationDetails.length
                  ? latLng(
                      Number(locationDetails[0].lat),
                      Number(locationDetails[0].lon)
                    )
                  : undefined
              ),
            () => {
              this.setLocationLatLng(undefined);
            }
          )
        )
      )
    );
  });
}
