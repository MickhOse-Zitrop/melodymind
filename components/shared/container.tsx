import { cn } from "@/lib";
import React from "react";

interface Props {
  id?: string;
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  id,
}) => {
  return (
    <div id={id} className={cn("mx-auto max-w-[1272px] px-2", className)}>
      {children}
    </div>
  );
};
