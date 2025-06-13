import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, HardDrive, Wifi, Zap } from "lucide-react";

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  network: number;
  responseTime: number;
  uptime: string;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    responseTime: 0,
    uptime: "0s"
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/performance');
        if (response.ok) {
          const data = await response.json();
          setMetrics({
            cpu: data.cpu || 0,
            memory: data.memory || 0,
            network: Math.random() * 100, // Simulated network usage
            responseTime: data.responseTime || Math.random() * 50,
            uptime: data.uptime || "Unknown"
          });
        }
      } catch (error) {
        console.error('Failed to fetch performance metrics:', error);
      }
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const getStatusColor = (value: number) => {
    if (value < 50) return "text-green-500";
    if (value < 80) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusBadge = (value: number) => {
    if (value < 50) return { variant: "default" as const, text: "Optimal" };
    if (value < 80) return { variant: "secondary" as const, text: "Moderate" };
    return { variant: "destructive" as const, text: "High" };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Performance
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="text-sm font-medium">CPU</span>
              </div>
              <Badge {...getStatusBadge(metrics.cpu)}>
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
              <Badge {...getStatusBadge(metrics.memory)}>
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
              <Badge {...getStatusBadge(metrics.network)}>
                {metrics.network.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={metrics.network} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Response</span>
              </div>
              <Badge variant="outline">
                {metrics.responseTime.toFixed(0)}ms
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Uptime: {metrics.uptime}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>Auto-refresh: 5s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}