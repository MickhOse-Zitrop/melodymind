"use client";

import React from "react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Separator,
} from "@/components/ui";
import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib";
import { TrackFullInfo } from "@/lib/find-tracks";
import { AuthorFullInfo } from "@/@types/author-full-info";
import { UserCard } from "@/components/shared/user-card";
import { Type, useFilters } from "@/hooks/use-filters";
import { useQueryFilters } from "@/hooks";

interface Props {
  type: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  className?: string;
}

export const SearchSlider: React.FC<Props> = ({ data, type, className }) => {
  const filters = useFilters();

  useQueryFilters(filters);

  return (
    <div className={cn(className, "flex flex-col gap-4")}>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">
          {type === "tracks" ? "Треки" : "Пользователи"}
        </h1>
        <Button
          variant="link"
          onClick={() =>
            type === "tracks"
              ? filters.setType("tracks" as unknown as Type)
              : filters.setType("users" as unknown as Type)
          }
        >
          Показать все
        </Button>
      </div>
      <Separator />
      {data.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {type === "tracks"
              ? data.slice(0, 5).map((item: TrackFullInfo) => (
                  <CarouselItem key={item.id} className="basis-1/5">
                    <ProductCard
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl || ""}
                      price={
                        item.trackType.length ? item.trackType[0].price : 0
                      }
                      user={item.user.displayName}
                      userId={item.user.link || item.user.id}
                    />
                  </CarouselItem>
                ))
              : data.slice(0, 5).map((item: AuthorFullInfo) => (
                  <CarouselItem key={item.id} className="basis-1/5">
                    <UserCard
                      id={item.id}
                      link={item.link || undefined}
                      imageUrl={item.imageUrl || ""}
                      displayName={item.displayName}
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="flex items-center justify-center text-2xl font-medium py-20">
          Ничего не найдено!
        </div>
      )}
    </div>
  );
};
