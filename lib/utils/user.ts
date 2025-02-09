import { User } from "@/lib/types/user";

export function getUserFullName(user: User) {
  return user ? `${user.first_name} ${user.last_name}` : "";
}
