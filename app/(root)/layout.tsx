import { Metadata } from "next";
import React, { Suspense } from "react";
import { Cart, Footer, Header, MenuBar } from "@/components/shared";

export const metadata: Metadata = {
  title: "MelodyMind",
};

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense>
        <Header>
          <Cart />
        </Header>
      </Suspense>
      <main className="min-h-screen mt-16">
        <MenuBar />
        {children}
        <Footer />
      </main>
    </>
  );
}
