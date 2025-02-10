import { Category } from "@/lib/types/categories";
import { Count } from "@/lib/types/count";
import { EnhancedUpdateMapping, UpdateMappingEnhancer } from "../types";

export function createEmptyEnhandecMap(): EnhancedUpdateMapping {
  return {
    categories: [],
  };
}

export function createEnhancer(
  counts: Count[],
  categories: Category[],
): UpdateMappingEnhancer {
  return function enhanceMapping(
    mapping: EnhancedUpdateMapping,
  ): EnhancedUpdateMapping {
    const newEnhancedMap = createEmptyEnhandecMap();
    if (!mapping.user || !mapping.user.id) return newEnhancedMap;

    newEnhancedMap.user = mapping.user;

    // count.categoryId => Count
    const hashT = new Map<DbRecordId, Count>();

    counts.forEach((c) => {
      if (c.user_id === newEnhancedMap.user?.id) {
        hashT.set(c.category_id, c);
      }
    });

    categories.forEach((cat) => {
      if (hashT.has(cat.id)) {
        newEnhancedMap.categories?.push({
          category_id: cat.id,
          category_name: cat.name,
          count: hashT.get(cat.id)?.count!,
        });
      }
    });
    return newEnhancedMap;
  };
}
