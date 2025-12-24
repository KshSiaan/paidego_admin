"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AcceptPaymentApi } from "@/lib/api/finance";

import { PaymentType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2Icon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function WinnersAction({
  x,
}: {
  x: PaymentType["payment_players"]["data"][number];
}) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["accept_pay"],
    mutationFn: () => {
      return AcceptPaymentApi(String(x.id), token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <EyeIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payout Details: {x?.event_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {x.event_type === "single" ? (
              <>
                <div className="flex font-semibold justify-between items-center text-sm">
                  <span className="text-muted-foreground">Event Status:</span>
                  <span>{x.status}</span>
                </div>
                <div className="flex font-semibold justify-between items-center text-sm">
                  <span className="text-muted-foreground">Winner:</span>
                  <span>{x?.winners?.[0]?.player?.full_name ?? "N/A"}</span>
                </div>
                <div className="flex font-semibold justify-between items-center text-sm">
                  <span className="text-muted-foreground">Prize Amount:</span>
                  <span>${x.amount ?? "N/A"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex font-semibold justify-between items-center text-sm">
                  <span className="text-muted-foreground">Event Status:</span>
                  <span>{x.status}</span>
                </div>
                {x?.winners?.map((y) => (
                  <div
                    className="flex font-semibold justify-between items-center text-sm"
                    key={y.id}
                  >
                    <span className="text-muted-foreground">
                      {y?.place} Winner:
                    </span>
                    <span>
                      {y?.player.full_name ?? "N/A"} | {y?.additional_prize}
                    </span>
                  </div>
                ))}
                <div className="flex font-semibold justify-between items-center text-sm">
                  <span className="text-muted-foreground">Prize Amount:</span>
                  <span>${x.amount ?? "N/A"}</span>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <CheckCircle2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payout</AlertDialogTitle>
            <AlertDialogDescription>
              Release a payout of{" "}
              <span className="font-semibold text-foreground">${x.amount}</span>{" "}
              to{" "}
              <span className="text-foreground font-semibold">
                {x?.winners
                  ?.slice(0, 3)
                  ?.map((w: any) => w.player.full_name)
                  ?.join(", ")}
              </span>{" "}
              for the event "Dhaka Football League"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutate();
              }}
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
