"use client";

import React from "react";
import { cn } from "@/lib";
import { Avatar, AvatarImage, Badge, Button } from "../ui";
import Link from "next/link";
import { CheckoutLicenseDescription } from "./checkout-license-description";
import { licenses } from "@/data/data";
import { Download, FileText } from "lucide-react";
import { PurchaseItemWithTrack } from "@/lib/get-user-purchases";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import JSZip from "jszip";

interface Props {
  item: PurchaseItemWithTrack;
  className?: string;
}

export const PurchaseItem: React.FC<Props> = ({ item, className }) => {
  const [mp3Url, setMp3Url] = React.useState<string>();
  const [wavUrl, setWavUrl] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const license = licenses.find(
    (license) => license.id === item.trackType.name,
  );

  React.useEffect(() => {
    setMp3Url(item.trackType.fileUrl.split("&&&")[0]);

    if (license?.formats.find((format) => format === "WAV")) {
      setWavUrl(item.trackType.fileUrl.split("&&&")[1]);
    }
  }, [item.trackType.fileUrl, license?.formats]);

  if (!license) {
    return <div>{item.trackTypeId}</div>;
  }

  const track = item.trackType.track;

  const saveFile = async () => {
    setLoading(true);

    const zip = new JSZip();
    let hasFilesAdded = false; // признак наличия добавленных файлов

    try {
      // Загрузка MP3-файла
      if (mp3Url) {
        const mp3Response = await fetch(mp3Url);
        if (!mp3Response.ok) {
          throw new Error(`Ошибка загрузки MP3 (${mp3Response.status})`);
        }
        const mp3Blob = await mp3Response.blob();
        zip.file(`${track.title}-${track.user.displayName}.mp3`, mp3Blob, {
          binary: true,
        });
        hasFilesAdded = true;
      }

      // Загрузка WAV-файла
      if (wavUrl) {
        const wavResponse = await fetch(wavUrl);
        if (!wavResponse.ok) {
          throw new Error(`Ошибка загрузки WAV (${wavResponse.status})`);
        }
        const wavBlob = await wavResponse.blob();
        zip.file(`${track.title}-${track.user.displayName}.wav`, wavBlob, {
          binary: true,
        });
        hasFilesAdded = true;
      }

      // Генерация архива
      if (hasFilesAdded) {
        const archiveBlob = await zip.generateAsync({ type: "blob" });
        saveAs(archiveBlob, `${track.title}-${track.user.displayName}.zip`);
        toast.success("Трек успешно скачан!");
      } else {
        toast.warning("Нет файлов для скачивания.");
      }
    } catch (error) {
      console.error("Ошибка при скачивании треков:", error);
      toast.error("Возникла ошибка при скачивании треков.");
    }

    setLoading(false);
  };

  return (
    <div className={cn(className, "flex gap-4 items-center", {})}>
      <Avatar className="w-24 h-24 aspect-square rounded-sm">
        <AvatarImage
          src={track.imageUrl || "/cover.png"}
          className="object-cover"
        />
      </Avatar>
      <div className="flex-1 flex flex-col gap-2 items-start">
        <div className="flex gap-4 items-center">
          <Link href={`/track/${track.id}`} className="text-xl font-medium">
            {track.title}
          </Link>
          <Badge>{track.user.displayName}</Badge>
        </div>
        <p className="text-muted-foreground text-sm">{license.title}</p>
        <CheckoutLicenseDescription license={license}>
          <Button variant="link" size="sm" className="p-0">
            Описание лицензии
          </Button>
        </CheckoutLicenseDescription>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon">
          <FileText />
        </Button>
        <Button
          className="flex flex-col"
          size="icon"
          onClick={saveFile}
          disabled={loading}
        >
          <Download />
        </Button>
      </div>
    </div>
  );
};
