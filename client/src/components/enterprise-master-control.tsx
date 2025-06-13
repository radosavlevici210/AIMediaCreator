
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Crown, 
  Shield, 
  Infinity, 
  Globe, 
  Zap, 
  Eye, 
  Lock,
  Diamond,
  Star,
  Award,
  Cpu,
  Database,
  Cloud,
  BarChart3
} from 'lucide-react';

export default function EnterpriseMasterControl({ userEmail }: { userEmail: string }) {
  const [masterFeatures, setMasterFeatures] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const rootUsers = [
    'ervin210@icloud.com',
    'radosavlevici210@icloud.com', 
    'radosavlevici.ervin@gmail.com'
  ];

  const isRootUser = rootUsers.includes(userEmail);

  const systemControls = [
    { id: 'unlimited_processing', name: 'Unlimited Processing', icon: Infinity, status: true },
    { id: 'quantum_ai', name: 'Quantum AI Engine', icon: Cpu, status: true },
    { id: 'global_distribution', name: 'Global Distribution', icon: Globe, status: true },
    { id: 'enterprise_security', name: 'Enterprise Security', icon: Shield, status: true },
    { id: 'master_visibility', name: 'Master Visibility', icon: Eye, status: true },
    { id: 'transparent_access', name: 'Transparent Access', icon: Diamond, status: true },
    { id: 'cross_platform', name: 'Cross-Platform Bridge', icon: Zap, status: true },
    { id: 'premium_features', name: 'Premium Features', icon: Star, status: true }
  ];

  useEffect(() => {
    if (isRootUser) {
      fetchMasterControls();
    }
  }, [userEmail, isRootUser]);

  const fetchMasterControls = async () => {
    try {
      const response = await fetch('/api/master-controls', {
        headers: { 'X-User-Email': userEmail }
      });
      const data = await response.json();
      setMasterFeatures(data);
    } catch (error) {
      console.error('Failed to fetch master controls:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = async (featureId: string) => {
    try {
      await fetch('/api/master-controls/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify({ featureId, enabled: !masterFeatures[featureId] })
      });
      
      setMasterFeatures(prev => ({
        ...prev,
        [featureId]: !prev[featureId]
      }));
    } catch (error) {
      console.error('Failed to toggle feature:', error);
    }
  };

  if (!isRootUser) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-600/10 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Crown className="w-6 h-6" />
          Enterprise Master Control
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2">
            ROOT ACCESS
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Authority</p>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
              MASTER
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Security</p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              MILITARY
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Infinity className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Resources</p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              UNLIMITED
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Globe className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Reach</p>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
              GLOBAL
            </Badge>
          </div>
        </div>

        {/* Master Controls */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">System Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemControls.map((control) => {
              const Icon = control.icon;
              return (
                <div key={control.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">{control.name}</span>
                  </div>
                  <Switch
                    checked={control.status}
                    onCheckedChange={() => toggleFeature(control.id)}
                    className="data-[state=checked]:bg-yellow-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30 flex-1">
            <Award className="w-4 h-4 mr-2" />
            Grant All Access
          </Button>
          <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 flex-1">
            <Database className="w-4 h-4 mr-2" />
            System Backup
          </Button>
          <Button className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 flex-1">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
