"use client";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/kibo-ui/status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventsApi } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, Loader2Icon, SearchIcon, WalletIcon } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import EventActions from "./event-actionts";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      return getEventsApi(token);
    },
  });
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Event Managment</CardTitle>
          {/* <div className="mt-2">
            <div className="border flex rounded-sm items-center px-2 shadow-sm">
              <SearchIcon className="size-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="border-0! shadow-none! ring-0! outline-0!"
              />
            </div>
          </div> */}
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:text-center!">
                  <TableHead>Event Name</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Organizer</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((x) => (
                  <TableRow className="text-center!" key={x.id}>
                    <TableCell>{x.title}</TableCell>
                    <TableCell>{x.sport_type}</TableCell>
                    <TableCell>{x.organizer.user_name}</TableCell>
                    <TableCell>{x.prize_amount}</TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Status
                        status={
                          ["Awaiting Confirmation", "Pending Payment"].includes(
                            x.status
                          )
                            ? "degraded"
                            : x.status === "Cancelled"
                            ? "offline"
                            : "online"
                        }
                      >
                        <StatusIndicator />
                        <StatusLabel>{x.status}</StatusLabel>
                      </Status>
                    </TableCell>
                    <TableCell className="">
                      <EventActions x={x} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
