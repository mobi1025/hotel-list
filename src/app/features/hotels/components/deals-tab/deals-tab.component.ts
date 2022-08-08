import { Component, OnChanges, Input } from '@angular/core';
import { CurrencyEnum } from '../../enums';
import { TaxInterface, CompetitorPrices } from '../../models';

export interface DealsInterface {
  name: string;
  price: number;
  isOurPrice: boolean;
  taxesAndFees?: TaxInterface;
}

@Component({
  selector: 'app-deals-tab',
  templateUrl: 'deals-tab.component.html',
})
export class DealsTabComponent implements OnChanges {
  @Input() price?: number;

  @Input() competitorPrices?: CompetitorPrices;

  @Input() taxesAndFees?: TaxInterface;

  @Input() currency!: CurrencyEnum;

  deals: DealsInterface[] = [];

  ngOnChanges(): void {
    this.deals = [];

    if (this.price) {
      this.deals.push({
        name: 'Our Price',
        price: this.price,
        isOurPrice: true,
        taxesAndFees: this.taxesAndFees,
      });
    }

    if (this.competitorPrices) {
      Object.entries(this.competitorPrices).forEach(
        ([competitorName, price]) => {
          this.deals.push({
            name: competitorName,
            price: price,
            isOurPrice: false,
          });
        }
      );
    }

    this.deals = [...this.deals.sort((a, b) => a.price - b.price)];
  }
}
