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
import { MapPinnedIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { addBranchApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LocationPicker from "@/components/core/location-picker";
import { idk } from "@/lib/utils";

export const addBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  country: z.string().min(1, "Country is required"),
  working_hour: z.string().min(1, "Working hour is required"),
});

export type AddBranchFormValues = z.infer<typeof addBranchSchema>;
export default function AddBranch() {
  const navig = useRouter();
  const [locationData, setLocationData] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [{ token }] = useCookies(["token"]);
  const form = useForm<AddBranchFormValues>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      name: "",
      country: "",
      working_hour: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_branch"],
    mutationFn: (body: any) => {
      return addBranchApi(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      form.reset();
      navig.refresh();
    },
  });

  const onSubmit = (values: AddBranchFormValues) => {
    if (!locationData) {
      return toast.error("Please select a location for the branch.");
    }
    const branchFinalizer = {
      ...values,
      location: locationData?.address,
      latitude: String(locationData?.lat),
      longitude: String(locationData?.lng),
    };
    mutate(branchFinalizer);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add branch</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
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
            <LocationPicker onLocationSelect={setLocationData} />
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
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
