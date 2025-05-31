import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { License } from "@/@types/licenses";

interface Props {
  license: License;
  className?: string;
}

export const CheckoutLicenseDescription: React.FC<PropsWithChildren<Props>> = ({
  children,
  license,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader className="mb-4">
          <DialogTitle>{license.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-xs text-muted-foreground">
          {license.conditions.map((e, i) => (
            <div key={i} className="flex gap-3 items-center">
              {e.icon}
              <h1>{e.title}</h1>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
