import { CurrencyEnum } from 'src/app/enums';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceInterface } from 'src/app/models';

@Component({
  selector: 'app-hotel-pricing',
  templateUrl: 'hotel-pricing.component.html',
  styleUrls: ['hotel-pricing.component.scss'],
})
export class HotelPricingComponent {
  private _hotelPrice?: Omit<PriceInterface, 'id'>;
  private _savePercentage?: number;
  private _highestPrice?: number;

  @Input() set hotelPrice(hotelPrice: Omit<PriceInterface, 'id'> | undefined) {
    this._hotelPrice = hotelPrice;
    this._savePercentage = undefined;
    this._highestPrice = undefined;

    if (hotelPrice?.competitors) {
      // Find highest price
      const highestPrice = Object.entries(hotelPrice.competitors).reduce(
        (highestPrice: number | undefined, [, competiorPrice]) =>
          competiorPrice > hotelPrice.price ? competiorPrice : highestPrice,
        undefined
      );

      // Calculate saving
      if (highestPrice) {
        this._highestPrice = highestPrice;

        this._savePercentage =
          (highestPrice - hotelPrice.price) / hotelPrice.price;
      }
    }
  }

  @Input() currency!: CurrencyEnum;

  @Output() viewDealClicked = new EventEmitter<void>();

  get hotelPrice() {
    return this._hotelPrice;
  }

  get savePercentage() {
    return this._savePercentage;
  }

  get highestPrice() {
    return this._highestPrice;
  }

  handleViewDealClicked(event: Event) {
    event.stopPropagation();
    this.viewDealClicked.emit();
  }
}
