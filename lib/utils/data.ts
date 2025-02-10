import { MergedCategory, MergedEntry } from "@/lib/types/merged-data";
import { Count } from "../types/count";
import { User } from "../types/user";
import { Category } from "../types/categories";
import { checkIsNonEmptyArrayLike } from "./checks";
import { getUserFullName } from "./user";

export function mergeCountUserCategory(
  users: User[],
  counts: Count[],
  categories: Category[],
): MergedEntry[] {
  if (
    !checkIsNonEmptyArrayLike(users) ||
    !checkIsNonEmptyArrayLike(counts) ||
    !checkIsNonEmptyArrayLike(categories)
  )
    return [];
  const usersHash = createUsersMap(users);
  const categoryHash = createCategoriesMap(categories);
  // key is user id here;
  const resultHash = new Map<DbRecordId, MergedEntry>();
  for (const c of counts) {
    // Skip broken entries
    if (!categoryHash.has(c.category_id) || !usersHash.has(c.user_id)) continue;

    const mergedCategory: MergedCategory = {
      categoryId: c.category_id,
      categoryName: categoryHash.get(c.category_id)!.name,
      count: c.count,
    };

    const mergedItem =
      resultHash.get(c.user_id) ||
      createInitialMergedEntry(usersHash.get(c.user_id)!);

    mergedItem.categories[`${c.category_id}`] = mergedCategory;

    resultHash.set(c.user_id, mergedItem);
  }

  const res = Array.from(resultHash.values());
  return res;
}

export function createInitialMergedEntry(user: User): MergedEntry {
  return {
    userAvatar: user?.avatar,
    userId: user.id,
    first_name: user.first_name,
    last_name: user.first_name,
    fullName: getUserFullName(user),
    categories: {},
  };
}

export function createUsersMap(users: User[]): Map<DbRecordId, User> {
  const m = new Map<DbRecordId, User>();
  for (let i = 0; i < users.length; i++) {
    m.set(users[i].id, users[i]);
  }
  return m;
}

export function createCategoriesMap(
  categories: Category[],
): Map<DbRecordId, Category> {
  const m = new Map<DbRecordId, Category>();
  for (let i = 0; i < categories.length; i++) {
    m.set(categories[i].id, categories[i]);
  }
  return m;
}

export function getMergedCategorySum(
  cat: Record<string, MergedCategory>,
): number {
  return Object.entries(cat).reduce((acc, cat) => acc + (cat[1].count || 0), 0);
}
