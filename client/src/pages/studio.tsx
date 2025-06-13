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
import { MusicGenerator } from "@/components/music-generator";
import { VideoCreator } from "@/components/video-creator";
import { AILearningSystem } from "@/components/ai-learning-system";
import { CollaborationWorkspace } from "@/components/collaboration-workspace";
import { AnalyticsWorkspace } from "@/components/analytics-workspace";
import { DistributionWorkspace } from "@/components/distribution-workspace";
import { EnterpriseAIStudio } from "@/components/enterprise-ai-studio";

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
    <div className="min-h-screen ultra-modern-bg">
      <div className="relative z-10">
        <EnhancedStudioHeader />

        <div className="container mx-auto px-6 py-8 space-y-12">
          <ProductionDashboard />

          <div className="space-y-12">
            <ProfessionalDashboard />

            <AdvancedWorkspace />

            {/* Ultra-Modern Tab System */}
            <div className="ultra-modern-card p-2">
              <Tabs defaultValue="video" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="video" 
                    className="glass-morphism flex items-center justify-center space-x-2 text-sm hover:bg-purple-500/20 data-[state=active]:bg-purple-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-4 transition-all duration-300"
                  >
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Video Creator</span>
                    <span className="sm:hidden font-semibold">Video</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="music" 
                    className="glass-morphism flex items-center justify-center space-x-2 text-sm hover:bg-blue-500/20 data-[state=active]:bg-blue-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-4 transition-all duration-300"
                  >
                    <Pause className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Music Generator</span>
                    <span className="sm:hidden font-semibold">Music</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="collaboration" 
                    className="glass-morphism flex items-center justify-center space-x-2 text-sm hover:bg-green-500/20 data-[state=active]:bg-green-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-4 transition-all duration-300"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Collaboration</span>
                    <span className="sm:hidden font-medium">Collab</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="glass-morphism flex items-center justify-center space-x-2 text-sm hover:bg-orange-500/20 data-[state=active]:bg-orange-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-4 transition-all duration-300"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Analytics</span>
                    <span className="sm:hidden font-semibold">Analytics</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="distribution" 
                    className="glass-morphism flex items-center justify-center space-x-2 text-sm hover:bg-indigo-500/20 data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-4 transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Distribution</span>
                    <span className="sm:hidden font-semibold">Share</span>
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