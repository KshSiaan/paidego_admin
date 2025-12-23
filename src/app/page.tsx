import { getMeApi } from "@/lib/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return redirect("/login");
  }

  const me = await getMeApi(token);

  if (me?.data?.user?.role === "SUPPORT") {
    return redirect("/support-admin");
  } else if (me?.data?.user?.role === "FINANCE") {
    return redirect("/finance-admin");
  } else {
    return redirect("/admin");
  }
}
