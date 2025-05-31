import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { sendEmail } from "@/lib";
import { OrderSuccessTemplate } from "@/components/shared/email-templates/order-success";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.purchase.findFirst({
      where: { id: Number(body.object.metadata.order_id) },
      include: { user: true, items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.purchase.update({
      where: { id: order.id },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(
      order?.items as unknown as string,
    ) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.user.email,
        "Ваш заказ успешно оформлен!",
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      await sendEmail(
        order.user.email,
        "Ваш заказ не оформлен!",
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" });
  }
}
