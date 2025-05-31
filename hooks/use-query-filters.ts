import { Filters } from "@/hooks/use-filters";
import qs from "qs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        licenses: Array.from(filters.licenses),
        tags: filters.tags,
        date: filters.date,
        sort: filters.sort,
        type: filters.type,
        query: filters.query,
      };

      const query = qs.stringify(params, { arrayFormat: "comma" });

      router.push(`?${query}`, { scroll: false });
    }

    isMounted.current = true;
  }, [
    filters.prices,
    filters.licenses,
    filters.tags,
    filters.date,
    router,
    filters.sort,
    filters.type,
  ]);
};
