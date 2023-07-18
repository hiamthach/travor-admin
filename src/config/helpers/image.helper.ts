export const generateBlobUrl = (file: File) => {
  return URL.createObjectURL(file);
};
