import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeDollarSign,
  CheckCircle2Icon,
  EyeIcon,
  LockKeyholeIcon,
  SearchIcon,
} from "lucide-react";
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
import WinnersAction from "./winners-action";
import { getPaymentApi } from "@/lib/api/finance";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getPaymentApi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader className="w-full grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col justify-center items-center gap-2">
              <BadgeDollarSign className="size-10" />
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
                <TableBody>
                  {data?.data?.payment_players.data.map((x) => (
                    <TableRow key={x.id}>
                      <TableCell>{x?.event_name}</TableCell>
                      <TableCell className="">
                        {x?.winners
                          ?.slice(0, 3)
                          ?.map((w) => w.player.full_name)
                          ?.join(", ")}
                      </TableCell>
                      <TableCell>{x?.amount}</TableCell>
                      <TableCell>{new Date(x?.date).toDateString()}</TableCell>
                      <TableCell>
                        <WinnersAction x={x} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Payouts to Organizer</CardTitle>
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
                <TableBody>
                  {data?.data?.payment_organizer.data.map((x) => (
                    <TableRow key={x.id}>
                      <TableCell>{x?.event_name}</TableCell>
                      <TableCell className="">
                        {x?.winners
                          ?.slice(0, 3)
                          ?.map((w: any) => w.player.full_name)
                          ?.join(", ")}
                      </TableCell>
                      <TableCell>{x?.amount}</TableCell>
                      <TableCell>{new Date(x?.date).toDateString()}</TableCell>
                      <TableCell>
                        <WinnersAction x={x} />
                      </TableCell>
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
