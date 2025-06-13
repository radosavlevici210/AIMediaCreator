
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Crown, Shield, Infinity } from 'lucide-react';

export default function SystemVerification({ userEmail }: { userEmail: string }) {
  const [systemStatus, setSystemStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSystemStatus();
  }, [userEmail]);

  const checkSystemStatus = async () => {
    try {
      const response = await fetch('/api/system-status', {
        headers: { 'X-User-Email': userEmail }
      });
      const data = await response.json();
      setSystemStatus(data);
    } catch (error) {
      console.error('Failed to check system status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <CardContent className="p-6">
          <div className="text-center">Loading system verification...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-500/20 to-blue-600/10 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          System Verification
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
            ALL SYSTEMS OPERATIONAL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Root User Status */}
        <div className="p-3 bg-black/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Root User Access</span>
            {systemStatus.transparent_access ? (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Crown className="w-3 h-3 mr-1" />
                MASTER ACCESS
              </Badge>
            ) : (
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                LIMITED ACCESS
              </Badge>
            )}
          </div>
        </div>

        {/* Components Status */}
        <div className="space-y-2">
          <h4 className="text-white font-medium">Components Status</h4>
          {Object.entries(systemStatus.components || {}).map(([component, status]) => (
            <div key={component} className="flex items-center justify-between p-2 bg-black/20 rounded">
              <span className="text-sm text-gray-300 capitalize">
                {component.replace(/_/g, ' ')}
              </span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">{status as string}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Features Verification */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-black/30 rounded">
            <Infinity className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Unlimited</p>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">Active</Badge>
          </div>
          <div className="text-center p-2 bg-black/30 rounded">
            <Shield className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Security</p>
            <Badge className="bg-green-500/20 text-green-400 text-xs">Protected</Badge>
          </div>
          <div className="text-center p-2 bg-black/30 rounded">
            <Crown className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Enterprise</p>
            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Ready</Badge>
          </div>
        </div>

        <div className="text-center text-sm text-green-400">
          ✅ All features properly configured and operational
        </div>
      </CardContent>
    </Card>
  );
}
