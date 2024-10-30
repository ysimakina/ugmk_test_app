export interface FactoryData {
  id: number;
  factory_id: number;
  date: string;
  product1: number;
  product2: number;
}

export enum ProductFilter {
  all = 'all',
  product1 = 'product1',
  product2 = 'product2',
}
