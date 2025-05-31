"use client";

import React from "react";
import { Mail } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export const SubscribeOnUs: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "py-16 flex flex-col items-center justify-center bg-linear-to-r from-primary to-75% to-card backdrop-brightness-50 gap-5 sm:px-0 px-4",
        className,
      )}
    >
      <h1 className="font-bold text-xl">
        Присылайте нам персональные советы по покупкам и продажам на MelodyMind.
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(
            "Вы успешно подписались на нас! Скоро вам придет форма отправки письма",
          );
        }}
        className="flex items-center bg-secondary py-4 px-5 rounded-xl gap-3"
      >
        <Mail size={24} />
        <Input
          className="sm:w-80 font-medium border-none focus-visible:border-none shadow-none"
          placeholder="Введите свою почту"
          type="email"
        />
        <Button type="submit">Подписаться</Button>
      </form>
    </div>
  );
};
