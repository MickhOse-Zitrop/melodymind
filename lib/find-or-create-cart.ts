import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (userId: number) => {
  let userCart = await prisma.cart.findFirst({ where: { userId: userId } });

  if (!userCart)
    userCart = await prisma.cart.create({
      data: {
        userId: userId,
      },
    });
  return userCart;
};
