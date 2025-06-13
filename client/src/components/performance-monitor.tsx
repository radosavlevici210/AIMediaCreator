
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap, 
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Monitor,
  Server,
  Database,
  Cloud,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  gpu: number;
  temperature: number;
  uptime: string;
  processes: number;
  activeUsers: number;
  requestsPerSecond: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  cacheHitRate: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 23.5,
    memory: 67.2,
    disk: 45.8,
    network: 12.3,
    gpu: 34.6,
    temperature: 42,
    uptime: "247d 18h 23m",
    processes: 847,
    activeUsers: 2847,
    requestsPerSecond: 1247,
    responseTime: 23,
    errorRate: 0.01,
    throughput: 98.7,
    cacheHitRate: 94.3
  });

  const [alerts] = useState([
    { type: "success", message: "All systems operational", icon: CheckCircle2 },
    { type: "warning", message: "High memory usage detected", icon: AlertTriangle },
    { type: "info", message: "Performance optimization active", icon: Activity }
  ]);

  const [performanceHistory, setPerformanceHistory] = useState([
    { time: "00:00", cpu: 20, memory: 65, network: 15 },
    { time: "04:00", cpu: 25, memory: 68, network: 18 },
    { time: "08:00", cpu: 35, memory: 72, network: 25 },
    { time: "12:00", cpu: 28, memory: 70, network: 20 },
    { time: "16:00", cpu: 32, memory: 69, network: 22 },
    { time: "20:00", cpu: 24, memory: 67, network: 16 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(1, Math.min(50, prev.network + (Math.random() - 0.5) * 8)),
        gpu: Math.max(10, Math.min(80, prev.gpu + (Math.random() - 0.5) * 12)),
        requestsPerSecond: Math.max(800, Math.min(2000, prev.requestsPerSecond + Math.floor((Math.random() - 0.5) * 100))),
        responseTime: Math.max(15, Math.min(50, prev.responseTime + Math.floor((Math.random() - 0.5) * 10))),
        activeUsers: Math.max(2000, Math.min(3500, prev.activeUsers + Math.floor((Math.random() - 0.5) * 50)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return "text-green-400";
    if (value < thresholds[1]) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusBadge = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return { color: "bg-green-500/20 text-green-400", text: "Optimal" };
    if (value < thresholds[1]) return { color: "bg-yellow-500/20 text-yellow-400", text: "Warning" };
    return { color: "bg-red-500/20 text-red-400", text: "Critical" };
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <p className="text-lg font-bold text-green-400">Operational</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-lg font-bold text-blue-400">{metrics.uptime}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-lg font-bold text-purple-400">{metrics.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Requests/sec</p>
                <p className="text-lg font-bold text-yellow-400">{metrics.requestsPerSecond.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Cpu className="h-5 w-5 text-blue-400" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">{metrics.cpu.toFixed(1)}%</span>
              <Badge className={getStatusBadge(metrics.cpu, [70, 85]).color}>
                {getStatusBadge(metrics.cpu, [70, 85]).text}
              </Badge>
            </div>
            <Progress value={metrics.cpu} className="h-2" />
            <div className="text-xs text-gray-400">
              {metrics.processes} active processes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <HardDrive className="h-5 w-5 text-green-400" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-400">{metrics.memory.toFixed(1)}%</span>
              <Badge className={getStatusBadge(metrics.memory, [75, 90]).color}>
                {getStatusBadge(metrics.memory, [75, 90]).text}
              </Badge>
            </div>
            <Progress value={metrics.memory} className="h-2" />
            <div className="text-xs text-gray-400">
              247.8 TB total capacity
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Wifi className="h-5 w-5 text-purple-400" />
              Network I/O
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-400">{metrics.network.toFixed(1)}%</span>
              <Badge className={getStatusBadge(metrics.network, [60, 80]).color}>
                {getStatusBadge(metrics.network, [60, 80]).text}
              </Badge>
            </div>
            <Progress value={metrics.network} className="h-2" />
            <div className="text-xs text-gray-400">
              10 Gbps bandwidth
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Monitor className="h-5 w-5 text-yellow-400" />
              GPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-yellow-400">{metrics.gpu.toFixed(1)}%</span>
              <Badge className={getStatusBadge(metrics.gpu, [70, 85]).color}>
                {getStatusBadge(metrics.gpu, [70, 85]).text}
              </Badge>
            </div>
            <Progress value={metrics.gpu} className="h-2" />
            <div className="text-xs text-gray-400">
              NVIDIA A100 80GB
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-cyan-400" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-cyan-400">{metrics.disk.toFixed(1)}%</span>
              <Badge className={getStatusBadge(metrics.disk, [80, 90]).color}>
                {getStatusBadge(metrics.disk, [80, 90]).text}
              </Badge>
            </div>
            <Progress value={metrics.disk} className="h-2" />
            <div className="text-xs text-gray-400">
              SSD NVMe arrays
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5 text-orange-400" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-400">{metrics.temperature}°C</span>
              <Badge className={getStatusBadge(metrics.temperature, [60, 75]).color}>
                {getStatusBadge(metrics.temperature, [60, 75]).text}
              </Badge>
            </div>
            <Progress value={(metrics.temperature / 100) * 100} className="h-2" />
            <div className="text-xs text-gray-400">
              Liquid cooling active
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Application Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Response Time</p>
                <p className="text-xl font-bold text-green-400">{metrics.responseTime}ms</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Error Rate</p>
                <p className="text-xl font-bold text-green-400">{metrics.errorRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Throughput</p>
                <p className="text-xl font-bold text-blue-400">{metrics.throughput}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Cache Hit Rate</p>
                <p className="text-xl font-bold text-purple-400">{metrics.cacheHitRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-red-400" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => {
              const IconComponent = alert.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <IconComponent className={`h-5 w-5 ${
                    alert.type === 'success' ? 'text-green-400' :
                    alert.type === 'warning' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`} />
                  <span className="text-white text-sm">{alert.message}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Features Status */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Server className="h-5 w-5 text-green-400" />
            Enterprise Infrastructure Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <Cloud className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">CDN Global</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Active</Badge>
            </div>
            <div className="text-center">
              <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Database Cluster</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Healthy</Badge>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Security Layer</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Protected</Badge>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">AI Processing</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Optimal</Badge>
            </div>
            <div className="text-center">
              <Activity className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Load Balancer</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Balanced</Badge>
            </div>
            <div className="text-center">
              <Monitor className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Monitoring</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copyright */}
      <div className="text-center p-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          © 2025 Ervin Remus Radosavlevici - Enterprise Performance Monitoring System
        </p>
      </div>
    </div>
  );
}
