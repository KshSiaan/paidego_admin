"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { type Icon } from "@tabler/icons-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight, SlidersHorizontalIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

export function NavMain({
  items,
  role,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | Icon;
  }[];
  role: "admin" | "support" | "finance";
}) {
  const pathname = usePathname();

  const settingsChilds = [
    { title: "Personal Profile", to: "/profile" },
    { title: "Help & Support", to: "/help" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  size="lg"
                  asChild
                  className={clsx(
                    "px-6!",
                    isActive && "bg-foreground text-background font-medium " // <- your active styles
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="p-6!" tooltip={"Settings"}>
                  <SlidersHorizontalIcon />
                  <span>Settings</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {settingsChilds.map((x) => {
                    const isActive = pathname === x.to;
                    return role !== "admin" && x.title === "Help & Support" ? (
                      <React.Fragment key={x.title}></React.Fragment>
                    ) : (
                      <SidebarMenuSubItem key={x.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={clsx(
                            "p-6",
                            isActive &&
                              "bg-foreground text-background font-medium"
                          )}
                        >
                          <Link
                            href={`/${
                              role === "admin"
                                ? "admin"
                                : role === "support"
                                ? "support-admin"
                                : "finance-admin"
                            }${x.to}`}
                          >
                            <span>{x.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
