import React, { useState, useEffect } from "react";
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
  const { isConnected, retryCount } = useRouterConnection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 animate-fade-in">
      <EnhancedStudioHeader isConnected={isConnected} retryCount={retryCount}/>

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

      <main className="container mx-auto container-padding section-padding">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 glass-card h-14 p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 premium-feature"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </TabsTrigger>
            <TabsTrigger 
              value="lyrics" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Lyrics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="legacy" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 production-ready"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="performance" 
              className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8 animate-slide-up">
            <div className="grid gap-6">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gradient">Professional AI Studio</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Create stunning videos, music, and content with enterprise-grade AI technology
                </p>
              </div>
              <ProductionFeatures />
              <ProductionDashboard />
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-8 animate-slide-up">
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AI Creation Suite</h2>
                  <p className="text-muted-foreground">Professional-grade content creation tools</p>
                </div>
                <Badge className="ml-auto premium-feature bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Premium
                </Badge>
              </div>
              <EnhancedCreationSuite />
            </div>

            <BatchProcessor />
          </TabsContent>

          <TabsContent value="lyrics" className="space-y-8 animate-slide-up">
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Lyrics Integration</h2>
                  <p className="text-muted-foreground">Advanced lyrical content management</p>
                </div>
                <Badge className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                  AI-Powered
                </Badge>
              </div>
              <LyricsIntegrationSystem />
            </div>
          </TabsContent>

          <TabsContent value="legacy" className="space-y-8 animate-slide-up">
            <div className="modern-grid">
              <Card className="modern-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg">Video Creator</div>
                      <div className="text-sm text-muted-foreground font-normal">Legacy interface</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VideoCreator />
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg">Music Generator</div>
                      <div className="text-sm text-muted-foreground font-normal">Classic tools</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MusicGenerator />
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Mic className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg">Voice Synthesis</div>
                      <div className="text-sm text-muted-foreground font-normal">Coming soon</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center animate-float">
                      <Mic className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Advanced voice synthesis features in development</p>
                    <Badge variant="outline">Next Update</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8 animate-slide-up">
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center animate-glow">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Security Monitor</h2>
                  <p className="text-muted-foreground">Enterprise security & protection</p>
                </div>
                <Badge className="ml-auto production-ready bg-gradient-to-r from-red-500 to-rose-500 text-white border-0">
                  Active Protection
                </Badge>
              </div>
              <SecurityMonitor />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8 animate-slide-up">
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Performance Analytics</h2>
                  <p className="text-muted-foreground">Real-time system monitoring</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full status-online"></div>
                  <span className="text-sm text-green-500 font-medium">Online</span>
                </div>
              </div>
              <PerformanceMonitor />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <RealTimeUpdates />
    </div>
  );
}