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
      plan: "Enterprise",
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
      title: "Variance Queue",
      url: "/payment",
      icon: PieChart,
    },
    {
      title: "Reconciled Report",
      url: "/reconciled-report",
      icon: PieChart,
    },
    {
      title: "Cash Posting Report",
      url: "/cash-posting",
      icon: Bot,
    },
    {
      title: "Cash Posting Queue",
      url: "/cash-posting-queue",
      icon: Bot,
    },
    {
      title: "Cash Management",
      url: "/cash-management",
      icon: BookOpen,
    },
    {
      title: "Team",
      url: "/team",
      icon: Settings2,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/data-library",
      icon: Frame,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: PieChart,
    },
    {
      name: "Word Assistant",
      url: "/word-assistant",
      icon: Map,
    },
  ],
};
