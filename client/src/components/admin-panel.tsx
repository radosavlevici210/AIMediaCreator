import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Activity,
  Crown,
  UserCheck,
  Lock,
  Server
} from 'lucide-react';

interface RootUser {
  email: string;
  status: 'active' | 'inactive';
  permissions: string[];
  lastLogin: string;
}

const rootUsers: RootUser[] = [
  {
    email: 'ervin210@icloud.com',
    status: 'active',
    permissions: ['admin', 'owner', 'full-access'],
    lastLogin: '2025-01-12 14:30:00'
  },
  {
    email: 'radosavlevici210@icloud.com',
    status: 'active',
    permissions: ['admin', 'owner', 'full-access'],
    lastLogin: '2025-01-12 13:45:00'
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState({
    security: 'secure',
    performance: 'optimal',
    database: 'connected',
    uptime: '99.9%'
  });

  const handleSystemAction = (action: string) => {
    console.log(`Executing admin action: ${action}`);
    // Implementation for admin actions
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Crown className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold">Admin Control Panel</h1>
          <p className="text-muted-foreground">Root user administration interface</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Operational</div>
                <p className="text-xs text-muted-foreground">Uptime: {systemStatus.uptime}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Level</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">High</div>
                <p className="text-xs text-muted-foreground">All systems secure</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Root administrators</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Optimal</div>
                <p className="text-xs text-muted-foreground">All metrics green</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Root Users</CardTitle>
              <CardDescription>System administrators with full access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rootUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="font-medium">{user.email}</p>
                        <p className="text-sm text-muted-foreground">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {user.status}
                      </Badge>
                      <Badge variant="secondary">Owner</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input placeholder="Search users..." className="flex-1" />
                <Button>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Root Administrators</h3>
                {rootUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{user.email}</p>
                        <div className="flex space-x-1">
                          {user.permissions.map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Controls</CardTitle>
              <CardDescription>Monitor and manage system security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleSystemAction('security-scan')}
                  className="h-16 flex flex-col items-center justify-center"
                >
                  <Shield className="w-6 h-6 mb-1" />
                  Run Security Scan
                </Button>
                
                <Button 
                  onClick={() => handleSystemAction('audit-logs')}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center"
                >
                  <Activity className="w-6 h-6 mb-1" />
                  View Audit Logs
                </Button>
                
                <Button 
                  onClick={() => handleSystemAction('backup-system')}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center"
                >
                  <Database className="w-6 h-6 mb-1" />
                  Backup System
                </Button>
                
                <Button 
                  onClick={() => handleSystemAction('lock-system')}
                  variant="destructive"
                  className="h-16 flex flex-col items-center justify-center"
                >
                  <Lock className="w-6 h-6 mb-1" />
                  Emergency Lock
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Advanced system settings and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Environment</h3>
                  <Badge variant="outline">Production Ready</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Database</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">API Status</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
              <CardDescription>Performance metrics and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2K</div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">845</div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">45</div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">2.4s</div>
                  <p className="text-sm text-muted-foreground">Avg Process Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}