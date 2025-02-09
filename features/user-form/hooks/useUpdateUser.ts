"use client";

import { User } from "@/lib/types/user";
import { CategoryWithCount, EnhancedUpdateMapping } from "../types";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoriesSlug,
  getCountsSlug,
  getUsersSlug,
} from "@/lib/api/const/urls";
import {
  createEmptyEnhandecMap,
  createEnhancer,
  getCategories,
  getCounts,
  getUsers,
} from "../api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { checkIsNonEmptyArrayLike } from "@/lib/utils/checks";

interface TUseUpdateUser {
  users: User[];
  categories: CategoryWithCount[];
  count?: number;
  category?: CategoryWithCount;
  user?: User;
  selectUser: (id: DbRecordId | string) => void;
  selectCategory: (catid: DbRecordId | string) => void;
  setCount: (count: number) => void;
  isLoading: boolean;
  isFetching: boolean;
}
const userSlug = getUsersSlug();
const categoriesSlug = getCategoriesSlug();
const countSlug = getCountsSlug();

export function useUpdateUser(): TUseUpdateUser {
  const {
    data: users,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useQuery({
    queryKey: [userSlug],
    queryFn: getUsers,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetchig,
  } = useQuery({
    queryKey: [categoriesSlug],
    queryFn: getCategories,
  });

  const {
    data: counts,
    isLoading: isCountsLoading,
    isFetching: isCountsFetching,
  } = useQuery({
    queryKey: [countSlug],
    queryFn: getCounts,
  });

  const enhancer = useMemo(
    () =>
      checkIsNonEmptyArrayLike(counts) &&
      checkIsNonEmptyArrayLike(categories) &&
      createEnhancer(counts, categories),
    [counts, categories],
  );

  const [enhancedMap, setEnHancedMap] = useState<EnhancedUpdateMapping>(
    createEmptyEnhandecMap,
  );

  const handleSelectUser = useCallback(
    (id: DbRecordId) => {
      const _id = Number(id);
      const found = users?.find((u) => u.id === _id);
      console.log("select user", found);
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

  useEffect(() => {
    console.log("effect");
    if (enhancer) {
      console.log("enhancer");
      setEnHancedMap(enhancer(enhancedMap));
    }
  }, [enhancer, enhancedMap.user]);

  return useMemo(
    () => ({
      isFetching: isCountsFetching || isUsersFetching || isCategoriesFetchig,
      isLoading: isUsersLoading || isCategoriesLoading || isCountsLoading,
      users: checkIsNonEmptyArrayLike(users) ? users : [],
      categories: enhancedMap.categories,
      category: currentCategory,
      user: enhancedMap.user,
      selectUser: handleSelectUser,
      setCount: (c) => {
        // TODO: dispatch updates to table from here
        setCurrentCategory((cat) => (cat ? { ...cat, count: c } : undefined));
      },
      count: currentCategory?.count,
      selectCategory: handleSelectCategory,
    }),
    [
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
    ],
  );
}
