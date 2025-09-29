"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyholeIcon, SearchIcon } from "lucide-react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader className="w-full grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col justify-center items-center gap-2">
              <LockKeyholeIcon className="size-10" />
              <h4 className="font-semibold">$1740.00</h4>
              <p className="text-sm text-muted-foreground">
                Total Escrow Balance
              </p>
            </CardContent>
          </Card>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payouts to Winners</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Platform Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Total Entries</TableHead>
                    <TableHead>Commission (10%)</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
