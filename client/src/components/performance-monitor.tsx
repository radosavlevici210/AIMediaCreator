import { useState, useEffect } from "react";
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