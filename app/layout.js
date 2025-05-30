import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Zorg dat deze import er is!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Snel Zandstralen",
  description: "Je werkstuk snel gezandstraald en klaar voor gebruik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      {/* Geen <head> tag direct meer hier, Next.js beheert dit met <Script> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Google Analytics 4 Scripts met next/script componenten */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZK7H198DET"
          strategy="afterInteractive" // Laadt script na de eerste interactieve elementen
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZK7H198DET'); // Vergeet niet je juiste ID hier te plaatsen!
          `}
        </Script>
      </body>
    </html>
  );
}