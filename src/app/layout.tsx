import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import the providers
import { ReduxProvider } from '@/providers/ReduxProvider';
import { QueryProvider } from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Axiom Pulse Replica | Real-time Token Discovery',
  description: 'Live analysis of new token pairs, final stretch assets, and liquidity pools.',
  keywords: ['crypto', 'token', 'dashboard', 'axiom', 'nextjs'],
  openGraph: {
    title: 'Axiom Pulse Replica',
    description: 'Real-time Token Discovery Dashboard',
    type: 'website',
  },
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