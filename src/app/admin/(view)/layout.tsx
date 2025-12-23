import { AppSidebar } from "@/components/app-sidebar";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMeApi } from "@/lib/api/auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Paidego - Master Admin",
  description: "Paidego Master Control panel",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return notFound();
  }
  const me = await getMeApi(token);

  if (me?.data?.user?.role === "SUPPORT") {
    return redirect("/support-admin");
  } else if (me?.data?.user?.role === "FINANCE") {
    return redirect("/finance-admin");
  }

  return (
    // <SucurityProvider>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 26)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="floating" />
      <SidebarInset className="pr-6">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    // </SucurityProvider>
  );
}
