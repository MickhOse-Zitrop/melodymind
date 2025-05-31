import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import { Container, ProductCard } from "@/components/shared";
import { cn } from "@/lib";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  className?: string;
}

export const PopularGenres: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "pt-6 pb-11 bg-secondary")}>
      <Container>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">Популярные жанры</h1>
          <Link href={"/"} className="flex items-center text-sm">
            Смотреть все <ChevronRight size={18} />
          </Link>
        </div>
        <Carousel>
          <CarouselContent>
            {[
              "https://avatars.yandex.net/get-music-content/6386858/a8735a4d.a.30219960-2/200x200",
              "https://avatars.yandex.net/get-music-content/14247687/aa5255d1.a.32627004-3/200x200",
              "https://avatars.yandex.net/get-music-content/10703962/65e548ed.a.28256864-1/200x200",
              "https://avatars.yandex.net/get-music-content/5853241/931e7b94.a.29935728-1/200x200",
              "https://avatars.yandex.net/get-music-content/10126140/6ab5cd8d.a.32083232-1/200x200",
            ].map((e, i) => (
              <CarouselItem key={i} className="basis-1/5">
                <ProductCard id={i} title={"Title"} imageUrl={e} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
};
