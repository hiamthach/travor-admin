'use client';

import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ConfirmPopover from '@/components/shared/ConfirmPopover';

import userApi from '@/config/api/user.api';
import { USER_ROLES } from '@/config/constants/user.const';
import toastHelpers from '@/config/helpers/toast.helper';

import UserEditForm from './UserEditForm';
import UserView from './UserView';

import { ActionIcon, Modal, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { get } from 'lodash';

const { getUsersStats } = userApi;

const UserTable = () => {
  const { data, isLoading, refetch } = useQuery(['users', 'stats'], () => {
    return getUsersStats();
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<string | null>(null);

  return (
    <Skeleton visible={isLoading}>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
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
            data.users.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.full_name}</td>
                <td>{get(USER_ROLES, `[${item.role}]`, 'ADMIN')}</td>
                <td>
                  <div className="flex gap-1 items-center justify-end">
                    <ActionIcon
                      onClick={() => {
                        setSelectedUser(item.username);
                        open();
                      }}
                    >
                      <IconEye size={20} className="text-cyan-500" />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        setEditUser(item.username);
                        openEdit();
                      }}
                    >
                      <IconEdit size={20} className="text-secondary" />
                    </ActionIcon>
                    <ConfirmPopover
                      message="Are you sure to delete this?"
                      onConfirm={async () => {
                        toastHelpers.info('Coming soon');
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

        <Modal opened={opened} onClose={close} size="md" padding="sm" title="View User">
          {selectedUser && <UserView username={selectedUser} />}
        </Modal>

        <Modal opened={openedEdit} onClose={closeEdit} size="md" padding="sm" title="Edit User">
          {editUser && <UserEditForm username={editUser} close={closeEdit} refetchData={refetch} />}
        </Modal>
      </Table>
    </Skeleton>
  );
};

export default UserTable;
