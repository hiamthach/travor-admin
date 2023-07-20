export type GalleryImg = {
  id: number;
  url: string;
  desId: number;
};

export type AddImageReq = {
  desId: number;
  url: string;
};

export type AddListImageReq = {
  desId: number;
  urls: string[];
};
