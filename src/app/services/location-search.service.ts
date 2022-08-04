import { LocationDetail } from './../models/location-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationSearchService {
  constructor(private http: HttpClient) {}

  searchLocation(locationName: string) {
    return this.http.get<
      LocationDetail[]
    >(`https://nominatim.openstreetmap.org/search?q=${locationName}&format=jsonv2&limit=1

    `);
  }
}
