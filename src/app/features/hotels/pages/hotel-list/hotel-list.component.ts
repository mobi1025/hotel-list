import { Component, OnInit } from '@angular/core';
import { CurrencyEnum } from '../../enums';
import { HotelsStore } from './stores/hotels.store';

@Component({
  selector: 'app-hotel-list',
  templateUrl: 'hotel-list.component.html',
  providers: [HotelsStore],
})
export class HotelListComponent implements OnInit {
  vm$ = this.hotelsStore.vm$;

  supportedCurrencies = [
    CurrencyEnum.USD,
    CurrencyEnum.SGD,
    CurrencyEnum.KRW,
    CurrencyEnum.CNY,
  ];

  constructor(private readonly hotelsStore: HotelsStore) {}

  ngOnInit(): void {
    this.hotelsStore.fetchHotelsData();
  }

  updateCurrency(currency: CurrencyEnum): void {
    this.hotelsStore.changeCurrency(currency);
  }

  refreshList(): void {
    this.hotelsStore.fetchHotelsData();
  }
}
