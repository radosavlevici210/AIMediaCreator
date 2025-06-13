import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Shield, 
  TrendingUp, 
  Users, 
  Server, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import GradientCard from "./gradient-card";
import PerformanceMonitor from "./performance-monitor";

interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  processingProjects: number;
  avgProcessingTime: number;
}

interface SecurityAlert {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export default function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/stats'],
    refetchInterval: 5000,
  });

  const { data: securityLogs } = useQuery<SecurityAlert[]>({
    queryKey: ['/api/security'],
    refetchInterval: 10000,
  });

  const { data: performanceData } = useQuery<{cpu: number; memory: number}>({
    queryKey: ['/api/performance'],
    refetchInterval: 3000,
  });

  const getCompletionRate = () => {
    if (!stats || stats.totalProjects === 0) return 0;
    return Math.round((stats.completedProjects / stats.totalProjects) * 100);
  };

  const getSecurityStatus = () => {
    if (!securityLogs || securityLogs.length === 0) return { status: 'secure', count: 0 };
    const highSeverity = securityLogs.filter(log => log.severity === 'high').length;
    if (highSeverity > 0) return { status: 'alert', count: highSeverity };
    return { status: 'monitoring', count: securityLogs.length };
  };

  const securityStatus = getSecurityStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Professional Media Studio
            </h1>
            <p className="text-muted-foreground mt-1">
              Advanced AI-powered production environment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GradientCard
            title="Total Projects"
            gradient="primary"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {statsLoading ? "..." : stats?.totalProjects || 0}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 mr-1" />
                All time
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Completion Rate"
            gradient="success"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-3">
              <div className="text-3xl font-bold text-green-400">
                {getCompletionRate()}%
              </div>
              <Progress value={getCompletionRate()} className="h-2" />
            </div>
          </GradientCard>

          <GradientCard
            title="Security Status"
            gradient={securityStatus.status === 'alert' ? 'error' : 'accent'}
            glowEffect={securityStatus.status === 'alert'}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                {securityStatus.status === 'alert' ? (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                ) : (
                  <Shield className="w-8 h-8 text-cyan-400" />
                )}
              </div>
              <div className="text-sm font-medium">
                {securityStatus.status === 'alert' ? 'High Priority Alerts' : 'Protected'}
              </div>
              {securityStatus.count > 0 && (
                <Badge variant="outline" className="text-xs">
                  {securityStatus.count} events
                </Badge>
              )}
            </div>
          </GradientCard>

          <GradientCard
            title="Performance"
            gradient="warning"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-sm font-medium">
                {performanceData?.cpu !== undefined ? `${Math.round(performanceData.cpu)}% CPU` : 'Monitoring...'}
              </div>
              <div className="text-xs text-muted-foreground">
                Real-time metrics
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Services</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Background Jobs</span>
                      <Badge variant="default">Running</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Layer</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>System started successfully</span>
                      <span className="text-muted-foreground ml-auto">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Performance monitoring active</span>
                      <span className="text-muted-foreground ml-auto">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Security protocols enabled</span>
                      <span className="text-muted-foreground ml-auto">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceMonitor />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {securityLogs && securityLogs.length > 0 ? (
                  <div className="space-y-3">
                    {securityLogs.slice(0, 10).map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Badge variant={log.severity === 'high' ? 'destructive' : log.severity === 'medium' ? 'secondary' : 'outline'}>
                            {log.severity}
                          </Badge>
                          <span className="text-sm">{log.message}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No security events detected</p>
                    <p className="text-sm">Your system is secure</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GradientCard
                title="Processing Analytics"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="font-medium">
                      {stats?.avgProcessingTime || 0}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-medium text-green-400">
                      {getCompletionRate()}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Processes</span>
                    <span className="font-medium">
                      {stats?.processingProjects || 0}
                    </span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="System Metrics"
                gradient="accent"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Usage</span>
                    <span className="font-medium">
                      {performanceData?.cpu ? `${Math.round(performanceData.cpu)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <span className="font-medium">
                      {performanceData?.memory ? `${Math.round(performanceData.memory)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Status</span>
                    <Badge variant="default">Optimal</Badge>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}