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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAPi } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";

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
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.withdraw_histories.data.map((x) => (
                      <TableRow key={x.id}>
                        <TableCell>{x.user_id}</TableCell>
                        <TableCell>{x.amount}</TableCell>
                        <TableCell>{new Date(x.date).toDateString()}</TableCell>
                        <TableCell>
                          <Button variant={"ghost"} size={"icon"}>
                            <EyeIcon />
                          </Button>
                          <Button variant={"ghost"} size={"icon"}>
                            <CheckCircle2 />
                          </Button>
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
                        <TableCell>{x.type}</TableCell>
                        <TableCell>{x.amount}</TableCell>
                        <TableCell>{new Date(x.date).toDateString()}</TableCell>
                        <TableCell>
                          <Button variant={"ghost"} size={"icon"}>
                            <EyeIcon />
                          </Button>
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
