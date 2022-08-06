import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocationSearchService {
  constructor(private http: HttpClient) {}

  searchLocation(locationName: string): Observable<LocationDetail[]> {
    return this.http.get<LocationDetail[]>(
      `https://nominatim.openstreetmap.org/search?q=${locationName}&format=jsonv2&limit=1`
    );
  }
}
