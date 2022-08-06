import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortLocation',
})
export class ShortLocationPipe implements PipeTransform {
  transform(fullLocation: string, delimiter = ','): string {
    const locationArray = fullLocation
      .split(delimiter)
      .map((location) => location.trim());

    return locationArray.length >= 2
      ? locationArray[locationArray.length - 2]
      : locationArray[0];
  }
}
