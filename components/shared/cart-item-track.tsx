import React from "react";
import { Separator } from "@/components/ui";
import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib";
import Link from "next/link";

interface Props {
  key?: number;
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  onClickRemove?: () => void;
  user: string;
  userId: string;
  license: string;
  className?: string;
}

export const CartItemTrack: React.FC<Props> = ({
  id,
  title,
  imageUrl,
  price,
  disabled,
  user,
  userId,
  onClickRemove,
  license,
  className,
}) => {
  return (
    <div
      key={id}
      className={cn(
        "flex flex-col gap-3 p-2 bg-secondary rounded-md",
        { "opacity-50 pointer-events-none": disabled },
        className,
      )}
    >
      <div className="flex gap-3">
        <div className="aspect-square rounded-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full w-full object-cover"
            src={imageUrl || "/cover.png"}
            alt="Image"
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Link href={`/track/${id}`} className="w-72 font-medium truncate">
            {title}
          </Link>
          <Link
            href={`/author/${userId}`}
            className="text-sm text-muted-foreground"
          >
            {user}
          </Link>
        </div>
      </div>
      <Separator className="bg-muted-foreground" />
      <div className="flex items-center gap-2 justify-between w-full px-2 mb-1">
        <h1 className="text-sm w-40 truncate">{license}</h1>
        <h1 className="text-primary font-medium">{price}₽</h1>
        <Trash2Icon
          size={16}
          onClick={onClickRemove}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
