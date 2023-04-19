export interface Transaction {
  id: number;
  qty: number;
  sellingCost: number;
  note: string;
  createdAt: string;
  productId: number;
  product: string;
}
