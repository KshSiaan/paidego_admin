"use client";
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
import {
  BanIcon,
  CheckIcon,
  EyeIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useCookies } from "react-cookie";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/kibo-ui/status";
import { getUsersApi } from "@/lib/api/support";
import UserActions from "./user-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [activeTab, setActiveTab] = useState<
    "All Users" | "Player" | "Organizer"
  >("All Users");
  const [search, setSearch] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["users", search, activeTab.toUpperCase()],
    queryFn: () => {
      return getUsersApi({
        search,
        filter: activeTab === "All Users" ? "" : activeTab.toUpperCase(),
        token,
      });
    },
  });
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>User Management</CardTitle>
            <Button>Add user</Button>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <Button
              variant={activeTab === "All Users" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("All Users");
              }}
            >
              All Users
            </Button>
            <Button
              variant={activeTab === "Player" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("Player");
              }}
            >
              Players
            </Button>
            <Button
              variant={activeTab === "Organizer" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("Organizer");
              }}
            >
              Organizers
            </Button>
          </div>
          <div className="mt-2">
            <div className="border flex rounded-sm items-center px-2 shadow-sm">
              <SearchIcon className="size-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="border-0! shadow-none! ring-0! outline-0!"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.full_name}</TableCell>
                    <TableCell>{x.email}</TableCell>
                    <TableCell>{x.role}</TableCell>
                    <TableCell>
                      {new Date(x.created_at).toDateString()}
                    </TableCell>
                    <TableCell>
                      <Status
                        status={
                          x.status === "Active"
                            ? "online"
                            : x.status === "Suspended"
                            ? "offline"
                            : "maintenance"
                        }
                      >
                        <StatusIndicator />
                        <StatusLabel>{x.status}</StatusLabel>
                      </Status>
                    </TableCell>
                    <TableCell>
                      <UserActions x={x} />
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
