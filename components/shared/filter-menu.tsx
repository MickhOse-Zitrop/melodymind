"use client";

import React, { PropsWithChildren } from "react";
import {
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { Container } from "@/components/shared/container";
import { licenses } from "@/data/data";
import { useFilters, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const FilterMenu: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const filters = useFilters();
  const [tags, setTags] = React.useState<string>(filters.tags);

  useQueryFilters(filters);

  // const updatePrices = (prices: number[]) => {
  //   filters.setPrices("fromPrice", prices[0]);
  //   filters.setPrices("toPrice", prices[1]);
  // };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={className}>
        <Container>
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Фильтры</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 pb-20 pt-5 px-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="price-from" className="text-xl font-medium">
                Цена
              </Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="from-price" className="text-md">
                  от
                </Label>
                <Input
                  id="from-price"
                  type="number"
                  placeholder="0"
                  min={0}
                  max={100000}
                  value={String(filters.prices.fromPrice)}
                  onChange={(e) =>
                    filters.setPrices("fromPrice", Number(e.target.value))
                  }
                />
                <Label htmlFor="to-price" className="text-md">
                  до
                </Label>
                <Input
                  id="to-price"
                  type="number"
                  placeholder="100000"
                  min={0}
                  max={100000}
                  value={String(filters.prices.toPrice)}
                  onChange={(e) =>
                    filters.setPrices("toPrice", Number(e.target.value))
                  }
                />
              </div>
              {/*<div className="flex items-center gap-2">*/}
              {/*  <Switch id="free-price" />*/}
              {/*  <Label htmlFor="free-price" className="text-lg  cursor-pointer">*/}
              {/*    Только бесплатные*/}
              {/*  </Label>*/}
              {/*</div>*/}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="tags" className="text-xl font-medium">
                Теги
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                onBlur={() => filters.setTags(tags)}
              />
              <p className="text-muted-foreground text-sm">
                ⓘ Введите теги через пробел
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-xl font-medium">Лицензия</Label>
              <div className="flex flex-col gap-3">
                {licenses.map((license) => (
                  <div key={license.id} className="flex gap-2">
                    <Checkbox
                      id={license.id}
                      value={license.id}
                      name="license"
                      checked={filters.licenses.has(license.id)}
                      onCheckedChange={() => filters.setLicenses(license.id)}
                    />
                    <Label htmlFor={license.id}>{license.title}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-xl font-medium">По дате выхода</Label>
              <RadioGroup
                defaultValue={filters.date || "all-time"}
                onValueChange={(e) => filters.setDate(e)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="all-time"
                    id="all-time"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="all-time" className="cursor-pointer">
                    Все время
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-day"
                    id="last-day"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="last-day" className="cursor-pointer">
                    Последний день
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-week"
                    id="last-week"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="last-week" className="cursor-pointer">
                    Последнюю неделю
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-month"
                    id="last-month"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="last-month" className="cursor-pointer">
                    Последний месяц
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-year"
                    id="last-year"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="last-year" className="cursor-pointer">
                    Последний год
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {/*<DrawerFooter className="mb-10 w-full">*/}
          {/*  <Button size="lg">Подтвердить</Button>*/}
          {/*</DrawerFooter>*/}
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
