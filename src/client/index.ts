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
} from './types';

const parseError = (res: AxiosResponse): CoinError => {
  return res
    ? { code: res.status, message: res.data.error }
    : { code: 500, message: 'Oops, something went wrong.' };
};

const api = (client: AxiosInstance, key?: string) => {
  let token: string | null | undefined = key;

  const get = (url: string, opts?: any) => {
    if (!token) {
      token = localStorage.getItem('token');
      if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    }
    const finalOpts = {
      headers: { authorization: `Bearer ${token}` },
      params: opts
    };
    return new Promise((resolve, reject) => {
      client
        .get(url, finalOpts)
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  };

  const post = (url: string, opts?: any) => {
    if (!token) {
      token = localStorage.getItem('token');
      if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .post(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  };

  const put = (url: string, opts?: any) => {
    if (!token) {
      token = localStorage.getItem('token');
      if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .put(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  };

  const del = (url: string) => {
    if (!token) {
      token = localStorage.getItem('token');
      if (!token) return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .delete(url, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  };

  return {
    async register(opts: Partial<IUser>) {
      return new Promise((resolve, reject) => {
        client
          .post('/register', opts)
          .then(res => resolve(res.data))
          .catch(err => reject({ error: parseError(err.response) }));
      }) as Promise<CoinResponse>;
    },
    async login(email: string, password: string) {
      return new Promise((resolve, reject) => {
        client
          .post('/login', { email, password })
          .then(res => resolve(res.data.token))
          .catch(err => reject({ error: parseError(err.response) }));
      }) as Promise<CoinResponse>;
    },
    user: {
      me() {
        return get('/me') as Promise<IUser>;
      },
      update(opts: Partial<IUser>) {
        return put('/me', opts) as Promise<IUser>;
      }
    },
    category: {
      getOne(id: string) {
        return get(`/ctg/${id}`) as Promise<ICategory>;
      },
      getAll() {
        return get('/ctg') as Promise<ICategory[]>;
      },
      create(opts: ICategory) {
        return post('/ctg', opts) as Promise<ICategory>;
      },
      update(id: string, opts: Partial<ICategory>) {
        return put(`/ctg/${id}`, opts) as Promise<ICategory>;
      },
      del(id: string) {
        return del(`/ctg/${id}`) as Promise<ICategory>;
      }
    },
    fixedExpenses: {
      getOne(id: string) {
        return get(`/fe/${id}`) as Promise<IFixedExpense>;
      },
      getAll() {
        return get('/fe') as Promise<IFixedExpense[]>;
      },
      create(opts: IFixedExpense) {
        return post('/fe', opts) as Promise<IFixedExpense>;
      },
      update(id: string, opts: Partial<IFixedExpense>) {
        return put(`/fe/${id}`, opts) as Promise<IFixedExpense>;
      },
      del(id: string) {
        return del(`/fe/${id}`) as Promise<IFixedExpense>;
      }
    },
    transactions: {
      getOne(id: string) {
        return get(`/ctg/${id}`) as Promise<ITransaction>;
      },
      getAll(opts: GetTransactionOptions) {
        return get('/ctg', opts) as Promise<ITransaction[]>;
      },
      create(opts: ITransaction) {
        return post('/ctg', opts) as Promise<ITransaction>;
      },
      update(id: string, opts: Partial<ITransaction>) {
        return put(`/ctg/${id}`, opts) as Promise<ITransaction>;
      },
      del(id: string) {
        return del(`/ctg/${id}`) as Promise<ITransaction>;
      }
    }
  };
};

export default (opts?: CoinClientOptions) => {
  const url = opts && opts.url ? opts.url : 'http://localhost:3001/api';
  const axiosOptions = opts && opts.opts ? opts.opts : {};
  const token = opts && opts.token ? opts.token : undefined;

  return api(Axios.create({ url, ...axiosOptions }), token);
};
