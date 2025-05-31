import { Container, PageTitle, ScrollingProducts } from "@/components/shared";
import { ListMusic, Music } from "lucide-react";
import React from "react";
import { getUserFavorite } from "@/lib/get-user-favorite";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui";
import { Metadata } from "next";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Избранное`,
  };
}

export default async function FavoritesPage() {
  const favorites = await getUserFavorite();

  if (!favorites) {
    redirect("/not-authorized");
  }

  return (
    <Container>
      <PageTitle title="Избранное" className="my-10" />
      <ScrollingProducts
        title="У вас нет любимых треков"
        fullTitle={"Ваши любимые треки"}
        description="Исследуйте треки"
        icon={<Music size={100} />}
        favorites={favorites}
        link={"/tracks"}
      />
      <Separator className="mb-10" />
      <ScrollingProducts
        title="У вас нет любимых плейлистов"
        fullTitle={"Ваши любимые плейлисты"}
        description="Исследуйте плейлисты"
        icon={<ListMusic size={100} />}
        favorites={[]}
        link={"/tracks"}
      />
    </Container>
  );
}
