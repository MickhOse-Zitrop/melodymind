"use client";

import React from "react";
import { cn } from "@/lib";
import { Container } from "@/components/shared";
import { Input, Button } from "@/components/ui";
import { Search } from "lucide-react";
import Link from "next/link";
import { useFilters, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const Intro: React.FC<Props> = ({ className }) => {
  const filters = useFilters();
  const [search, setSearch] = React.useState<string>(filters.query || "");

  useQueryFilters(filters);

  return (
    <div
      className={cn(
        className,
        "relative flex items-center justify-start sm:h-[600px] h-[400px]",
      )}
    >
      <Container className="flex flex-col gap-8 w-full z-20">
        <div className="flex flex-col gap-3">
          <h1 className="sm:text-7xl text-2xl font-extrabold">
            Live by the <span className="text-red-500">beat</span>
          </h1>
          <h1 className="sm:text-6xl text-2xl font-extrabold">
            of your <span className="text-red-500">heart</span>
          </h1>
        </div>
        <div className="flex items-center p-3 w-full sm:w-[50%] bg-secondary rounded-xl gap-2 select-none">
          <Search />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="focus-visible:border-none border-none focus-visible:ring-0 dark:bg-secondary shadow-none"
            placeholder="Исследуйте новые звуки - ищите ритмы и продюсеров"
          />
          <Link href={`/search?query=${search}`}>
            <Button>Поиск</Button>
          </Link>
        </div>
      </Container>
      <div className="top-0 h-full w-full absolute overflow-hidden select-none">
        <div className="sm:block hidden h-full absolute z-10 w-[65%] bg-linear-to-r from-background from-80%" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute right-0 h-full w-full opacity-20 sm:opacity-100 sm:w-[50%] object-cover"
          src="/intro.png"
          alt="Intro"
        />
      </div>
    </div>
  );
};
