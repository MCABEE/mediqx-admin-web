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
      <head>
        <link
  href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
  rel="stylesheet"
/>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-[20px] xl:px-[80px] 2xl:px-[196px] `}
      >
        {/* <RouteProtector> */}
          {children}
          {/* </RouteProtector> */}
      </body>
    </html>
  );
}
