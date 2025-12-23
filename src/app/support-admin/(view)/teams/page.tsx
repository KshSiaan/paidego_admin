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
import { getTeamsApi } from "@/lib/api/support";

import { EyeIcon } from "lucide-react";
import { cookies } from "next/headers";
export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getTeamsApi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>Team Requests</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {!!data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>
                      {new Date(x.created_at).toDateString()}
                    </TableCell>
                    <TableCell>{x.members.length}</TableCell>
                    <TableCell>
                      <Button variant={"ghost"} size={"icon"}>
                        <EyeIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
