import { Profile } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { getSubscription } from "@/lib/get-subscription";
import { Metadata } from "next";
import { AuthorFullInfo } from "@/@types/author-full-info";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let user;

  try {
    user = await prisma.user.findFirst({
      where: { id: Number(id) },
    });
  } catch {
    user = await prisma.user.findFirst({
      where: { link: id },
    });
  }

  return {
    title: user?.displayName,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subscription = await getSubscription(id);
  const session = await getUserSession();
  let user;

  try {
    user = await prisma.user.findFirst({
      where: { id: session?.id === id ? Number(session?.id) : Number(id) },
      include: {
        author: {
          include: {
            subscribers: true,
          },
        },
        tracks: true,
      },
    });
  } catch {
    user = await prisma.user.findFirst({
      where: { link: id },
      include: {
        author: {
          include: {
            subscribers: true,
          },
        },
        tracks: true,
      },
    });
  }

  if (!user) {
    return notFound();
  }

  return (
    <Profile
      data={user as AuthorFullInfo}
      user={Number(session?.id) === user.id}
      subscription={subscription}
    />
  );
}
