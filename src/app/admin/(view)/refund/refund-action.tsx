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
import { ConfirmRefund, DenyRefund } from "@/lib/api/admin";
import { RefundType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function RefundActions({
  x,
}: {
  x: RefundType["data"][number];
}) {
  const [{ token }] = useCookies(["token"]);
  const { mutate: confirmRefund } = useMutation({
    mutationKey: ["refunc_confirm"],
    mutationFn: () => {
      return ConfirmRefund(String(x.id), token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: denyRefund } = useMutation({
    mutationKey: ["refund_deny"],
    mutationFn: () => {
      return DenyRefund(String(x.id), token);
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <EyeIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refund Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {[
              { title: "Reason for Cancellation:", content: "N/A" },
              { title: "Required Participant:", content: 10 },
              { title: "Actual Participants:", content: x?.participants },
              {
                title: "Participants short:",
                content: x.participants ? 10 - x?.participants : 10,
              },
              {
                title: "Total Refund Amount:",
                content: x?.total_refund_amount,
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
            {/* <div className="font-semibold">Members List:</div> */}
          </div>
        </DialogContent>
      </Dialog>
      {x.status !== "Completed" && (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <CheckIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
                <AlertDialogDescription>
                  Process a total refund of ${x?.total_refund_amount} for{" "}
                  {x?.participants}
                  participants of "{x.event_name}"?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    confirmRefund();
                  }}
                >
                  Process Refund
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Denial</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to deny the refund for "{x.event_name}"?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    denyRefund();
                  }}
                >
                  Deny Refund
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
