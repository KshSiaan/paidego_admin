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
  deleteCashApi,
  singleJoinApi,
  teamJoinApi,
  verifCashApi,
} from "@/lib/api/admin";
import { CashVerificationType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function VerifAction({ x }: { x: CashVerificationType }) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["verif"],
    mutationFn: () => {
      return verifCashApi(String(x.id), token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: single, isPending: singleing } = useMutation({
    mutationKey: ["single_join", x.id],
    mutationFn: (player: string) => {
      return singleJoinApi(String(x.id), player, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: team, isPending: teaming } = useMutation({
    mutationKey: ["team_join", x.id],
    mutationFn: (teamID: string) => {
      return teamJoinApi(String(x.id), teamID, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: del, isPending: deleting } = useMutation({
    mutationKey: ["team_join", x.id],
    mutationFn: () => {
      return deleteCashApi(String(x.id), token);
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"}>
            <CheckCircle2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cash Payment</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Mark payment of ${x.amount}from {x.player?.full_name} for "
            {x.branch.name}" as received?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending || singleing || teaming}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                mutate();
                if (x.event.sport_type === "single") {
                  single(String(x.player_id));
                } else {
                  team(String(x.team_id));
                }
              }}
              disabled={isPending || singleing || teaming}
            >
              {isPending
                ? "Verifying payment…"
                : singleing
                ? "Processing single entry…"
                : teaming
                ? "Processing team entry…"
                : "Mark as paid"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"}>
            <XCircleIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Cash Payment</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Reject payment of ${x.amount}from {x.player?.full_name} for "
            {x.branch.name}" as received?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                del();
              }}
              disabled={deleting}
            >
              {deleting ? "Rejecting.." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
