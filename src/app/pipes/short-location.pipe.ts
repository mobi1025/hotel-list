import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortLocation',
})
export class ShortLocationPipe implements PipeTransform {
  transform(fullLocation: string, delimiter = ',') {
    const locationArray = fullLocation
      .split(',')
      .map((location) => location.trim());

    return locationArray.length >= 2
      ? locationArray[locationArray.length - 2]
      : locationArray[0];
  }
}
