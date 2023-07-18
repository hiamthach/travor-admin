import { notifications } from '@mantine/notifications';

const toastHelpers = {
  success: (message: string) => {
    notifications.clean();
    notifications.show({
      title: 'Success',
      message,
      color: 'green',
    });
  },

  error: (message: string) => {
    notifications.clean();
    notifications.show({
      title: 'Error',
      message,
      color: 'red',
    });
  },

  info: (message: string) => {
    notifications.clean();
    notifications.show({
      title: 'Info',
      message,
      color: 'blue',
    });
  },

  loading: (message: string) => {
    notifications.clean();
    notifications.show({
      title: 'Loading',
      message,
      color: 'cyan',
      loading: true,
    });
  },
};

export default toastHelpers;
