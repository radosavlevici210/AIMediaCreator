
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Code, 
  Settings, 
  Database,
  Monitor,
  TestTube,
  RefreshCw,
  ExternalLink,
  Activity,
  Users,
  Lock,
  Unlock,
  Eye,
  Edit,
  Play,
  Square,
  Rocket,
  Terminal,
  Crown,
  Zap,
  Shield,
  GitBranch,
  FolderOpen,
  Server,
  Cloud,
  Smartphone,
  Laptop,
  MousePointer,
  Plus,
  Trash2,
  Download,
  Upload,
  Share2,
  Copy,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  type: 'web' | 'api' | 'mobile' | 'desktop' | 'database' | 'service';
  status: 'running' | 'stopped' | 'building' | 'error';
  url: string;
  port: number;
  branch: string;
  lastActivity: string;
  canModify: boolean;
  owner: string;
  description: string;
  framework: string;
  version: string;
}

interface AccessPermission {
  userId: string;
  appId: string;
  level: 'viewer' | 'editor' | 'admin' | 'owner';
  canModify: boolean;
  canDeploy: boolean;
  canDelete: boolean;
}

export default function UniversalAccessDashboard() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'main-studio',
      name: 'AI Creative Studio Pro+',
      type: 'web',
      status: 'running',
      url: 'https://your-repl.replit.app',
      port: 5000,
      branch: 'main',
      lastActivity: '2 mins ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Main production application',
      framework: 'React + TypeScript',
      version: '1.0.0'
    },
    {
      id: 'dev-studio',
      name: 'Development Studio',
      type: 'web',
      status: 'running',
      url: 'https://dev-your-repl.replit.app',
      port: 5001,
      branch: 'development',
      lastActivity: '5 mins ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Development environment',
      framework: 'React + TypeScript',
      version: '1.1.0-dev'
    },
    {
      id: 'api-server',
      name: 'API Server',
      type: 'api',
      status: 'running',
      url: 'https://api-your-repl.replit.app',
      port: 3000,
      branch: 'main',
      lastActivity: '1 min ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Backend API server',
      framework: 'Express + TypeScript',
      version: '1.0.0'
    },
    {
      id: 'test-env',
      name: 'Testing Environment',
      type: 'web',
      status: 'building',
      url: 'https://test-your-repl.replit.app',
      port: 5002,
      branch: 'feature/testing',
      lastActivity: '10 mins ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Automated testing environment',
      framework: 'React + Jest',
      version: '1.0.0-test'
    },
    {
      id: 'mobile-app',
      name: 'Mobile Companion',
      type: 'mobile',
      status: 'stopped',
      url: 'https://mobile-your-repl.replit.app',
      port: 8080,
      branch: 'mobile',
      lastActivity: '1 hour ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Mobile web application',
      framework: 'React Native Web',
      version: '0.9.0'
    },
    {
      id: 'database',
      name: 'Database Manager',
      type: 'database',
      status: 'running',
      url: 'https://db-your-repl.replit.app',
      port: 5432,
      branch: 'main',
      lastActivity: '30 secs ago',
      canModify: true,
      owner: 'ervin210@icloud.com',
      description: 'Database administration interface',
      framework: 'SQLite + Drizzle',
      version: '1.0.0'
    }
  ]);

  const [permissions, setPermissions] = useState<AccessPermission[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    name: '',
    type: 'web',
    port: 3001,
    framework: '',
    description: ''
  });

  const isRootUser = true; // Since this is for ervin210@icloud.com
  const currentUser = 'ervin210@icloud.com';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'stopped': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'building': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return Globe;
      case 'api': return Code;
      case 'mobile': return Smartphone;
      case 'desktop': return Laptop;
      case 'database': return Database;
      case 'service': return Server;
      default: return Monitor;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = activeFilter === 'all' || app.type === activeFilter || app.status === activeFilter;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openApplication = (app: Application) => {
    const url = app.url || `https://${window.location.hostname.replace(/:\d+/, '')}:${app.port}`;
    window.open(url, '_blank');
  };

  const startApplication = async (appId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: 'running' as const } : app
      ));
      setLoading(false);
    }, 2000);
  };

  const stopApplication = async (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'stopped' as const } : app
    ));
  };

  const createNewApplication = async () => {
    if (!newAppForm.name) return;
    
    const newApp: Application = {
      id: `app-${Date.now()}`,
      name: newAppForm.name,
      type: newAppForm.type as any,
      status: 'stopped',
      url: '',
      port: newAppForm.port,
      branch: 'main',
      lastActivity: 'Just created',
      canModify: true,
      owner: currentUser,
      description: newAppForm.description || 'New application',
      framework: newAppForm.framework || 'Custom',
      version: '0.1.0'
    };

    setApplications(prev => [...prev, newApp]);
    setNewAppForm({ name: '', type: 'web', port: 3001, framework: '', description: '' });
  };

  const deleteApplication = async (appId: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== appId));
    }
  };

  const duplicateApplication = async (app: Application) => {
    const duplicatedApp: Application = {
      ...app,
      id: `${app.id}-copy-${Date.now()}`,
      name: `${app.name} (Copy)`,
      port: app.port + 100,
      status: 'stopped',
      lastActivity: 'Just created'
    };

    setApplications(prev => [...prev, duplicatedApp]);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="ultra-modern-card">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary">
              <Crown className="w-8 h-8 text-white animate-float" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient">Universal Access Dashboard</h2>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className="production-ready">
                  <Crown className="w-3 h-3 mr-1" />
                  MASTER ACCESS
                </Badge>
                <Badge className="premium-feature">
                  <Zap className="w-3 h-3 mr-1" />
                  ALL PERMISSIONS
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  FULL CONTROL
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={() => setLoading(!loading)} disabled={loading} className="btn-gradient-primary">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
            <Button variant="outline" className="glass-morphism">
              <Terminal className="w-4 h-4 mr-2" />
              Global Console
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="ultra-modern-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search applications, descriptions, frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full glass-morphism"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={activeFilter === 'running' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('running')}
                size="sm"
              >
                Running
              </Button>
              <Button
                variant={activeFilter === 'web' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('web')}
                size="sm"
              >
                Web Apps
              </Button>
              <Button
                variant={activeFilter === 'api' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('api')}
                size="sm"
              >
                APIs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="modern-grid">
        <Card className="ultra-modern-card production-ready">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-green-400">Total Applications</span>
              <Monitor className="w-5 h-5 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{applications.length}</div>
            <div className="flex items-center text-sm text-green-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Full access granted</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card premium-feature">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-blue-400">Running Apps</span>
              <Activity className="w-5 h-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {applications.filter(app => app.status === 'running').length}
            </div>
            <div className="flex items-center text-sm text-blue-400">
              <Play className="w-4 h-4 mr-1" />
              <span>Active environments</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-purple-400">Can Modify</span>
              <Edit className="w-5 h-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {applications.filter(app => app.canModify).length}
            </div>
            <div className="flex items-center text-sm text-purple-400">
              <Unlock className="w-4 h-4 mr-1" />
              <span>Editable apps</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-modern-card glass-morphism">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-yellow-400">Total Ports</span>
              <Server className="w-5 h-5 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {new Set(applications.map(app => app.port)).size}
            </div>
            <div className="flex items-center text-sm text-yellow-400">
              <Globe className="w-4 h-4 mr-1" />
              <span>Active ports</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((app) => {
          const TypeIcon = getTypeIcon(app.type);
          return (
            <Card key={app.id} className="ultra-modern-card hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TypeIcon className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{app.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{app.framework}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Port:</strong> {app.port}</p>
                  <p><strong>Branch:</strong> {app.branch}</p>
                  <p><strong>Version:</strong> {app.version}</p>
                  <p><strong>Last Activity:</strong> {app.lastActivity}</p>
                  <p className="truncate"><strong>Description:</strong> {app.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {app.status === 'stopped' ? (
                    <Button 
                      size="sm" 
                      onClick={() => startApplication(app.id)}
                      disabled={loading}
                      className="btn-gradient-primary"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => stopApplication(app.id)}
                      className="glass-morphism"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    onClick={() => openApplication(app)}
                    className="btn-gradient-secondary"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>

                {/* Modification Controls */}
                {app.canModify && (
                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => duplicateApplication(app)}
                      className="text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Clone
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteApplication(app.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create New Application */}
      <Card className="ultra-modern-card production-ready">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-primary" />
            <span>Create New Application</span>
            <Badge className="premium-feature">UNLIMITED</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Application Name"
              value={newAppForm.name}
              onChange={(e) => setNewAppForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newAppForm.type}
              onChange={(e) => setNewAppForm(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="web">Web App</option>
              <option value="api">API Service</option>
              <option value="mobile">Mobile App</option>
              <option value="database">Database</option>
              <option value="service">Service</option>
            </select>
            <Input
              type="number"
              placeholder="Port"
              value={newAppForm.port}
              onChange={(e) => setNewAppForm(prev => ({ ...prev, port: parseInt(e.target.value) || 3001 }))}
            />
            <Input
              placeholder="Framework"
              value={newAppForm.framework}
              onChange={(e) => setNewAppForm(prev => ({ ...prev, framework: e.target.value }))}
            />
            <Button onClick={createNewApplication} className="btn-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
          {newAppForm.name && (
            <div className="mt-4">
              <Input
                placeholder="Description (optional)"
                value={newAppForm.description}
                onChange={(e) => setNewAppForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Global Actions */}
      <Card className="ultra-modern-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Global Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Play className="w-6 h-6" />
              <span>Start All</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Square className="w-6 h-6" />
              <span>Stop All</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Download className="w-6 h-6" />
              <span>Backup All</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Upload className="w-6 h-6" />
              <span>Deploy All</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Monitor className="w-6 h-6" />
              <span>Monitor</span>
            </Button>
            <Button className="flex flex-col items-center p-6 h-auto space-y-2 glass-morphism">
              <Settings className="w-6 h-6" />
              <span>Configure</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Universal Access Dashboard | Full Control & Modification Rights | Master Access Enabled</p>
        <p>All applications accessible • Unlimited permissions • Real-time management • {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
