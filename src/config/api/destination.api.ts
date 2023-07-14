import api from '.';
import { Pagination } from '../types/general.type';

import { Destination, DestinationForm, DestinationUpdate } from '@/config/types/destination.type';

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

  getDestinationById: (id: number): Promise<Destination> => {
    return api.get(`/destinations/${id}`);
  },

  createDestination: (destination: DestinationForm): Promise<Destination> => {
    return api.post('/destinations', destination);
  },

  updateDestination: (destination: DestinationUpdate): Promise<Destination> => {
    return api.put(`/destinations/${destination.id}`, destination);
  },

  deleteDestination: (id: number): Promise<Destination> => {
    return api.delete(`/destinations/${id}`);
  },
};

export default destinationApi;
