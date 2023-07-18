import { PaginationRes } from './general.type';

export type Destination = {
  id: number;
  name: string;
  description: string;
  price: number;
  country: string;
  visa_require: string;
  language: string;
  currency: string;
  area: string;
  location: string;
};

export type GetDestinationsReq = {
  page: number;
  page_size: number;
  keyword: string;
};

export type GetDestinationsRes = {
  destinations: Destination[];
  pagination: PaginationRes;
};

export type DestinationForm = Omit<Destination, 'id'>;

export type DestinationUpdate = Partial<Destination>;
