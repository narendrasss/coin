export interface Response {
  user: User;
  fixedExpenses: FixedExpense[];
  categories: Category[];
}

export interface User {
  _id: number;
  name: string;
  income: number;
  goal: Goal;
}

export interface Goal {
  funds: number;
  goal: number;
  payment: number;
  due: Date;
}

export interface FixedExpense {
  name: string;
  amount: number;
  due?: Date;
}

export interface Transaction {
  _id: number;
  vendor: string;
  amount: number;
  date: string;
}

export interface Category {
  name: string;
  amount: number;
  spent?: number;
}
