
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
  Sparkles
} from "lucide-react";

import EnhancedStudioHeader from "@/components/enhanced-studio-header";
import ProductionFeatures from "@/components/production-features";
import VideoCreator from "@/components/video-creator";
import MusicGenerator from "@/components/music-generator";
import ProductionDashboard from "@/components/production-dashboard";
import SecurityMonitor from "@/components/security-monitor";
import PerformanceMonitor from "@/components/performance-monitor";
import RealTimeUpdates from "@/components/real-time-updates";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Studio() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <EnhancedStudioHeader />

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Music
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <ProductionFeatures />
            <ProductionDashboard />
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <VideoCreator />
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <MusicGenerator />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Synthesis Studio
                </CardTitle>
                <CardDescription>
                  Create realistic voice content with AI-powered synthesis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Voice synthesis coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityMonitor />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceMonitor />
          </TabsContent>
        </Tabs>
      </main>

      <RealTimeUpdates />
    </div>
  );
}
