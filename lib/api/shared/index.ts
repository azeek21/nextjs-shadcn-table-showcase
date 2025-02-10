import { User } from "@/lib/types/user";
import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "@/lib/api/axios";
import {
  getCategoriesSlug,
  getCountsSlug,
  getUsersSlug,
} from "@/lib/api/const/urls";
import { Category } from "@/lib/types/categories";
import { Count } from "@/lib/types/count";

export async function getUsers({
  signal,
}: QueryFunctionContext): Promise<User[]> {
  const res = await axiosClient.get<User[]>(getUsersSlug(), {
    signal: signal,
  });
  return res.data;
}

export async function getCategories({
  signal,
}: QueryFunctionContext): Promise<Category[]> {
  const res = await axiosClient.get<Category[]>(getCategoriesSlug(), {
    signal,
  });
  return res.data;
}

export async function getCounts({
  signal,
}: QueryFunctionContext): Promise<Count[]> {
  const res = await axiosClient.get<Count[]>(getCountsSlug(), { signal });
  return res.data;
}
