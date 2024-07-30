import "./globals.css";
import '@mantine/core/styles.css';
import { Inter } from "next/font/google";
import '@mantinex/mantine-logo/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Group Order App",
  description: "Group Order App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200 min-h-full min-w-full`}>
        {children}
      </body>
    </html>
  );
}
