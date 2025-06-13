
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  GitBranch, 
  Play, 
  Eye, 
  Code, 
  Terminal, 
  Globe, 
  Rocket,
  Settings,
  Database,
  Monitor,
  TestTube,
  RefreshCw,
  ExternalLink,
  Activity,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Crown
} from "lucide-react";

interface Branch {
  name: string;
  status: 'active' | 'testing' | 'production' | 'development';
  lastCommit: string;
  url?: string;
  port?: number;
}

interface DevEnvironment {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'api';
  status: 'running' | 'stopped' | 'building';
  port: number;
  branch: string;
  lastActivity: string;
}

export default function DevelopmentDashboard() {
  const [branches, setBranches] = useState<Branch[]>([
    { name: 'main', status: 'production', lastCommit: '2 hours ago', url: 'https://your-app.replit.app', port: 5000 },
    { name: 'development', status: 'development', lastCommit: '30 minutes ago', port: 5001 },
    { name: 'feature/ai-enhancement', status: 'testing', lastCommit: '1 hour ago', port: 5002 },
    { name: 'feature/enterprise-dashboard', status: 'active', lastCommit: '5 minutes ago', port: 5003 },
    { name: 'hotfix/security-patch', status: 'testing', lastCommit: '45 minutes ago', port: 5004 },
  ]);

  const [environments, setEnvironments] = useState<DevEnvironment[]>([
    { id: 'prod', name: 'Production', type: 'fullstack', status: 'running', port: 5000, branch: 'main', lastActivity: '2 mins ago' },
    { id: 'staging', name: 'Staging', type: 'fullstack', status: 'running', port: 5001, branch: 'development', lastActivity: '5 mins ago' },
    { id: 'api-test', name: 'API Testing', type: 'api', status: 'running', port: 3000, branch: 'feature/ai-enhancement', lastActivity: '1 min ago' },
    { id: 'frontend-dev', name: 'Frontend Dev', type: 'frontend', status: 'building', port: 3001, branch: 'feature/enterprise-dashboard', lastActivity: '30 secs ago' },
  ]);

  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'testing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'development': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'running': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'stopped': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'building': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'frontend': return Globe;
      case 'backend': return Database;
      case 'fullstack': return Monitor;
      case 'api': return Code;
      case 'mobile': return Settings;
      default: return Terminal;
    }
  };

  const openEnvironment = (url: string, port?: number) => {
    const targetUrl = url || `https://${window.location.hostname.replace(/:\d+/, '')}:${port || 5000}`;
    window.open(targetUrl, '_blank');
  };

  const startEnvironment = async (envId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setEnvironments(prev => prev.map(env => 
        env.id === envId ? { ...env, status: 'running' as const } : env
      ));
      setLoading(false);
    }, 2000);
  };

  const stopEnvironment = async (envId: string) => {
    setEnvironments(prev => prev.map(env => 
      env.id === envId ? { ...env, status: 'stopped' as const } : env
    ));
  };

  const refreshStatus = async () => {
    setLoading(true);
    // Simulate status refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="ultra-modern-card">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary">
              <Monitor className="w-8 h-8 text-white animate-float" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient">Development Hub</h2>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className="production-ready">
                  <Crown className="w-3 h-3 mr-1" />
                  ALL ACCESS
                </Badge>
                <Badge className="premium-feature">
                  <Zap className="w-3 h-3 mr-1" />
                  LIVE TESTING
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Activity className="w-3 h-3 mr-1" />
                  REAL-TIME
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={refreshStatus} disabled={loading} className="btn-gradient-primary">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" className="glass-morphism">
              <Terminal className="w-4 h-4 mr-2" />
              Console
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="modern-grid">
        <Card className="ultra-modern-card production-ready">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-green-400">Active Branches</span>
              <GitBranch className="w-5 h-5 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{branches.length}</div>
            <div className="flex items-center text-sm text-green-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>All branches accessible</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card premium-feature">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-blue-400">Running Environments</span>
              <Monitor className="w-5 h-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {environments.filter(env => env.status === 'running').length}
            </div>
            <div className="flex items-center text-sm text-blue-400">
              <Activity className="w-4 h-4 mr-1" />
              <span>Live environments</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-purple-400">Test Coverage</span>
              <TestTube className="w-5 h-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="flex items-center text-sm text-purple-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Full test suite</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card glass-morphism">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-yellow-400">Deploy Ready</span>
              <Rocket className="w-5 h-5 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="flex items-center text-sm text-yellow-400">
              <Rocket className="w-4 h-4 mr-1" />
              <span>Ready for production</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Management */}
      <Card className="ultra-modern-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-primary" />
            <span>Branch Explorer</span>
            <Badge className="success-state">LIVE ACCESS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branches.map((branch, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-4">
                  <GitBranch className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-white">{branch.name}</h4>
                    <p className="text-sm text-gray-400">Last commit: {branch.lastCommit}</p>
                  </div>
                  <Badge className={getStatusColor(branch.status)}>
                    {branch.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openEnvironment(branch.url || '', branch.port)}
                    className="glass-morphism"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="btn-gradient-primary"
                    onClick={() => openEnvironment(branch.url || '', branch.port)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environment Management */}
      <Card className="ultra-modern-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-primary" />
            <span>Development Environments</span>
            <Badge className="premium-feature">ENTERPRISE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {environments.map((env) => {
              const TypeIcon = getTypeIcon(env.type);
              return (
                <div key={env.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center space-x-4">
                    <TypeIcon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{env.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          Port {env.port}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Branch: {env.branch}</span>
                        <span>•</span>
                        <span>Last activity: {env.lastActivity}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(env.status)}>
                      {env.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {env.status === 'stopped' ? (
                      <Button 
                        size="sm" 
                        onClick={() => startEnvironment(env.id)}
                        disabled={loading}
                        className="btn-gradient-primary"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => stopEnvironment(env.id)}
                          className="glass-morphism"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Stop
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => openEnvironment('', env.port)}
                          className="btn-gradient-primary"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Access
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="ultra-modern-card production-ready">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Quick Development Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Terminal className="w-6 h-6" />
              <span>Open Terminal</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Code className="w-6 h-6" />
              <span>Code Editor</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <TestTube className="w-6 h-6" />
              <span>Run Tests</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Rocket className="w-6 h-6" />
              <span>Deploy</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Development Hub | Real-time Branch & Environment Management | {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
