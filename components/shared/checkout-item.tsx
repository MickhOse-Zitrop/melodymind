import React from "react";
import { cn } from "@/lib";
import { Avatar, AvatarImage, Button } from "@/components/ui";
import { X } from "lucide-react";
import { CheckoutLicenseDescription } from "@/components/shared";
import Link from "next/link";
import { licenses } from "@/data/data";
import { CartStateItem } from "@/lib/get-cart-details";

interface Props {
  item: CartStateItem;
  removeCartItem: (id: number) => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  item,
  removeCartItem,
  className,
}) => {
  const license = licenses.find((license) => license.id === item.trackTypeId);

  if (!license) {
    return null;
  }

  return (
    <div
      className={cn(className, "flex gap-4 items-center", {
        "opacity-40 pointer-events-none": item.disabled,
      })}
    >
      <Avatar className="w-24 h-24 aspect-square rounded-sm">
        <AvatarImage
          src={item.imageUrl || "/cover.png"}
          className="object-cover"
        />
      </Avatar>
      <div className="flex-1 flex flex-col gap-2 items-start">
        <Link href={`/track/${item.trackId}`} className="text-xl font-medium">
          {item.title}
        </Link>
        <p className="text-muted-foreground text-sm">{license.title}</p>
        <CheckoutLicenseDescription license={license}>
          <Button variant="link" size="sm" className="p-0">
            Описание лицензии
          </Button>
        </CheckoutLicenseDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeCartItem(item.id)}
      >
        <X />
      </Button>
    </div>
  );
};
