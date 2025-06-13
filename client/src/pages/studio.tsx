import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  Music, 
  Video, 
  Mic, 
  Camera, 
  Settings, 
  BarChart3,
  Shield,
  Zap,
  Sparkles,
  FileText,
  Crown,
  Rocket,
  Star,
  Wifi, 
  WifiOff
} from "lucide-react";
import { useRouterConnection } from "@/hooks/use-router-connection";

import EnhancedStudioHeader from "@/components/enhanced-studio-header";
import EnhancedCreationSuite from "@/components/enhanced-creation-suite";
import BatchProcessor from "@/components/batch-processor";
import LyricsIntegrationSystem from "@/components/lyrics-integration-system";
import ProductionFeatures from "@/components/production-features";
import VideoCreator from "@/components/video-creator";
import MusicGenerator from "@/components/music-generator";
import ProductionDashboard from "@/components/production-dashboard";
import SecurityMonitor from "@/components/security-monitor";
import PerformanceMonitor from "@/components/performance-monitor";
import RealTimeUpdates from "@/components/real-time-updates";
import { ThemeToggle } from "@/components/theme-toggle";

// 🔒 MASTER PROTECTED STUDIO – Auto Enforcement Activated
// Owner: Ervin Remus Radosavlevici | Watermarked by Ervin Remus Radosavlevici

export default function Studio() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isConnected, lastChecked, checkConnection } = useRouterConnection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 animate-fade-in">
      <EnhancedStudioHeader isConnected={isConnected} lastChecked={lastChecked} />

      {/* Production Ready Banner */}
      <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Rocket className="h-4 w-4 text-green-500" />
            <span className="text-gradient">Production Ready</span>
            <Crown className="h-4 w-4 text-yellow-500" />
            <span>Professional AI Studio</span>
            <Star className="h-4 w-4 text-blue-500" />
            <Badge variant="outline" className="ml-2 premium-feature">
              Enterprise Edition
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Music
            </TabsTrigger>
            <TabsTrigger value="production" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Production
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RealTimeUpdates />
                <PerformanceMonitor />
                <ProductionDashboard />
              </div>
              <div className="space-y-6">
                <SecurityMonitor />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <EnhancedCreationSuite />
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <VideoCreator />
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <MusicGenerator />
            <LyricsIntegrationSystem />
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <ProductionFeatures />
            <BatchProcessor />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityMonitor />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              © 2025 Ervin Remus Radosavlevici - AI Creative Studio Pro+
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="production-ready">
                Production Ready
              </Badge>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}