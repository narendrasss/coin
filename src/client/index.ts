import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  CoinError,
  IUser,
  ICategory,
  IFixedExpense,
  ITransaction,
  GetTransactionOptions,
  CoinClientOptions,
  CoinResponse
} from '../types';

const parseError = (res: AxiosResponse): CoinError => {
  return res
    ? { code: res.status, message: res.data.error }
    : { code: 500, message: 'Oops, something went wrong.' };
};

const api = (client: AxiosInstance, key?: string) => {
  function get<T>(url: string, opts?: any): Promise<T> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    const finalOpts = {
      headers: { authorization: `Bearer ${token}` },
      params: opts
    };
    return new Promise((resolve, reject) => {
      client
        .get(url, finalOpts)
        .then(res => resolve(res.data.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  function post<T>(url: string, opts?: any): Promise<T> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    const headers = { authorization: `Bearer ${token}` };
    console.log(opts);
    return new Promise((resolve, reject) => {
      client
        .post(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  function put<T>(url: string, opts?: any): Promise<T> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .put(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  function del<T>(url: string): Promise<T> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .delete(url, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  return {
    register(opts: Partial<IUser>) {
      return new Promise<CoinResponse>((resolve, reject) => {
        client
          .post('/register', opts)
          .then(res => (console.log(res), resolve(res.data)))
          .catch(err => reject({ error: parseError(err.response) }));
      });
    },
    login(email: string, password: string) {
      return new Promise<CoinResponse>((resolve, reject) => {
        client
          .post('/login', { email, password })
          .then(res => resolve(res.data))
          .catch(err => reject({ error: parseError(err.response) }));
      });
    },
    user: {
      me() {
        return get<IUser>('/api/me');
      },
      update(opts: Partial<IUser>) {
        return put<IUser>('/api/me', opts);
      }
    },
    category: {
      getOne(id: string) {
        return get<ICategory>(`/api/ctg/${id}`);
      },
      getAll() {
        return get<ICategory[]>('/api/ctg');
      },
      create(opts: ICategory) {
        return post<ICategory>('/api/ctg', opts);
      },
      update(id: string, opts: Partial<ICategory>) {
        return put<ICategory>(`/api/ctg/${id}`, opts);
      },
      del(id: string) {
        return del<ICategory>(`/api/ctg/${id}`);
      }
    },
    fixedExpenses: {
      getOne(id: string) {
        return get<IFixedExpense>(`/api/fe/${id}`);
      },
      getAll() {
        return get<IFixedExpense[]>('/api/fe');
      },
      create(opts: IFixedExpense) {
        return post<IFixedExpense>('/api/fe', opts);
      },
      update(id: string, opts: Partial<IFixedExpense>) {
        return put<IFixedExpense>(`/api/fe/${id}`, opts);
      },
      del(id: string) {
        return del<IFixedExpense>(`/api/fe/${id}`);
      }
    },
    transactions: {
      getOne(id: string) {
        return get<ITransaction>(`/api/tr/${id}`);
      },
      getAll(opts: GetTransactionOptions) {
        return get<ITransaction[]>('/api/tr', opts);
      },
      create(opts: ITransaction) {
        return post<ITransaction>('/api/tr', opts);
      },
      update(id: string, opts: Partial<ITransaction>) {
        return put<ITransaction>(`/api/tr/${id}`, opts);
      },
      del(id: string) {
        return del<ITransaction>(`/api/tr/${id}`);
      }
    }
  };
};

export default (opts?: Partial<CoinClientOptions>) => {
  const baseURL = opts && opts.url ? opts.url : 'http://localhost:3001';
  const axiosOptions = opts && opts.opts ? opts.opts : {};
  const token = opts && opts.token ? opts.token : undefined;

  return api(Axios.create({ baseURL, ...axiosOptions }), token);
};
