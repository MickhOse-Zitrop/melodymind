import { Subscriber, Track, User, Author } from "@prisma/client";

export type AuthorFullInfo = User & {
  author?: {
    subscribers: Subscriber[];
  } & Author;
  tracks: Track[];
};
