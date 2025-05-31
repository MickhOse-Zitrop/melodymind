import React from "react";
import Link from "next/link";
import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  id: number;
  title: string;
  key?: number;
  price?: number;
  user?: string;
  userId?: string | number;
  imageUrl?: string;
  edit?: boolean;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  title,
  price,
  user,
  userId,
  imageUrl,
  edit,
  className,
}) => {
  return (
    <Card className={className}>
      <CardContent
        className={cn("select-none duration-150", {
          "group-hover:opacity-75": edit,
        })}
      >
        <Link href={`/track/${id}`}>
          <AspectRatio>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover"
              src={imageUrl || "/cover.png"}
              alt="Обложка"
            />
          </AspectRatio>
        </Link>
      </CardContent>
      <CardHeader>
        <CardTitle className="w-full truncate pb-2">
          <Link href={`/track/${id}`}>{title}</Link>
        </CardTitle>
        <CardDescription className="flex items-center justify-between gap-1 sm:gap-3 w-full">
          {userId !== 0 && (
            <Link
              href={`/author/${userId}`}
              className={cn(
                "truncate text-xs",
                price === 0
                  ? "sm:w-20 w-10"
                  : price && price > 1000000
                    ? "sm:w-24 w-12"
                    : "sm:w-28 w-14",
              )}
            >
              {user}
            </Link>
          )}
          {/*RUBLE-SIGN*/}
          {price !== undefined ? (
            <span
              className={cn("text-primary font-medium", {
                "text-sm": price === 0,
              })}
            >
              {price === 0 ? "БЕСПЛАТНО" : price + "₽"}
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
