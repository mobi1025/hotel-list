import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { MOCK_LOCATIONS } from 'src/app/tests/mock-data';
import { BypassSanitizerPipe } from '../../pipes';
import { LocationSearchService } from '../../services';
import { MessageComponent } from './../message/message.component';
import { InfoTabComponent } from './info-tab.component';

describe('InfoTabComponent', () => {
  const locationSearchService = jasmine.createSpyObj<LocationSearchService>(
    'LocationSearchService',
    ['searchLocation']
  );
  let component: InfoTabComponent;
  let fixture: ComponentFixture<InfoTabComponent>;
  let debugElement: DebugElement;
  const testData = {
    hotelName: 'Park Hyatt Tokyo',
    address:
      '163-1055 Tokyo Prefecture, Shinjuku-ku, Nishishinjuku 3-7-1-2, Japan',
    description:
      '<p>High above Shinjuku’s lively streets, the wide windows of Park Hyatt Tokyo’s spacious rooms offer beautiful views of Mount Fuji or Shinjuku. An indoor pool and 52nd-floor restaurant are featured.</p> <br> <p>Rooms at the Tokyo Park Hyatt boast Hokkaido wood panelling and Egyptian cotton sheets. Guests can pour a drink at the wet bar and relax in the deep bathtub, or stretch out in the fluffy bathrobe and watch a video-on-demand movie. Free toiletries, slippers and a hairdryer are provided. Rooms also feature a seating area, desk and free high-speed wired internet as well as WiFi access.</p> <br> <p>Shinjuku Central Park is a 3-minute walk from the hotel. JR Shinjuku Train Station is a 15-minute walk away, and Shinjuku Gyoen is a 20-minute walk.</p> <br> <p>Guests can enjoy the massage or sauna at Club on the Park Spa or work out at the fitness room, which boasts floor-to-ceiling windows. The hotel’s library offers a wide selection and the front desk is open 24-hours a day. Currency exchange service is available at the hotel.</p> <br> <p>The 52nd-floor New York Grill offers spectacular skyline views. Guests can enjoy a drink at The Peak Bar while watching the sun set in the Tokyo Skyline. Sumptuous cakes and seasonal sweets can be purchased at the Pastry Boutique, while modern Japanese dishes, French cuisine and a stylish cafe are also available on site. </p> <br> <p>Shinjuku Ward is a great choice for travellers interested in shopping, friendly locals and food.</p> <br> <p>This property also has one of the best-rated locations in Tokyo! Guests are happier about it compared to other properties in the area.</p> <br> <p>Couples particularly like the location — they rated it 9.0 for a two-person trip.</p>',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LeafletModule, TuiSvgModule, TuiIslandModule],
      declarations: [MessageComponent, BypassSanitizerPipe, InfoTabComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: LocationSearchService, useValue: locationSearchService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTabComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show location map', () => {
    locationSearchService.searchLocation.and.returnValue(of(MOCK_LOCATIONS));

    component.hotelName = testData.hotelName;
    component.address = testData.address;
    component.description = testData.description;

    fixture.detectChanges();

    const address = debugElement.query(By.css('h4 span'));
    const map = debugElement.query(By.css('div[leaflet]'));
    const message = debugElement.query(By.css('app-message'));
    const hotelName = debugElement.query(By.css('h4.my-4.font-bold'));
    const hotelDescription = debugElement.query(By.css('tui-island div'));

    expect(component.mapOptions).toBeDefined();
    expect(message).withContext('Message should not show').toBeNull();
    expect(map).withContext('Map should be show').toBeDefined();

    expect((address.nativeElement as HTMLSpanElement).innerText).toEqual(
      testData.address
    );

    expect((hotelName.nativeElement as HTMLSpanElement).innerText).toEqual(
      `About ${testData.hotelName}`
    );

    expect(
      (hotelDescription.nativeElement as HTMLSpanElement).innerHTML
    ).toEqual(testData.description);
  });

  it('should show no result message', () => {
    locationSearchService.searchLocation.and.returnValue(of([]));

    component.hotelName = testData.hotelName;
    component.address = testData.address;
    component.description = testData.description;

    fixture.detectChanges();

    const address = debugElement.query(By.css('h4 span'));
    const map = debugElement.query(By.css('div[leaflet]'));
    const message = debugElement.query(By.css('app-message'));
    const hotelName = debugElement.query(By.css('h4.my-4.font-bold'));
    const hotelDescription = debugElement.query(By.css('tui-island div'));

    expect(component.mapOptions).not.toBeDefined();
    expect(message).withContext('Message should not show').toBeDefined();
    expect(map).withContext('Map should be show').toBeNull();

    expect((address.nativeElement as HTMLSpanElement).innerText).toEqual(
      testData.address
    );

    expect((hotelName.nativeElement as HTMLSpanElement).innerText).toEqual(
      `About ${testData.hotelName}`
    );

    expect(
      (hotelDescription.nativeElement as HTMLSpanElement).innerHTML
    ).toEqual(testData.description);
  });
});
