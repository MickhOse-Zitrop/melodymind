import {
  Container,
  PageTitle,
  ProductCard,
  SearchFilters,
  SearchSlider,
  UserCard,
} from "@/components/shared";
import { Separator } from "@/components/ui";
import { findTracks, GetSearchParams } from "@/lib/find-tracks";
import { findUsers } from "@/lib/find-users";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const type = (await searchParams).type || "all";
  const query = (await searchParams).query;

  const tracks =
    type === "all" || type === "tracks"
      ? await findTracks(await searchParams)
      : [];
  const users =
    type === "all" || type === "users"
      ? await findUsers(await searchParams)
      : [];

  return (
    <Container className="w-full">
      <div className="my-10 flex justify-between">
        <PageTitle title="Поиск" className="mb-5" />
        <SearchFilters isTracks={type === "tracks"} />
      </div>
      {query && (
        <p className="-mt-10">
          Результаты поиска по запросу: &quot;{query}&quot;
        </p>
      )}
      {type === "all" ? (
        <div className="py-10 flex flex-col gap-10">
          <SearchSlider type={"tracks"} data={tracks} />
          <SearchSlider type={"users"} data={users} />
        </div>
      ) : type === "tracks" || type === "users" ? (
        <div className="flex flex-col gap-4 py-10">
          <h1 className="text-xl font-medium">
            {type === "tracks" ? "Треки" : "Пользователи"}
          </h1>
          <Separator />
          <div className="grid grid-cols-5 gap-4">
            {type === "tracks" ? (
              tracks.length > 0 ? (
                tracks.map((track) => (
                  <ProductCard
                    key={track.id}
                    id={track.id}
                    title={track.title}
                    imageUrl={track.imageUrl || ""}
                    price={
                      track.trackType.length ? track.trackType[0].price : 0
                    }
                    user={track.user.displayName}
                    userId={track.user.link || track.user.id}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center text-2xl font-medium py-20 col-span-5">
                  Ничего не найдено!
                </div>
              )
            ) : type === "users" ? (
              users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    link={user.link || undefined}
                    imageUrl={user.imageUrl || ""}
                    displayName={user.displayName}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center text-2xl font-medium py-20 col-span-5">
                  Ничего не найдено!
                </div>
              )
            ) : (
              <div className="flex items-center justify-center text-2xl font-medium py-20 col-span-5">
                Неверные фильтры!
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-medium py-20 col-span-5">
          Неверные фильтры!
        </div>
      )}
    </Container>
  );
}
