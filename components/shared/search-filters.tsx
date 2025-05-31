"use client";

import React from "react";
import { cn } from "@/lib";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Filter } from "lucide-react";
import { FilterMenu } from "@/components/shared";
import { useFilters, useQueryFilters } from "@/hooks";
import { Type } from "@/hooks/use-filters";

interface Props {
  isTracks?: boolean;
  className?: string;
}

export const SearchFilters: React.FC<Props> = ({
  isTracks = false,
  className,
}) => {
  const filters = useFilters();

  useQueryFilters(filters);

  return (
    <div className={cn(className, "flex items-center justify-between gap-2")}>
      <Select
        defaultValue={(filters.type as unknown as string) || "all"}
        onValueChange={(e) => filters.setType(e as unknown as Type)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="tracks">Треки</SelectItem>
            <SelectItem value="users">Пользователи</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {isTracks && (
        <FilterMenu>
          <Button size="icon" variant="secondary">
            <Filter />
          </Button>
        </FilterMenu>
      )}
    </div>
  );
};
