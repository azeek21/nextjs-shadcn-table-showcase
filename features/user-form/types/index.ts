import { User } from "@/lib/types/user";

export interface CategoryWithCount {
  category_name: string;
  category_id: number;
  count: number;
}

export interface EnhancedUpdateMapping {
  user?: User;
  categories: Array<CategoryWithCount>;
}

export type UpdateMappingEnhancer = (
  mapping: EnhancedUpdateMapping,
) => EnhancedUpdateMapping;
