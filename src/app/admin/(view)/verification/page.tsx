import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCashRequestAPi } from "@/lib/api/admin";
import { CheckCircle2, XCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import VerifAction from "./verif-action";
import { Suspense } from "react";
export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getCashRequestAPi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>Pending Cash Payments</CardTitle>
            <div className=""></div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>
                    {x.player?.full_name ?? x.team?.player?.full_name}
                  </TableCell>
                  <TableCell>{x.event.title}</TableCell>
                  <TableCell>{x.amount}</TableCell>
                  <TableCell>
                    <Suspense>
                      <VerifAction x={x} />
                    </Suspense>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
