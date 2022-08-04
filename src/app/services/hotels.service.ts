import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyEnum } from '../enums';
import { PriceInterface } from '../models';
import { HotelInterface } from './../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelsSerivce {
  private readonly baseUrl =
    'https://interview-api.vercel.app/api/hotels/tokyo';

  constructor(private http: HttpClient) {}

  fetchHotels() {
    return this.http.get<HotelInterface[]>(this.baseUrl);
  }

  fetchHotelPrices(currency: CurrencyEnum) {
    return this.http.get<PriceInterface[]>(`${this.baseUrl}/1/${currency}`);
  }
}
