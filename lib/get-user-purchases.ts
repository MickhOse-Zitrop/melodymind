import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { Purchase, PurchaseItem, Track, TrackType, User } from "@prisma/client";

export type PurchaseWithTrack = Purchase & {
  items: PurchaseItemWithTrack[];
};

export type PurchaseItemWithTrack = PurchaseItem & {
  trackType: TrackType & {
    track: Track & {
      user: User;
    };
  };
};

export const getUserPurchases = async () => {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  };

  const purchases = await prisma.purchase.findMany({
    where: { userId: Number(session.id) },
    include: {
      items: {
        include: {
          trackType: {
            include: {
              track: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!purchases || purchases.length === 0) {
    return [];
  }

  const groupedOrders = purchases.reduce(
    (result, order) => {
      const dateKey = formatDate(order.createdAt);
      if (!result[dateKey]) {
        result[dateKey] = [];
      }
      result[dateKey].push(order);
      return result;
    },
    {} as Record<string, PurchaseWithTrack[]>,
  );

  const sortedDates = Object.keys(groupedOrders).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return sortedDates.map((date) => ({
    date,
    orders: groupedOrders[date],
  }));
};
