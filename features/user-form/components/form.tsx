"use client";

import { FormEvent, useCallback } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { Button } from "@/lib/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/lib/components/ui/select";
import { getUserFullName } from "@/lib/utils/user";
import { Input } from "@/lib/components/ui/input";

export function UserForm() {
  const ctx = useUpdateUser();
  const handleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      ctx.setCount(ctx.count || 0);
    },
    [ctx.setCount, ctx.count],
  );

  return (
    <form
      className="w-full flex flex-col gap-4 max-w-screen-sm px-2"
      onSubmit={handleSubmit}
    >
      <Select
        value={`${ctx?.user?.id || ""}`}
        onValueChange={ctx.selectUser}
        disabled={ctx.isLoading || ctx.isFetching}
      >
        <SelectTrigger>
          <SelectValue placeholder="User" />
        </SelectTrigger>
        <SelectContent>
          {ctx.users.map((u) => (
            <SelectItem key={u.id} value={`${u.id}`}>
              {getUserFullName(u)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        disabled={ctx.isLoading || ctx.isFetching}
        onValueChange={ctx.selectCategory}
        value={`${ctx.category?.category_id || ""}`}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {ctx.categories.map((c) => (
            <SelectItem
              key={`${c.category_name}-${c.category_id}`}
              value={`${c.category_id}`}
            >
              {c.category_name}
            </SelectItem>
          ))}
        </SelectContent>
        <Input
          className="kekw "
          placeholder="Cunt"
          disabled={ctx.isFetching || ctx.isLoading || !ctx.category}
          onChange={(v) => ctx.setCount(Number(v.target.value))}
          value={`${ctx.count || ""}`}
        />
      </Select>
      <Button type="submit" variant="purple" size="lg">
        Set
      </Button>
    </form>
  );
}
