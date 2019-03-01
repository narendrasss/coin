import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  CoinError,
  IUser,
  ICategory,
  IFixedExpense,
  ITransaction,
  GetTransactionOptions,
  CoinResponse,
  MultiTransactionResponse
} from '../types';

const parseError = (res: AxiosResponse): CoinError => {
  return res
    ? { code: res.status, message: res.data.error }
    : { code: 500, message: 'Oops, something went wrong.' };
};

const api = (client: AxiosInstance) => {
  function get<T>(url: string, opts?: Partial<GetTransactionOptions>): Promise<CoinResponse<T>> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((_, reject) => reject('Please login.'));

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
  }

  function post<T>(url: string, opts?: T): Promise<CoinResponse<T>> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((_, reject) => reject('Please login.'));

    const headers = { authorization: `Bearer ${token}` };
    console.log(opts);
    return new Promise((resolve, reject) => {
      client
        .post(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  function put<T>(url: string, opts?: Partial<T>): Promise<CoinResponse<T>> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((_, reject) => reject('Please login.'));

    const headers = { authorization: `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      client
        .put(url, opts, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(parseError(err.response)));
    });
  }

  function del<T>(url: string): Promise<CoinResponse<T>> {
    const token = localStorage.getItem('token');
    if (!token) return new Promise((_, reject) => reject('Please login.'));

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
      return new Promise<CoinResponse<{}>>((resolve, reject) => {
        client
          .post('/register', opts)
          .then(res => (console.log(res), resolve(res.data)))
          .catch(err => reject({ error: parseError(err.response) }));
      });
    },
    login(email: string, password: string) {
      return new Promise<CoinResponse<{}>>((resolve, reject) => {
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
      getAll(opts?: any) {
        const url = opts ? getUrl(opts) : '/api/tr';
        return get<ITransaction[]>(url) as Promise<MultiTransactionResponse>;
      },
      create(opts: ITransaction) {
        return post<ITransaction>('/api/tr', opts);
      },
      update(id: string, opts: Partial<ITransaction>) {
        return put<ITransaction>(`/api/tr/${id}`, opts);
      },
      del(id: string) {
        return del<ITransaction>(`/api/tr/${id}`);
      },
      vendors() {
        return get<string[]>('/api/tr/info/vendors');
      }
    }
  };
};

const getUrl = (opts: Partial<GetTransactionOptions>) => {
  let url = '/api/tr?';
  for (const [key, val] of Object.entries(opts)) {
    let toAdd = val;
    if (typeof val === 'string') {
      toAdd = encodeURI(val);
    }
    url = url.concat(`${key}=${toAdd}`, '&');
  }
  return url;
};

export default (baseURL: string = 'http://localhost:3001', opts?: AxiosRequestConfig) =>
  api(Axios.create({ baseURL, ...opts }));
