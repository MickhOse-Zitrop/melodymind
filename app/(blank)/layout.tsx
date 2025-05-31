import { Metadata } from "next";
import React from "react";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "MelodyMind",
};

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-16">{children}</main>
    </>
  );
}
