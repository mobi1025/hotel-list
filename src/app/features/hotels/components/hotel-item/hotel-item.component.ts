import { Component, Input } from '@angular/core';
import { CurrencyEnum } from '../../enums';
import { Hotel } from '../../models';

@Component({
  selector: 'app-hotel-item',
  templateUrl: 'hotel-item.component.html',
  styleUrls: ['hotel-item.component.scss'],
})
export class HotelItemComponent {
  @Input() hotel!: Hotel;

  @Input() currency!: CurrencyEnum;

  expanded = false;

  activeTabIndex = 0;

  toggleExpand(event: Event): void {
    event.stopPropagation();

    this.expanded = !this.expanded;
  }

  viewDeal(): void {
    window.open(`https://www.google.com/search?q=${this.hotel.name}`);
  }
}
