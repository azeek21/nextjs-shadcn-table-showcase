export interface User extends WithDbRecord {
  first_name: string;
  last_name: string;
  avatar?: string;
}
