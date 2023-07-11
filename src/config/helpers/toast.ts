import { notifications } from '@mantine/notifications';

const toastHelpers = {
  success: (message: string) => {
    notifications.show({
      title: 'Success',
      message,
      color: 'green',
    });
  },

  error: (message: string) => {
    notifications.show({
      title: 'Error',
      message,
      color: 'red',
    });
  },

  info: (message: string) => {
    notifications.show({
      title: 'Info',
      message,
      color: 'blue',
    });
  },
};

export default toastHelpers;
