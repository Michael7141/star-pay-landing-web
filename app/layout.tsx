import { Outfit } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Pay",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className} suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}
