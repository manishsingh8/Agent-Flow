import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { AppSidebar } from "@/layout/AppSidebar";
import { Separator } from "@/components/ui/Separator";
import { Outlet } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot/Chatbot";

export const MainLayout = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);

  return (
    <SidebarProvider open={!isChatbotOpen}>
      <AppSidebar />
      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" disabled={isChatbotOpen} />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <main className="flex flex-1 flex-col gap-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
