import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyEnum } from '../enums';
import { HotelInterface, PriceInterface } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HotelsSerivce {
  private readonly baseUrl =
    'https://interview-api.vercel.app/api/hotels/tokyo';

  constructor(private http: HttpClient) {}

  fetchHotels(): Observable<HotelInterface[]> {
    return this.http.get<HotelInterface[]>(this.baseUrl);
  }

  fetchHotelPrices(currency: CurrencyEnum): Observable<PriceInterface[]> {
    return this.http.get<PriceInterface[]>(`${this.baseUrl}/1/${currency}`);
  }
}
