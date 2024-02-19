import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/register-modal";
import LoginModal from "@/components/modals/login-modal";
import ToasterProvider from "@/components/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import RentModal from "@/components/modals/rent-modal";
import SearchModal from "@/components/modals/search-modal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <Navbar />
          <div className="pt-28 pb-20">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
