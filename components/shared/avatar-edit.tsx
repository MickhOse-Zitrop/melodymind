"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
} from "@/components/ui";
import { Camera, X } from "lucide-react";
import { cn, getInitials } from "@/lib";
import { toast } from "sonner";
import { type PutBlobResult } from "@vercel/blob";
import { User } from "@prisma/client";
import { upload } from "@vercel/blob/client";
import { updateAvatar } from "@/app/actions";

interface Props {
  data: User;
  className?: string;
}

export const AvatarEdit: React.FC<Props> = ({ data, className }) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);

  const handleFormSubmit = async (remove?: boolean) => {
    setUploading(true);

    if (remove) {
      try {
        const message = await updateAvatar({ imageUrl: "" });

        toast.success(message);
      } catch (error) {
        const e = error as Error;

        console.log(error);
        toast.error(e.message);
      } finally {
        setUploading(false);
      }
    } else {
      if (!imageRef.current?.files?.length) {
        throw new Error("Вы должны выбрать изображение");
      }

      const file = imageRef.current.files[0];

      try {
        const blobUrl = await upload(
          `user-${data.id}/images/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/upload-image",
          },
        );
        setBlob(blobUrl);

        const message = await updateAvatar({ imageUrl: blobUrl.url });

        toast.success(message);
      } catch (error) {
        const e = error as Error;

        console.log(error);
        toast.error(e.message);
      } finally {
        setUploading(false);
      }
    }
  };
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-between group",
        className,
      )}
    >
      <Label
        htmlFor="profile-file-input"
        className="opacity-0 group-hover:opacity-100 absolute size-full flex justify-center z-10 bg-background/40 duration-200 cursor-pointer rounded-full"
      >
        <Camera size={48} />
      </Label>
      <Button
        className="opacity-0 group-hover:opacity-100 absolute z-10 -right-4"
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => handleFormSubmit(true)}
      >
        <X />
      </Button>
      <Input
        type="file"
        className="hidden"
        id="profile-file-input"
        accept="image/png, image/jpeg"
        ref={imageRef}
        disabled={uploading}
        onChange={() => handleFormSubmit()}
      />
      <Avatar
        className={cn("w-48 h-48 aspect-square", {
          "animate-pulse": uploading,
        })}
      >
        <AvatarImage
          className="object-cover"
          src={blob?.url || data.imageUrl || ""}
          alt="Avatar"
        />
        <AvatarFallback className="text-9xl">
          {getInitials(data.displayName)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
