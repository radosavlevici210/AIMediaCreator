
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Crown, 
  Shield, 
  Users, 
  Settings, 
  Database, 
  Activity,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Server,
  Monitor,
  Globe,
  Zap,
  Brain,
  Award,
  Star,
  Diamond,
  Infinity,
  Target,
  TrendingUp,
  BarChart3,
  Rocket
} from 'lucide-react';

export default function AdvancedRootSystem() {
  const [rootAccess, setRootAccess] = useState(true);
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  
  const rootUsers = [
    {
      email: 'ervin210@icloud.com',
      status: 'ACTIVE',
      privileges: 'MASTER_ADMIN',
      lastLogin: '2025-01-13 05:33:07',
      accessLevel: 'ROOT'
    },
    {
      email: 'radosavlevici.ervin@gmail.com', 
      status: 'ACTIVE',
      privileges: 'MASTER_ADMIN',
      lastLogin: '2025-01-13 05:32:45',
      accessLevel: 'ROOT'
    },
    {
      email: 'radosavlevici210@icloud.com',
      status: 'ACTIVE', 
      privileges: 'MASTER_ADMIN',
      lastLogin: '2025-01-13 05:32:30',
      accessLevel: 'ROOT'
    }
  ];

  const systemModules = [
    { name: 'AI Generation Engine', status: 'ONLINE', access: 'UNLIMITED', icon: Brain },
    { name: 'Video Processing Core', status: 'ACTIVE', access: 'UNLIMITED', icon: Monitor },
    { name: 'Music Production Suite', status: 'RUNNING', access: 'UNLIMITED', icon: Star },
    { name: 'Enterprise Security', status: 'PROTECTED', access: 'ROOT_ONLY', icon: Shield },
    { name: 'Database Management', status: 'SECURED', access: 'ROOT_ONLY', icon: Database },
    { name: 'User Administration', status: 'CONTROLLED', access: 'ROOT_ONLY', icon: Users },
    { name: 'System Configuration', status: 'LOCKED', access: 'ROOT_ONLY', icon: Settings },
    { name: 'Global Distribution', status: 'ENABLED', access: 'UNLIMITED', icon: Globe },
    { name: 'Analytics Engine', status: 'TRACKING', access: 'UNLIMITED', icon: BarChart3 },
    { name: 'Production Pipeline', status: 'OPTIMIZED', access: 'UNLIMITED', icon: Rocket }
  ];

  return (
    <div className="min-h-screen ultra-modern-bg p-6">
      {/* Master Header */}
      <div className="ultra-modern-card p-8 mb-8 neon-border">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center neon-border">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black holographic mb-4">ADVANCED ROOT SYSTEM</h1>
          <p className="text-2xl text-yellow-400 font-bold mb-2">Master Administrator Control Panel</p>
          <p className="text-lg text-orange-400">© 2025 Ervin Remus Radosavlevici • Private & Proprietary</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-4 bg-green-500/20 rounded-xl neon-border text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-bold">System Online</p>
            <p className="text-xs text-gray-400">All modules active</p>
          </div>
          <div className="p-4 bg-purple-500/20 rounded-xl neon-border text-center">
            <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-400 font-bold">Root Access</p>
            <p className="text-xs text-gray-400">Full privileges</p>
          </div>
          <div className="p-4 bg-blue-500/20 rounded-xl neon-border text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 font-bold">Secured</p>
            <p className="text-xs text-gray-400">Enterprise grade</p>
          </div>
          <div className="p-4 bg-yellow-500/20 rounded-xl neon-border text-center">
            <Infinity className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-400 font-bold">Unlimited</p>
            <p className="text-xs text-gray-400">No restrictions</p>
          </div>
        </div>
      </div>

      {/* Root Users Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="ultra-modern-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 holographic text-2xl">
              <Users className="w-8 h-8 text-yellow-400" />
              <span>ROOT USERS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rootUsers.map((user, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl neon-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-white font-bold">{user.email}</p>
                      <p className="text-xs text-gray-400">Last login: {user.lastLogin}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {user.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <p className="text-xs text-purple-400">Access Level</p>
                    <p className="text-purple-300 font-bold">{user.accessLevel}</p>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <p className="text-xs text-blue-400">Privileges</p>
                    <p className="text-blue-300 font-bold">{user.privileges}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="ultra-modern-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 holographic text-2xl">
              <Activity className="w-8 h-8 text-green-400" />
              <span>SYSTEM STATUS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-500/20 rounded-xl neon-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-bold text-lg">All Systems Operational</span>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">CPU Usage</p>
                  <p className="text-green-400 font-bold">23%</p>
                </div>
                <div>
                  <p className="text-gray-400">Memory</p>
                  <p className="text-green-400 font-bold">67%</p>
                </div>
                <div>
                  <p className="text-gray-400">Uptime</p>
                  <p className="text-green-400 font-bold">99.9%</p>
                </div>
                <div>
                  <p className="text-gray-400">Security</p>
                  <p className="text-green-400 font-bold">ACTIVE</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/20 rounded-xl neon-border">
              <h4 className="text-blue-400 font-bold mb-3">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Processing</span>
                  <span className="text-blue-400 font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Database</span>
                  <span className="text-blue-400 font-bold">FAST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="text-blue-400 font-bold">STABLE</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Modules Grid */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold holographic mb-6 text-center">SYSTEM MODULES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {systemModules.map((module, index) => (
            <Card key={index} className="ultra-modern-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <module.icon className="w-6 h-6 text-purple-400" />
                    <span className="text-sm">{module.name}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {module.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Access</span>
                    <Badge className={module.access === 'ROOT_ONLY' ? "bg-red-500/20 text-red-400 border-red-500/30 text-xs" : "bg-green-500/20 text-green-400 border-green-500/30 text-xs"}>
                      {module.access}
                    </Badge>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <p className="text-xs text-blue-300">
                      © Ervin Radosavlevici
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="ultra-modern-card p-8 neon-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Diamond className="w-8 h-8 text-cyan-400" />
            <h3 className="text-2xl font-bold holographic">ADVANCED ROOT SYSTEM</h3>
            <Diamond className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-xl font-bold text-yellow-400 mb-2">
            © 2025 Ervin Remus Radosavlevici - All Rights Reserved
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Master Administrator System • Private & Proprietary • Enterprise Grade
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Root Access: ervin210@icloud.com • radosavlevici.ervin@gmail.com • radosavlevici210@icloud.com</p>
            <p>Unauthorized access is strictly prohibited and will be prosecuted</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
