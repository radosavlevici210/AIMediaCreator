import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Users, Settings, Shield, Database, Activity } from "lucide-react";

export default function RootUserPanel() {
  const [activeUsers, setActiveUsers] = useState([
    { email: "ervin210@icloud.com", role: "root", status: "active", lastLogin: "2025-06-13 00:25:00" },
    { email: "radosavlevici.ervin@gmail.com", role: "root", status: "active", lastLogin: "2025-06-13 00:24:30" }
  ]);

  const [systemStats] = useState({
    totalProjects: 1247,
    activeUsers: 2,
    storageUsed: "2.4 TB",
    uptime: "99.9%",
    apiCalls: "1.2M",
    contentGenerated: "43.7 hours"
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Root Access Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Root User Panel</h1>
            <p className="text-muted-foreground">AI Creative Studio Pro+ System Administration</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
          ROOT ACCESS
        </Badge>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold text-blue-500">{systemStats.totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-green-500">{systemStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Storage</p>
                <p className="text-2xl font-bold text-purple-500">{systemStats.storageUsed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-orange-500">{systemStats.uptime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">API Calls</p>
                <p className="text-2xl font-bold text-red-500">{systemStats.apiCalls}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Content</p>
                <p className="text-2xl font-bold text-yellow-500">{systemStats.contentGenerated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Root User Management */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Root Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Root User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeUsers.map((user) => (
                <div key={user.email} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Last login: {user.lastLogin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                      {user.role.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                      {user.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Production Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Content Duration (hours)</label>
                  <Input defaultValue="43" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Model Quality</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="quantum-cinema">Quantum Cinema</option>
                    <option value="cinematic-pro">Cinematic Pro</option>
                    <option value="studio-master">Studio Master</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Quality</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="8k">8K Ultra HD</option>
                    <option value="4k">4K Ultra HD</option>
                    <option value="imax">IMAX Quality</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Audio Enhancement</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="dolby-atmos">Dolby Atmos</option>
                    <option value="dts-x">DTS:X</option>
                    <option value="surround-7-1">7.1 Surround</option>
                  </select>
                </div>
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Apply Root Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Security Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-600 font-medium">✓ System Security: Optimal</p>
                  <p className="text-sm text-muted-foreground">No security threats detected</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-600 font-medium">ℹ Active Root Sessions: 2</p>
                  <p className="text-sm text-muted-foreground">All sessions authenticated and secure</p>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-600 font-medium">⚠ Suspicious Users Blocked: 6</p>
                  <p className="text-sm text-muted-foreground">Automatic protection active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                System Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Production Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Movies Generated</span>
                      <span className="font-bold">847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Music Albums Created</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Processing Time</span>
                      <span className="font-bold">2,847 hours</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Quality Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>8K Content</span>
                      <span className="font-bold">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dolby Atmos Audio</span>
                      <span className="font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Optimization</span>
                      <span className="font-bold">99.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Copyright Notice */}
      <div className="text-center p-4 border-t border-muted">
        <p className="text-sm text-muted-foreground">
          © 2025 Ervin Remus Radosavlevici - AI Creative Studio Pro+ | Root System Access
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Proprietary Software - All Rights Reserved | Production Environment
        </p>
      </div>
    </div>
  );
}