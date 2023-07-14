import { useMutation } from '@tanstack/react-query';
import React from 'react';

import CustomInput from '@/components/shared/CustomInput';
import CustomTextarea from '@/components/shared/CustomTextarea';
import destinationApi from '@/config/api/destination.api';
import toastHelpers from '@/config/helpers/toast.helper';
import { DestinationForm } from '@/config/types/destination.type';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';

const { createDestination } = destinationApi;

const DestinationsForm = () => {
  const form = useForm<DestinationForm>({
    initialValues: {
      name: '',
      country: '',
      language: '',
      price: 0,
      description: '',
      currency: '',
      area: '',
      location: '',
      visa_require: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: createDestination,
    onMutate: () => {
      toastHelpers.loading('Creating destination...');
    },
    onSuccess: () => {
      toastHelpers.success('Destination created!');
      form.reset();
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
      <CustomInput label="Price" placeholder="Ex: 1000" required type="number" {...form.getInputProps('price')} />
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

      <div className="col-span-2 text-right">
        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DestinationsForm;
