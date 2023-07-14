import './globals.css';
import { ReactQueryProvider } from './providers';

import { AuthProvider } from '@/hooks/useAuth';
import ThemeProvider from '@/theme/ThemeProvider';

export const metadata = {
  title: 'Travor CMS',
  description: 'CMS for Travor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
