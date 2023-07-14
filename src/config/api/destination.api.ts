import api from '.';
import { Pagination } from '../types/general.type';

import { Destination } from '@/config/types/destination.type';

const destinationApi = {
  getDestinations: (
    page: Pagination,
  ): Promise<{
    destinations: Destination[];
  }> => {
    return api.get('/destinations', {
      params: {
        ...page,
      },
    });
  },
};

export default destinationApi;
