import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const tracks = await prisma.track.findMany({
    include: {
      user: true,
      trackType: {
        orderBy: {
          price: "asc",
        },
      },
      favoriteItem: true,
    },
    orderBy: {
      likes: "desc",
    },
  });

  return NextResponse.json(tracks);
}
