import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamType } from "@/types/auth";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function TeamAction({ x }: { x: TeamType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Team name:</span>
            <span>{x.name}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Created at:</span>
            <span>{new Date(x.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex font-semibold justify-between items-center text-sm">
            <span className="text-muted-foreground">Total Members:</span>
            <span>{x.members.length}</span>
          </div>
          <h4 className="w-full bg-secondary p-2">Members:</h4>
          <div className="text-sm space-y-4 p-2 pt-0">
            {x.members.map((t) => (
              <p key={t.id}>{t.player.full_name}</p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
