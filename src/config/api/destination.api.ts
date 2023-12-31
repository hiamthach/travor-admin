import {
  Destination,
  DestinationForm,
  DestinationStats,
  DestinationUpdate,
  GetDestinationsReq,
  GetDestinationsRes,
} from '@/config/types/destination.type';

import api from '.';

const destinationApi = {
  getStats: (): Promise<{
    destinations: DestinationStats[];
  }> => {
    return api.get('/stats/destinations');
  },

  getDestinations: (page: GetDestinationsReq): Promise<GetDestinationsRes> => {
    return api.get('/destinations', {
      params: {
        ...page,
      },
    });
  },

  getDestinationById: (id: string): Promise<Destination> => {
    return api.get(`/destinations/${id}`);
  },

  createDestination: (
    destination: DestinationForm,
  ): Promise<{
    destination: Destination;
  }> => {
    return api.post('/destinations', destination);
  },

  updateDestination: (
    destination: DestinationUpdate,
  ): Promise<{
    destination: Destination;
  }> => {
    return api.put(`/destinations/${destination.id}`, destination);
  },

  deleteDestination: (id: number): Promise<Destination> => {
    return api.delete(`/destinations/${id}`);
  },
};

export default destinationApi;
