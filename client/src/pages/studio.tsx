import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EnterpriseHeader from "@/components/enterprise-header";
import ProfessionalDashboard from "@/components/professional-dashboard";
import UniversalWorkspace from "@/components/universal-workspace";
import AnalyticsWorkspace from "@/components/analytics-workspace";
import CollaborationWorkspace from "@/components/collaboration-workspace";
import DistributionWorkspace from "@/components/distribution-workspace";
import BatchProcessor from "@/components/batch-processor";
import AILearningSystem from "@/components/ai-learning-system";
import SecurityMonitor from "@/components/security-monitor";
import PerformanceMonitor from "@/components/performance-monitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Settings, 
  Users, 
  BarChart3, 
  Share2,
  Zap,
  Crown,
  Shield,
  Globe
} from "lucide-react";

import EnhancedMusicGenerator from "@/components/enhanced-music-generator";
import EnhancedVideoCreator from "@/components/enhanced-video-creator";
import AdvancedAnimationStudio from "@/components/advanced-animation-studio";
import EnhancedStudioHeader from "@/components/enhanced-studio-header";
import ProductionDashboard from "@/components/production-dashboard";
import AdvancedWorkspace from "@/components/advanced-workspace";
import { Cpu, HardDrive, Activity } from "lucide-react";

export default function Studio() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isRecording, setIsRecording] = useState(false);

  // Real-time system stats
  const { data: systemStats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
    refetchInterval: 3000,
  });

  const { data: routerStatus } = useQuery({
    queryKey: ["/api/router-status"],
    queryFn: async () => {
      const response = await fetch("/api/router-status");
      if (!response.ok) throw new Error("Failed to fetch router status");
      return response.json();
    },
    refetchInterval: 5000,
  });

  const { data: performance } = useQuery({
    queryKey: ["/api/performance"],
    queryFn: async () => {
      const response = await fetch("/api/performance");
      if (!response.ok) throw new Error("Failed to fetch performance");
      return response.json();
    },
    refetchInterval: 2000,
  });

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        <EnhancedStudioHeader />

        <div className="container mx-auto px-6 py-8 space-y-12">
          <ProductionDashboard />

          <div className="space-y-12">
            <ProfessionalDashboard />

            <AdvancedWorkspace />

            {/* Modern Tab System */}
            <div className="ultra-modern-card">
              <Tabs defaultValue="video" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-slate-900/50 p-2 rounded-2xl backdrop-blur-xl border border-white/10">
                  <TabsTrigger 
                    value="video" 
                    className="flex items-center justify-center space-x-2 text-sm bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl py-3 transition-all duration-300"
                  >
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Video Creator</span>
                    <span className="sm:hidden font-medium">Video</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="music" 
                    className="flex items-center justify-center space-x-2 text-sm bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl py-3 transition-all duration-300"
                  >
                    <Pause className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Music Generator</span>
                    <span className="sm:hidden font-medium">Music</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="collaboration" 
                    className="flex items-center justify-center space-x-2 text-sm bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl py-3 transition-all duration-300"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Collaboration</span>
                    <span className="sm:hidden font-medium">Collab</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="flex items-center justify-center space-x-2 text-sm bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl py-3 transition-all duration-300"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Analytics</span>
                    <span className="sm:hidden font-medium">Analytics</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="distribution" 
                    className="flex items-center justify-center space-x-2 text-sm bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl py-3 transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Distribution</span>
                    <span className="sm:hidden font-medium">Share</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-6">
                  <EnhancedVideoCreator />
                </TabsContent>

                <TabsContent value="music" className="space-y-6">
                  <EnhancedMusicGenerator />
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <CollaborationWorkspace />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <AnalyticsWorkspace />
                </TabsContent>

                <TabsContent value="distribution" className="space-y-6">
                  <DistributionWorkspace />
                </TabsContent>
              </Tabs>
            </div>

            {/* Advanced Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UniversalWorkspace />
              <BatchProcessor />
            </div>

            {/* AI & Monitoring Systems */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AILearningSystem />
              <SecurityMonitor />
              <PerformanceMonitor />
            </div>

            {/* Copyright Footer */}
            <div className="ultra-modern-card production-ready">
              <div className="text-center p-6">
                <p className="text-sm font-medium text-primary">© 2025 Ervin Remus Radosavlevici</p>
                <p className="text-xs text-muted-foreground mt-1">ervin210@icloud.com | radosavlevici.ervin@gmail.com</p>
                <p className="text-xs text-muted-foreground">AI Creative Studio Pro+ | Production Ready | All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}