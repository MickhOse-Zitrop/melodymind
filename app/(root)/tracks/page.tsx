import { Container, Filters, PageTitle, TrackList } from "@/components/shared";
import { Metadata } from "next";
import { findTracks, GetSearchParams } from "@/lib/find-tracks";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MelodyMind — Треки",
};

export default async function TracksPage({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const tracks = await findTracks(await searchParams);

  return (
    <Container className="w-full">
      <div className="my-10 flex sm:flex-row flex-col justify-between">
        <PageTitle title="Треки" className="mb-5" />
        <Filters />
      </div>
      <Suspense>
        <TrackList tracks={tracks} />
      </Suspense>
    </Container>
  );
}
