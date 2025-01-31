import { ServiceName } from "./enum";

export interface IPagination<T = any> {
  results: T[];
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
}
export interface ResponseData {
  [ServiceName.User]: IPagination<any>;
  [ServiceName.Product]: IPagination<any>;
  [key: string]: Partial<any> & IPagination<Partial<any>>;
}

export interface Services<T extends keyof ResponseData, K = any> {
  method?: string;
  body?: K;
  serviceName: T;
  options?: Partial<ExtendsRequestProps<T>>;
}

export interface ExtendsRequestProps<T extends keyof ResponseData> {
  params: IParams<T>;
  querystring: IQuerystring<T>;
  auth: boolean;
  timeout?: number;
  externalUrl?: boolean;
  headers: { [key: string]: string };
  revalidate?: number;
  signal?: AbortSignal;
}

export interface IPopulate<T> {
  path: keyof T;
  populate?: IPopulate<T>;
  select?: any;
  match?: any;
  options?: { skip?: number; limit?: number };
}

export type IQuerystring<T extends keyof ResponseData> = {
  populate?:
    | (keyof IQuery<T>)[]
    | object[]
    | IPopulate<ResponseData[T]["results"][number]>[];
  sort?: any;
  select?: (keyof IQuery<T>)[] | string[];
  limit?: number;
  page?: number;
  where?: Partial<IQuery<T>>;
};

export type IQuery<T extends keyof ResponseData> =
  ResponseData[T] extends IPagination
    ? IContent<ResponseData[T]["results"][number]>
    : IContent<ResponseData[T]>;

type IContent<T> = {
  [K in keyof T]: T[K] | IOperator<T[K]>;
};

type IOperator<T> = {
  _ne?: T | T[];
  _contains?: T;
  _containss?: T;
  _startsWith?: T;
  _endsWith?: T;
  _near?: T;
  _lt?: T;
  _lte?: T;
  _gt?: T;
  _gte?: T;
};

export type IParams<T extends keyof ResponseData> =
  ResponseData[T] extends IPagination
    ? ResponseData[T]["results"][number]
    : ResponseData[T];
