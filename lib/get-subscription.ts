import { getServerSession } from "next-auth";
import { authOptions } from "@/constants";
import { prisma } from "@/prisma/prisma-client";

export const getSubscription = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  let subscribers;

  try {
    subscribers = await prisma.author.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        subscribers: true,
      },
    });
  } catch {
    const user = await prisma.user.findFirst({
      where: { link: id },
    });

    if (!user) {
      return null;
    }

    subscribers = await prisma.author.findFirst({
      where: { id: user.id },
      include: { subscribers: true },
    });
  }

  if (!subscribers) {
    return null;
  }

  const subscribersIds = subscribers.subscribers.map((user) => user.id);

  if (!subscribersIds.includes(Number(session.user.id))) {
    return null;
  }

  return true;
};
