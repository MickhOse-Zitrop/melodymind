import React from "react";
import { cn } from "@/lib";

interface ListItemIconProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  icon: React.JSX.Element;
  className?: string;
}

export const ListItemIcon = ({
  children,
  icon,
  className,
  ...props
}: ListItemIconProps) => {
  return (
    <li className={cn("flex items-start", className)} {...props}>
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600">
        {icon}
      </span>
      <span className="ml-3 text-base leading-tight">{children}</span>
    </li>
  );
};
