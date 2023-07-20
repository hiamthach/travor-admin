import { PaginationRes } from './general.type';

export type PackageType = {
  id: number;
  name: string;
};

export type Package = {
  id: number;
  name: string;
  details: string;
  price: number;
  img_url: string;
  duration: string;
  number_people: number;
  des_id: number | string;
  types: PackageType[];
};

export type PackageRes = {
  package: Package;
};

export type GetPackagesReq = {
  page: number;
  page_size: number;
  keyword: string;
};

export type GetPackagesRes = {
  packages: Package[];
  pagination: PaginationRes;
};

export type PackageForm = Omit<Package, 'id' | 'types' | 'img_url'> & {
  pkgTypes: number[];
};

export type PackageCreate = Omit<Package, 'id' | 'types'> & {
  types: number[];
};

export type PackageUpdate = Partial<Omit<Package, 'types'>> & {
  types: number[];
};
