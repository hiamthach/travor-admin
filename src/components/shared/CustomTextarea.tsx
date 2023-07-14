import React from 'react';

import { Textarea, TextareaProps } from '@mantine/core';

interface Props extends TextareaProps {
  label: string;
  placeholder?: string;
  isTextarea?: boolean;
}

const CustomTextarea = ({ label, placeholder, required, isTextarea, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-16 font-medium ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Textarea {...rest} placeholder={placeholder} />
    </div>
  );
};

export default CustomTextarea;
