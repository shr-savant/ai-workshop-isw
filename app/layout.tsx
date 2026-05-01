import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEAP 2026 · AI Workshop",
  description:
    "Making AI Work For You — a practical workshop by Rik Banerjee & Shrikant Savant at LEAP Collective 2026, India Society of Worcester.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
