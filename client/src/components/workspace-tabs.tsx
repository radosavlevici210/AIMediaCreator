import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Settings, 
  Users, 
  BarChart3, 
  Share2,
  Brain,
  Cog,
  Upload
} from "lucide-react";

interface WorkspaceTabsProps {
  activeWorkspace: string;
  onWorkspaceChange: (workspace: string) => void;
}

export default function WorkspaceTabs({ activeWorkspace, onWorkspaceChange }: WorkspaceTabsProps) {
  const workspaces = [
    { id: 'content', name: 'Content Creation', icon: Video },
    { id: 'advanced', name: 'Advanced Tools', icon: Settings },
    { id: 'collaboration', name: 'Collaboration', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'distribution', name: 'Distribution', icon: Share2 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
      {workspaces.map((workspace) => {
        const Icon = workspace.icon;
        return (
          <Button
            key={workspace.id}
            variant={activeWorkspace === workspace.id ? "default" : "ghost"}
            onClick={() => onWorkspaceChange(workspace.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              activeWorkspace === workspace.id
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{workspace.name}</span>
          </Button>
        );
      })}
    </div>
  );
}