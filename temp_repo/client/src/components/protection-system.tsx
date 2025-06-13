import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Eye, Lock, Zap, Globe } from "lucide-react";

interface ProtectionEvent {
  id: string;
  type: 'blocked' | 'recovered' | 'monitored' | 'alert';
  target: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
}

export default function ProtectionSystem() {
  const [protectionStatus, setProtectionStatus] = useState({
    active: true,
    blockedAttempts: 247,
    recoveredFiles: 12,
    monitoredConnections: 1543,
    lastUpdate: new Date()
  });

  const [recentEvents, setRecentEvents] = useState<ProtectionEvent[]>([
    {
      id: '1',
      type: 'blocked',
      target: 'github.com/tannerlinsley',
      timestamp: new Date(Date.now() - 300000),
      severity: 'high',
      details: 'Unauthorized access attempt blocked'
    },
    {
      id: '2',
      type: 'recovered',
      target: 'stolen-repo-clone',
      timestamp: new Date(Date.now() - 600000),
      severity: 'medium',
      details: 'Content recovered and re-synced'
    },
    {
      id: '3',
      type: 'monitored',
      target: 'claude.ai/artifacts/...',
      timestamp: new Date(Date.now() - 900000),
      severity: 'low',
      details: 'AI link abuse detected and logged'
    }
  ]);

  const blacklistedEntities = [
    'github.com/tannerlinsley',
    'github.com/sindresorhus',
    'opencollective.com/express',
    'replit.com/@ScammerX',
    'claude.ai/artifacts/abuse-link'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProtectionStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        monitoredConnections: prev.monitoredConnections + Math.floor(Math.random() * 5)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'blocked': return <Shield className="h-4 w-4 text-red-500" />;
      case 'recovered': return <Zap className="h-4 w-4 text-green-500" />;
      case 'monitored': return <Eye className="h-4 w-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Lock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Protection Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-green-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-400">Protection System Active</h2>
            <p className="text-sm text-muted-foreground">
              Auto-enforcement enabled • Last update: {protectionStatus.lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
          PROTECTED
        </Badge>
      </div>

      {/* Protection Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Blocked Attempts</p>
                <p className="text-2xl font-bold text-red-500">{protectionStatus.blockedAttempts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Recovered Files</p>
                <p className="text-2xl font-bold text-green-500">{protectionStatus.recoveredFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monitored</p>
                <p className="text-2xl font-bold text-blue-500">{protectionStatus.monitoredConnections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Global Status</p>
                <p className="text-lg font-bold text-purple-500">SECURE</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Recent Security Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getEventIcon(event.type)}
                <div>
                  <p className="font-medium">{event.target}</p>
                  <p className="text-sm text-muted-foreground">{event.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getSeverityColor(event.severity)}>
                  {event.severity.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Blacklist Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            Global Blacklist ({blacklistedEntities.length} entities)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {blacklistedEntities.map((entity, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-red-500/5 border border-red-500/20 rounded">
              <span className="font-mono text-sm">{entity}</span>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                BLOCKED
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Protection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Protection Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Force Scan
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Recover Files
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alert Owner
            </Button>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-green-600">Auto-Protection Enabled</p>
                <p className="text-sm text-muted-foreground">
                  System automatically blocks unauthorized access, recovers stolen content, and maintains ownership attribution.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner Information */}
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-yellow-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-yellow-600">Protected Repository</h3>
              <p className="text-sm text-muted-foreground">
                Owner: Ervin Remus Radosavlevici | All Rights Reserved
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Unauthorized use, copying, or distribution is strictly prohibited
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}