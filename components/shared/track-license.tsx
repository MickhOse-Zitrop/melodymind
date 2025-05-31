"use client";

import React from "react";
import { cn } from "@/lib";
import { License } from "@/@types/licenses";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FormInput } from "@/components/shared/form";

interface Props {
  license: License;
  key: string;
  selectedLicense?: License | null;
  action?: (license: License | null) => void;
  format?: "MP3" | "WAV" | "STEMS";
  edit?: boolean;
  price: number | undefined;
  name?: string;
  className?: string;
}

export const TrackLicense: React.FC<Props> = ({
  license,
  selectedLicense,
  action,
  format,
  edit,
  price,
  name,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex-1/4 rounded-lg py-2 px-4 border-muted-foreground border pb-7 cursor-pointer duration-200",
        selectedLicense === license && "bg-primary text-white",
        license.formats.includes(format || "") &&
          "cursor-not-allowed opacity-50",
        className,
      )}
      key={license.id}
      onClick={() =>
        action && (license === selectedLicense ? action(null) : action(license))
      }
    >
      <h1 className="font-medium">{license.title}</h1>
      {edit ? (
        <div className="flex items-center gap-2">
          <FormInput
            className="w-20 my-2"
            pattern={REGEXP_ONLY_DIGITS}
            disabled={license.formats.includes(format || "")}
            name={name || ""}
            id={name || ""}
            type="number"
          />
          ₽
        </div>
      ) : (
        <h2>{price ? `${price}₽` : `БЕСПЛАТНО`}</h2>
      )}
      <p
        className={cn(
          "text-muted-foreground text-sm",
          selectedLicense === license && "text-white",
        )}
      >
        {license.formats.join(", ")}
      </p>
    </div>
  );
};
