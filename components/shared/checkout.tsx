"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks";
import { CartStateItem } from "@/lib/get-cart-details";
import { toast } from "sonner";
import { Container } from "@/components/shared/container";
import { PageTitle } from "@/components/shared/page-title";
import { CheckoutGroup } from "@/components/shared/checkout-group";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button, Separator, Skeleton } from "@/components/ui";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { createOrder } from "@/app/actions";

export interface GroupedCartItem {
  author: string;
  totalPrice: number;
  items: CartStateItem[];
}

export const Checkout: React.FC = () => {
  const { totalAmount, removeCartItem, items, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const groupByAuthor = (items: CartStateItem[]): GroupedCartItem[] => {
    const groupedItems = items.reduce(
      (acc, item) => {
        if (!acc[item.author]) {
          acc[item.author] = [];
        }
        acc[item.author].push(item);
        return acc;
      },
      {} as Record<string, CartStateItem[]>,
    );

    return Object.keys(groupedItems).map((author) => ({
      author,
      totalPrice: items.reduce(
        (sum, currentItem) => sum + currentItem.price,
        0,
      ),
      items: groupedItems[author],
    }));
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);

      const url = await createOrder();

      toast.success("Заказ успешно оформлен! \n Переход на оплату...");

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error("Не удалось оформить заказ");
    }
  };

  return (
    <Container className="my-28">
      <PageTitle title={"Оформление заказа"} className="my-10" />
      <div className="flex gap-10">
        {loading ? (
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-xl" />
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-24 rounded-xl" />
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
            </div>
            <Separator />
            <div className="flex gap-4 items-center">
              <Skeleton className="w-24 h-24 aspect-square rounded-sm" />
              <div className="flex-1 flex flex-col gap-2 items-start">
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-52" />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Skeleton className="w-24 h-24 aspect-square rounded-sm" />
              <div className="flex-1 flex flex-col gap-2 items-start">
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-52" />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Skeleton className="w-24 h-24 aspect-square rounded-sm" />
              <div className="flex-1 flex flex-col gap-2 items-start">
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-52" />
              </div>
            </div>
          </div>
        ) : items.length > 0 ? (
          <div className="flex flex-col gap-10 flex-1">
            {groupByAuthor(items).map((item, i) => (
              <CheckoutGroup
                key={i}
                item={item}
                removeCartItem={(id) => removeCartItem(id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 gap-4 flex-1">
            <ShoppingBag size={52} />
            <h1 className="text-2xl font-medium">Ваша корзина пуста</h1>
            <p className="text-muted-foreground -mt-2">
              Когда вы добавите что-то в свою корзину, оно появится здесь
            </p>
            <Link href={"/tracks"}>
              <Button>
                К трекам <ArrowRight />
              </Button>
            </Link>
          </div>
        )}
        <div className="w-[450px]">
          <CheckoutSidebar
            items={groupByAuthor(items)}
            totalAmount={totalAmount}
            loading={loading || submitting}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </Container>
  );
};
