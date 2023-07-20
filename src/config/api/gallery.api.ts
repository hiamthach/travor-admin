import { AddImageReq, AddListImageReq, GalleryImg } from '@/config/types/gallery.type';

import api from '.';

const galleriesApi = {
  getGalleries: (
    desId: number | string,
  ): Promise<{
    images: GalleryImg[];
  }> => {
    return api.get(`/galleries/${desId}`);
  },

  upload: (
    formData: FormData,
  ): Promise<{
    url: string;
  }> => {
    return api.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  addImage: (body: AddImageReq): Promise<GalleryImg> => {
    return api.post(`/galleries`, body);
  },

  addImageList: (body: AddListImageReq): Promise<GalleryImg[]> => {
    return api.post(`/galleries/list`, body);
  },

  deleteImg: (
    id: number,
  ): Promise<{
    success: boolean;
  }> => {
    return api.delete(`/galleries/${id}`);
  },
};

export default galleriesApi;
