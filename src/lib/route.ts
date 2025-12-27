import { IconHammer, IconTargetArrow, IconUser, IconUsers } from "@tabler/icons-react";
import {
  BanknoteIcon,
  LayoutDashboardIcon,
  StarIcon,
  StoreIcon,
  Wallet2Icon,
  WalletCardsIcon,
  WalletIcon,
} from "lucide-react";

export const route = {
  user: {
    name: "Admin",
    email: "admin@admin.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Event",
      url: "/admin/event",
      icon: IconTargetArrow,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUser
    },
    {
      title: "Teams",
      url: "/admin/teams",
      icon: IconUsers,
    },
    {
      title: "Branch Management",
      url: "/admin/branch",
      icon: StoreIcon,
    },
    {
      title: "Cash Verification",
      url: "/admin/verification",
      icon: BanknoteIcon,
    },
    {
      title: "Transitions",
      url: "/admin/transitions",
      icon: WalletIcon,
    },
    {
      title: "Payments",
      url: "/admin/payment",
      icon: WalletCardsIcon,
    },
    {
      title: "Leaderboard",
      url: "/admin/leaderboard",
      icon: StarIcon,
    },
    {
      title: "Refund",
      url: "/admin/refund",
      icon: Wallet2Icon,
    },
    {
      title: "Disputes",
      url: "/admin/disputes",
      icon: IconHammer,
    },
  ],
};


export const finance_route = {
  user: {
    name: "Finance Admin",
    email: "admin@admin.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/finance-admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Transitions",
      url: "/finance-admin/transitions",
      icon: WalletIcon,
    },
    {
      title: "Payments",
      url: "/finance-admin/payment",
      icon: WalletCardsIcon,
    },

    {
      title: "Refund",
      url: "/finance-admin/refund",
      icon: Wallet2Icon,
    },

  ],
};


export const support_route = {
  user: {
    name: "Support Admin",
    email: "admin@admin.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/support-admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Event",
      url: "/support-admin/event",
      icon: IconTargetArrow,
    },
    {
      title: "Users",
      url: "/support-admin/users",
      icon: IconUser
    },
    {
      title: "Teams",
      url: "/support-admin/teams",
      icon: IconUsers,
    },
    {
      title: "Disputes",
      url: "/support-admin/disputes",
      icon: IconHammer,
    },
  ],
};