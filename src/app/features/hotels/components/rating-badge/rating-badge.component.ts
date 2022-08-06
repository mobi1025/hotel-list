import { Component, Input } from '@angular/core';
import { RatingEnum } from '../../enums';

@Component({
  selector: 'app-rating-badge',
  templateUrl: 'rating-badge.component.html',
})
export class RatingBadgeComponent {
  RatingEnum = RatingEnum;

  private _rating = 0;
  private _ratingScale = RatingEnum.POOR;

  @Input() set rating(rating: number) {
    this._rating = rating;

    if (rating >= 9 && rating <= 10) {
      this._ratingScale = RatingEnum.EXCELLENT;
    } else if (rating >= 8 && rating < 9) {
      this._ratingScale = RatingEnum.VERY_GOOD;
    } else if (rating >= 6 && rating < 8) {
      this._ratingScale = RatingEnum.GOOD;
    } else if (rating >= 4 && rating < 6) {
      this._ratingScale = RatingEnum.FAIR;
    } else {
      this._ratingScale = RatingEnum.POOR;
    }
  }

  get rating(): number {
    return this._rating;
  }

  get ratingScale(): RatingEnum {
    return this._ratingScale;
  }
}
