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
import { getTeamsApi } from "@/lib/api/admin";
import { EyeIcon } from "lucide-react";
import { cookies } from "next/headers";
import TeamAction from "./team-action";
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
        <CardContent>
          {!!data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Team Owner</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.player.full_name}</TableCell>
                    <TableCell>
                      {new Date(x.created_at).toDateString()}
                    </TableCell>
                    <TableCell>{x.members.length}</TableCell>
                    <TableCell>
                      <TeamAction x={x} />
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
