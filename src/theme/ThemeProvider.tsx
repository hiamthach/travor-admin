import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
        colorScheme: 'light',
        colors: {
          primary: [
            '#ff621f',
            '#ff7235',
            '#ff814c',
            '#ff9162',
            '#ffa179',
            '#ffb18f',
            '#ffc0a5',
            '#ffd0bc',
            '#ffe0d2',
            '#ffefe9',
          ],
        },

        primaryColor: 'primary',
        primaryShade: 1,

        components: {
          Button: {
            defaultProps: {
              radius: '200px',
            },
            styles: {
              root: {
                padding: '10px 25px',
                fontWeight: 700,
                fontSize: '18px',
                color: '#fff',
                height: '50px',
                width: 'fit-content',
              },
            },
          },

          Input: {
            styles: {
              input: {
                backgroundColor: '#fff',
                padding: '12px 20px',
                borderRadius: '200px',
                color: '#595959',
                fontSize: '14px',
                lineHeight: '20px',
                height: 'fit-content',
              },
            },
          },
        },
      }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
