import { Inter } from 'next/font/google'
// or if you specifically want Geist
import { GeistSans } from 'geist/font'
import "./globals.css";

export const metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

const inter = Inter({ subsets: ['latin'] })
// or for Geist
// const geistSans = GeistSans

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
