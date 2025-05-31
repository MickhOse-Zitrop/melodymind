"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ClearButton } from "@/components/shared";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@/components/ui";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  id: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  id,
  required,
  className,
  disabled,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={cn(className, "flex flex-col gap-2 w-full")}>
      <Label
        htmlFor={id}
        className={cn("text-md", disabled && "text-muted-foreground")}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="relative">
        <Input
          className="h-12 text-md bg-secondary pr-10 "
          id={id}
          {...register(name)}
          disabled={disabled}
          {...props}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
