export interface Transaction {
  _id: number;
  vendor: string;
  amount: number;
  date: string;
}

export interface Category {
  name: string;
  amount: number;
  transactions: Transaction[];
  spent?: number;
}
