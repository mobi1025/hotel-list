import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { LatLng, latLng } from 'leaflet';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LocationSearchService } from './location-search.service';

export interface InfoTabState {
  address: string;
  hotelName: string;
  description: string;
  locationLatLng?: LatLng;
  isLoadingMap: boolean;
}

@Injectable()
export class InfoTabStore extends ComponentStore<InfoTabState> {
  constructor(private locationSearchService: LocationSearchService) {
    super({ address: '', hotelName: '', description: '', isLoadingMap: false });

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

  private readonly isLoadingMap$: Observable<boolean> = this.select(
    (state) => state.isLoadingMap
  );

  readonly vm$: Observable<{
    address: string;
    hotelName: string;
    description: string;
    isLoadingMap: boolean;
  }> = this.select(
    this.address$,
    this.hotelName$,
    this.description$,
    this.isLoadingMap$,
    (address, hotelName, description, isLoadingMap) => ({
      address,
      hotelName,
      description,
      isLoadingMap,
    })
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

  readonly toggleIsLoadingMap = this.updater(
    (state, isLoadingMap: boolean) => ({
      ...state,
      isLoadingMap,
    })
  );

  readonly setLocationLatLng = this.updater(
    (state, locationLatLng: LatLng | undefined) => ({
      ...state,
      locationLatLng,
    })
  );

  ////// Effect //////
  readonly getLocationLatLng = this.effect((hotelName$: Observable<string>) => {
    return hotelName$.pipe(
      filter((hotelName) => !!hotelName),
      tap(() => this.toggleIsLoadingMap(true)),
      switchMap((hotelName) =>
        this.locationSearchService.searchLocation(hotelName).pipe(
          tapResponse(
            (locationDetails) => {
              this.setLocationLatLng(
                locationDetails.length
                  ? latLng(
                      Number(locationDetails[0].lat),
                      Number(locationDetails[0].lon)
                    )
                  : undefined
              );
              this.toggleIsLoadingMap(false);
            },
            () => {
              this.setLocationLatLng(undefined);
              this.toggleIsLoadingMap(false);
            }
          )
        )
      )
    );
  });
}
