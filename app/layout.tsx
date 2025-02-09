import type { Metadata } from "next";
import { Roboto, Roboto_Serif } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["cyrillic-ext", "latin"],
  variable: "--font-roboto",
});

const robotoSerif = Roboto_Serif({
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["cyrillic-ext", "latin"],
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "Showcase",
  description: "U ii a ii u iii a i",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />
      <body
        className={`${roboto.variable} ${robotoSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
