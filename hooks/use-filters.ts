import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
  fromPrice?: number;
  toPrice?: number;
}

export interface Sorting {
  sort?: "popularity" | "listens" | "new" | "increasing" | "descending";
}

export interface Type {
  type: "all" | "tracks" | "users";
}

interface QueryFilters extends PriceProps, Sorting, Type {
  licenses: string;
  date: string;
  tags: string;
  query: string;
}

export interface Filters {
  licenses: Set<string>;
  date: string;
  tags: string;
  prices: PriceProps;
  sort: Sorting;
  type: Type;
  query: string;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setLicenses: (value: string) => void;
  setDate: (value: string) => void;
  setTags: (value: string) => void;
  setSort: (value: Sorting) => void;
  setType: (value: Type) => void;
  setQuery: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    QueryFilters,
    string
  >;

  const [prices, setPrices] = useState<PriceProps>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fromPrice: Number(searchParams.get("fromPrice")) || undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toPrice: Number(searchParams.get("toPrice")) || undefined,
  });

  const [tags, setTags] = useState<string>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.get("tags") || undefined,
  );

  const [query, setQuery] = useState<string>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.get("query") || undefined,
  );

  const [date, setDate] = useState<string>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.get("date") || undefined,
  );

  const [sort, setSort] = useState<Sorting>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.get("sort") || undefined,
  );

  const [type, setType] = useState<Type>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.get("type") || undefined,
  );

  const [licenses, { toggle: toggleLicenses }] = useSet(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    new Set<string>(searchParams.get("licenses")?.split(",")),
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const updateTags = (value: string) => {
    setTags(value);
  };

  return useMemo(
    () => ({
      prices,
      licenses,
      tags,
      date,
      sort,
      type,
      query,
      setPrices: updatePrice,
      setLicenses: toggleLicenses,
      setTags: updateTags,
      setDate,
      setSort,
      setType,
      setQuery,
    }),
    [prices, licenses, tags, date, sort, type, query],
  );
};
