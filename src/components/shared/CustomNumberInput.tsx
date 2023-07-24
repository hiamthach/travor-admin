import React from 'react';

import { NumberInput, NumberInputProps } from '@mantine/core';

interface Props extends NumberInputProps {
  label: string;
  placeholder?: string;
}

const CustomInput = ({ label, placeholder, required, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-16 font-medium ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <NumberInput {...rest} required placeholder={placeholder} />
    </div>
  );
};

export default CustomInput;
