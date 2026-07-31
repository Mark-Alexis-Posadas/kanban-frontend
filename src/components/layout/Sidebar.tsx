import React from "react";
import {
  Kanban,
  FolderKanban,
  Users,
  Activity,
  Settings,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import { useUIStore } from "../../stores/useUIStore";
import { mockWorkspaces, mockProjects } from "../../data/mockData";
import { cn } from "../../utils/cn";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const activeWorkspaceId = useUIStore((state) => state.activeWorkspaceId);
  const activeProjectId = useUIStore((state) => state.activeProjectId);
  const setActiveProjectId = useUIStore((state) => state.setActiveProjectId);

  const activeWorkspace = mockWorkspaces.find(
    (w) => w.id === activeWorkspaceId,
  );
  const projects = mockProjects.filter(
    (p) => p.workspaceId === activeWorkspaceId,
  );

  return (
    <aside
      className={cn(
        "bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 border-r border-slate-800 h-screen sticky top-0 z-20",
        isOpen ? "w-64" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0",
      )}
    >
      {/* Workspace Header */}
      <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
            {activeWorkspace?.name.charAt(0) || "W"}
          </div>
          {isOpen && (
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">
                {activeWorkspace?.name}
              </p>
              <p className="text-[10px] text-slate-400">Free Tier</p>
            </div>
          )}
        </div>
        {isOpen && <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Projects List */}
        <div>
          {isOpen && (
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Projects
            </p>
          )}
          <nav className="space-y-1">
            {projects.map((project) => {
              const isActive = project.id === activeProjectId;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    isActive
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "hover:bg-slate-800 text-slate-400 hover:text-slate-200",
                  )}
                  title={project.name}
                >
                  <FolderKanban className="w-4 h-4 shrink-0" />
                  {isOpen && <span className="truncate">{project.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* General Views */}
        <div>
          {isOpen && (
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Menu
            </p>
          )}
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Kanban className="w-4 h-4 shrink-0" />
              {isOpen && <span>Board</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Activity className="w-4 h-4 shrink-0" />
              {isOpen && <span>Activity Log</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Users className="w-4 h-4 shrink-0" />
              {isOpen && <span>Members</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="p-3 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
          <Settings className="w-4 h-4 shrink-0" />
          {isOpen && <span>Workspace Settings</span>}
        </button>
      </div>
    </aside>
  );
};
