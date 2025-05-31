import React from "react";
import { cn } from "@/lib";

interface Props {
  title: string;
  className?: string;
}

export const PageTitle: React.FC<Props> = ({ title, className }) => {
  return <h1 className={cn(className, "text-4xl font-bold")}>{title}</h1>;
};