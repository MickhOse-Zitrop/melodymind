import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export const getTrackFavorite = async (idTrack: number) => {
  const session = await getUserSession();

  if (!session) {
    return false;
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
    include: {
      favorite: {
        include: {
          favoriteItem: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  if (!user.favorite || user.favorite.favoriteItem.length === 0) {
    return false;
  }

  return !!user.favorite.favoriteItem.find(
    (item) => item.trackId === idTrack,
  ) as boolean;
};
