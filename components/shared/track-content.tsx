"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from "@/components/ui";
import { ShoppingBag } from "lucide-react";
import { licenses } from "@/data/data";
import { TrackLicense } from "@/components/shared/track-license";
import { cn } from "@/lib";
import { License } from "@/@types/licenses";
import { TrackType } from "@prisma/client";
import { AudioPlayer } from "@/components/shared/audio-player";
import { useCartStore } from "@/store";
import { toast } from "sonner";

interface Props {
  id: number;
  trackTypes: TrackType[];
  className?: string;
}

export const TrackContent: React.FC<Props> = ({
  trackTypes,
  id,
  className,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const [selectedLicense, setSelectedLicense] = React.useState<License | null>(
    null,
  );

  const onSubmit = async () => {
    try {
      const itemId = trackTypes.find(
        (trackType) => trackType.name === selectedLicense?.id,
      )?.id;

      if (!itemId) {
        throw new Error("Выберите лицензию");
      }

      await addCartItem({
        trackTypeId: itemId,
        trackId: trackTypes[0].trackId,
      });

      toast.success(`Трек добавлен в корзину!`);
    } catch (error) {
      console.log(error);
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  return (
    <div className={cn("flex flex-col gap-8 basis-3/4", className)}>
      <AudioPlayer
        src={trackTypes.find((type) => type.name === "mp3")?.fileUrl}
        id={id}
      />
      <div className="flex flex-col bg-secondary rounded-md px-6 py-7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Лицензия</h1>
          <div className="flex gap-6">
            {selectedLicense !== null && (
              <div className="flex flex-col">
                <h2 className="text-muted-foreground text-xs">СТОИМОСТЬ</h2>
                <h1>
                  {
                    trackTypes.find(
                      (trackType) => trackType.name === selectedLicense?.id,
                    )?.price
                  }
                  ₽
                </h1>
              </div>
            )}
            <Button
              size="lg"
              onClick={onSubmit}
              disabled={!selectedLicense || loading}
            >
              <ShoppingBag />
              Добавить
            </Button>
          </div>
        </div>
        <Separator className="bg-muted-foreground my-6" />
        <div className="grid grid-cols-3 gap-4">
          {licenses
            .filter((license) =>
              trackTypes.find((type) => type.name === license.id),
            )
            .map((license) => (
              <TrackLicense
                key={license.id}
                license={license}
                price={
                  trackTypes.find((type) => type.name === license.id)?.price
                }
                selectedLicense={selectedLicense}
                action={(e) => setSelectedLicense(e)}
              />
            ))}
        </div>
        <div>
          {selectedLicense?.conditions.length && (
            <>
              <Separator className="bg-muted-foreground mt-6" />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl">
                    Условия использования
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-x-14 text-xs text-muted-foreground gap-y-4">
                      {selectedLicense?.conditions.map((e, i) => (
                        <div key={i} className="flex gap-3">
                          {e.icon}
                          <h1>{e.title}</h1>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      </div>
      {/*<div className="flex flex-col bg-secondary rounded-md px-6 py-7">*/}
      {/*  <h1 className="text-lg">Комментарии</h1>*/}
      {/*  <div className="flex mt-8 gap-4">*/}
      {/*    <Avatar>*/}
      {/*      <AvatarImage>*/}
      {/*        /!* eslint-disable-next-line @next/next/no-img-element *!/*/}
      {/*        <img src="" alt="Avatar" />*/}
      {/*      </AvatarImage>*/}
      {/*      <AvatarFallback>U</AvatarFallback>*/}
      {/*    </Avatar>*/}
      {/*    <Input*/}
      {/*      placeholder="Поделитесь своими мыслями..."*/}
      {/*      className="shadow-muted-foreground focus-visible:border-none focus-visible:shadow-primary "*/}
      {/*    />*/}
      {/*    <Button className="rounded-full" disabled>*/}
      {/*      <SendHorizontal />*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
