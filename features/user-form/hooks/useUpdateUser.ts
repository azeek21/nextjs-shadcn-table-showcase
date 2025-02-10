"use client";

import { User } from "@/lib/types/user";
import { CategoryWithCount, EnhancedUpdateMapping } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesSlug,
  getCountsSlug,
  getUsersSlug,
} from "@/lib/api/const/urls";
import { createEmptyEnhandecMap, createEnhancer } from "../api";
import { getCategories, getCounts, getUsers } from "@/lib/api/shared";

import { useCallback, useEffect, useMemo, useState } from "react";
import { checkIsNonEmptyArrayLike } from "@/lib/utils/checks";
import { sleepFor } from "@/lib/utils/promises";
import { SECOND } from "@/lib/const/durations";
import { Count } from "@/lib/types/count";

interface TUseUpdateUser {
  users: User[];
  categories: CategoryWithCount[];
  count?: number;
  category?: CategoryWithCount;
  user?: User;
  selectUser: (id: DbRecordId) => void;
  selectCategory: (catid: DbRecordId | string) => void;
  setCount: (count: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  updateCount: VoidFunction;
}

export function useUpdateUser(): TUseUpdateUser {
  const queryClient = useQueryClient();
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
    queryKey: [getCountsSlug],
    queryFn: getCounts,
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["mutateCount"],
    // We simply proxy mutation params to use in onSuccess to update cache easliy
    mutationFn: async (params: {
      userId: DbRecordId;
      categoryId: DbRecordId;
      count: number;
    }) => {
      await sleepFor(2 * SECOND);
      return params;
    },
    onSuccess: (params) => {
      queryClient.setQueryData([getCountsSlug()], (counts: Count[]) => {
        return counts.map((c) => {
          if (
            c.user_id === params.userId &&
            c.category_id === params.categoryId
          ) {
            return { ...c, count: params.count };
          }
          return c;
        });
      });
    },
  });

  const enhancer = useMemo(() => {
    return (
      checkIsNonEmptyArrayLike(counts) &&
      checkIsNonEmptyArrayLike(categories) &&
      createEnhancer(counts, categories)
    );
  }, [counts, categories]);

  const [enhancedMap, setEnHancedMap] = useState<EnhancedUpdateMapping>(
    createEmptyEnhandecMap,
  );

  const handleSelectUser = useCallback(
    (id: DbRecordId) => {
      const _id = Number(id);
      const found = users?.find((u) => u.id === _id);
      found && setEnHancedMap((m) => ({ ...m, user: found }));
      setCurrentCategory(undefined);
    },
    [users],
  );

  const handleSelectCategory = useCallback(
    (id: DbRecordId | string) => {
      const _id = Number(id);
      const found = enhancedMap.categories.find((c) => c.category_id === _id);
      found && setCurrentCategory(found);
    },
    [enhancedMap],
  );

  const [currentCategory, setCurrentCategory] = useState<
    CategoryWithCount | undefined
  >();

  const handleUpdateCount = useCallback(() => {
    if (!enhancedMap.user?.id || !currentCategory) return;
    mutate({
      userId: enhancedMap.user.id,
      categoryId: currentCategory.category_id,
      count: currentCategory.count,
    });
  }, [enhancedMap, currentCategory]);

  useEffect(() => {
    if (enhancer) {
      setEnHancedMap(enhancer(enhancedMap));
    }
  }, [enhancer, enhancedMap.user]);

  return useMemo(
    () => ({
      isFetching:
        isCountsFetching || isUsersFetching || isCategoriesFetchig || isPending,
      isLoading: isUsersLoading || isCategoriesLoading || isCountsLoading,
      users: checkIsNonEmptyArrayLike(users) ? users : [],
      categories: enhancedMap.categories,
      category: currentCategory,
      user: enhancedMap.user,
      selectUser: handleSelectUser,
      setCount: (c) => {
        setCurrentCategory((cat) => (cat ? { ...cat, count: c } : undefined));
      },
      count: currentCategory?.count,
      selectCategory: handleSelectCategory,
      updateCount: handleUpdateCount,
    }),
    [
      handleUpdateCount,
      handleSelectCategory,
      isCountsLoading,
      isCountsFetching,
      isUsersLoading,
      isUsersFetching,
      isCategoriesFetchig,
      isCategoriesLoading,
      users,
      enhancedMap,
      currentCategory,
      handleSelectUser,
      isPending,
    ],
  );
}
