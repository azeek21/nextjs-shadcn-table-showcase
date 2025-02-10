export interface MergedCategory {
  categoryName: string;
  categoryId: DbRecordId;
  count?: number;
}

export interface MergedEntry {
  userId: DbRecordId;
  userAvatar?: string;
  fullName: string;
  first_name?: string;
  last_name?: string;
  categories: Record<string, MergedCategory>; // {categoryIdAsString: MergedCategor}
}
