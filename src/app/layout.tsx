import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brantley Price | Cybersecurity Analytics & Operations Portfolio",
  description: "Professional portfolio showcasing cybersecurity analytics, data science, and operations expertise. Featuring capstone projects, technical skills, and professional experience.",
  keywords: ["cybersecurity", "data analytics", "NIST", "Python", "Splunk", "portfolio", "Brantley Price"],
  authors: [{ name: "Brantley Price" }],
  creator: "Brantley Price",
  openGraph: {
    title: "Brantley Price | Cybersecurity Analytics & Operations Portfolio",
    description: "Professional portfolio showcasing cybersecurity analytics, data science, and operations expertise.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brantley Price | Cybersecurity Analytics & Operations Portfolio",
    description: "Professional portfolio showcasing cybersecurity analytics, data science, and operations expertise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="cyber-grid min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
