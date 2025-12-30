"use client";

import { Loader2Icon, PlusSquareIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { AdminDashboardApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["admin-dashboard", page],
    queryFn: () => AdminDashboardApi(token, page, 10),
    enabled: !!token,
    placeholderData: (prev) => prev,
  });

  const dashboard = data?.data;
  const activities = dashboard?.recent_activities;

  const totalPages = activities?.last_page ?? 1;

  const getPages = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (page >= totalPages - 2) {
        pages.push(
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(page - 2, page - 1, page, page + 1, page + 2);
      }
    }

    return pages;
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 pb-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mt-2">
        {[
          { label: "Users", value: dashboard?.users },
          { label: "Events", value: dashboard?.events },
          { label: "Branches", value: dashboard?.branch },
          { label: "Earning", value: dashboard?.earning },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="w-full flex flex-col justify-center items-center gap-2">
              <PlusSquareIcon className="bg-foreground text-background rounded-sm" />
              <h3 className="font-semibold text-sm">{item.label}</h3>
              <p className="text-lg font-bold">{item.value ?? "N/A"}</p>
              <p>Available {item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="w-full flex-1">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">User</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {activities?.data?.length ? (
                activities.data.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell className="text-center">{x.date}</TableCell>
                    <TableCell className="text-center">{x.user}</TableCell>
                    <TableCell className="text-center">{x.action}</TableCell>
                    <TableCell className="text-center">{x.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No activities found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}
