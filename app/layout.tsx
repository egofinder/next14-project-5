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

// 이거 안적으면 렌더링을 할때 오류가 발생하는데 원인과 해결방법을 잘 찾아봐야 함.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};
// This is the root layout for the app
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
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar />
          <div className="pt-28 pb-20">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
