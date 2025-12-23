"use client";

import { Button } from "@/components/ui/button";
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

import { UserType } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon, CheckIcon, EyeIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toggleBanUnbanApi } from "@/lib/api/admin";

export default function UserActions({ x }: { x: UserType }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["banUnban", x.id],
    mutationFn: () => toggleBanUnbanApi(String(x.id), token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      qcl.invalidateQueries({ queryKey: ["users"] });
      toast.success(res.message ?? "Success!");
    },
  });

  const isSuspended = x.status === "Suspended";

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <EyeIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">User name:</span>
              <span>{x.full_name}</span>
            </div>
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">User Type:</span>
              <span>{x.role}</span>
            </div>
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span>{x.email}</span>
            </div>
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span>{x.status}</span>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            {isSuspended ? <CheckIcon /> : <BanIcon />}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSuspended ? "Confirm Reinstated" : "Confirm Suspension"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isSuspended
                ? `Are you sure you want to reinstate ${x.full_name}?`
                : `Are you sure you want to suspend ${x.full_name}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
              {isSuspended ? "Reinstate" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
