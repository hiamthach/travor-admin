import React from 'react';

import { Button, Divider, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  children: React.ReactNode;
  message: string;
  onConfirm: () => void;
}

const ConfirmPopover = ({ children, message, onConfirm }: Props) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width={240}
      position="bottom-end"
      withArrow
      shadow="md"
      closeOnClickOutside
      onClose={close}
      opened={opened}
    >
      <Popover.Target>
        <div onClick={open}>{children}</div>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="">
          <h4 className="text-heading font-semibold">{message}</h4>

          <div className="flex justify-end gap-2 mt-3">
            <Button
              onClick={() => {
                onConfirm();
                close();
              }}
              size="sm"
            >
              Yes
            </Button>
            <Button onClick={close} variant="outline" size="sm">
              No
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ConfirmPopover;
