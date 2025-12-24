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
import { AcceptTransApi } from "@/lib/api/admin";
import { TransactionsApi } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, EyeIcon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Withdraw({
  x,
}: {
  x: TransactionsApi["withdraw_histories"]["data"][number];
}) {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const { mutate } = useMutation({
    mutationKey: ["accept_withdraw"],
    mutationFn: () => {
      return AcceptTransApi(String(x.id), token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["transition"] });
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
            <DialogTitle>Withdrawal Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">User Name:</span>
              <span>{x?.user?.full_name}</span>
            </div>
            {/* <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span>{x?.user?.email}</span>
            </div> */}
            <div className="flex font-semibold justify-between items-center text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span>{x?.status}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <CheckCircle2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
            <AlertDialogDescription>
              Approve withdrawal of ${x?.amount} for {x?.user?.full_name}
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
