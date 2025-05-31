import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Skeleton,
} from "@/components/ui";
import { Container, ProductCard } from "@/components/shared";
import { cn } from "@/lib";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/prisma/prisma-client";

interface Props {
  className?: string;
}

export const PopularTracks: React.FC<Props> = async ({ className }) => {
  const tracks = await prisma.track.findMany({
    include: {
      user: true,
      trackType: {
        orderBy: {
          price: "asc",
        },
      },
    },
    orderBy: {
      likes: "desc",
    },
    take: 10,
  });

  return (
    <div className={cn(className, "pt-6 pb-11 bg-secondary")}>
      <Container>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">Тренды</h1>
          <Link href={"/tracks"} className="flex items-center text-sm">
            Смотреть все <ChevronRight size={18} />
          </Link>
        </div>
        <Carousel>
          <CarouselContent>
            {tracks.length > 0
              ? tracks.map((track) => (
                  <CarouselItem
                    key={track.id}
                    className="sm:basis-1/5 basis-1/2"
                  >
                    <ProductCard
                      id={track.id}
                      title={track.title}
                      price={track.trackType[0].price}
                      user={track.user.displayName}
                      userId={track.user.link || track.user.id}
                      imageUrl={track.imageUrl || "/cover.png"}
                    />
                  </CarouselItem>
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="rounded-xl h-[310px] w-[243px]"
                  />
                ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
};
