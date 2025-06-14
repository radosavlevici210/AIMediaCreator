import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Music, 
  Video, 
  Image, 
  BarChart3,
  Users,
  Shield,
  Globe,
  Crown,
  Rocket,
  Database,
  Network,
  Cpu,
  HardDrive,
  Activity,
  Clock,
  CheckCircle,
  Star,
  Play,
  Download
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'processing' | 'completed';
  metrics?: {
    performance: number;
    quality: number;
    speed: number;
  };
  category: 'ai' | 'media' | 'system' | 'enterprise';
}

const features: Feature[] = [
  {
    id: 'quantum-ai',
    title: 'Quantum AI Processing',
    description: 'Next-generation AI with quantum-level optimization for unprecedented creative capabilities',
    icon: <Brain className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 98, quality: 96, speed: 94 },
    category: 'ai'
  },
  {
    id: 'music-generation',
    title: 'AI Music Generation',
    description: 'Professional music creation with lyrics integration and studio-quality production',
    icon: <Music className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 95, quality: 98, speed: 92 },
    category: 'media'
  },
  {
    id: 'video-creation',
    title: '8K Video Creation',
    description: 'Generate stunning videos with IMAX quality and advanced animation capabilities',
    icon: <Video className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 97, quality: 99, speed: 89 },
    category: 'media'
  },
  {
    id: 'real-time-collab',
    title: 'Real-time Collaboration',
    description: 'Live editing with instant synchronization and team management tools',
    icon: <Users className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 93, quality: 91, speed: 97 },
    category: 'enterprise'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description: 'Military-grade security with comprehensive audit logs and access controls',
    icon: <Shield className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 99, quality: 100, speed: 95 },
    category: 'system'
  },
  {
    id: 'global-distribution',
    title: 'Global Distribution',
    description: 'Deploy content worldwide with CDN optimization and multi-platform support',
    icon: <Globe className="w-6 h-6" />,
    status: 'active',
    metrics: { performance: 96, quality: 94, speed: 98 },
    category: 'enterprise'
  }
];

const systemMetrics = {
  cpuUsage: 45,
  memoryUsage: 62,
  networkUsage: 78,
  storageUsage: 34,
  activeUsers: 1247,
  totalProjects: 15632,
  processingQueue: 23,
  uptime: 99.98
};

export default function FeatureShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [realTimeMetrics, setRealTimeMetrics] = useState(systemMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkUsage: Math.max(40, Math.min(95, prev.networkUsage + (Math.random() - 0.5) * 15)),
        activeUsers: prev.activeUsers + Math.floor((Math.random() - 0.5) * 20),
        processingQueue: Math.max(0, prev.processingQueue + Math.floor((Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Features', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'ai', label: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" /> },
    { id: 'media', label: 'Media Creation', icon: <Video className="w-4 h-4" /> },
    { id: 'system', label: 'System & Performance', icon: <Cpu className="w-4 h-4" /> },
    { id: 'enterprise', label: 'Enterprise Features', icon: <Crown className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Creative Studio Pro+ Feature Showcase
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Experience the full power of enterprise-grade AI content creation
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Crown className="w-3 h-3 mr-1" />
            Pro+ Unlimited Access
          </Badge>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-black/50 border-white/20 text-white hover:bg-white/10'
            }`}
          >
            {category.icon}
            <span className="ml-2">{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map(feature => (
          <Card key={feature.id} className="bg-black/40 border-white/10 backdrop-blur-lg hover:border-white/20 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${
                    feature.category === 'ai' ? 'from-purple-600 to-blue-600' :
                    feature.category === 'media' ? 'from-green-600 to-cyan-600' :
                    feature.category === 'system' ? 'from-orange-600 to-red-600' :
                    'from-yellow-600 to-pink-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    feature.status === 'active' ? 'text-green-400 border-green-400' :
                    feature.status === 'processing' ? 'text-yellow-400 border-yellow-400' :
                    'text-blue-400 border-blue-400'
                  }`}
                >
                  {feature.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              
              {feature.metrics && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-white">{feature.metrics.performance}%</span>
                    </div>
                    <Progress value={feature.metrics.performance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Quality</span>
                      <span className="text-white">{feature.metrics.quality}%</span>
                    </div>
                    <Progress value={feature.metrics.quality} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Speed</span>
                      <span className="text-white">{feature.metrics.speed}%</span>
                    </div>
                    <Progress value={feature.metrics.speed} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time System Status */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Real-time System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-white">{Math.round(realTimeMetrics.cpuUsage)}%</span>
              </div>
              <Progress value={realTimeMetrics.cpuUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Memory</span>
                <span className="text-white">{Math.round(realTimeMetrics.memoryUsage)}%</span>
              </div>
              <Progress value={realTimeMetrics.memoryUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Network</span>
                <span className="text-white">{Math.round(realTimeMetrics.networkUsage)}%</span>
              </div>
              <Progress value={realTimeMetrics.networkUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Storage</span>
                <span className="text-white">{Math.round(realTimeMetrics.storageUsage)}%</span>
              </div>
              <Progress value={realTimeMetrics.storageUsage} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{realTimeMetrics.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{realTimeMetrics.totalProjects.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{realTimeMetrics.processingQueue}</div>
              <div className="text-sm text-gray-400">Processing Queue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{realTimeMetrics.uptime}%</div>
              <div className="text-sm text-gray-400">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Play className="w-4 h-4 mr-2" />
          Try Enhanced Studio
        </Button>
        <Button variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/10">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Dashboard
        </Button>
        <Button variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/10">
          <Download className="w-4 h-4 mr-2" />
          Export Projects
        </Button>
      </div>
    </div>
  );
}