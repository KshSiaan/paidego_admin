"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SolveReport } from "@/lib/api/support";
import { AdminDisputeType } from "@/types/admin";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function DisputeAction({ x }: { x: AdminDisputeType }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["solve_dis"],
    mutationFn: () => {
      return SolveReport(String(x.id), token);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dispute Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {[
            { title: "Case ID:", content: x.id },
            { title: "Reported By:", content: x.reported_by },
            { title: "Against:", content: x.against },
            {
              title: "Reason:",
              content: x.reason,
            },
            {
              title: "Status:",
              content: x?.status,
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
        <DialogFooter className="mt-6">
          <Button
            onClick={() => {
              mutate();
            }}
          >
            Solve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
