"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Label, Textarea } from "@/components/ui";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  id: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
  name,
  label,
  id,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={cn(className, "flex flex-col gap-2 h-full")}>
      <Label htmlFor={id} className="text-md">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        className="bg-secondary inset-shadow-sm dark:inset-shadow-white/10 h-full"
        id={id}
        {...register(name)}
        {...props}
      />
      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
