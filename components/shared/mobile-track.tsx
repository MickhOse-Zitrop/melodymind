"use client";

import React from "react";
import { cn, getBigNumber } from "@/lib";
import { Download, Heart, Repeat, Share, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { TrackFullInfo } from "@/lib/find-tracks";
import { saveAs } from "file-saver";
import { updateLike } from "@/app/actions";
import { AudioPlayer } from "@/components/shared/audio-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from "@/components/ui";
import { licenses } from "@/data/data";
import { TrackLicense } from "@/components/shared/track-license";
import { useCartStore } from "@/store";
import { License } from "@/@types/licenses";

interface Props {
  track: TrackFullInfo;
  favorite: boolean;
  className?: string;
}

export const MobileTrack: React.FC<Props> = ({
  track,
  favorite,
  className,
}) => {
  const [liked, setLiked] = React.useState<boolean>(favorite);
  const [sLoading, setLoading] = React.useState<boolean>(false);

  const saveFile = () => {
    if (track.downloadUrl)
      saveAs(track.downloadUrl, `${track.title} | ${track.user.displayName}`);

    toast.success("Трек уже скачивается!");
  };

  const onHandleLike = async () => {
    try {
      setLoading(true);

      const like = await updateLike({ id: track.id });

      setLoading(false);
      if (like.like === 0) {
        setLiked(false);
      } else {
        setLiked(true);
      }

      toast.success(like.message);
    } catch (e) {
      setLoading(false);
      const error = e as Error;

      console.log(e);
      return toast.error(error.message);
    }
  };

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const [selectedLicense, setSelectedLicense] = React.useState<License | null>(
    null,
  );

  const onSubmit = async () => {
    try {
      const itemId = track.trackType.find(
        (trackType) => trackType.name === selectedLicense?.id,
      )?.id;

      if (!itemId) {
        throw new Error("Выберите лицензию");
      }

      await addCartItem({
        trackTypeId: itemId,
        trackId: track.id,
      });

      toast.success(`Трек добавлен в корзину!`);
    } catch (error) {
      console.log(error);
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  return (
    <div className={cn(className, "flex-col -mt-6")}>
      <div className="relative h-[400px]">
        <div className="relative z-10 h-full flex gap-4 items-end p-4">
          <AudioPlayer
            src={track.trackType.find((type) => type.name === "mp3")?.fileUrl}
            id={track.id}
          />
          <div>
            <h1 className="text-xl font-bold">{track.title}</h1>
            <p className="text-muted-foreground">{track.user.displayName}</p>
          </div>
        </div>
        <div className="absolute h-full top-0 z-0">
          <div className="absolute z-10 size-full bg-linear-to-b from-0% to-85% to-background"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full w-full object-cover"
            src={track.imageUrl || "/cover.png"}
            alt="Image"
          />
        </div>
      </div>
      <div className="flex justify-around my-4">
        <div className="flex flex-col gap-1 items-center select-none">
          <Heart
            className={cn(
              "cursor-pointer",
              liked && "text-primary",
              sLoading && "animate-pulse",
            )}
            onClick={onHandleLike}
          />
          <p className="text-muted-foreground">
            {getBigNumber(track.favoriteItem.length)}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Repeat />
          <p className="text-muted-foreground">{getBigNumber(track.listens)}</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Share
            onClick={async () => {
              await navigator.clipboard.writeText(
                window.location as unknown as string,
              );

              toast.success("Ссылка успешно скопирована!");
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
      {track.demo && (
        <Button className="mb-3" onClick={saveFile}>
          <Download />
          Скачать бесплатно
        </Button>
      )}
      <div className="bg-secondary p-4 rounded-2xl flex flex-col gap-5">
        <div className="flex justify-between">
          {selectedLicense !== null && (
            <div className="flex flex-col">
              <h2 className="text-muted-foreground text-xs">СТОИМОСТЬ</h2>
              <h1>
                {
                  track.trackType.find(
                    (trackType) => trackType.name === selectedLicense?.id,
                  )?.price
                }
                ₽
              </h1>
            </div>
          )}
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={!selectedLicense || loading}
          >
            <ShoppingBag />
            Добавить
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {licenses
            .filter((license) =>
              track.trackType.find((type) => type.name === license.id),
            )
            .map((license) => (
              <TrackLicense
                key={license.id}
                license={license}
                price={
                  track.trackType.find((type) => type.name === license.id)
                    ?.price
                }
                selectedLicense={selectedLicense}
                action={(e) => setSelectedLicense(e)}
              />
            ))}
        </div>
        {selectedLicense?.conditions.length && (
          <>
            <Separator className="bg-muted-foreground mt-6" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">
                  Условия использования
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 text-xs text-muted-foreground">
                    {selectedLicense?.conditions.map((e, i) => (
                      <div key={i} className="flex gap-3">
                        {e.icon}
                        <h1>{e.title}</h1>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
};
