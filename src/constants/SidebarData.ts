import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  House,
} from "lucide-react";
import UnreconcileIcon from "@/assets/icons/money-send.svg?react";

export const SIDEBAR_DATA = {
  user: {
    name: "Manish",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Innoclique",
      logo: GalleryVerticalEnd,
      // plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "LifeCycle",
      url: "/",
      icon: House,
    },
    {
      title: "Unreconciled Payments",
      url: "#",
      icon: UnreconcileIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/payment",
        },
        {
          title: "Details",
          url: "/login",
        },
      ],
    },
    {
      title: "Cash Posting Page",
      url: "#",
      icon: Bot,
    },
    {
      title: "Cash Management",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Team",
      url: "#",
      icon: Settings2,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Frame,
    },
    {
      name: "Reports",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: Map,
    },
  ],
};
