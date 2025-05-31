"use client";

import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormInput,
  formUploadTrackSchema,
  TFormUploadTrackValue,
} from "@/components/shared/form";
import { cn } from "@/lib";
import {
  Avatar,
  AvatarImage,
  Button,
  Input,
  Label,
  Progress,
  Switch,
} from "@/components/ui";
import { licenses } from "@/data/data";
import { TrackLicense } from "@/components/shared/track-license";
import { Camera, X } from "lucide-react";
import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { createTrack } from "@/app/actions";

interface Props {
  user: User;
  className?: string;
}

export const UploadTrack: React.FC<Props> = ({ user, className }) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const mp3Ref = React.useRef<HTMLInputElement>(null);
  const wavRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progressMp3, setProgressMp3] = React.useState(0);
  const [progressWav, setProgressWav] = React.useState(0);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);
  const [mp3, setMp3] = React.useState<PutBlobResult | null>(null);
  const [wav, setWav] = React.useState<PutBlobResult | null>(null);
  const [licenseAllow, setLicenseAllow] = React.useState<
    "MP3" | "WAV" | "STEMS"
  >("MP3");

  const form = useForm<TFormUploadTrackValue>({
    resolver: zodResolver(formUploadTrackSchema),
    defaultValues: {
      demo: false,
    },
  });

  const handleImage = async (remove?: boolean) => {
    setUploading(true);

    if (remove) {
      setBlob(null);
    }

    try {
      if (!imageRef.current?.files?.length) {
        throw new Error("Вы должны выбрать изображение");
      }

      const file = imageRef.current.files[0];

      const blobUrl = await upload(
        `user-${user.id}/images/tracks/${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload-image",
        },
      );

      setBlob(blobUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleMp3 = async () => {
    try {
      if (!mp3Ref.current?.files?.length) {
        throw new Error("Вы должны выбрать MP3-файл");
      }

      const file = mp3Ref.current.files[0];

      const blobUrl = await upload(
        `user-${user.id}/tracks/mp3/${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload-mp3",
          onUploadProgress: (progressEvent) => {
            setProgressMp3(progressEvent.percentage);
          },
        },
      );

      setMp3(blobUrl);
      setLicenseAllow("WAV");
      setProgressMp3(0);
    } catch (error) {
      const err = error as Error;

      toast.error(err.message);
      console.log(error);
    }
  };

  const handleWav = async () => {
    try {
      if (!wavRef.current?.files?.length) {
        throw new Error("Вы должны выбрать WAV-файл");
      }

      const file = wavRef.current.files[0];

      const blobUrl = await upload(
        `user-${user.id}/tracks/wav/${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload-wav",
          onUploadProgress: (progressEvent) => {
            setProgressWav(progressEvent.percentage);
          },
        },
      );

      setWav(blobUrl);
      setLicenseAllow("STEMS");
      setProgressWav(0);
    } catch (error) {
      const err = error as Error;

      toast.error(err.message);
      console.log(error);
    }
  };

  const onSubmit = async (data: TFormUploadTrackValue) => {
    if (mp3) {
      setLoading(true);

      try {
        const message = await createTrack({
          title: data.title,
          imageUrl: blob ?? undefined,
          bpm: data.bpm,
          demo: data.demo,
          tags: data.tags,
          mp3Price: data.mp3,
          mp3Url: mp3,
          wavPrice: data.wav,
          wavUnlimitPrice: data.wav_unlimited,
          wavUrl: wav ?? undefined,
        });

        toast.success(message);
      } catch (e) {
        const error = e as Error;

        console.log(e);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn(className, "flex flex-col gap-5")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div className="sm:grid-cols-2 grid-cols-1 grid pr-6 py-4 bg-muted rounded-md items-center">
            <div className="flex flex-col gap-6">
              <div className="relative flex flex-col items-center justify-between group w-56 h-56 aspect-square ml-10">
                <Label
                  htmlFor="profile-file-input"
                  className="opacity-0 group-hover:opacity-100 absolute size-full ml-10 mr-5 flex justify-center z-10 bg-background/40 duration-200 cursor-pointer rounded-2xl"
                >
                  <Camera size={48} />
                </Label>
                <Button
                  className="opacity-0 group-hover:opacity-100 absolute z-10 -right-3"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleImage(true)}
                  type="button"
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
                  onChange={() => handleImage()}
                />
                <Avatar
                  className={cn("w-56 h-56 aspect-square rounded-2xl ml-5", {
                    "animate-pulse": uploading,
                  })}
                >
                  <AvatarImage
                    className="object-cover"
                    src={blob?.url || "/cover.png"}
                    alt="Avatar"
                  />
                </Avatar>
              </div>
              <div className="flex gap-4 items-center self-center">
                <Controller
                  control={form.control}
                  name="demo"
                  render={({ field }) => (
                    <Switch
                      id={"demo"}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  )}
                />
                <Label htmlFor="demo" className="text-md">
                  Демо
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                <FormInput
                  name={"title"}
                  id={"title"}
                  label={"Название трека"}
                  required
                />
              </div>
              <FormInput
                name={"bpm"}
                id={"bpm"}
                label={"BPM"}
                type={"number"}
              />
              <div className="flex flex-col gap-5">
                <FormInput name={"tags"} id={"tags"} label={"Теги"} />
                <p className="text-muted-foreground text-sm -mt-4">
                  ⓘ Введите теги через пробел
                </p>
              </div>
            </div>
          </div>
          {/*<div className="grid grid-cols-2 gap-5 bg-muted p-4 rounded-md">*/}
          <div className="flex flex-col gap-5 bg-muted p-4 rounded-md">
            <Label htmlFor={"mp3_file"} className="text-md">
              Загрузите файл MP3
            </Label>
            <Input
              id={"mp3_file"}
              type="file"
              accept="audio/mpeg"
              required
              className="h-12 text-md bg-secondary pr-10"
              onChange={handleMp3}
              disabled={progressMp3 > 0}
              ref={mp3Ref}
            />
            {progressMp3 > 0 && <Progress value={progressMp3} max={100} />}
            <Label htmlFor={"wav_file"} className="text-md">
              Загрузите файл WAV
            </Label>
            <Input
              id={"wav_file"}
              type="file"
              accept="audio/wav"
              className="h-12 text-md bg-secondary pr-10 "
              onChange={handleWav}
              disabled={progressWav > 0}
              ref={wavRef}
            />
            {progressWav > 0 && <Progress value={progressWav} max={100} />}
            <FormInput
              name={"stems_file"}
              id={"stems_file"}
              label={"Загрузите файл STEMS"}
              type="file"
              accept=".stem"
              disabled
            />
          </div>
          {/*</div>*/}
          <div className="flex flex-wrap gap-5 bg-muted p-4 rounded-md sm:col-span-2">
            {licenses.map((license) => (
              <TrackLicense
                key={license.id}
                license={license}
                price={0}
                format={licenseAllow}
                edit
                name={license.id}
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="self-center w-[250px]"
          size="lg"
          disabled={!mp3 || loading}
        >
          Загрузить
        </Button>
      </form>
    </FormProvider>
  );
};
