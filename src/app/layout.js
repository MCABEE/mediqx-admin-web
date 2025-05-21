import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteProtector from "@/components/RouteProtector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQX",
  description: "Trusted Healthcare, On-Demand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-[196px] `}
      >
        {/* <RouteProtector> */}
          {children}
          {/* </RouteProtector> */}
      </body>
    </html>
  );
}
