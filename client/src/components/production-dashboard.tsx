import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Crown, 
  Zap, 
  TrendingUp, 
  Activity, 
  Clock, 
  CheckCircle,
  Cpu,
  Users,
  Globe,
  Shield,
  Sparkles
} from "lucide-react";

interface ProductionDashboardProps {
  stats?: {
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  };
}

export default function ProductionDashboard({ stats }: ProductionDashboardProps) {
  const { data: queryStats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
    refetchInterval: 3000,
    retry: 3
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

  const displayStats = stats || queryStats || {
    totalProjects: 0,
    completedProjects: 0,
    processingProjects: 0,
    avgProcessingTime: 0,
  };

  return (
    <div className="space-y-8">
      {/* Production Status Header */}
      <div className="ultra-modern-card">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary">
              <Rocket className="w-8 h-8 text-white animate-float" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient">Production Dashboard</h2>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className="production-ready">
                  <Shield className="w-3 h-3 mr-1" />
                  ENTERPRISE READY
                </Badge>
                <Badge className="premium-feature">
                  <Crown className="w-3 h-3 mr-1" />
                  UNLIMITED ACCESS
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI OPTIMIZED
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="btn-gradient-primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" className="glass-morphism">
              <Globe className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </div>

      {/* Production Metrics Grid */}
      <div className="modern-grid">
        <Card className="ultra-modern-card production-ready">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-green-400">Total Projects</span>
              <Activity className="w-5 h-5 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{displayStats.totalProjects}</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>All time production</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card premium-feature">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-purple-400">Processing Speed</span>
              <Zap className="w-5 h-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{displayStats.avgProcessingTime}s</div>
            <div className="flex items-center text-sm text-purple-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>Average completion</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-blue-400">Completed</span>
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{displayStats.completedProjects}</div>
            <div className="flex items-center text-sm text-blue-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Successfully delivered</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card glass-morphism">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-yellow-400">Active Processing</span>
              <Cpu className="w-5 h-5 text-yellow-400 ai-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{displayStats.processingProjects}</div>
            <div className="flex items-center text-sm text-yellow-400">
              <Activity className="w-4 h-4 mr-1" />
              <span>Currently generating</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Performance */}
      {performance && (
        <Card className="ultra-modern-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Real-time Performance</span>
              <Badge className="success-state">OPTIMAL</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CPU Usage</span>
                  <span className="text-sm font-medium">{Math.round(performance.cpu)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(performance.cpu, 100)}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Memory Usage</span>
                  <span className="text-sm font-medium">{Math.round(performance.memory)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(performance.memory, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Production Credits */}
      <div className="text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} AI Creative Studio Pro+ | Production Ready | {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}