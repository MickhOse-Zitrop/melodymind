import React from "react";
import { ProductCard, Warning } from "@/components/shared";
import { Trash } from "lucide-react";
import { cn } from "@/lib";
import { Button } from "@/components/ui";
import { TrackFullInfo } from "@/lib/find-tracks";

interface Props {
  track: TrackFullInfo;
  className?: string;
}

export const EditableTrack: React.FC<Props> = ({ track, className }) => {
  return (
    <div className="relative group">
      <ProductCard
        id={track.id}
        title={track.title}
        price={track.trackType.length > 0 ? track.trackType[0].price : 0}
        user={track.user.displayName}
        userId={track.user.link || track.user.id}
        imageUrl={track.imageUrl || undefined}
        className={cn(className)}
        edit
      />
      <Warning
        title={"Вы абсолютно уверены?"}
        description={`Это действие невозможно отменить. Это приведет к необратимому удалению трека "${track.title}".`}
        data={track}
        type={"track"}
      >
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 duration-150"
        >
          <Trash />
        </Button>
      </Warning>
    </div>
  );
};
