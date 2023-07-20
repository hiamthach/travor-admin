import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import ConfirmPopover from '@/components/shared/ConfirmPopover';
import CustomInput from '@/components/shared/CustomInput';

import packageApi from '@/config/api/package.api';

import { ActionIcon, Loader, Table } from '@mantine/core';

const { getTypes, createType, deleteType } = packageApi;

const TypesMgm = () => {
  const { data, isLoading, refetch } = useQuery(['types'], async () => {
    return getTypes();
  });

  const handleNewType = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newType = (e.target as HTMLInputElement).value;
      await createType(newType);
      refetch();

      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="min-h-[50vh]">
      <div className="mb-4">
        <CustomInput label="New Type" onKeyDown={handleNewType} />
      </div>

      <h4>Types</h4>
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader variant="dots" />
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th
                style={{
                  textAlign: 'right',
                }}
                className="-translate-x-4"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.types.map((t, i) => (
                <tr key={t.id}>
                  <td>{i + 1}</td>
                  <td>{t.name}</td>
                  <td>
                    <div className="flex gap-1 items-center justify-end">
                      <ConfirmPopover
                        message="Are you sure to delete this?"
                        onConfirm={async () => {
                          deleteType(t.id).then(() => {
                            refetch();
                          });
                        }}
                      >
                        <ActionIcon>
                          <IconTrash size={20} className="text-red-600" />
                        </ActionIcon>
                      </ConfirmPopover>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TypesMgm;
