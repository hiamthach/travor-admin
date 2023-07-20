import {
  GetPackagesReq,
  GetPackagesRes,
  Package,
  PackageCreate,
  PackageForm,
  PackageRes,
  PackageStats,
  PackageType,
  PackageUpdate,
} from '@/config/types/package.type';

import api from '.';

const packageApi = {
  getStats: (): Promise<{
    packages: PackageStats[];
  }> => {
    return api.get('/stats/packages');
  },

  getPackages: (params: GetPackagesReq): Promise<GetPackagesRes> => {
    return api.get('/packages', { params });
  },

  getPackageById: (id: string): Promise<Package> => {
    return api.get(`/packages/${id}`);
  },

  createPackage: (body: PackageCreate): Promise<PackageRes> => {
    return api.post('/packages', body);
  },

  updatePackage: (body: PackageUpdate): Promise<PackageRes> => {
    return api.put(`/packages/${body.id}`, body);
  },

  deletePackage: (
    id: number | string,
  ): Promise<{
    success: boolean;
  }> => {
    return api.delete(`/packages/${id}`);
  },

  getTypes: (): Promise<{
    types: PackageType[];
  }> => {
    return api.get('/types');
  },

  createType: (name: string): Promise<{ type: PackageType }> => {
    return api.post('/types', { name });
  },

  deleteType: (
    id: number,
  ): Promise<{
    success: boolean;
  }> => {
    return api.delete(`/types/${id}`);
  },
};

export default packageApi;
