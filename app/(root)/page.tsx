import Marquee from "react-fast-marquee";
import { Intro, PopularTracks, SubscribeOnUs } from "@/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MelodyMind — Главная",
};

export default function HomePage() {
  return (
    <>
      <Suspense>
        <Intro />
      </Suspense>
      <PopularTracks />
      <div className="bg-background">
        <h1 className="py-3 text-center font-bold text-xl text-foreground">
          Мы доверяем:
        </h1>
        <Marquee className="">
          <div className="flex w-full gap-40 items-center bg-background mr-16">
            {Array.from({ length: 5 }).map((_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`marquee-${i}.png`}
                alt="Image"
                key={i}
                // className="h-24"
              />
            ))}
          </div>
        </Marquee>
      </div>
      {/*<PopularGenres />*/}
      <SubscribeOnUs />
    </>
  );
}
