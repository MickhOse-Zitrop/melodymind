import { Checkout } from "@/components/shared";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/get-user-session";
import { Metadata } from "next";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Оформление заказа`,
  };
}

export default async function CheckoutPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/not-authorized");
  }

  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
