import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "lucide-react";
import React from "react";
import { TransactionsApi } from "@/types/auth";
export default function History({
  x,
}: {
  x: TransactionsApi["transactions_histories"]["data"][number];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details: {x?.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Transaction Type:</span>
            <span>{x.type}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Amount:</span>
            <span>{x.amount}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Created at:</span>
            <span>{new Date(x.date).toLocaleDateString()}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">User:</span>
            <span>{x.user.full_name}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Events:</span>
            <span>{x?.event_name ?? "N/A"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
