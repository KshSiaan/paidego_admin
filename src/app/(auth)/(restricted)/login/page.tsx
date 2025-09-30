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
import Link from "next/link";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// import { toast } from "sonner";

// import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export default function Page() {
  const navig = useRouter();
  // const [, setCookie] = useCookies(["token"]);
  // const { mutate } = useMutation({
  //   mutationKey: ["login"],
  //   mutationFn: (dataset: { email: string; password: string }) => {
  //     return loginApi({ body: dataset });
  //   },
  //   onError: (err) => {
  //     toast.error(err.message ?? "Failed to complete this request");
  //   },
  //   onSuccess: (res: idk) => {
  //     toast.success(res.message ?? "Successfully Logged in!");
  //     if (!res.data.token) {
  //       toast.error("Failed to create Session!", {
  //         description: "Please try again",
  //       });
  //     }
  //     try {
  //       setCookie("token", res.data.token);
  //       navig.push("/");
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Something went wrong");
  //     }
  //   },
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted data:", values);
    navig.push("/admin");
    // mutate(values);
  }

  return (
    <Card className="w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3 w-full justify-center">
          Admin Dashboard
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Secure access to your administration dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
            </Select>
            <CardFooter className="flex-col gap-4 px-0">
              <Button className="w-full" type="submit">
                Log In
              </Button>
              <Button className="w-fit mx-auto" variant="link" asChild>
                <Link href={"/reset"}>Forget your password?</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
