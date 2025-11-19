import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import the providers
import { ReduxProvider } from '@/providers/ReduxProvider';
import { QueryProvider } from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Axiom Pulse Replica',
  description: 'Token Trading Table assignment built with Next.js 14 and Atomic Design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}