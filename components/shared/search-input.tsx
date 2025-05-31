"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Separator,
  Skeleton,
} from "@/components/ui";
import { ChevronRight, MoveRight, Search } from "lucide-react";
import { cn, getInitials } from "@/lib";
import { TrackFullInfo } from "@/lib/find-tracks";
import { AuthorFullInfo } from "@/@types/author-full-info";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "@/services/api-client";
import Link from "next/link";
import { useFilters, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const filters = useFilters();

  const [searchQuery, setSearchQuery] = React.useState(filters.query || "");
  const [tracks, setTracks] = React.useState<TrackFullInfo[]>([]);
  const [users, setUsers] = React.useState<AuthorFullInfo[]>([]);
  const [focused, setFocused] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);

  useQueryFilters(filters);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        setLoading(true);

        const trackResponse = await Api.tracks.search(searchQuery);
        const userResponse = await Api.users.search(searchQuery);

        setTracks(trackResponse);
        setUsers(userResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
  };

  return (
    <div className={cn(className, "relative sm:block hidden")} ref={ref}>
      <div className={cn("flex gap-1", className)}>
        <Input
          className="bg-secondary w-64"
          placeholder="Что ты ищешь?"
          value={searchQuery}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href={`/search?query=${searchQuery}`} onClick={onClickItem}>
          <Button>
            <Search />
          </Button>
        </Link>
      </div>
      {loading && focused ? (
        <div className="absolute flex flex-col gap-3 top-11 w-full bg-secondary p-4 rounded-md shadow-lg">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        (tracks.length > 0 || users.length > 0) && (
          <div
            className={cn(
              "absolute flex flex-col gap-3 top-14 w-full bg-secondary p-4 rounded-md shadow-lg invisible opacity-0 duration-150",
              focused && "visible opacity-100 top-11",
            )}
          >
            {tracks.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Треки
                </h2>
                {tracks.map((track) => (
                  <Link
                    href={`/track/${track.id}`}
                    key={track.id}
                    onClick={onClickItem}
                    className="flex items-center justify-between group hover:bg-primary hover:text-white p-2 rounded-md duration-150"
                  >
                    <div className="flex gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={track.imageUrl || "/cover.png"}
                        alt="Image"
                        className="h-6 w-6 rounded-xs"
                      />
                      {track.title}
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-white duration-150" />
                  </Link>
                ))}
                <Link
                  href={`/search?type=tracks&query=${searchQuery}`}
                  onClick={onClickItem}
                  className="flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground duration-150"
                >
                  Смотреть все <MoveRight size={16} className="mt-[3px]" />
                </Link>
              </div>
            )}
            {tracks.length > 0 && users.length > 0 && <Separator />}
            {users.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Пользователи
                </h2>
                {users.map((user) => (
                  <Link
                    href={`/author/${user.link || user.id}`}
                    key={user.id}
                    onClick={onClickItem}
                    className="flex items-center justify-between group hover:bg-primary hover:text-white p-2 rounded-md duration-150"
                  >
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.imageUrl || ""} />
                        <AvatarFallback>
                          {getInitials(user.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      {user.displayName}
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-white duration-150" />
                  </Link>
                ))}
                <Link
                  href={`/search?type=users&query=${searchQuery}`}
                  onClick={onClickItem}
                  className="flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground duration-150"
                >
                  Смотреть все <MoveRight size={16} className="mt-[3px]" />
                </Link>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
