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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <EnhancedStudioHeader />

        <ProductionDashboard />

        <div className="space-y-8">
          <ProfessionalDashboard />

          <AdvancedWorkspace />

          <Tabs defaultValue="video" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <TabsTrigger value="video" className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">Video Creator</span>
                <span className="sm:hidden">Video</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <Pause className="h-4 w-4" />
                <span className="hidden sm:inline">Music Generator</span>
                <span className="sm:hidden">Music</span>
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Collaboration</span>
                <span className="sm:hidden">Collab</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Distribution</span>
                <span className="sm:hidden">Share</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="space-y-4">
              <EnhancedVideoCreator />
            </TabsContent>

            <TabsContent value="music" className="space-y-4">
              <EnhancedMusicGenerator />
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-4">
              <CollaborationWorkspace />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsWorkspace />
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4">
              <DistributionWorkspace />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}