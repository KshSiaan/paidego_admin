import { PlusSquareIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  // const token = (await cookies()).get("token")?.value;
  // if (!token) {
  //   return null;
  // }
  return (
    <div className="@container/main flex flex-1 flex-col gap-6 pb-6">
      <div className="grid grid-cols-4 gap-6 mt-2">
        {Array(4)
          .fill("")
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple
            <Card className="" key={i}>
              <CardContent className="w-full flex flex-col justify-center items-center">
                <PlusSquareIcon className=" bg-foreground text-background rounded-sm" />
                <h3 className="font-semibold text-sm">Users</h3>
                <p className="text-lg font-bold">48</p>
                <p>Available Users</p>
              </CardContent>
            </Card>
          ))}
      </div>
      <Card className="w-full flex-1">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">User</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {Array(6)
                .fill("")
                .map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: dummy
                  <TableRow key={i}>
                    <TableCell className="text-center">29/08/2025</TableCell>
                    <TableCell className="text-center">Player</TableCell>
                    <TableCell className="text-center">Join Event</TableCell>
                    <TableCell className="text-center">
                      Join ‘Gulshan Padel’ by paying $10
                    </TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
