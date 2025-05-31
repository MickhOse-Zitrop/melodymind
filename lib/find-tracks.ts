import { prisma } from "@/prisma/prisma-client";
import {
  FavoriteItem,
  Track,
  TrackType,
  TrackTypeName,
  User,
} from "@prisma/client";

export type TrackFullInfo = Track & {
  user: User;
  trackType: TrackType[];
  favoriteItem: FavoriteItem[];
};

export interface GetSearchParams {
  query?: string;
  sort?: string;
  date?: string;
  licenses?: string;
  tags?: string;
  fromPrice?: string;
  toPrice?: string;
  page?: number;
  type?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100000;
const DEFAULT_PAGE = 1;
const DEFAULT_SORT = "popularity";
const DEFAULT_DATE = "all-time";

export const findTracks = async (params: GetSearchParams) => {
  const minPrice = Number(params.fromPrice) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.toPrice) || DEFAULT_MAX_PRICE;
  const page = Number(params.page) || DEFAULT_PAGE;
  const sort = params.sort || DEFAULT_SORT;
  const date = params.date || DEFAULT_DATE;
  const query = params.query;

  const tags = params.tags;
  const licenses = params.licenses?.split(",");

  let sorting;

  const beforeCurrentDay = new Date();

  switch (sort) {
    case "popularity":
      sorting = 0;
      break;
    case "listens":
      sorting = 1;
      break;
    case "new":
      sorting = 2;
      break;
    case "increasing":
      sorting = 3;
      break;
    case "descending":
      sorting = 4;
      break;
    default:
      sorting = 0;
      break;
  }

  switch (date) {
    case "all-time":
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 365);
      break;
    case "last-day":
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 1);
      break;
    case "last-week":
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 7);
      break;
    case "last-month":
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 30);
      break;
    case "last-year":
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 365);
      break;
    default:
      beforeCurrentDay.setDate(beforeCurrentDay.getDate() - 365);
      break;
  }

  const tracks = await prisma.track.findMany({
    where: {
      title: query
        ? {
            contains: query,
            mode: "insensitive",
          }
        : undefined,
      tags: tags
        ? {
            contains: tags,
          }
        : undefined,
      createdAt: {
        gte: beforeCurrentDay,
      },
      trackType: licenses
        ? {
            some: {
              name: {
                in: licenses as TrackTypeName[],
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          }
        : {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
    },
    include: {
      user: true,
      trackType: {
        orderBy: {
          price: "asc",
        },
      },
      favoriteItem: true,
    },
    orderBy: {
      likes: sorting === 0 ? "desc" : undefined,
      listens: sorting === 1 ? "desc" : undefined,
      createdAt: sorting === 2 ? "desc" : undefined,
    },
  });

  const pageTracks = (page - 1) * 15;

  if (sorting === 3) {
    return tracks
      .slice(pageTracks, pageTracks + 15)
      .sort((a, b) => a.trackType[0].price - b.trackType[0].price);
  } else if (sorting === 4) {
    return tracks
      .slice(pageTracks, pageTracks + 15)
      .sort((a, b) => b.trackType[0].price - a.trackType[0].price);
  }

  return tracks.slice(pageTracks, pageTracks + 5);
};
