import { of } from 'rxjs';
import { MOCK_LOCATIONS } from 'src/app/tests/mock-data';
import { LocationSearchService } from '../../../services';
import { InfoTabStore } from './info-tab.store';
import { latLng } from 'leaflet';

describe('InfoTabStore', () => {
  const locationSearchService = jasmine.createSpyObj<LocationSearchService>(
    'LocationSearchService',
    ['searchLocation']
  );
  let infoTabStore: InfoTabStore;

  beforeEach(() => {
    infoTabStore = new InfoTabStore(locationSearchService);
  });

  it('store should be created', () => {
    expect(infoTabStore).toBeTruthy();
  });

  describe('getLocationLatLng Effect', () => {
    it('should successfuly get location data for this location', (done) => {
      locationSearchService.searchLocation.and.returnValue(of(MOCK_LOCATIONS));

      infoTabStore.getLocationLatLng('Park Hyatt Tokyo');

      expect(locationSearchService.searchLocation).toHaveBeenCalled();

      infoTabStore.locationLatLng$.subscribe((latLngValue) => {
        expect(latLngValue).toEqual(latLng(35.6851358, 139.6909607));

        done();
      });
    });

    it('should successfuly get location data for this location but cannot find this location', (done) => {
      locationSearchService.searchLocation.and.returnValue(of([]));

      infoTabStore.getLocationLatLng('Park Hyatt Tokyo');

      expect(locationSearchService.searchLocation).toHaveBeenCalled();

      infoTabStore.locationLatLng$.subscribe((latLngValue) => {
        expect(latLngValue).toEqual(undefined);

        done();
      });
    });
  });
});
