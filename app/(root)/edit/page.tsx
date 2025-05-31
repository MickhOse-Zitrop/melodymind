import { Edit } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  return {
    title: `${user?.displayName} — Настройки аккаунта`,
  };
}

export default async function EditPage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-authorized");
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });

  if (!user) {
    return redirect("/not-authorized");
  }

  return <Edit data={user} />;
}
