import { AddImageReq, AddListImageReq, GalleryImg } from '@/config/types/gallery.type';

import api from '.';

const galleriesApi = {
  getGalleries: (
    desId: number,
  ): Promise<{
    images: GalleryImg[];
  }> => {
    return api.get(`/galleries/${desId}`);
  },

  upload: (
    desId: number,
    formData: FormData,
  ): Promise<{
    url: string;
  }> => {
    return api.post(`/galleries/${desId}`, formData);
  },

  addImage: (body: AddImageReq): Promise<GalleryImg> => {
    return api.post(`/galleries`, body);
  },

  addImageList: (body: AddListImageReq): Promise<GalleryImg[]> => {
    return api.post(`/galleries`, body);
  },

  delete: (
    id: number,
  ): Promise<{
    success: boolean;
  }> => {
    return api.delete(`/galleries/${id}`);
  },
};

export default galleriesApi;
