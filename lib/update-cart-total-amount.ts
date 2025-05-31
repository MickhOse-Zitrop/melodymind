import { prisma } from "@/prisma/prisma-client";

export const updateCartTotalAmount = async (id: number) => {
  const userCart = await prisma.cart.findFirst({
    where: { userId: id },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          trackType: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + item.trackType.price;
  }, 0);

  return await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
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
  });
};
