import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { getLeaderboardApi } from "@/lib/api/admin";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getLeaderboardApi(token as string);
  return (
    <main className="py-4 flex-1 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle className="">Leaderboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Players by Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Total Earning</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.top_player_by_earnings.map((x, i) => (
                    <TableRow key={x.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{x.full_name}</TableCell>
                      <TableCell>{x.total_earning}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Players by Events Joined</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Events Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.top_player_by_events_joined.map((x, i) => (
                    <TableRow key={x.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{x.full_name}</TableCell>
                      <TableCell>{x.total_event_joined}</TableCell>
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
