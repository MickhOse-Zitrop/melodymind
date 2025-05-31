import { AuthorFullInfo } from "@/@types/author-full-info";
import { GetSearchParams } from "@/lib/find-tracks";
import { prisma } from "@/prisma/prisma-client";

export const findUsers = async (
  params: GetSearchParams,
): Promise<AuthorFullInfo[]> => {
  const query = params.query || "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          displayName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          link: {
            contains: query.slice(0, 1) === "@" ? query.slice(1) : query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      author: {
        include: {
          subscribers: true,
        },
      },
      tracks: true,
    },
    orderBy: {
      author: {
        subscribers: {
          _count: "desc",
        },
      },
    },
  });

  return users as AuthorFullInfo[];
};
