import { AxiosRequestConfig } from 'axios';

export interface IUser {
  email: string;
  password: string;
  name: string;
  income: number;
  goal: {
    goal: string;
    funds: number;
    amount: number;
    payment: number;
    due: string;
  };
}

export interface ICategory {
  name: string;
  budget: number;
}

export interface IFixedExpense {
  name: string;
  amount: number;
  due?: Date;
  payableTo?: string;
}

export interface ITransaction {
  vendor: string;
  amount: number;
  date: Date;
}

export type GetTransactionOptions = {
  vendor?: string;
  category?: string;
  amountRange?: number[];
  from?: string;
  to?: string;
  max?: number;
};

export interface CoinResponse {
  token?: string;
  data?: any;
  error?: CoinError;
}

export interface CoinError {
  code: number;
  message: string;
}

export interface CoinClientOptions {
  url?: string;
  token?: string;
  opts: AxiosRequestConfig;
}
