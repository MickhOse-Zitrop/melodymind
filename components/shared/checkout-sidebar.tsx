import React from "react";
import { cn, getInitials } from "@/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ScrollArea,
  Separator,
} from "@/components/ui";
import { GroupedCartItem } from "@/components/shared/checkout";

interface Props {
  totalAmount: number;
  items: GroupedCartItem[];
  loading?: boolean;
  onSubmit: () => void;
  className?: string;
}

const VAT = 5;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  items,
  loading,
  onSubmit,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice;

  return (
    <div
      className={cn(
        className,
        "p-6 sticky top-20 flex flex-col gap-5 bg-secondary rounded-xl",
        { "opacity-40 pointer-events-none": items.length === 0 },
      )}
    >
      <h1 className="font-medium text-2xl">Описание корзины</h1>
      <Separator />
      {items.length > 0 && (
        <>
          <ScrollArea className="flex flex-col max-h-44">
            {items.map((item) => (
              <div
                className="flex justify-between items-center py-2"
                key={item.author}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={item.items[0].authorImage}
                      className="object-cover"
                    />
                    <AvatarFallback>{getInitials(item.author)}</AvatarFallback>
                  </Avatar>
                  <h1 className="font-medium">{item.author}</h1>
                </div>
                <p>{item.totalPrice}₽</p>
              </div>
            ))}
          </ScrollArea>
          <Separator />
        </>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Сумма</span>
          <span>{totalAmount}₽</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Комиссия</span>
          <span>{vatPrice}₽</span>
        </div>
        <div className="flex items-center justify-between font-medium text-xl">
          <span>Итого</span>
          <span>{totalPrice}₽</span>
        </div>
      </div>
      <Button
        size="lg"
        className="text-base font-bold"
        disabled={loading}
        onClick={onSubmit}
      >
        Перейти к оплате
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        Нажав на кнопку &#34;Перейти к оплате&#34;, вы соглашаетесь с нашей{" "}
        <span className="cursor-pointer text-primary">
          Политикой возврата средств
        </span>{" "}
        и{" "}
        <span className="cursor-pointer text-primary">
          Условиями предоставления услуг MelodyMind
        </span>
      </p>
    </div>
  );
};
