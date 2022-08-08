import { ShortLocationPipe } from './short-location.pipe';

describe('ShortLocationPipe', () => {
  const shortLocationPipe = new ShortLocationPipe();

  it('should shorten the location if location is too long', () => {
    expect(
      shortLocationPipe.transform(
        '151-8583 Tokyo Prefecture, Shibuya-ku, Yoyogi 2-2-1, Japan'
      )
    ).toEqual('Yoyogi 2-2-1');
  });

  it('should shorten the location if location is too short', () => {
    expect(
      shortLocationPipe.transform('2 27 7 Hyakunincho Shinjuku Ku, Japan')
    ).toEqual('2 27 7 Hyakunincho Shinjuku Ku');
  });
});
