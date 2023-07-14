'use client';

import Link from 'next/link';

import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import React from 'react';

import ConfirmPopover from '@/components/shared/ConfirmPopover';
import destinationApi from '@/config/api/destination.api';
import { Destination } from '@/config/types/destination.type';
import { ActionIcon, Table } from '@mantine/core';

const { deleteDestination } = destinationApi;

interface Props {
  destinations: Destination[];
  refetch: () => void;
}

const DestinationsTable = ({ destinations, refetch }: Props) => {
  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Language</th>
          <th>Price</th>
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
        {destinations.map((destination) => (
          <tr key={destination.id}>
            <td>{destination.name}</td>
            <td>{destination.country}</td>
            <td>{destination.language}</td>
            <td>{destination.price}</td>
            <td>
              <div className="flex gap-1 items-center justify-end">
                <Link href={`/destinations/${destination.id}`} className="hover:opacity-90 leading-1">
                  <ActionIcon>
                    <IconEye size={20} className="text-cyan-500" />
                  </ActionIcon>
                </Link>
                <Link href={`/destinations/${destination.id}/edit`} className="hover:opacity-90 leading-1">
                  <ActionIcon>
                    <IconEdit size={20} className="text-secondary" />
                  </ActionIcon>
                </Link>
                <ConfirmPopover
                  message="Are you sure to delete this?"
                  onConfirm={async () => {
                    deleteDestination(destination.id).then(() => {
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
  );
};

export default DestinationsTable;
