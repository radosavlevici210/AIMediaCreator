
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, AlertTriangle, Github, Bot, RefreshCw, Check, X } from 'lucide-react';

interface BlockedEntity {
  id: string;
  type: 'github' | 'replit-agent' | 'suspicious-user';
  identifier: string;
  reason: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
}

interface DataRecoveryLog {
  id: string;
  entityId: string;
  recoveryType: 'content' | 'repository' | 'user-data';
  status: 'initiated' | 'in-progress' | 'completed' | 'failed';
  timestamp: string;
  details: string;
}

export default function SecurityBlockingDashboard() {
  const [blockedEntities, setBlockedEntities] = useState<BlockedEntity[]>([]);
  const [recoveryLogs, setRecoveryLogs] = useState<DataRecoveryLog[]>([]);
  const [flagAgentForm, setFlagAgentForm] = useState({ identifier: '', reason: '' });
  const [blockGithubForm, setBlockGithubForm] = useState({ githubUrl: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<{ type: 'success' | 'error'; message: string }[]>([]);

  const addAlert = (type: 'success' | 'error', message: string) => {
    setAlerts(prev => [...prev, { type, message }]);
    setTimeout(() => setAlerts(prev => prev.slice(1)), 5000);
  };

  const fetchBlockedEntities = async () => {
    try {
      const response = await fetch('/api/security/blocked-entities', {
        headers: { 'x-user-email': 'radosavlevici.ervin@gmail.com' }
      });
      if (response.ok) {
        const data = await response.json();
        setBlockedEntities(data.entities || []);
      }
    } catch (error) {
      console.error('Failed to fetch blocked entities:', error);
    }
  };

  const fetchRecoveryLogs = async () => {
    try {
      const response = await fetch('/api/security/recovery-logs', {
        headers: { 'x-user-email': 'radosavlevici.ervin@gmail.com' }
      });
      if (response.ok) {
        const data = await response.json();
        setRecoveryLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch recovery logs:', error);
    }
  };

  const flagReplitAgent = async () => {
    if (!flagAgentForm.identifier || !flagAgentForm.reason) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/security/flag-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'radosavlevici.ervin@gmail.com'
        },
        body: JSON.stringify(flagAgentForm)
      });
      
      if (response.ok) {
        const data = await response.json();
        addAlert('success', `Replit agent flagged: ${flagAgentForm.identifier}`);
        setFlagAgentForm({ identifier: '', reason: '' });
        fetchBlockedEntities();
        fetchRecoveryLogs();
      } else {
        const error = await response.json();
        addAlert('error', error.error || 'Failed to flag agent');
      }
    } catch (error) {
      addAlert('error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const blockGithubAccount = async () => {
    if (!blockGithubForm.githubUrl || !blockGithubForm.reason) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/security/block-github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'radosavlevici.ervin@gmail.com'
        },
        body: JSON.stringify(blockGithubForm)
      });
      
      if (response.ok) {
        const data = await response.json();
        addAlert('success', `GitHub account blocked: ${blockGithubForm.githubUrl}`);
        setBlockGithubForm({ githubUrl: '', reason: '' });
        fetchBlockedEntities();
        fetchRecoveryLogs();
      } else {
        const error = await response.json();
        addAlert('error', error.error || 'Failed to block GitHub account');
      }
    } catch (error) {
      addAlert('error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const initiateDataRecovery = async (entityId: string, recoveryType: string) => {
    try {
      const response = await fetch('/api/security/recover-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'radosavlevici.ervin@gmail.com'
        },
        body: JSON.stringify({ entityId, recoveryType })
      });
      
      if (response.ok) {
        addAlert('success', `Data recovery initiated for ${recoveryType}`);
        fetchRecoveryLogs();
      } else {
        const error = await response.json();
        addAlert('error', error.error || 'Failed to initiate recovery');
      }
    } catch (error) {
      addAlert('error', 'Network error occurred');
    }
  };

  useEffect(() => {
    fetchBlockedEntities();
    fetchRecoveryLogs();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchBlockedEntities();
      fetchRecoveryLogs();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'in-progress': return 'text-blue-600';
      default: return 'text-yellow-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.type === 'error' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Blocking Dashboard
            </CardTitle>
            <CardDescription>
              Flag Replit agents and block GitHub accounts with automatic data recovery
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="actions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Entities</TabsTrigger>
            <TabsTrigger value="recovery">Data Recovery</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Flag Replit Agent
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Agent identifier or user-agent string"
                    value={flagAgentForm.identifier}
                    onChange={(e) => setFlagAgentForm(prev => ({ ...prev, identifier: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Reason for flagging"
                    value={flagAgentForm.reason}
                    onChange={(e) => setFlagAgentForm(prev => ({ ...prev, reason: e.target.value }))}
                  />
                  <Button 
                    onClick={flagReplitAgent} 
                    disabled={loading || !flagAgentForm.identifier || !flagAgentForm.reason}
                    className="w-full"
                  >
                    {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Bot className="h-4 w-4 mr-2" />}
                    Flag Agent
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    Block GitHub Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="GitHub URL or username"
                    value={blockGithubForm.githubUrl}
                    onChange={(e) => setBlockGithubForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Reason for blocking"
                    value={blockGithubForm.reason}
                    onChange={(e) => setBlockGithubForm(prev => ({ ...prev, reason: e.target.value }))}
                  />
                  <Button 
                    onClick={blockGithubAccount} 
                    disabled={loading || !blockGithubForm.githubUrl || !blockGithubForm.reason}
                    className="w-full"
                    variant="destructive"
                  >
                    {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Github className="h-4 w-4 mr-2" />}
                    Block Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blocked" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Entities ({blockedEntities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {blockedEntities.length === 0 ? (
                  <p className="text-muted-foreground">No blocked entities found</p>
                ) : (
                  <div className="space-y-4">
                    {blockedEntities.map((entity) => (
                      <div key={entity.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {entity.type === 'github' ? <Github className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            <span className="font-medium">{entity.identifier}</span>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={getSeverityColor(entity.severity)}>{entity.severity}</Badge>
                            <Badge variant={entity.status === 'active' ? 'destructive' : 'secondary'}>
                              {entity.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{entity.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          Blocked: {new Date(entity.timestamp).toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => initiateDataRecovery(entity.id, 'content')}
                          className="mt-2"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Recover Data
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Recovery Logs ({recoveryLogs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {recoveryLogs.length === 0 ? (
                  <p className="text-muted-foreground">No recovery operations found</p>
                ) : (
                  <div className="space-y-4">
                    {recoveryLogs.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span className="font-medium">{log.recoveryType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {log.status === 'completed' && <Check className="h-4 w-4 text-green-600" />}
                            {log.status === 'failed' && <X className="h-4 w-4 text-red-600" />}
                            <span className={`text-sm font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground">
                          Started: {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{blockedEntities.filter(e => e.status === 'active').length}</div>
                    <div className="text-sm text-muted-foreground">Active Blocks</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{recoveryLogs.filter(l => l.status === 'in-progress').length}</div>
                    <div className="text-sm text-muted-foreground">Recovery In Progress</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{recoveryLogs.filter(l => l.status === 'completed').length}</div>
                    <div className="text-sm text-muted-foreground">Successful Recoveries</div>
                  </div>
                </div>
                
                <Alert className="mt-4">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Automatic monitoring is active. Suspicious activities are detected and blocked in real-time.
                    Data recovery is initiated automatically for all blocked entities.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
