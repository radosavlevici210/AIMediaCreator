import { useQuery } from "@tanstack/react-query";
import MusicGenerator from "@/components/music-generator";
import VideoCreator from "@/components/video-creator";
import AIEnhancement from "@/components/ai-enhancement";
import MediaPreview from "@/components/media-preview";
import ProductionDashboard from "@/components/production-dashboard";
import SecurityMonitor from "@/components/security-monitor";
import PerformanceMonitor from "@/components/performance-monitor";
import RealTimeUpdates from "@/components/real-time-updates";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Settings, User, LogOut } from "lucide-react";
import type { Project } from "@shared/schema";

// © 2025 Ervin Radosavlevici - Professional AI Studio Platform
export default function Studio() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: stats } = useQuery<{
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  }>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[hsl(150,100%,50%)] via-[hsl(210,100%,60%)] to-[hsl(320,100%,50%)] p-4 text-center text-black font-bold text-lg relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
            <User className="h-4 w-4" />
          </Button>
        </div>
        AI MEDIA PRODUCTION STUDIO | © {new Date().getFullYear()} ERVIN RADOSAVLEVICI - ALL RIGHTS RESERVED | {new Date().toLocaleString()}
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 glass-morphism rounded-3xl p-12 border border-white/10">
          <h1 className="text-6xl font-bold neon-gradient mb-6">
            <i className="fas fa-play-circle mr-4"></i>AI STUDIO PRO
          </h1>
          <p className="text-xl text-gray-300 mb-8">Advanced AI-Powered Music & Video Production Platform</p>
          
          {/* Status Indicators */}
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="flex items-center bg-[hsl(150,100%,50%)]/10 border border-[hsl(150,100%,50%)]/30 rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-[hsl(150,100%,50%)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium">Audio Engine: Active</span>
            </div>
            <div className="flex items-center bg-[hsl(210,100%,60%)]/10 border border-[hsl(210,100%,60%)]/30 rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-[hsl(210,100%,60%)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium">Video Generator: Ready</span>
            </div>
            <div className="flex items-center bg-[hsl(320,100%,50%)]/10 border border-[hsl(320,100%,50%)]/30 rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-[hsl(320,100%,50%)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium">AI Processing: Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Production Workspace */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          <MusicGenerator />
          <VideoCreator />
          <AIEnhancement />
        </div>

        <PerformanceMonitor />
        <RealTimeUpdates />
        <SecurityMonitor />
        <MediaPreview projects={projects} />
        <ProductionDashboard stats={stats} />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 pt-8 pb-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=200" 
              alt="Collaborative creative team working on media production" 
              className="w-full h-32 object-cover rounded-xl shadow-lg opacity-60" 
            />
          </div>
          <p className="text-gray-400 text-sm">© 2024 AI Media Production Studio - Professional Creative Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-[hsl(150,100%,50%)] transition-all">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[hsl(210,100%,60%)] transition-all">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[hsl(320,100%,50%)] transition-all">
              <i className="fab fa-discord text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
