import React, { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { KanbanBoard } from "./components/kanban/KanbanBoard";
import { CreateTaskModal } from "./components/modals/CreateTaskModal";
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 antialiased overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full max-w-full">
            <KanbanBoard />
          </div>
        </main>
      </div>
      <CreateTaskModal />
    </div>
  );
}
