'use client';

import Link from 'next/link';

import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';

import ConfirmPopover from '@/components/shared/ConfirmPopover';

import packageApi from '@/config/api/package.api';
import { Package } from '@/config/types/package.type';

import PackagesView from './PackagesView';

import { ActionIcon, Badge, Image, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const { deletePackage } = packageApi;

interface Props {
  packages: Package[];
  refetch: () => void;
}

const PackagesTable = ({ packages, refetch }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [viewPackage, setViewPackage] = useState<Package>();

  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Types</th>
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
        {packages.map((pkg) => (
          <tr key={pkg.id}>
            <td>
              <Image withPlaceholder width={200} height={120} radius={10} alt={pkg.name} src={pkg.img_url} />
            </td>
            <td>{pkg.name}</td>
            <td>{pkg.duration}</td>
            <td>{pkg.price}</td>
            <td>
              {pkg.types?.map((t) => {
                return (
                  <Badge key={t.id} color="teal">
                    {t.name}
                  </Badge>
                );
              })}
            </td>
            <td>
              <div className="flex gap-1 items-center justify-end">
                <ActionIcon
                  onClick={() => {
                    setViewPackage(pkg);
                    open();
                  }}
                >
                  <IconEye size={20} className="text-cyan-500" />
                </ActionIcon>
                <Link href={`/packages/edit/${pkg.id}`} className="hover:opacity-90 leading-1">
                  <ActionIcon>
                    <IconEdit size={20} className="text-secondary" />
                  </ActionIcon>
                </Link>
                <ConfirmPopover
                  message="Are you sure to delete this?"
                  onConfirm={async () => {
                    deletePackage(pkg.id).then(() => {
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

      <Modal size={'xl'} opened={opened} onClose={close} title={'View package'}>
        {viewPackage && <PackagesView data={viewPackage} />}
      </Modal>
    </Table>
  );
};

export default PackagesTable;
