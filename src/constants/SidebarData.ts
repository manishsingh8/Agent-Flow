import {
  AudioWaveform,
  // BookOpen,
  Bot,
  Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  PieChart,
  // Settings2,
  House,
  BrainCircuit,
  WavesLadder,
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
      title: "RCM Operational Flows",
      url: "/",
      icon: WavesLadder,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: House,
      items: [
        {
          title: "RCM Dashboard",
          url: "/dashboard/rcm-dashboard",
        },
        {
          title: "HCD Dashboard",
          url: "/dashboard/hcd-dashboard",
        },
      ],
    },
    {
      title: "Reconciliation",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Variance Queue",
          url: "/variance-queue",
        },
        {
          title: "Reconciled Report",
          url: "/reconciled-report",
        },
      ],
    },
    {
      title: "Cash Posting",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Cash Posting Queue",
          url: "/cash-posting-queue",
        },
        {
          title: "Cash Posting Report",
          url: "/cash-posting",
        },
      ],
    },
    {
      title: "Document Parser",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "ERA Parser",
          url: "/era-parser",
        },
        {
          title: "EOB Parser",
          url: "/eob-parser",
        },
      ],
    },
  ],
};
