import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { AppSidebar } from "@/layout/AppSidebar";
import { Separator } from "@/components/ui/Separator";
import { Outlet } from "react-router-dom";
import { Chatbot } from "@/pages/Chatbot/Chatbot";
import { MessageCircle } from "lucide-react";

export const MainLayout = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenChat = () => setIsChatbotOpen(true);
  const handleCloseChat = () => setIsChatbotOpen(false);

  // FINAL SIDEBAR STATE (Chatbot condition preserved)
  const sidebarState = isChatbotOpen ? false : isSidebarOpen;

  return (
    <SidebarProvider open={sidebarState} onOpenChange={setIsSidebarOpen}>
      <AppSidebar />

      {/* Chatbot */}
      {isChatbotOpen && <Chatbot onClose={handleCloseChat} />}

      {!isChatbotOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-[#249563] text-white w-14 h-14 
                     rounded-full flex items-center justify-center shadow-lg 
                     hover:opacity-90 transition z-[9999]"
          title="Open Chatbot"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* Toggler will work now */}
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <main className="flex flex-1 flex-col gap-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
