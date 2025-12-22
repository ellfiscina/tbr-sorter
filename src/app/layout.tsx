
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { DndWrapper } from "@/contexts/dnd-wrapper";
import ModalProvider from "@/contexts/modal-context";
import NotificationProvider from "@/contexts/notification-context";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TBR Sorter",
  description: "Find your next read",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DndWrapper>
          <NotificationProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </NotificationProvider>
        </DndWrapper>
      </body>
    </html>
  );
}
