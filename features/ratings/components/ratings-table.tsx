"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  Column,
  sortingFns,
} from "@tanstack/react-table";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  TableCell,
  TableBody,
  TableSkeleton,
} from "@/lib/components/ui/table";
import { useRatingsTable } from "../hooks/useRatingsTable";
import { MergedCategory, MergedEntry } from "@/lib/types/merged-data";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import { useMemo, useState } from "react";
import { SortAsc, SortDesc } from "lucide-react";
import { getMergedCategorySum } from "@/lib/utils/data";
import { headers } from "next/headers";
import { Category } from "@/lib/types/categories";

// @ts-ignore
const emptyArray: any = [];

const createCategoryAcccessorString = (
  cat: Category,
): `categories.${string}.count` => `categories.${cat.id}.count`;

const colHelper = createColumnHelper<MergedEntry>();
export function RatingsTable() {
  const { isLoading, isFetching, data, categories } = useRatingsTable();
  const [columnOrders, setColumnOrders] = useMemo<string[]>(
    () => ["userId", "fullName", "categories"],
    [],
  );

  const cols = useMemo(
    (): Column<MergedEntry>[] => [
      colHelper.accessor("userId", {
        enableSorting: false,
        maxSize: 10,
        header: "",
        cell: (cinfo) => cinfo.getValue(),
      }),
      colHelper.accessor("fullName", {
        enableSorting: false,
        minSize: 300,
        maxSize: 400,
        header: "",
        cell: (cinfo) => (
          <div className="flex gap-2 items-center whitespace-nowrap">
            <Avatar>
              <AvatarImage src={cinfo.row.original.userAvatar} />
              <AvatarFallback>{`${cinfo.row.original?.first_name?.charAt(0)} ${cinfo.row.original?.last_name?.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{cinfo.getValue()}</span>
          </div>
        ),
        footer: "Total",
      }),

      ...(!categories
        ? emptyArray
        : categories?.map((c) =>
            colHelper.accessor(createCategoryAcccessorString(c), {
              enableMultiSort: true,
              sortUndefined: "last",
              sortingFn: (a, b, id) => {
                return (a.getValue(id) as number) - (b.getValue(id) as number);
              },
              maxSize: 70,
              minSize: 50,
              header: () => (
                <span className="text-primary whitespace-nowrap">{c.name}</span>
              ),
              cell: (cellInfo) => cellInfo.getValue() ?? "-",
              footer: (info) => {
                return table
                  .getFilteredRowModel()
                  .rows.reduce(
                    (acc, row) => row.getValue(info.header.column.id),
                    0,
                  );
              },
            }),
          )),
      colHelper.accessor("categories", {
        header: () => <div className="text-lg text-primary">Total</div>,
        sortingFn: (a, b, id) => {
          return (
            getMergedCategorySum(a.getValue(id)) -
            getMergedCategorySum(b.getValue(id))
          );
        },
        cell: (cinfo) => getMergedCategorySum(cinfo.getValue()),
      }),
    ],
    [categories],
  );

  const table = useReactTable({
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
    enableSorting: true,
    columns: cols,
  });

  if (isLoading) {
    return <TableSkeleton rowCount={15} />;
  }

  return (
    <Table className="font-semibold">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="group relative"
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
                <div
                  className="flex gap-2"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.getCanSort() && (
                    <div>
                      {{ asc: <SortAsc />, desc: <SortDesc /> }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                      {!header.column.getIsSorted() && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {
                            { asc: <SortAsc />, desc: <SortDesc /> }[
                              header.column.getNextSortingOrder() as string
                            ]
                          }
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getSortedRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow></TableRow>
      </TableBody>
      <TableFooter>
        {table.getFooterGroups().map((footerGroun) => (
          <TableRow key={footerGroun.id}>
            {footerGroun.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    </Table>
  );
}
