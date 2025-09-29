"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<
    "All Users" | "Players" | "Organizers"
  >("All Users");
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
              variant={activeTab === "Players" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("Players");
              }}
            >
              Players
            </Button>
            <Button
              variant={activeTab === "Organizers" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("Organizers");
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
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
