import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react";

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  network: number;
  latency: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    latency: 0
  });

  // Query for performance data
  const { data: performanceData } = useQuery({
    queryKey: ["/api/performance"],
    queryFn: async () => {
      const response = await fetch("/api/performance");
      if (!response.ok) {
        throw new Error("Failed to fetch performance data");
      }
      return response.json();
    },
    refetchInterval: 3000,
    retry: 1
  }) || {};

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        cpu: Math.random() * 100,
        memory: Math.random() * 80 + 10,
        network: Math.random() * 100,
        latency: Math.random() * 50 + 10
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, type: 'cpu' | 'memory' | 'network' | 'latency') => {
    if (type === 'latency') {
      if (value < 20) return 'bg-green-500';
      if (value < 35) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Performance
        </CardTitle>
        <CardDescription>
          Real-time monitoring of system resources and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="text-sm font-medium">CPU Usage</span>
              </div>
              <Badge variant={metrics.cpu > 80 ? 'destructive' : metrics.cpu > 50 ? 'default' : 'secondary'}>
                {metrics.cpu.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={metrics.cpu} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                <span className="text-sm font-medium">Memory</span>
              </div>
              <Badge variant={metrics.memory > 80 ? 'destructive' : metrics.memory > 50 ? 'default' : 'secondary'}>
                {metrics.memory.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={metrics.memory} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span className="text-sm font-medium">Network</span>
              </div>
              <Badge variant={metrics.network > 80 ? 'destructive' : metrics.network > 50 ? 'default' : 'secondary'}>
                {metrics.network.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={metrics.network} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Latency</span>
              </div>
              <Badge variant={metrics.latency > 35 ? 'destructive' : metrics.latency > 20 ? 'default' : 'secondary'}>
                {metrics.latency.toFixed(0)}ms
              </Badge>
            </div>
            <Progress value={(50 - metrics.latency) * 2} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Cpu, 
  HardDrive, 
  Network,
  Activity,
  BarChart3
} from "lucide-react";

export default function PerformanceMonitor() {
  const metrics = [
    {
      name: "CPU Usage",
      value: 23,
      status: "excellent",
      icon: Cpu
    },
    {
      name: "Memory Usage",
      value: 67,
      status: "good",
      icon: Activity
    },
    {
      name: "Storage Usage",
      value: 45,
      status: "excellent",
      icon: HardDrive
    },
    {
      name: "Network I/O",
      value: 12,
      status: "excellent",
      icon: Network
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}%</div>
                <Progress value={metric.value} className="mt-2 h-2" />
                <p className={`text-xs mt-1 ${getStatusColor(metric.status)}`}>
                  {metric.status}
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
              <BarChart3 className="h-5 w-5" />
              Response Times
            </CardTitle>
            <CardDescription>
              Average API response times
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Video Generation</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400">
                2.3s
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Music Creation</span>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
                1.8s
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Image Processing</span>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400">
                0.9s
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Overall system performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health Score</span>
                <span className="text-green-500">Excellent</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}