"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, EyeIcon, Loader2Icon, SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAPi } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import History from "./history";
import Withdraw from "./withdraw";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [filter, setFilter] = useState("7");

  const { data, isPending } = useQuery({
    queryKey: ["transition", filter],
    queryFn: () => {
      return getTransactionAPi(filter, token);
    },
  });
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle className="">Financials</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Last days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Past 7 days</SelectItem>
                <SelectItem value="15">Past 15 days</SelectItem>
                <SelectItem value="30">Past 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          <CardContent className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.withdraw_histories.data.map((x) => (
                      <TableRow key={x.id}>
                        <TableCell>{x.user?.full_name}</TableCell>
                        <TableCell>{x.amount}</TableCell>
                        <TableCell>{new Date(x.date).toDateString()}</TableCell>
                        <TableCell>{x.status}</TableCell>
                        <TableCell>
                          <Withdraw x={x} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.transactions_histories.data.map((x) => (
                      <TableRow key={x.id}>
                        <TableCell>#{x.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              x.type === "Withdraw"
                                ? "default"
                                : x.type === "Refund"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {x.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{x.amount}</TableCell>
                        <TableCell>{new Date(x.date).toDateString()}</TableCell>
                        <TableCell>
                          <Suspense
                            fallback={<Loader2Icon className="animate-spin" />}
                          >
                            <History x={x} />
                          </Suspense>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
