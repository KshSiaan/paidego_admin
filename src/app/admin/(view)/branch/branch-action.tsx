"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { BranchType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, MapPinnedIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { type AddBranchFormValues, addBranchSchema } from "./add-branch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { branchDeleteApi, editBranchApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BranchActions({ x }: { x: BranchType }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const form = useForm<AddBranchFormValues>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      name: x.name,
      location: x.location,
      country: x.country,
      working_hour: x.working_hour,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_branch"],
    mutationFn: (body: any) => {
      return editBranchApi(token, String(x.id), body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });
  const { mutate: deleter, isPending: deleting } = useMutation({
    mutationKey: ["del_branch"],
    mutationFn: () => {
      return branchDeleteApi(String(x.id), token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });

  const onSubmit = (values: AddBranchFormValues) => {
    const branchFinalizer = {
      ...values,
      latitude: "10.123",
      longitude: "10.123",
      _method: "PATCH",
    };
    mutate(branchFinalizer);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <EditIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit this Branch</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 mt-6 gap-4"
          >
            <div className="space-y-2 col-span-1">
              <Label>Country</Label>
              <Input {...form.register("country")} />
            </div>

            <div className="space-y-2 col-span-1">
              <Label>Branch Name</Label>
              <Input {...form.register("name")} />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Address</Label>
              <InputGroup>
                <InputGroupInput {...form.register("location")} />
                <InputGroupAddon>
                  <MapPinnedIcon className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Working Hour</Label>
              <Input {...form.register("working_hour")} />
            </div>

            <DialogFooter className="col-span-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending ? "Saving.." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <XCircleIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the branch: {x.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              disabled={deleting}
              onClick={() => {
                deleter();
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
