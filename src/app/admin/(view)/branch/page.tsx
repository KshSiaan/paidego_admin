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
import { getBranchesApi, getTeamsApi } from "@/lib/api/admin";
import { EditIcon, XCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AddBranch from "./add-branch";
import BranchActions from "./branch-action";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getBranchesApi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>Branch Management</CardTitle>
            <div className="">
              <Suspense>
                <AddBranch />
              </Suspense>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.country}</TableCell>
                  <TableCell>{x.working_hour}</TableCell>
                  <TableCell>
                    <BranchActions x={x} />
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
