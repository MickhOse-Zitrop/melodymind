import { Container, PageTitle, ScrollingProducts } from "@/components/shared";
import { Headphones, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import React from "react";
import { Metadata } from "next";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Мои плейлисты`,
  };
}

export default function MyPlaylists() {
  return (
    <Container>
      <div className="my-10 flex justify-between">
        <PageTitle title="Мои плейлисты" />
        <Button>
          <Plus /> Новый плейлист
        </Button>
      </div>
      <ScrollingProducts
        title="Плейлистов пока нет"
        description="Давайте создадим"
        icon={<Headphones size={100} />}
        link={""}
        favorites={[]}
        fullTitle={""}
      />
    </Container>
  );
}
