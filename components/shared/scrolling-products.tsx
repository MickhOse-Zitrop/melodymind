"use client";

import React from "react";
import {
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import { cn } from "@/lib";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FavoriteItemWithTrack } from "@/lib/get-user-favorite";
import { ProductCard } from "@/components/shared";

interface Props {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  favorites: FavoriteItemWithTrack[];
  fullTitle: string;
  className?: string;
}

export const ScrollingProducts: React.FC<Props> = ({
  title,
  description,
  link,
  icon,
  favorites,
  fullTitle,
  className,
}) => {
  const [gridPage, setGridPage] = React.useState<boolean>(false);

  return gridPage ? (
    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4 mb-10">
      <Card className="justify-center">
        <CardContent className="flex flex-col gap-4 items-center justify-center select-none h-44">
          {icon}
          <div className="relative flex flex-col gap-4 items-center">
            <h1 className="font-bold text-lg text-center">{fullTitle}</h1>
            {favorites.length > 4 && (
              <Button variant="outline" onClick={() => setGridPage(!gridPage)}>
                <ArrowLeft />
                Скрыть все
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {favorites.map((favorite) => (
        <ProductCard
          key={favorite.id}
          id={favorite.track.id}
          title={favorite.track.title}
          imageUrl={favorite.track.imageUrl || ""}
          price={
            favorite.track.trackType.length
              ? favorite.track.trackType[0].price
              : 0
          }
          user={favorite.track.user.displayName}
          userId={favorite.track.user.link || favorite.track.user.id}
        />
      ))}
    </div>
  ) : (
    <Carousel className={cn(className, "mb-10")}>
      <CarouselContent>
        {favorites.length > 0 ? (
          <>
            <CarouselItem className="sm:basis-1/5 basis-1/2">
              <Card className="h-full justify-center">
                <CardContent className="flex flex-col gap-4 items-center justify-center select-none h-44">
                  {icon}
                  <div className="relative flex flex-col gap-4 items-center">
                    <h1 className="font-bold text-lg text-center">
                      {fullTitle}
                    </h1>
                    {favorites.length > 4 && (
                      <Button
                        variant="outline"
                        onClick={() => setGridPage(!gridPage)}
                      >
                        Смотреть все
                        <ArrowRight />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            {favorites.map((favorite) => (
              <CarouselItem
                key={favorite.id}
                className="sm:basis-1/5 basis-1/2"
              >
                <ProductCard
                  id={favorite.track.id}
                  title={favorite.track.title}
                  imageUrl={favorite.track.imageUrl || ""}
                  price={
                    favorite.track.trackType.length
                      ? favorite.track.trackType[0].price
                      : 0
                  }
                  user={favorite.track.user.displayName}
                  userId={favorite.track.user.link || favorite.track.user.id}
                />
              </CarouselItem>
            ))}
          </>
        ) : (
          <>
            <CarouselItem className="sm:basis-1/5 basis-1/2">
              <Card>
                <CardContent className="flex flex-col gap-4 items-center justify-center select-none h-44">
                  {/*{icon}*/}
                  <div className="flex flex-col items-center">
                    <h1 className="font-bold text-lg text-center">{title}</h1>
                    <Link href={link}>
                      <Button variant="link">{description}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            {Array.from({ length: 4 }).map((e, i) => (
              <CarouselItem key={i} className="sm:basis-1/5 basis-1/2">
                <Card>
                  <CardContent className="h-44 flex items-center justify-center select-none text-muted-foreground">
                    {icon}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </>
        )}
      </CarouselContent>
    </Carousel>
  );
};
