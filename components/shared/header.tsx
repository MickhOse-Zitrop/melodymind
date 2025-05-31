"use client";

import React, { PropsWithChildren } from "react";
import { cn } from "@/lib";
import {
  Container,
  ModeToggle,
  SearchInput,
  AuthButton,
} from "@/components/shared";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export const Header: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>("/logo.png");
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    setImageUrl(theme === "light" ? "/logo-dark.png" : "/logo.png");

    let toastMessage = "";

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (searchParams.has("paid")) {
      toastMessage =
        'Заказ успешно оплачен! Вы можете просмотреть его разделе "Покупки"';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(`${toastMessage}`);
      });
    }
  }, [router, searchParams, theme]);

  return (
    <header
      className={cn(
        className,
        "fixed top-0 left-0 z-50 h-16 w-screen bg-background border-b-1 border-b-gray-300 select-none",
      )}
    >
      <Container className="h-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center -ml-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-12" src={imageUrl} alt={"Logo"} />
            {/*TODO: Сделать лого c текстом*/}
            {/*<h1 className="text-3xl italic">MelodyMind</h1>*/}
          </Link>
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <AuthButton />
          {children}
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};
