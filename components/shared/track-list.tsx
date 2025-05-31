"use client";

import React, { Suspense } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib";
import { PaginationWithLinks } from "@/components/shared/pagination-with-links";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Separator, Skeleton } from "@/components/ui";
import { RotateCcw } from "lucide-react";
import { TrackFullInfo } from "@/lib/find-tracks";

interface Props {
  tracks: TrackFullInfo[];
  className?: string;
}

export const TrackList: React.FC<Props> = ({ tracks, className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (!tracks) {
    return (
      <>
        {/*<div className="relative mb-16 flex justify-center items-center">*/}
        <Separator className="mb-16" />
        {/*  <Button*/}
        {/*    size="sm"*/}
        {/*    className="absolute rounded-full group"*/}
        {/*    // onClick={update}*/}
        {/*  >*/}
        {/*    <RefreshCcw className="group-hover:rotate-180 duration-300" />*/}
        {/*    Обновить*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className="flex flex-col justify-center items-center">
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-8 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="w-full h-75 bg-secondary" key={index} />
            ))}
          </div>
          <Skeleton className="w-75 h-9 bg-secondary mt-12" />
        </div>
      </>
    );
  } else if (tracks.length === 0) {
    return (
      <>
        {/*<div className="relative mb-16 flex justify-center items-center">*/}
        <Separator className="mb-16" />
        {/*  <Button*/}
        {/*    size="sm"*/}
        {/*    className="absolute rounded-full group"*/}
        {/*    // onClick={update}*/}
        {/*  >*/}
        {/*    <RefreshCcw className="group-hover:rotate-180 duration-300" />*/}
        {/*    Обновить*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className="flex flex-col gap-4 pt-20 justify-center items-center">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Ничего подходящего не найдено!
          </h1>
          <p className="w-[65%] text-center">
            Возможно, фильтров стало слишком много или музыка, которую ищете,
            пока не создана? Попробуйте расширить диапазон поиска или очистить
            фильтры — впереди вас ждёт огромное музыкальное пространство! Или
            станьте первооткрывателем нового звучания прямо сейчас!
          </p>
          <Button className="mt-4" onClick={() => router.push("/tracks")}>
            <RotateCcw />
            Очистить фильтры
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/*<div className="relative mb-16 flex justify-center items-center">*/}
      <Separator className="mb-16" />
      {/*  <Button*/}
      {/*    size="sm"*/}
      {/*    className="absolute rounded-full group"*/}
      {/*    // onClick={() => update()}*/}
      {/*  >*/}
      {/*    <RefreshCcw className="group-hover:rotate-180 duration-300" />*/}
      {/*    Обновить*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <div className={cn("grid sm:grid-cols-5 grid-cols-2 gap-8", className)}>
        {tracks.map((track) => (
          <div key={track.id}>
            <ProductCard
              id={track.id}
              title={track.title}
              imageUrl={track.imageUrl || ""}
              price={track.trackType.length ? track.trackType[0].price : 0}
              user={track.user.displayName}
              userId={track.user.link || track.user.id}
            />
          </div>
        ))}
      </div>
      <Suspense>
        <PaginationWithLinks
          totalCount={tracks.length}
          pageSize={14}
          page={currentPage}
          className="mt-12"
        />
      </Suspense>
    </>
  );
};
