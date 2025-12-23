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
import { supportDashboardApi } from "@/lib/api/support";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return null;
  }
  const data = await supportDashboardApi(token);

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 pb-6">
      <div className="grid grid-cols-4 gap-6 mt-2">
        {Array(4)
          .fill("")
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple
            <Card className="" key={i}>
              <CardContent className="w-full flex flex-col justify-center items-center gap-2">
                <PlusSquareIcon className=" bg-foreground text-background rounded-sm" />
                <h3 className="font-semibold text-sm">
                  {i === 0
                    ? "Users"
                    : i === 1
                    ? "Events"
                    : i === 2
                    ? "Branches"
                    : "Earning"}
                </h3>
                <p className="text-lg font-bold">
                  {i === 0
                    ? data.data.users ?? "N/A"
                    : i === 1
                    ? data?.data.events ?? "N/A"
                    : i === 2
                    ? data?.data?.branch ?? "N/A"
                    : data?.data?.earning ?? "N/A"}
                </p>
                <p>
                  Available{" "}
                  {i === 0
                    ? "Users"
                    : i === 1
                    ? "Events"
                    : i === 2
                    ? "Branches"
                    : "Earning"}
                </p>
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
              {data?.data.recent_activities.map((x) => (
                <TableRow key={x.id}>
                  <TableCell className="text-center">{x.date}</TableCell>
                  <TableCell className="text-center">{x.user}</TableCell>
                  <TableCell className="text-center">{x.action}</TableCell>
                  <TableCell className="text-center">{x.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
