import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const tracks = await prisma.track.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
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
    take: 3,
  });

  return NextResponse.json(tracks);
}
