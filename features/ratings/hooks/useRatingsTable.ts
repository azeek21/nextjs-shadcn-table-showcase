"use client";

import {
  getCategoriesSlug,
  getCountsSlug,
  getUsersSlug,
} from "@/lib/api/const/urls";
import { getCategories, getCounts, getUsers } from "@/lib/api/shared";
import { Category } from "@/lib/types/categories";
import { MergedEntry } from "@/lib/types/merged-data";
import { checkIsNonEmptyArrayLike } from "@/lib/utils/checks";
import { createCategoriesMap, mergeCountUserCategory } from "@/lib/utils/data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

interface TUseRatingsTable {
  isLoading?: boolean;
  isFetching?: boolean;
  data: MergedEntry[];
  categories?: Category[];
}

export function useRatingsTable(): TUseRatingsTable {
  const {
    data: users,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useQuery({
    queryKey: [getUsersSlug()],
    queryFn: getUsers,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetchig,
  } = useQuery({
    queryKey: [getCategoriesSlug()],
    queryFn: getCategories,
  });

  const {
    data: counts,
    isLoading: isCountsLoading,
    isFetching: isCountsFetching,
  } = useQuery({
    queryKey: [getCountsSlug()],
    queryFn: getCounts,
  });

  const data = useMemo(() => {
    if (counts && categories && users) {
      return mergeCountUserCategory(users, counts, categories);
    }
    return [];
  }, [counts, categories, users]);

  return {
    isLoading: isUsersLoading || isCategoriesLoading || isCountsLoading,
    isFetching: isUsersFetching || isCountsFetching || isCategoriesFetchig,
    categories,
    data,
  };
}
