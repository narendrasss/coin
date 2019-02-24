import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import {
  CoinError,
  IUser,
  ICategory,
  IFixedExpense,
  ITransaction,
  GetTransactionOptions
} from './types';

const parseError = (res: AxiosResponse): CoinError => {
  return res
    ? { code: res.status, message: res.data.error }
    : { code: 500, message: 'Oops, something went wrong.' };
};

const api = (client: AxiosInstance) => {
  let token: string;

  const get = (url: string, opts?: any) => {
    if (!token) {
      return new Promise((resolve, reject) => reject('Please login.'));
    }
    const finalOpts = {
      headers: { authorization: `Bearer ${token}` },
      params: opts
    };
    return new Promise((resolve, reject) => {
      client
        .get(url, finalOpts)
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err)));
    });
  };

  const post = (url: string, opts?: any) => {
    if (!token) {
      return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .post(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err)));
    });
  };

  const put = (url: string, opts?: any) => {
    if (!token) {
      return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .put(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err)));
    });
  };

  const del = (url: string) => {
    if (!token) {
      return new Promise((resolve, reject) => reject('Please login.'));
    }
    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .delete(url, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err)));
    });
  };

  return {
    async register(opts: Partial<IUser>) {
      try {
        const res = await client.post('/register', opts);
        token = res.data.token;
      } catch (e) {
        console.error(e);
        return parseError(e.response);
      }
    },
    async login(email: string, password: string) {
      try {
        const res = await client.post('/login', { email, password });
        token = res.data.token;
      } catch (e) {
        console.error(e);
        return parseError(e.response);
      }
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

export default (url: string = 'http://localhost:3001/api', opts?: AxiosRequestConfig) =>
  api(Axios.create({ url, ...opts }));
