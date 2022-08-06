export type CompetitorPrices = { [competitor: string]: number };

export interface TaxInterface {
  tax: number;
  hotel_fees: number;
}

export interface PriceInterface {
  id: number;
  price: number;
  competitors?: CompetitorPrices;
  taxes_and_fees?: TaxInterface;
}
