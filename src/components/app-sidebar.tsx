"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { route } from "@/lib/route";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const data = route;
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const navig = useRouter();
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto!"
            >
              <Link href="/" className="">
                <Image
                  src={`/icon.png`}
                  height={50}
                  width={300}
                  alt="icon"
                  className="w-full aspect-[4/1] object-contain rounded-lg"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* <Separator className="w-[90%]! mx-auto" /> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant={"ghost"}
          onClick={() => {
            removeCookie("token");
            navig.push("/login");
            navig.refresh();
          }}
        >
          Log out <LogOutIcon />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
