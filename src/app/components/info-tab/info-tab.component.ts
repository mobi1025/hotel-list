import { InfoTabStore } from '../../services/info-tab.store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  circle,
  latLng,
  MapOptions,
  marker,
  polygon,
  tileLayer,
} from 'leaflet';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-info-tab',
  templateUrl: 'info-tab.component.html',
  providers: [InfoTabStore],
})
export class InfoTabComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() set address(address: string) {
    this.infoTabStore.setAddress(address);
  }

  @Input() set hotelName(hotelName: string) {
    this.infoTabStore.setHotelName(hotelName);
  }

  @Input() set description(description: string) {
    this.infoTabStore.setDescription(description);
  }

  mapOptions: MapOptions | undefined = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
      marker([35.6276353, 139.7367036]),
    ],
    zoom: 18,
    center: latLng(35.6276353, 139.7367036),
  };

  vm$ = this.infoTabStore.vm$;

  constructor(private infoTabStore: InfoTabStore) {}

  ngOnInit(): void {
    this.infoTabStore.locationLatLng$
      .pipe(takeUntil(this.destroy$))
      .subscribe((latLng) => {
        // Must set this so that leaflet can re-render
        // cause any changes made to mapOptions won't re-create map
        this.mapOptions = undefined;

        if (latLng) {
          this.mapOptions = {
            layers: [
              tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
              }),
              marker(latLng),
            ],
            zoom: 18,
            center: latLng,
          };
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
