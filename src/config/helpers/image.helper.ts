import { FILE_UPLOAD_LIMIT } from '@/config/constants/general.const';

export const generateBlobUrl = (file: File) => {
  return URL.createObjectURL(file);
};

export const checkImageSize = (file: File) => {
  return file.size / 1024 / 1024 > FILE_UPLOAD_LIMIT;
};
