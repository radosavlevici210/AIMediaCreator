import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EnhancedStudioHeader from "@/components/enhanced-studio-header";
import ProductionDashboard from "@/components/production-dashboard";
import AdvancedWorkspace from "@/components/advanced-workspace";
import AnalyticsWorkspace from "@/components/analytics-workspace";
import CollaborationWorkspace from "@/components/collaboration-workspace";
import DistributionWorkspace from "@/components/distribution-workspace";
import BatchProcessor from "@/components/batch-processor";
import AILearningSystem from "@/components/ai-learning-system";
import SecurityMonitor from "@/components/security-monitor";
import PerformanceMonitor from "@/components/performance-monitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Zap, 
  Brain,
  Shield,
  BarChart3,
  Users,
  Download,
  Rocket,
  Crown,
  Sparkles,
  Globe,
  Cpu,
  HardDrive,
  Activity
} from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <EnhancedStudioHeader />
      
      {/* Main Content */}
      <div className="container-padding section-padding">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge className="production-ready px-4 py-2 text-sm">
                <Rocket className="w-4 h-4 mr-2" />
                Production Ready
              </Badge>
              <Badge className="premium-feature px-4 py-2 text-sm">
                <Crown className="w-4 h-4 mr-2" />
                All Features Unlocked
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Global Deployment
              </Badge>
            </div>
            
            <h1 className="text-6xl font-bold text-gradient mb-4">
              Creative Studio Pro+
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade AI-powered media generation platform. Create professional videos, music, 
              and animations with advanced AI tools and real-time collaboration features.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              <div className="ultra-modern-card p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="font-bold text-green-400">99.9%</div>
                  </div>
                </div>
              </div>
              <div className="ultra-modern-card p-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-muted-foreground">CPU</div>
                    <div className="font-bold text-blue-400">
                      {performance?.cpu ? `${Math.round(performance.cpu as number)}%` : '0%'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ultra-modern-card p-4">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-muted-foreground">Memory</div>
                    <div className="font-bold text-purple-400">
                      {performance?.memory ? `${Math.round(performance.memory as number)}%` : '0%'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ultra-modern-card p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <div>
                    <div className="text-sm text-muted-foreground">Active</div>
                    <div className="font-bold text-pink-400">1.2k</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                className={`btn-modern px-8 py-4 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'btn-gradient-primary'}`}
                onClick={handleRecordingToggle}
              >
                {isRecording ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Creating
                  </>
                )}
              </Button>
              <Button variant="outline" className="btn-outline px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                AI Enhance
              </Button>
              <Button variant="outline" className="btn-outline px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Export Project
              </Button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 gap-2 p-2 bg-card/50 backdrop-blur-md rounded-2xl">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="workspace" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Workspace
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Collaboration
            </TabsTrigger>
            <TabsTrigger value="distribution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="w-4 h-4 mr-2" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="batch" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cpu className="w-4 h-4 mr-2" />
              Batch
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="w-4 h-4 mr-2" />
              AI System
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3">
                <ProductionDashboard stats={systemStats as any} />
              </div>
              <div className="xl:col-span-1">
                <PerformanceMonitor />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workspace" className="space-y-8">
            <AdvancedWorkspace />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <AnalyticsWorkspace />
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-8">
            <CollaborationWorkspace />
          </TabsContent>

          <TabsContent value="distribution" className="space-y-8">
            <DistributionWorkspace />
          </TabsContent>

          <TabsContent value="batch" className="space-y-8">
            <BatchProcessor />
          </TabsContent>

          <TabsContent value="ai" className="space-y-8">
            <AILearningSystem />
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <SecurityMonitor />
          </TabsContent>
        </Tabs>

        {/* Status Footer */}
        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
                <span>System Online</span>
              </div>
              <div>Version 2.0.0</div>
              <div>Last Updated: {new Date().toLocaleDateString()}</div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                {(routerStatus as any)?.status === 'connected' ? 'Connected' : 'Disconnected'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Production Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}