import { Container, PageTitle, UploadTrack } from "@/components/shared";
import React from "react";
import { Metadata } from "next";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Загрузка трека`,
  };
}

export default async function UploadTrackPage() {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect("/not-authorized");
  }

  return (
    <Container>
      <PageTitle title="Загрузка трека" className="my-10" />
      <UploadTrack user={user} />
    </Container>
  );
}
