import React from "react";
import { cn, getInitials } from "@/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
} from "@/components/ui";
import { Tag } from "lucide-react";
import { CheckoutItem } from "@/components/shared/checkout-item";
import { GroupedCartItem } from "@/components/shared/checkout";

interface Props {
  item: GroupedCartItem;
  removeCartItem: (id: number) => void;
  className?: string;
}

export const CheckoutGroup: React.FC<Props> = ({
  item,
  removeCartItem,
  className,
}) => {
  return (
    <div className={cn(className, "flex flex-col gap-3")}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={item.items[0].authorImage || ""}
              className="object-cover"
            />
            <AvatarFallback>{getInitials(item.author)}</AvatarFallback>
          </Avatar>
          <h1 className="text-muted-foreground font-medium">{item.author}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-muted-foreground">
            {item.items.length} товаров: {item.totalPrice}₽
          </h3>
          <Button variant="link" size="sm">
            <Tag />
            Применить купон
          </Button>
        </div>
      </div>
      {item.items.map((item) => (
        <div className="flex flex-col gap-3" key={item.id}>
          <Separator />
          <CheckoutItem
            item={item}
            removeCartItem={(id) => removeCartItem(id)}
          />
        </div>
      ))}
    </div>
  );
};
