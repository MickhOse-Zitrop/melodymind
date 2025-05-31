import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  Heart,
  LifeBuoy,
  ListMusic,
  LogOut,
  Settings2,
  ShieldUser,
  ShoppingBag,
  Upload,
  User,
  User2,
} from "lucide-react";
import { cn } from "@/lib";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session;
  className?: string;
}

export const UserMenu: React.FC<Props> = ({ session, className }) => {
  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className, "p-3 w-72")}>
        {/*<DropdownMenuLabel>*/}
        {/*  <div className="flex gap-3 items-center">*/}
        {/*    <Avatar>*/}
        {/*      <AvatarImage className="object-cover" src={user.image} />*/}
        {/*      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>*/}
        {/*    </Avatar>*/}
        {/*    <h1 className="text-xl truncate">{user.name}</h1>*/}
        {/*  </div>*/}
        {/*</DropdownMenuLabel>*/}
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuGroup>
          <Link href={`/author/${user.id}`}>
            <DropdownMenuItem>
              <User2 />
              Профиль
            </DropdownMenuItem>
          </Link>
          <Link href="/my-playlists">
            <DropdownMenuItem>
              <ListMusic />
              Мои плейлисты
            </DropdownMenuItem>
          </Link>
          <Link href="/upload-track">
            <DropdownMenuItem>
              <Upload />
              Загрузить трек
            </DropdownMenuItem>
          </Link>
          <Link href="/favorites">
            <DropdownMenuItem>
              <Heart />
              Избранное
            </DropdownMenuItem>
          </Link>
          <Link href="/purchases">
            <DropdownMenuItem>
              <ShoppingBag />
              Покупки
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/edit">
            <DropdownMenuItem>
              <Settings2 />
              Настройки аккаунта
            </DropdownMenuItem>
          </Link>
          {user.role === "ADMIN" && (
            <Link href="/admin-panel">
              <DropdownMenuItem>
                <ShieldUser />
                Панель администратора
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/help">
            <DropdownMenuItem>
              <LifeBuoy />
              Помощь
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut />
          Выйти из аккаунта
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
