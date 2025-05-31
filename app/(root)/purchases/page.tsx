import { Container, PageTitle, PurchaseItem } from "@/components/shared";
import { Separator } from "@/components/ui";
import { Metadata } from "next";
import React from "react";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { getUserPurchases } from "@/lib/get-user-purchases";
import { redirect } from "next/navigation";
import { Track, TrackType, User } from "@prisma/client";

export type Items = {
  id: number;
  trackTypeId: number;
  cartId: number;
  createdAt: Date;
  updatedAt: Date;
  trackType: TrackType & {
    track: Track & {
      user: User;
    };
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Покупки`,
  };
}

export default async function PurchasesPage() {
  const purchases = await getUserPurchases();

  if (!purchases) {
    redirect("/not-authorized");
  }

  return (
    <Container>
      <PageTitle title={"Покупки"} className="my-10" />
      <div className="flex flex-col gap-5">
        {purchases.length > 0
          ? purchases.map((purchase) => (
              <div className="flex flex-col gap-2" key={purchase.date}>
                <h1>{purchase.date}</h1>
                <Separator />
                <div className="flex overflow-auto flex-col gap-3 px-2 scrollbar">
                  {purchase.orders.map((order) => (
                    <div key={order.id}>
                      {order.items.map((item) => (
                        <PurchaseItem item={item} key={item.id} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </Container>
  );
}
