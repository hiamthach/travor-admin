'use client';

import { useRouter } from 'next/navigation';

import { IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import CustomInput from '@/components/shared/CustomInput';
import CustomTextarea from '@/components/shared/CustomTextarea';

import destinationApi from '@/config/api/destination.api';
import galleriesApi from '@/config/api/gallery.api';
import { checkImageSize, generateBlobUrl } from '@/config/helpers/image.helper';
import toastHelpers from '@/config/helpers/toast.helper';
import { Destination, DestinationForm } from '@/config/types/destination.type';
import { GalleryImg } from '@/config/types/gallery.type';

import { Button, FileButton, Image } from '@mantine/core';
import { useForm } from '@mantine/form';

const { createDestination, updateDestination } = destinationApi;
const { upload, addImageList, deleteImg } = galleriesApi;

interface Props {
  isEdit?: boolean;
  data?: Destination;
  galleries?: GalleryImg[];
  refetch?: () => void;
  refetchGallery?: () => void;
}

const DestinationsForm = ({ isEdit = false, data, refetch, galleries, refetchGallery }: Props) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = async () => {
    let urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let formData = new FormData();
      formData.append('image', file);

      try {
        const res = await upload(formData);
        urls.push(res.url);
      } catch (error) {
        console.log(error);
      }
    }
    return urls;
  };

  const form = useForm<DestinationForm>({
    initialValues: {
      name: isEdit && data ? data.name : '',
      country: isEdit && data ? data.country : '',
      language: isEdit && data ? data.language : '',
      price: isEdit && data ? data.price : 0,
      description: isEdit && data ? data.description : '',
      currency: isEdit && data ? data.currency : '',
      area: isEdit && data ? data.area : '',
      location: isEdit && data ? data.location : '',
      visa_require: isEdit && data ? data.visa_require : '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: DestinationForm) => {
      if (isEdit) {
        const res = await updateDestination({
          id: data?.id,
          ...values,
        });
        if (files.length > 0) {
          const urls = await handleUpload();

          await addImageList({
            desId: res.destination.id,
            urls,
          });
        }
        return;
      }

      const res = await createDestination(values);

      if (files.length > 0) {
        const urls = await handleUpload();

        await addImageList({
          desId: res.destination.id,
          urls,
        });
      }

      return res;
    },
    onMutate: () => {
      toastHelpers.loading(isEdit ? 'Updating destination' : 'Creating destination...');
    },
    onSuccess: () => {
      toastHelpers.success(isEdit ? 'Destination Updated' : 'Destination created!');
      if (refetch) {
        refetch();
      }
      form.reset();
      setFiles([]);
      router.push('/destinations');
    },
    onError: (error: any) => {
      toastHelpers.error(error.message);
    },
  });

  return (
    <form
      className="grid grid-cols-2 gap-6 max-w-5xl"
      onSubmit={form.onSubmit(async (values) => {
        mutate(values);
      })}
    >
      <CustomInput label="Name" placeholder="Ex: Rome" required {...form.getInputProps('name')} />
      <CustomInput label="Country" placeholder="Ex: Italia" required {...form.getInputProps('country')} />
      <CustomInput label="Language" placeholder="Ex: Italian" required {...form.getInputProps('language')} />
      <CustomInput
        label="Price"
        placeholder="Ex: 1000"
        type="number"
        min={0}
        required
        {...form.getInputProps('price')}
      />
      <CustomInput label="Currency" placeholder="Ex: EUR" required {...form.getInputProps('currency')} />
      <CustomInput label="Area (km2)" placeholder="Ex: 90,000" {...form.getInputProps('area')} />
      <CustomInput label="Location" placeholder="Ex: Italia" {...form.getInputProps('location')} />
      <CustomInput label="Visa Require" placeholder="Ex: On Arrival Visa" {...form.getInputProps('visa_require')} />
      <div className="col-span-2">
        <CustomTextarea
          label="Description"
          placeholder="Ex: Rome is a city in Italy"
          required
          minRows={6}
          autosize
          {...form.getInputProps('description')}
        />
      </div>

      <FileButton
        onChange={(file) => {
          if (file) {
            let check = false;
            for (let i = 0; i < file.length; i++) {
              if (checkImageSize(file[i])) {
                check = true;
                break;
              }
            }
            if (!check) {
              setFiles([...files, ...file]);
            } else {
              toastHelpers.error('Image size is larger than 5MB');
            }
          }
        }}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        multiple={true}
      >
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>

      <div className="flex gap-3 flex-wrap col-span-2">
        {galleries &&
          galleries.map((gallery, index) => {
            return (
              <div className="group w-fit relative" key={index}>
                <Image withPlaceholder width={200} height={120} alt="" src={gallery.url} key={index} />
                <div
                  className="absolute top-0 left-0 right-0 w-full h-full z-10 group-hover:flex items-center justify-center hidden"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                >
                  <IconX
                    size={32}
                    color="#fff"
                    className="cursor-pointer"
                    onClick={async () => {
                      await deleteImg(gallery.id);
                      if (refetchGallery) {
                        refetchGallery();
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        {files?.map((file, index) => {
          return (
            <div className="group w-fit relative" key={index}>
              <Image withPlaceholder width={200} height={120} alt="" src={generateBlobUrl(file)} key={index} />
              <div
                className="absolute top-0 left-0 right-0 w-full h-full z-10 group-hover:flex items-center justify-center hidden"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <IconX
                  size={32}
                  color="#fff"
                  className="cursor-pointer"
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== index));
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-2 text-right">
        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DestinationsForm;
