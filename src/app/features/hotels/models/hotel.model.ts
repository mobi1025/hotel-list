import { PriceInterface } from './price.model';

export interface HotelInterface {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
}

export type Hotel = HotelInterface & {
  hotelPrice?: Omit<PriceInterface, 'id'>;
};
