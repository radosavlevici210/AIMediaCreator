import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Users, 
  Zap,
  TrendingUp,
  Server,
  Network,
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
  activeUsers: number;
  totalProjects: number;
  processingQueue: number;
  uptime: string;
}

interface ProcessingJob {
  id: string;
  type: 'music' | 'video' | 'image';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  eta: string;
}

export default function RealTimeDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    network: 78,
    storage: 34,
    activeUsers: 1247,
    totalProjects: 15632,
    processingQueue: 23,
    uptime: '99.98%'
  });

  const [jobs, setJobs] = useState<ProcessingJob[]>([
    { id: '1', type: 'music', status: 'processing', progress: 67, eta: '2m 15s' },
    { id: '2', type: 'video', status: 'processing', progress: 34, eta: '5m 42s' },
    { id: '3', type: 'image', status: 'queued', progress: 0, eta: '1m 30s' },
    { id: '4', type: 'music', status: 'completed', progress: 100, eta: 'Done' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(40, Math.min(95, prev.network + (Math.random() - 0.5) * 15)),
        activeUsers: prev.activeUsers + Math.floor((Math.random() - 0.5) * 20),
        processingQueue: Math.max(0, prev.processingQueue + Math.floor((Math.random() - 0.5) * 5))
      }));

      setJobs(prev => prev.map(job => {
        if (job.status === 'processing' && job.progress < 100) {
          const newProgress = Math.min(100, job.progress + Math.random() * 5);
          return {
            ...job,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'processing',
            eta: newProgress >= 100 ? 'Done' : job.eta
          };
        }
        return job;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'queued': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'queued': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">CPU Usage</p>
                <p className="text-2xl font-bold text-white">{Math.round(metrics.cpu)}%</p>
              </div>
              <Cpu className={`w-8 h-8 ${metrics.cpu > 80 ? 'text-red-400' : metrics.cpu > 60 ? 'text-yellow-400' : 'text-green-400'}`} />
            </div>
            <Progress value={metrics.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Memory</p>
                <p className="text-2xl font-bold text-white">{Math.round(metrics.memory)}%</p>
              </div>
              <Database className={`w-8 h-8 ${metrics.memory > 80 ? 'text-red-400' : metrics.memory > 60 ? 'text-yellow-400' : 'text-green-400'}`} />
            </div>
            <Progress value={metrics.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Network</p>
                <p className="text-2xl font-bold text-white">{Math.round(metrics.network)}%</p>
              </div>
              <Network className={`w-8 h-8 ${metrics.network > 80 ? 'text-red-400' : metrics.network > 60 ? 'text-yellow-400' : 'text-green-400'}`} />
            </div>
            <Progress value={metrics.network} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Storage</p>
                <p className="text-2xl font-bold text-white">{Math.round(metrics.storage)}%</p>
              </div>
              <HardDrive className={`w-8 h-8 ${metrics.storage > 80 ? 'text-red-400' : metrics.storage > 60 ? 'text-yellow-400' : 'text-green-400'}`} />
            </div>
            <Progress value={metrics.storage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Active Users</p>
                <p className="text-2xl font-bold text-white">{metrics.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-200">Total Projects</p>
                <p className="text-2xl font-bold text-white">{metrics.totalProjects.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">Processing Queue</p>
                <p className="text-2xl font-bold text-white">{metrics.processingQueue}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-200">Uptime</p>
                <p className="text-2xl font-bold text-white">{metrics.uptime}</p>
              </div>
              <Server className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Queue */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Real-Time Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className={getStatusColor(job.status)}>
                    {getStatusIcon(job.status)}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{job.type} Generation</p>
                    <p className="text-sm text-gray-400">Job ID: {job.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </p>
                    <p className="text-xs text-gray-400">ETA: {job.eta}</p>
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-24">
                      <Progress value={job.progress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">{Math.round(job.progress)}%</p>
                    </div>
                  )}
                  
                  {job.status === 'completed' && (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Complete
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            System Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-900/20 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">AI Services</span>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">Online</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-900/20 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Database</span>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">Healthy</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-900/20 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">API Gateway</span>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}