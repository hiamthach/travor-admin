import './globals.css';

import { AuthProvider } from '@/hooks/useAuth';

export const metadata = {
  title: 'Travor CMS',
  description: 'CMS for Travor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
