export type Discount = {
  amount: number;
  percentage: number;
};

export type SpecItem = {
  label: string;
  value: string;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  description: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  specifications: SpecItem[];
};
