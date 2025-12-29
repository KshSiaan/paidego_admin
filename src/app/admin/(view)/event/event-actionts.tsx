import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  acceptWinnerApi,
  adminPrizeDistApi,
  getEventWinners,
} from "@/lib/api/admin";
import { AdminEventsApiType } from "@/types/admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckIcon,
  EyeIcon,
  Loader2Icon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function EventActions({ x }: { x: AdminEventsApiType }) {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["event_winners", x.id],
    queryFn: () => {
      return getEventWinners(x.id, token);
    },
    enabled: !!x.id,
  });
  const { mutate: accept, isPending: accepting } = useMutation({
    mutationKey: ["accept_win", x.id],
    mutationFn: (id: string) => {
      return acceptWinnerApi(id, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: decline, isPending: declining } = useMutation({
    mutationKey: ["decline_win", x.id],
    mutationFn: (id: string) => {
      return acceptWinnerApi(id, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate, isPending: confirming } = useMutation({
    mutationKey: ["confirm_dist", x.id],
    mutationFn: (id: string) => {
      return adminPrizeDistApi(id, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });

  return (
    <>
      {x.status === "Awaiting Confirmation" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <WalletIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[96dvw] lg:min-w-[60dvw]">
            <DialogHeader>
              <DialogTitle>Verify Winners: {x.sport_name}</DialogTitle>
            </DialogHeader>
            <div className="">
              <DialogDescription>
                The organizer has submitted the following winner(s). Please
                verify before releasing funds.
              </DialogDescription>
              {isPending ? (
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              ) : (
                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Place</TableHead>
                        <TableHead>Additional prize</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-sm font-semibold">
                      {data?.data.map((y) => (
                        <TableRow key={y.id}>
                          <TableCell>{y.place} Winner:</TableCell>
                          <TableCell>{y.additional_prize ?? "N/A"}</TableCell>
                          <TableCell>${y.amount}</TableCell>
                          <TableCell>
                            <Button
                              variant={"ghost"}
                              disabled={accepting || declining || confirming}
                              size={"icon"}
                              className="text-green-700"
                              onClick={() => {
                                accept(String(y.id));
                              }}
                            >
                              <CheckIcon />
                            </Button>
                            <Button
                              variant={"ghost"}
                              disabled={accepting || declining || confirming}
                              size={"icon"}
                              onClick={() => {
                                decline(String(y.id));
                              }}
                              className="text-destructive"
                            >
                              <XIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={accepting || declining || confirming}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={accepting || declining || confirming}
                onClick={() => {
                  mutate(String(x.id));
                }}
              >
                {confirming ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Confirm & Create Payout"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <EyeIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {[
              { title: "Event title:", content: x.title },
              { title: "Sport name:", content: x.sport_name },
              { title: "Organizer:", content: x.organizer.user_name },
              {
                title: "Start date:",
                content: new Date(x.starting_date).toLocaleDateString(),
              },
              {
                title: "End date:",
                content: new Date(x.ending_date).toLocaleDateString(),
              },
              {
                title: "Entry feee:",
                content: x.entry_fee,
              },
              {
                title: "Prize pool:",
                content: x.prize_amount,
              },
              {
                title: "Status:",
                content: x.status,
              },
            ].map((y) => (
              <div
                className="flex justify-between items-center text-sm font-semibold"
                key={y.title}
              >
                <span>{y.title}</span>
                <span>{y.content}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
