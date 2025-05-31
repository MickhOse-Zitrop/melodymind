import {
  Container,
  MobileTrack,
  TrackContent,
  TrackInfo,
} from "@/components/shared";
import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { getTrackFavorite } from "@/lib/get-track-favorite";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const track = await prisma.track.findFirst({
    where: { id: Number(id) },
  });

  return {
    title: track?.title,
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = await prisma.track.findFirst({
    where: { id: Number(id) },
    include: {
      user: true,
      trackType: true,
      favoriteItem: true,
    },
  });

  if (!track) {
    return notFound();
  }

  const favorite = await getTrackFavorite(track.id);

  return (
    <Container className="mt-6">
      <div className="sm:flex gap-7 hidden items-start">
        <TrackInfo track={track} favorite={favorite} />
        <TrackContent trackTypes={track.trackType} id={track.id} />
      </div>
      <MobileTrack
        track={track}
        favorite={favorite}
        className="sm:hidden flex"
      />
    </Container>
  );
}
