import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          displayName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          link: {
            contains: query.slice(0, 1) === "@" ? query.slice(1) : query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      author: {
        include: {
          subscribers: true,
        },
      },
      tracks: true,
    },
    take: 3,
  });

  return NextResponse.json(users);
}
