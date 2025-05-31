"use client";

import React from "react";
import { AspectRatio, Badge, Button, Separator } from "@/components/ui";
import { Download, Flag, Heart, Repeat, Share } from "lucide-react";
import { cn, getBigNumber } from "@/lib";
import Link from "next/link";
import { toast } from "sonner";
import { updateLike } from "@/app/actions";
import { TrackFullInfo } from "@/lib/find-tracks";
import { saveAs } from "file-saver";

interface Props {
  track: TrackFullInfo;
  favorite: boolean;
  className?: string;
}

export const TrackInfo: React.FC<Props> = ({ track, favorite, className }) => {
  const [liked, setLiked] = React.useState<boolean>(favorite);
  const [loading, setLoading] = React.useState<boolean>(false);

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

  return (
    <div
      className={cn(
        className,
        "flex flex-col basis-1/4 bg-secondary rounded-md p-6",
      )}
    >
      <AspectRatio className="rounded-md overflow-hidden mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-full w-full object-cover"
          src={track.imageUrl || "/cover.png"}
          alt="Image"
        />
      </AspectRatio>
      <h1 className="text-xl text-center font-bold my-2">{track.title}</h1>
      <Link href={`/author/${track.user.link || track.user.id}`}>
        <p className="text-muted-foreground text-center">
          {track.user.displayName}
        </p>
      </Link>
      <div className="flex justify-around my-4">
        <div className="flex flex-col gap-1 items-center select-none">
          <Heart
            className={cn(
              "cursor-pointer",
              liked && "text-primary",
              loading && "animate-pulse",
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
      <Separator className="my-3 bg-muted-foreground" />
      <div className="flex flex-col gap-3">
        <h2 className="text-xs text-muted-foreground">ИНФОРМАЦИЯ</h2>
        <div className="flex justify-between">
          <h2>Выпущен</h2>
          <h2 className="font-medium">{`
          ${track.createdAt.getDate() < 10 ? "0" + track.createdAt.getDate() : track.createdAt.getDate()}-${track.createdAt.getMonth() + 1 < 10 ? "0" + (track.createdAt.getMonth() + 1) : track.createdAt.getMonth() + 1}-${track.createdAt.getFullYear()}`}</h2>
        </div>
        {track.bpm && (
          <div className="flex justify-between">
            <h2>BPM</h2>
            <h2 className="font-medium">{track.bpm}</h2>
          </div>
        )}
        <div className="flex justify-between">
          <h2>Прослушиваний</h2>
          <h2 className="font-medium">{getBigNumber(track.listens)}</h2>
        </div>
      </div>
      {track.tags && (
        <>
          <Separator className="my-3 bg-muted-foreground" />
          <div className="flex flex-col gap-3">
            <h2 className="text-xs text-muted-foreground">ТЕГИ</h2>
            <div className="flex flex-wrap gap-3 w-full">
              {track.tags.split(" ").map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
              ))}
            </div>
          </div>
        </>
      )}
      <Separator className="my-3 bg-muted-foreground" />
      <Button
        variant="link"
        size="sm"
        onClick={() =>
          toast.warning(`Жалоба на трек ${track.title} отправлена!`)
        }
      >
        <Flag />
        Пожаловаться
      </Button>
    </div>
  );
};
