import React from "react";
import {
  AuthorInfo,
  EditableTrack,
  Container,
  ProductCard,
} from "@/components/shared/";
import { cn } from "@/lib";
import { Disc3 } from "lucide-react";
import { prisma } from "@/prisma/prisma-client";
import { AuthorFullInfo } from "@/@types/author-full-info";

interface Props {
  data: AuthorFullInfo;
  user: boolean;
  subscription: true | null;
  className?: string;
}

export const Profile: React.FC<Props> = async ({
  data,
  user,
  subscription,
}) => {
  const tracks = await prisma.track.findMany({
    where: {
      userId: data.id,
    },
    include: {
      user: true,
      favoriteItem: true,
      trackType: {
        orderBy: {
          price: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container className="mt-6">
      <div className="flex gap-7 items-start">
        <AuthorInfo data={data} user={user} subscription={subscription} />
        <div
          className={cn(
            "flex-1/3",
            !tracks.length
              ? "flex py-40 flex-col gap-6 items-center justify-center"
              : "grid grid-cols-4 gap-4",
          )}
        >
          {/*TODO PRICE*/}
          {tracks.length ? (
            tracks.map((track) =>
              user ? (
                <EditableTrack key={track.id} track={track} />
              ) : (
                <ProductCard
                  id={track.id}
                  title={track.title}
                  price={
                    track.trackType.length > 0 ? track.trackType[0].price : 0
                  }
                  imageUrl={track.imageUrl || undefined}
                  user={track.user.displayName}
                  userId={track.user.link || track.user.id}
                  key={track.id}
                />
              ),
            )
          ) : (
            <>
              <Disc3 size={96} />
              <h1 className="font-bold text-3xl">
                Контента пока не достаточно
              </h1>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
