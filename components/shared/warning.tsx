"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Track, User } from "@prisma/client";
import { deleteTrack, deleteTracks, deleteUser } from "@/app/actions";

interface Props {
  title: string;
  description?: string;
  className?: string;
  data: User | Track;
  type: "user" | "tracks" | "hide" | "track";
}

export const Warning: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  description,
  className,
  children,
  type,
  data,
}) => {
  const onSubmit = async () => {
    try {
      switch (type) {
        case "user":
          await deleteUser({ id: data.id.toString() });
          toast.success("Ваш аккаунт успешно удален");
          setTimeout(() => signOut({ callbackUrl: "/" }), 500);
          break;
        case "tracks":
          await deleteTracks({ id: data.id.toString() });
          toast.success("Ваши публикации успешно удалены");
          break;
        case "track":
          await deleteTrack({ id: data.id.toString() });
          toast.success("Трек успешно удален");
          break;
      }
    } catch (error) {
      console.log("Error delete ", error);
      toast.error(`${(error as Error).message}`);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction destructive onClick={() => onSubmit()}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
