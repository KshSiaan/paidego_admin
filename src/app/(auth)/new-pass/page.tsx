"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { changePasswordApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "@/lib/api/auth";
// import { idk } from "@/lib/utils";

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z
      .string()
      .min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export default function Page() {
  const router = useRouter();
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (dataset: {
      password: string;
      password_confirmation: string;
    }) =>
      changePasswordApi({
        ...dataset,
        token,
      }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to reset password");
    },
    onSuccess: (res) => {
      toast.success(
        res.message ?? "Password successfully changed! Please Login again"
      );
      removeCookie("token");
      router.push("/login");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("Submitted new password:", values);
    mutate(values);
  }

  return (
    <Card className="w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>New</span>{" "}
          <span className="relative text-[#D6DF22]">
            Password
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#D6DF20] to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          Secure access to your administration dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex-col gap-4 px-0">
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? "Working on it.." : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
