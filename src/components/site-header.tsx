"use client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { route } from "@/lib/route";
import { useCookies } from "react-cookie";
import { Button } from "./ui/button";
import { BellIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
// import { useQuery } from "@tanstack/react-query";
// import { getProfileApi } from "@/lib/api/auth";
// import { idk } from "@/lib/utils";

export function SiteHeader() {
  const path = usePathname();
  // const [{ token }] = useCookies(["token"]);
  // const { data } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: (): idk => {
  //     return getProfileApi(token);
  //   },
  // });
  return (
    <header className="flex flex-col justify-start h-(--header-height) shrink-0 items-center gap-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="w-full space-y-1 mt-6 border rounded-lg p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <div className="flex items-center gap-4">
          <div className="border flex items-center px-4 rounded-sm shadow">
            <SearchIcon className="size-4" />
            <Input
              placeholder="Search"
              className="border-0! outline-0! shadow-none! ring-0!"
            />
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <BellIcon />
          </Button>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div className="">
              <h4 className="text-sm font-semibold">Admin</h4>
              <p className="text-xs">admin@admin.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
