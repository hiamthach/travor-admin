'use client';

import { useRouter } from 'next/navigation';

import { IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import CustomInput from '@/components/shared/CustomInput';
import CustomTextarea from '@/components/shared/CustomTextarea';

import destinationApi from '@/config/api/destination.api';
import galleriesApi from '@/config/api/gallery.api';
import packageApi from '@/config/api/package.api';
import { generateBlobUrl } from '@/config/helpers/image.helper';
import toastHelpers from '@/config/helpers/toast.helper';
import { Package, PackageForm } from '@/config/types/package.type';

import { Button, FileButton, Image, MultiSelect, Select, SelectItem } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  isEdit?: boolean;
  data?: Package;
  refetch?: () => void;
}

const { getTypes, createPackage } = packageApi;
const { getStats } = destinationApi;
const { upload } = galleriesApi;

const PackagesForm = ({ isEdit, data, refetch }: Props) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>();
  const form = useForm<PackageForm>({
    initialValues: {
      name: isEdit && data ? data.name : '',
      details: isEdit && data ? data.details : '',
      price: isEdit && data ? data.price : 0,
      duration: isEdit && data ? data.duration : '',
      des_id: isEdit && data ? data.des_id.toString() : '',
      number_people: isEdit && data ? data.number_people : 1,
      pkgTypes: isEdit && data && data.types ? data.types.map((t) => t.id) : [],
    },
  });

  const { data: desList } = useQuery(['destinations', 'stats'], () => {
    return getStats();
  });

  const { data: types } = useQuery(['packages', 'types'], () => {
    return getTypes();
  });

  const { mutate } = useMutation({
    mutationFn: async (values: PackageForm) => {
      let img;
      if (file) {
        let formData = new FormData();
        formData.append('image', file);
        img = await upload(formData);
      }

      if (isEdit && data) {
        return packageApi.updatePackage({
          id: data.id,
          name: values.name,
          details: values.details,
          price: values.price,
          duration: values.duration,
          des_id: values.des_id,
          number_people: values.number_people,
          types: values.pkgTypes,
          img_url: img && img.url ? img.url : data.img_url,
        });
      } else {
        return createPackage({
          name: values.name,
          details: values.details,
          price: values.price,
          duration: values.duration,
          des_id: values.des_id,
          number_people: values.number_people,
          types: values.pkgTypes,
          img_url: img && img.url ? img.url : '',
        });
      }
    },
    onMutate: async () => {
      toastHelpers.loading(isEdit ? 'Updating package...' : 'Creating package...');
    },
    onSuccess: async () => {
      toastHelpers.success(isEdit ? 'Package updated.' : 'Package created.');
      if (refetch) refetch();
      router.push('/packages');
    },
    onError: async (error: any) => {
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
      <CustomInput label="Name" placeholder="Ex: France Tour Package" required {...form.getInputProps('name')} />
      <CustomInput label="Duration" placeholder="Ex: 8 Day 7 Night" required {...form.getInputProps('duration')} />
      <CustomInput
        label="Price"
        placeholder="Ex: 1000"
        min={0}
        type="number"
        required
        {...form.getInputProps('price')}
      />
      <CustomInput
        label="Number of People"
        placeholder="Ex: 2"
        type="number"
        required
        {...form.getInputProps('number_people')}
      />

      {desList && (
        <Select
          label="Destinations"
          placeholder="Select destination"
          required
          searchable
          nothingFound="No destination found"
          {...form.getInputProps('des_id')}
          data={desList.destinations.map(
            (des): SelectItem => ({
              value: des.id.toString(),
              label: des.name,
            }),
          )}
        />
      )}

      {types && (
        <MultiSelect
          label="Types"
          placeholder="Select types"
          required
          {...form.getInputProps('pkgTypes')}
          data={types.types.map(
            (t): SelectItem => ({
              value: t.id.toString(),
              label: t.name,
            }),
          )}
          size="sm"
        />
      )}

      <div className="col-span-2">
        <CustomTextarea
          label="Details"
          placeholder="Ex: This is a tour package to France"
          required
          minRows={6}
          autosize
          {...form.getInputProps('details')}
        />
      </div>

      <FileButton
        onChange={(file) => {
          if (file) {
            setFile(file);
          }
        }}
        accept="image/png,image/jpeg,image/jpg,image/webp"
      >
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>

      <div className="col-span-2">
        {isEdit && !file && (
          <div className="group w-fit relative">
            <Image withPlaceholder width={200} height={120} alt="" src={data?.img_url} />
          </div>
        )}

        {file && (
          <div className="group w-fit relative">
            <Image withPlaceholder width={200} height={120} alt="" src={generateBlobUrl(file)} />
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
                  setFile(null);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="col-span-2 text-right">
        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PackagesForm;
