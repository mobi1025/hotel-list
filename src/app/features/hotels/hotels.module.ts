import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiIslandModule,
  TuiRatingModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import {
  DealsTabComponent,
  HotelItemComponent,
  HotelPricingComponent,
  InfoTabComponent,
  MessageComponent,
  RatingBadgeComponent,
} from './components';
import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelListComponent } from './pages';
import {
  BypassSanitizerPipe,
  RoundCurrencyPipe,
  ShortLocationPipe,
} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiIslandModule,
    TuiExpandModule,
    TuiRatingModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiTabsModule,
    LeafletModule,
    TuiDataListWrapperModule,
    HotelsRoutingModule,
  ],
  declarations: [
    HotelListComponent,
    HotelItemComponent,
    RatingBadgeComponent,
    HotelPricingComponent,
    InfoTabComponent,
    DealsTabComponent,
    MessageComponent,
    ShortLocationPipe,
    RoundCurrencyPipe,
    BypassSanitizerPipe,
  ],
})
export class HotelsModule {}
