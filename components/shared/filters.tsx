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
import { Sorting } from "@/hooks/use-filters";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const filters = useFilters();

  useQueryFilters(filters);
  return (
    <div className={cn(className, "flex items-center justify-between gap-2")}>
      <p className="text-muted-foreground">Сортировать по:</p>
      <Select
        defaultValue={(filters.sort as string) || "popularity"}
        onValueChange={(e) => filters.setSort(e as Sorting)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="popularity">Популярности</SelectItem>
            <SelectItem value="listens">Прослушиваниям</SelectItem>
            <SelectItem value="new">Дате выхода</SelectItem>
            <SelectItem value="increasing">Возрастанию цены</SelectItem>
            <SelectItem value="descending">Убыванию цены</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FilterMenu>
        <Button size="icon" variant="secondary">
          <Filter />
        </Button>
      </FilterMenu>
    </div>
  );
};
