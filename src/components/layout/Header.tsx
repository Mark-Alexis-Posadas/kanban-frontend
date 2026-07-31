import React from "react";
import { Search, Bell, Plus, PanelLeft } from "lucide-react";
import { useUIStore } from "../../stores/useUIStore";
import { mockUsers, mockProjects } from "../../data/mockData";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const openCreateTaskModal = useUIStore((state) => state.openCreateTaskModal);
  const activeProjectId = useUIStore((state) => state.activeProjectId);

  const currentProject = mockProjects.find((p) => p.id === activeProjectId);
  const currentUser = mockUsers[0]; // Mark Alexis

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left side: Sidebar Toggle & Project Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          title="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
            {currentProject?.key || "PROJ"}
          </span>
          <h1 className="text-sm font-semibold text-slate-800">
            {currentProject?.name || "Select Project"}
          </h1>
        </div>
      </div>

      {/* Right side: Global Actions & User Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, members..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Create Task Button */}
        <button
          onClick={openCreateTaskModal}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200" />

        {/* Current User Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-slate-800 leading-none">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              {currentUser.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
