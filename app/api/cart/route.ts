import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart } from "@/lib";
import { CreateCartValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
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

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Не удалось получить корзину",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Необходимо войти в аккаунт!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Аккаунт не найден");
    }

    const userCart = await findOrCreateCart(user.id);
    const data = (await req.json()) as CreateCartValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        trackTypeId: data.trackTypeId,
      },
    });

    if (findCartItem) {
      throw new Error("Продукт уже в корзине");
    }

    const findSameCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        trackType: {
          track: {
            id: data.trackId,
          },
        },
      },
    });

    if (findSameCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findSameCartItem.id,
        },
        data: {
          trackTypeId: data.trackTypeId,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          trackTypeId: data.trackTypeId,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(
      userCart.userId as number,
    );

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
