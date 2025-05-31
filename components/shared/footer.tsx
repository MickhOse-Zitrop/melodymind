"use client";

import React from "react";
import { cn } from "@/lib";
import { Separator } from "@/components/ui/";
import { Container } from "@/components/shared/";
import { footerLinks } from "@/data/data";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>("/logo.png");

  React.useEffect(() => {
    setImageUrl(theme === "light" ? "/logo-dark.png" : "/logo.png");
  }, [theme]);

  const session = useSession();

  return (
    <footer className={cn(className, "mt-20")}>
      <Container>
        <div className="sm:pt-11 sm:pb-20 py-5 flex flex-col sm:flex-row items-center sm:items-start justify-between sm:gap-0 gap-5">
          <div className="sm:flex flex-col hidden items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-13 object-contain -ml-5"
              src={imageUrl}
              alt="Logo"
            />
            <h1 className="font-bold">MelodyMind App</h1>
            <p>is coming soon</p>
          </div>
          {footerLinks.map((col, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 items-center sm:items-start"
            >
              <h1 className="text-xl font-bold">{col.name}</h1>
              {col.links.map((link, index) => (
                <Link
                  href={
                    link.link === "profile"
                      ? session.data
                        ? `/author/${session.data.user.id}`
                        : "/not-authorized"
                      : link.link
                  }
                  className="text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-foreground duration-150"
                  key={index}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <Separator />
        <div className="py-7 text-center text-sm text-muted-foreground">
          Copyright © {year} MelodyMind Inc. All rights reserved. Made with ♡
          by MickhOse Zitrop
        </div>
      </Container>
    </footer>
  );
};
