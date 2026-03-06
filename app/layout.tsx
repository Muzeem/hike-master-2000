import type { Metadata } from 'next';
import { Rubik, DM_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const rubik = Rubik({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

import { fetchData } from '@/lib/fetchData';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchData();
  const description = `${data.role}${data.team ? ` | ${data.team}` : ''}`;

  return {
    title: data.name,
    description: description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
