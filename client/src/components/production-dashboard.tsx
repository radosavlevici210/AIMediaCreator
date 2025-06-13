interface ProductionDashboardProps {
  stats?: {
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  };
}

// © 2025 Ervin Radosavlevici - Professional Production Dashboard
export default function ProductionDashboard({ stats }: ProductionDashboardProps) {
  const defaultStats = {
    totalProjects: 0,
    completedProjects: 0,
    processingProjects: 0,
    avgProcessingTime: 0,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="mt-12">
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ervin Radosavlevici - Production Dashboard | {new Date().toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-morphism bg-[hsl(150,100%,50%)]/10 rounded-xl p-6 border border-[hsl(150,100%,50%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(150,100%,50%)] font-semibold">Projects Created</p>
              <p className="text-3xl font-bold">{displayStats.totalProjects}</p>
            </div>
            <i className="fas fa-folder text-3xl text-[hsl(150,100%,50%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-[hsl(210,100%,60%)]/10 rounded-xl p-6 border border-[hsl(210,100%,60%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(210,100%,60%)] font-semibold">Processing Time</p>
              <p className="text-3xl font-bold">{displayStats.avgProcessingTime}s</p>
            </div>
            <i className="fas fa-clock text-3xl text-[hsl(210,100%,60%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-[hsl(320,100%,50%)]/10 rounded-xl p-6 border border-[hsl(320,100%,50%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(320,100%,50%)] font-semibold">Completed</p>
              <p className="text-3xl font-bold">{displayStats.completedProjects}</p>
            </div>
            <i className="fas fa-check-circle text-3xl text-[hsl(320,100%,50%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 font-semibold">Processing</p>
              <p className="text-3xl font-bold">{displayStats.processingProjects}</p>
            </div>
            <i className="fas fa-spinner text-3xl text-gray-400 opacity-60"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  Clock, 
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

export default function ProductionDashboard() {
  const stats = [
    {
      title: "Total Projects",
      value: "2,847",
      change: "+12%",
      icon: BarChart3,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+23%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Avg. Processing Time",
      value: "2.3s",
      change: "-15%",
      icon: Clock,
      trend: "down"
    },
    {
      title: "System Performance",
      value: "99.9%",
      change: "+0.1%",
      icon: Zap,
      trend: "up"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Creation Analytics
            </CardTitle>
            <CardDescription>
              Real-time project creation statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Video Projects</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Music Projects</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Animation Projects</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Real-time system monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">CPU Usage</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400">
                23%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Memory Usage</span>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
                67%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Network I/O</span>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400">
                Low
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}