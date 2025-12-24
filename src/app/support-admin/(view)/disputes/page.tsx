import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { getDisputesApi } from "@/lib/api/support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DisputeAction from "./dispute-action";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getDisputesApi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle className="">Disputes & Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Against</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>{x.id}</TableCell>
                  <TableCell>{x.reported_by}</TableCell>
                  <TableCell>{x.against}</TableCell>
                  <TableCell>{x.reason}</TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>{x.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DisputeAction x={x} />
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
