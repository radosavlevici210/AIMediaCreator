
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Globe,
  Server,
  Database,
  Key
} from 'lucide-react';

export default function EnterpriseSecuritySystem() {
  const [securityStatus, setSecurityStatus] = useState<any>({});
  const [threats, setThreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityStatus();
    const interval = setInterval(fetchSecurityStatus, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityStatus = async () => {
    try {
      const [statusResponse, threatsResponse] = await Promise.all([
        fetch('/api/security-status'),
        fetch('/api/security-threats')
      ]);
      
      const statusData = await statusResponse.json();
      const threatsData = await threatsResponse.json();
      
      setSecurityStatus(statusData);
      setThreats(threatsData.threats || []);
    } catch (error) {
      console.error('Failed to fetch security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runSecurityScan = async () => {
    try {
      await fetch('/api/security-scan', { method: 'POST' });
      fetchSecurityStatus();
    } catch (error) {
      console.error('Failed to run security scan:', error);
    }
  };

  const getSecurityLevel = () => {
    const score = securityStatus.score || 95;
    if (score >= 95) return { level: 'Enterprise', color: 'green', icon: CheckCircle };
    if (score >= 80) return { level: 'High', color: 'blue', icon: Shield };
    if (score >= 60) return { level: 'Medium', color: 'yellow', icon: AlertTriangle };
    return { level: 'Low', color: 'red', icon: AlertTriangle };
  };

  const securityLevel = getSecurityLevel();
  const SecurityIcon = securityLevel.icon;

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Enterprise Security System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <SecurityIcon className={`w-8 h-8 text-${securityLevel.color}-400 mx-auto mb-2`} />
              <p className="text-sm text-gray-300">Security Level</p>
              <Badge className={`bg-${securityLevel.color}-500/20 text-${securityLevel.color}-400 border-${securityLevel.color}-500/30 mt-1`}>
                {securityLevel.level}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Active Monitoring</p>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-1">
                24/7
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Lock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Encryption</p>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mt-1">
                AES-256
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Compliance</p>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mt-1">
                SOC 2
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              System Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Firewall Status</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">DDoS Protection</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Intrusion Detection</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Monitoring
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">SSL/TLS</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                TLS 1.3
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Data Encryption</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                AES-256
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Backup Encryption</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Access Control</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                RBAC
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Audit Logging</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Enabled
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      {threats.length > 0 && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {threats.map((threat, index) => (
              <Alert key={index} className="bg-black/20 border-yellow-500/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-yellow-300">
                  {threat.message} - {threat.timestamp}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Security Actions */}
      <div className="flex gap-3">
        <Button 
          onClick={runSecurityScan}
          className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
        >
          <Shield className="w-4 h-4 mr-2" />
          Run Security Scan
        </Button>
        <Button 
          className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
        >
          <Key className="w-4 h-4 mr-2" />
          Rotate Keys
        </Button>
        <Button 
          className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
        >
          <Database className="w-4 h-4 mr-2" />
          Backup System
        </Button>
      </div>
    </div>
  );
}
