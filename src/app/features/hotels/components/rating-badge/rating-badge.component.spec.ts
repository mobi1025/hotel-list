import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RatingEnum } from './../../enums/rating.enum';
import { RatingBadgeComponent } from './rating-badge.component';

describe('RatingBadgeComponent', () => {
  let component: RatingBadgeComponent;
  let fixture: ComponentFixture<RatingBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RatingBadgeComponent],
      // Use this to detect change for promise, timers, and DOM events
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set rating to "Very Good" with rating of 8.5', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const ratingContainer = nativeElement
      .querySelector<HTMLDivElement>('div')
      ?.querySelector('div');
    const ratingText = ratingContainer?.querySelector('span');
    const ratingScale = nativeElement.querySelector<HTMLDivElement>('strong');

    component.rating = 8.5;

    // Explicitly call detectChanges since in testing Anuglar doesn't call change detection
    // when component properties changed
    fixture.detectChanges();

    expect(component.rating).toEqual(8.5);
    expect(component.ratingScale).toEqual(RatingEnum.VERY_GOOD);
    expect(ratingContainer).toBeDefined();
    expect(ratingContainer?.classList.contains('bg-green-700')).toBeTruthy();
    expect(ratingText?.innerText).toEqual('8.5');
    expect(ratingScale?.innerText).toEqual('Very Good');
  });
});
