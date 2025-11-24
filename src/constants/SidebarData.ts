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
      title: "Dashboard",
      url: "#",
      icon: House,
      items: [
        {
          title: "RCA Dashboard",
          url: "/dashboard/dashboard1",
        },
        {
          title: "CDA Dashboard",
          url: "/dashboard/dashboard2",
        },
      ],
    },
    {
      title: "LifeCycle",
      url: "/",
      icon: WavesLadder,
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
      title: "Remittance Processing",
      url: "/remittance-processing",
      icon: BrainCircuit,
    },
  ],
};
