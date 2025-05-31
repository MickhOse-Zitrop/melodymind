import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { getUserSession } from "@/lib/get-user-session";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    console.log(token);

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Токен не найден" });
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "Токен не найден" });
    }

    const id = Number((await params).id);

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Продукт не найден" });
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    const updatedUserCart = await updateCartTotalAmount(user.id);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Не удалось удалить продукт` },
      { status: 500 },
    );
  }
}
