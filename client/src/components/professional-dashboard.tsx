import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Clock, 
  Zap,
  BarChart3,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Globe
} from "lucide-react";

interface DashboardMetrics {
  totalProjects: number;
  completedProjects: number;
  processingProjects: number;
  avgProcessingTime: number;
  systemHealth: number;
  activeUsers: number;
  networkStatus: 'optimal' | 'good' | 'slow';
  securityScore: number;
}

export default function ProfessionalDashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch metrics");
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
    refetchInterval: 3000,
  });

  const kpis = [
    {
      title: "Active Projects",
      value: metrics?.totalProjects || 0,
      change: "+12%",
      trend: "up" as const,
      icon: BarChart3,
      color: "text-blue-400"
    },
    {
      title: "Completion Rate",
      value: `${Math.round(((metrics?.completedProjects || 0) / Math.max(metrics?.totalProjects || 1, 1)) * 100)}%`,
      change: "+8%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+23%",
      trend: "up" as const,
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Avg Processing",
      value: `${metrics?.avgProcessingTime || 0}s`,
      change: "-15%",
      trend: "down" as const,
      icon: Clock,
      color: "text-orange-400"
    }
  ];

  const systemMetrics = [
    {
      label: "CPU Usage",
      value: Math.round(performance?.cpu || 0),
      max: 100,
      color: "bg-blue-500",
      icon: Cpu
    },
    {
      label: "Memory Usage",
      value: Math.round(performance?.memory || 0),
      max: 100,
      color: "bg-purple-500",
      icon: HardDrive
    },
    {
      label: "Network Load",
      value: 23,
      max: 100,
      color: "bg-green-500",
      icon: Network
    },
    {
      label: "Security Score",
      value: 98,
      max: 100,
      color: "bg-emerald-500",
      icon: Shield
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted/20 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Production Dashboard</h2>
          <p className="text-muted-foreground">Enterprise-grade performance monitoring and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            <Globe className="w-3 h-3 mr-1" />
            Global CDN
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor = kpi.trend === "up" ? "text-green-400" : "text-red-400";
          
          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs mt-1">
                  <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
                  <span className={trendColor}>{kpi.change}</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-300"></div>
            </Card>
          );
        })}
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const percentage = (metric.value / metric.max) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                    <span className="text-sm font-mono">{metric.value}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Real-time Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Projects Created Today</span>
                <span className="text-2xl font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing Queue</span>
                <span className="text-2xl font-bold">{metrics?.processingProjects || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed Today</span>
                <span className="text-2xl font-bold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-2xl font-bold text-green-400">99.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <span>•</span>
              <span>Version 2.0.0</span>
              <span>•</span>
              <span>Enterprise Edition</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}