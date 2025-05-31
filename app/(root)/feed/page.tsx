import { Container, PageTitle } from "@/components/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Skeleton,
} from "@/components/ui";
import {
  Heart,
  MessageCircle,
  Play,
  Repeat,
  Share,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Лента",
};

export default function FeedPage() {
  return (
    <>
      <Container className="w-full">
        <div className="my-10 flex justify-between">
          <PageTitle title="Ваша лента" className="mb-5" />
          {/*<div className="flex items-center gap-4">*/}
          {/*  <Select defaultValue={"all"}>*/}
          {/*    <SelectTrigger className="w-40">*/}
          {/*      <SelectValue placeholder="Все типы" />*/}
          {/*    </SelectTrigger>*/}
          {/*    <SelectContent>*/}
          {/*      <SelectGroup>*/}
          {/*        <SelectItem value={"all"}>Все типы</SelectItem>*/}
          {/*        <SelectItem value={"tracks"}>Треки</SelectItem>*/}
          {/*        <SelectItem value={"albums"}>Альбомы</SelectItem>*/}
          {/*        <SelectItem value={"playlists"}>Плейлисты</SelectItem>*/}
          {/*        <SelectItem value={"videos"}>Видео</SelectItem>*/}
          {/*        <SelectItem value={"photos"}>Фото</SelectItem>*/}
          {/*      </SelectGroup>*/}
          {/*    </SelectContent>*/}
          {/*  </Select>*/}
          {/*  <Button>*/}
          {/*    <Plus /> Создать пост*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <div className="flex gap-5 items-start">
          {/*<div className="p-4 rounded-md flex-1/4 bg-secondary">*/}
          {/*  <h2 className="text-xl font-medium mb-5">Популярные запросы</h2>*/}
          {/*  <div className="flex flex-col gap-4 ">*/}
          {/*    {Array.from({ length: 3 }).map((_, i) => (*/}
          {/*      <div key={i} className="flex flex-col gap-2">*/}
          {/*        <Skeleton className="h-6 w-24" />*/}
          {/*        <Skeleton className="h-4 w-20" />*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="flex flex-col flex-1/2 gap-4">
            <Skeleton className="h-96 w-full bg-accent" />
            <div className="p-4 pb-6 flex flex-col bg-secondary gap-6 w-full rounded-md">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/intro.png" alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">Пользователь</h3>
                <Badge>@user</Badge>
              </div>
              <Card>
                <CardContent className="flex gap-5">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-full w-full object-cover"
                      src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-4 items-start">
                    <div className="flex items-center gap-3">
                      <Button size="icon" className="rounded-full">
                        <Play />
                      </Button>
                      <h1 className="text-lg w-80 font-medium truncate">
                        Lorem ipsum dolor sit amet this text is too long to read
                      </h1>
                    </div>
                    <div>
                      <h4 className="text-xs">
                        <span className="font-bold">Бит</span> сделал{" "}
                        <span className="font-bold">user</span>{" "}
                        @userawdawdawdawdawdawdawdawdawdawd
                      </h4>
                      <h4 className="text-xs">
                        <span className="font-bold">Выпущен </span>
                        10 Окт. 2025
                      </h4>
                    </div>
                    <Button className="mt-4">
                      <ShoppingCart />
                      2300₽
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-1">
                <Button variant="ghost">
                  <Heart /> 0
                </Button>
                <Button variant="ghost">
                  <Repeat /> 0
                </Button>
                <Button variant="ghost">
                  <MessageCircle /> 0
                </Button>
                <Button variant="ghost">
                  <Share />
                </Button>
              </div>
            </div>
            <div className="p-4 pb-6 flex flex-col bg-secondary gap-6 w-full rounded-md">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/intro.png" alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">Пользователь</h3>
                <Badge>@user</Badge>
              </div>
              <Card>
                <CardContent className="flex gap-5">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-full w-full object-cover"
                      src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                      alt=""
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div>
                    <h4 className="text-sm">
                      <span className="font-medium">Фото </span>сделал{" "}
                      <span className="font-medium">user </span>@user
                    </h4>
                    <h4 className="text-sm">
                      <span className="font-medium">Выпущен </span> 10 Окт. 2025
                    </h4>
                  </div>
                </CardFooter>
              </Card>
              <div className="flex gap-1">
                <Button variant="ghost">
                  <Heart /> 0
                </Button>
                <Button variant="ghost">
                  <Repeat /> 0
                </Button>
                <Button variant="ghost">
                  <MessageCircle /> 0
                </Button>
                <Button variant="ghost">
                  <Share />
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-md flex-1/4 bg-secondary">
            <h2 className="text-xl font-medium mb-5">За кем следовать</h2>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center w-full gap-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-11 rounded-full" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Button>
                    <UserPlus />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
