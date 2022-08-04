import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiHintModule,
  TuiRootModule,
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
import { HotelPricingComponent } from './components/hotel-pricing/hotel-pricing.component';
import { RoundCurrencyPipe } from './pipes/round-currency.pipe';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotelItemComponent } from './components/hotel-item/hotel-item.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';

import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { DealsTabComponent } from './components/deals-tab/deals-tab.component';
import { InfoTabComponent } from './components/info-tab/info-tab.component';
import { RatingBadgeComponent } from './components/rating-badge/rating-badge.component';
import { BypassSanitizerPipe, ShortLocationPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    HotelItemComponent,
    RatingBadgeComponent,
    HotelPricingComponent,
    InfoTabComponent,
    DealsTabComponent,
    ShortLocationPipe,
    RoundCurrencyPipe,
    BypassSanitizerPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TuiRootModule,
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
