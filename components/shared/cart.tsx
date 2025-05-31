"use client";

import React from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartItemTrack } from "@/components/shared/cart-item-track";
import { useCart } from "@/hooks";
import { licenses } from "@/data/data";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Cart: React.FC<Props> = ({ className }) => {
  const { totalAmount, items, removeCartItem, loading } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" disabled={loading}>
            <ShoppingCart />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Корзина</SheetTitle>
            <SheetDescription>
              В корзине {items.length} товаров.
            </SheetDescription>
          </SheetHeader>
          {totalAmount > 0 ? (
            <>
              <div className="flex overflow-auto flex-col gap-3 px-2 scrollbar">
                {items.map((item) => (
                  <CartItemTrack
                    key={item.id}
                    id={item.trackId}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    user={item.author}
                    userId={item.authorId}
                    license={
                      licenses.find(
                        (license) => license.id === item.trackTypeId,
                      )?.title || ""
                    }
                    disabled={item.disabled}
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                ))}
              </div>
              <SheetFooter className="bg-secondary">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>
                <Link href={"/checkout"}>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base"
                    disabled={redirecting || loading}
                    onClick={() => setRedirecting(true)}
                  >
                    Оформить заказ <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center h-full text-center px-5">
              <ShoppingCart size={100} />
              <h1 className="text-2xl font-bold">Ваша корзина пуста</h1>
              <p className="text-muted-foreground">
                Когда вы добавите что-то в свою корзину, оно появится здесь
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
