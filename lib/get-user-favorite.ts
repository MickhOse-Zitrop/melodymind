import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { FavoriteItem } from "@prisma/client";
import { TrackFullInfo } from "@/lib/find-tracks";

export type FavoriteItemWithTrack = FavoriteItem & {
  track: TrackFullInfo;
};

export const getUserFavorite = async () => {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
    include: {
      favorite: {
        include: {
          favoriteItem: {
            include: {
              track: {
                include: {
                  user: true,
                  trackType: {
                    orderBy: {
                      price: "asc",
                    },
                  },
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  if (!user.favorite || user.favorite.favoriteItem.length === 0) {
    return [] as FavoriteItemWithTrack[];
  }

  return user.favorite.favoriteItem as FavoriteItemWithTrack[];
};
