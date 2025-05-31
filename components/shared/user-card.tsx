import React from "react";
import Link from "next/link";
import {
  AspectRatio,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

interface Props {
  id: number;
  link?: string;
  displayName: string;
  key?: number;
  imageUrl?: string;
  className?: string;
}

export const UserCard: React.FC<Props> = ({
  id,
  displayName,
  link,
  imageUrl,
  className,
}) => {
  return (
    <Card className={className}>
      <CardContent className="select-none duration-150">
        <Link href={`/author/${link || id}`}>
          <AspectRatio>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover"
              src={imageUrl || "/cover.png"}
              alt="Обложка"
            />
          </AspectRatio>
        </Link>
      </CardContent>
      <CardHeader>
        <CardTitle className="w-full truncate">
          <Link href={`/author/${link || id}`}>{displayName}</Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
