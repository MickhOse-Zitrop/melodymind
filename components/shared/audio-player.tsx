"use client";

import React from "react";
import { Button } from "@/components/ui";
import { Pause, Play } from "lucide-react";
import { heights } from "@/data/data";
import { cn } from "@/lib";
import { updateListens } from "@/app/actions";

interface Props {
  id: number;
  src: string | undefined;
  className?: string;
}

export const AudioPlayer: React.FC<Props> = ({ src, id, className }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [activeId, setActiveId] = React.useState(-1);
  const [hasTrackedQuarter, setHasTrackedQuarter] = React.useState(false);

  const updateProgress = () => {
    if (!audioRef.current || !isPlaying) return;

    if (audioRef.current.ended) {
      setCurrentTime(0);
      setActiveId(-1);
      setPlaying(false);

      return;
    }

    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handlePlayPauseClick = async () => {
    try {
      setPlaying((prevState) => !prevState); // Переключаем состояние isPlaying синхронно

      if (isPlaying) {
        audioRef.current?.pause(); // Пауза, если играло
      } else {
        await audioRef.current?.play(); // Воспроизвести, если было на паузе
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkForQuarterCompletion = async () => {
    if (!audioRef.current || hasTrackedQuarter) return;

    const quarterPoint = duration * 0.25;

    if (currentTime > quarterPoint) {
      await updateListens({ id });
      setHasTrackedQuarter(true);
    }
  };

  const calculateBlockColors = () => {
    if (!audioRef.current || duration <= 0) setActiveId(-1);

    const progressRatio = currentTime / duration;

    setActiveId(
      Math.min(Math.ceil(progressRatio * heights.length), heights.length),
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      updateProgress();
      calculateBlockColors();
      checkForQuarterCompletion().then();
    }, 500);

    return () => clearInterval(intervalId);
  });

  return (
    <div
      className={cn(
        "sm:flex sm:gap-6 sm:py-4 sm:px-6 border rounded-4xl",
        className,
      )}
    >
      <Button
        className="rounded-full"
        size="icon"
        disabled={src === undefined}
        onClick={handlePlayPauseClick}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      <audio ref={audioRef} src={src} />
      <div className="sm:flex hidden items-end gap-1">
        {heights.map((e, i) => (
          <div
            key={i}
            className={cn(
              `h-${e} w-2 bg-primary rounded-md opacity-40 duration-150`,
              activeId >= i && "opacity-100",
            )}
          />
        ))}
      </div>
    </div>
  );
};
