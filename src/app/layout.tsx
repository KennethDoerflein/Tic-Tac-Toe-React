import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "A simple Tic Tac Toe game built with React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
