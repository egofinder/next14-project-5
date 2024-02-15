import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/register-modal";
import LoginModal from "@/components/modals/login-modal";
import ToasterProvider from "@/components/providers/toaster-provider";
import { currentUser } from "@/libs/auth";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import RentModal from "@/components/modals/rent-modal";

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
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={nunito.className}>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
