'use client';

import { ReactNode } from 'react';

import { ButtonStylesParams, MantineProvider } from '@mantine/core';
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
            '#ff621f',
            '#ff621f',
            '#ff621f',
            '#ff621f',
            '#ffb18f',
            '#ffb18f',
            '#ffb18f',
            '#ffb18f',
            '#ffb18f',
          ],
        },

        primaryColor: 'primary',
        primaryShade: 4,

        components: {
          Button: {
            defaultProps: {
              radius: '200px',
            },
            styles: (theme, params: ButtonStylesParams, { size, variant }) => ({
              root: {
                'padding': size === 'sm' ? '6px 12px' : '10px 25px',
                'fontWeight': 700,
                'fontSize': size === 'sm' ? '14px' : '18px',
                'height': size === 'sm' ? 'fit-content' : '50px',
                'width': 'fit-content',

                ':hover': {
                  backgroundColor: variant === 'outline' ? theme.colors[params.color || theme.primaryColor][4] : '',
                  color: variant === 'outline' ? '#fff' : '',
                },
              },

              sm: {
                padding: '6px 12px',
              },
            }),
          },

          Input: {
            styles: {
              input: {
                backgroundColor: '#fff',
                padding: '12px 20px',
                borderRadius: '24px',
                color: '#595959',
                fontSize: '14px',
                lineHeight: '20px',
                height: 'fit-content',
              },
              label: {
                marginBottom: '8px',
              },
            },
          },
        },
      }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" autoClose={3000} />
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
