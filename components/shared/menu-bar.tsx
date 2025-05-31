"use client";

import React from "react";
import { Container } from "@/components/shared/container";
import Link from "next/link";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
}

export const MenuBar: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        className,
        "sticky mt-16 top-16 h-12 bg-secondary shadow-lg z-30",
      )}
    >
      <Container className="h-full flex gap-8">
        <Link
          href={"/feed"}
          className={cn(
            "h-full flex gap-2 items-center dark:text-gray-300 text-gray-600 dark:hover:text-foreground hover:text-foreground transition-all duration-200 ease-in-out",
            pathname === "/feed" &&
              "border-b-2 border-foreground dark:text-foreground text-foreground",
          )}
        >
          {/*<Rss />*/}
          Лента
        </Link>
        <Link
          href={"/tracks"}
          className={cn(
            "h-full flex gap-2 items-center dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-foreground transition-all duration-200 ease-in-out",
            pathname === "/tracks" &&
              "border-b-2 border-foreground dark:text-foreground text-foreground",
          )}
        >
          {/*<AudioLines />*/}
          Треки
        </Link>
      </Container>
    </div>
  );
};
