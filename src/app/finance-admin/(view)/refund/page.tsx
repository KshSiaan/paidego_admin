import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, EyeIcon, SearchIcon, Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { getPlatformEarnings, getRefundListApi } from "@/lib/api/finance";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getRefundListApi(token as string);
  const earningData = await getPlatformEarnings(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle className="">Pending Refunds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Total Refund Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.data.map((x) => (
                    <TableRow key={x.id}>
                      <TableCell>{x.event_name}</TableCell>
                      <TableCell>{x.event_type}</TableCell>
                      <TableCell>{x.participants}</TableCell>
                      <TableCell>{x.total_refund_amount}</TableCell>
                      <TableCell>
                        <Button variant={"ghost"} size={"icon"}>
                          <EyeIcon />
                        </Button>
                        <Button variant={"ghost"} size={"icon"}>
                          <CheckIcon />
                        </Button>
                        <Button variant={"ghost"} size={"icon"}>
                          <Trash2Icon />
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
                <TableBody>
                  {earningData?.data.data.map((x) => (
                    <TableRow key={x.id}>
                      <TableCell>{x.event_name}</TableCell>
                      <TableCell>{x.total_entries}</TableCell>
                      <TableCell>{x.commission}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
