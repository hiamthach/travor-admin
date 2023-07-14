import React from 'react';

import { TextInput, TextInputProps, Textarea } from '@mantine/core';

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
  isTextarea?: boolean;
}

const CustomInput = ({ label, placeholder, required, isTextarea, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-16 font-medium ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <TextInput {...rest} required placeholder={placeholder} />
    </div>
  );
};

export default CustomInput;
