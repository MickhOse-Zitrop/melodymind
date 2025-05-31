"use client";

import React from "react";
import { cn, getInitials } from "@/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  Cloud,
  Flag,
  Music2,
  Pencil,
  Plus,
  Twitch,
  X,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateSubscription } from "@/app/actions";
import { AuthorFullInfo } from "@/@types/author-full-info";

interface Props {
  data: AuthorFullInfo;
  user: boolean;
  subscription: true | null;
  className?: string;
}

export const AuthorInfo: React.FC<Props> = ({
  data,
  user,
  className,
  subscription,
}) => {
  const [sub, setSub] = React.useState<boolean | null>();
  const [loading, setLoading] = React.useState(false);
  const [updatedSubs, setUpdatedSubs] = React.useState<number>(
    data.author ? data.author.subscribers.length : 0,
  );

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      const res = await updateSubscription({ id: data.id });

      toast.success(res.message);
      setSub(res.sub);
      setUpdatedSubs(
        res.sub
          ? updatedSubs < Number(data.author?.subscribers.length)
            ? Number(data.author?.subscribers.length)
            : Number(data.author?.subscribers.length) + 1
          : updatedSubs > Number(data.author?.subscribers.length)
            ? Number(data.author?.subscribers.length)
            : Number(data.author?.subscribers.length) - 1,
      );
    } catch (e) {
      const error = e as Error;

      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => setSub(subscription), [subscription]);

  return (
    <div
      className={cn(
        className,
        "flex flex-col basis-1/4 bg-secondary rounded-md p-6",
      )}
    >
      <Avatar className="w-full h-full aspect-square">
        <AvatarImage
          className="object-cover"
          src={data.imageUrl as string}
          alt="Avatar"
        />
        <AvatarFallback className="text-9xl">
          {getInitials(data.displayName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className="text-2xl text-center font-bold">
                {data.displayName}
              </h1>
            </TooltipTrigger>
            {data.link && (
              <TooltipContent>
                <p>@{data.link}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <p className="text-muted-foreground text-center mb-6">
          {data.location}
        </p>
      </div>
      {user ? (
        <Link href="/edit">
          <Button
            className="mb-3 border-muted-foreground border-1 w-full"
            variant="secondary"
          >
            <Pencil />
            Редактировать профиль
          </Button>
        </Link>
      ) : !sub ? (
        <Button
          className={cn("mb-3", { "animate-pulse": loading })}
          onClick={handleSubscribe}
          disabled={loading}
        >
          <Plus />
          Подписаться
        </Button>
      ) : (
        <Button
          className={cn("mb-3", { "animate-pulse": loading })}
          variant="destructive"
          onClick={handleSubscribe}
          disabled={loading}
        >
          <X />
          Отписаться
        </Button>
      )}
      <Separator className="my-3 bg-muted-foreground" />
      <div className="flex flex-col gap-3">
        <h2 className="text-xs text-muted-foreground">СТАТИСТИКА</h2>
        <div className="flex justify-between">
          <h2>Подписчики</h2>
          <h2 className="font-medium">{updatedSubs}</h2>
        </div>
        <div className="flex justify-between">
          <h2>Треки</h2>
          <h2 className="font-medium">{data.tracks.length}</h2>
        </div>
      </div>
      {data.bio && (
        <>
          <Separator className="my-3 bg-muted-foreground" />
          <div className="flex flex-col gap-3">
            <h2 className="text-xs text-muted-foreground">О СЕБЕ</h2>
            <p className="line-clamp-6 break-all ">{data.bio}</p>
          </div>
        </>
      )}
      {(data.SC || data.YT || data.TH || data.TT) && (
        <>
          <Separator className="my-3 bg-muted-foreground" />
          <div className="flex flex-col gap-3">
            <h2 className="text-xs text-muted-foreground">НАЙТИ МЕНЯ НА</h2>
            <div className="flex flex-wrap gap-3 w-full">
              {data.TT && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://tik-tok.com/${data.TT}`}
                        target="_blank"
                      >
                        <Button size="icon" variant="outline">
                          <Music2 />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tik-Tok</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {data.TH && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://twitch.tv${data.TH}`}
                        target="_blank"
                      >
                        <Button size="icon" variant="outline">
                          <Twitch />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Twitch</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {data.SC && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://soundcloud.com${data.SC}`}
                        target="_blank"
                      >
                        <Button size="icon" variant="outline">
                          <Cloud />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>SoundCloud</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {data.YT && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://youtube.com/${data.YT}`}
                        target="_blank"
                      >
                        <Button size="icon" variant="outline">
                          <Youtube />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>YouTube</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </>
      )}
      {!user && (
        <>
          <Separator className="my-3 bg-muted-foreground" />
          <Button
            variant="link"
            size="sm"
            onClick={() =>
              toast.warning(
                `Жалоба на пользователя ${data.displayName} отправлена!`,
              )
            }
          >
            <Flag />
            Пожаловаться
          </Button>
        </>
      )}
    </div>
  );
};
