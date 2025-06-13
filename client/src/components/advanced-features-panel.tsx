
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Infinity, 
  Zap, 
  Crown, 
  Globe, 
  Shield, 
  Star, 
  Rocket, 
  Brain,
  Eye,
  Lock,
  Unlock,
  Settings,
  ChevronRight
} from 'lucide-react';

export default function AdvancedFeaturesPanel({ userEmail }: { userEmail: string }) {
  const [features, setFeatures] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const rootUsers = [
    'ervin210@icloud.com',
    'radosavlevici210@icloud.com', 
    'radosavlevici.ervin@gmail.com'
  ];

  const isRootUser = rootUsers.includes(userEmail);

  const advancedFeatures = [
    { id: 'unlimited_duration', name: 'Unlimited Duration', icon: Infinity, enabled: isRootUser },
    { id: 'quantum_ai', name: 'Quantum AI Processing', icon: Brain, enabled: isRootUser },
    { id: 'realtime_collab', name: 'Real-time Collaboration', icon: Globe, enabled: isRootUser },
    { id: 'advanced_export', name: '8K/IMAX Export', icon: Star, enabled: isRootUser },
    { id: 'master_visibility', name: 'Master Visibility', icon: Eye, enabled: isRootUser },
    { id: 'system_override', name: 'System Override', icon: Unlock, enabled: isRootUser },
    { id: 'transparent_access', name: 'Transparent Access', icon: Shield, enabled: isRootUser },
    { id: 'cross_platform', name: 'Cross-Platform Sync', icon: Rocket, enabled: isRootUser },
    { id: 'neural_enhancement', name: 'Neural Enhancement', icon: Brain, enabled: isRootUser },
    { id: 'holographic_preview', name: 'Holographic Preview', icon: Eye, enabled: isRootUser },
    { id: 'quantum_rendering', name: 'Quantum Rendering', icon: Zap, enabled: isRootUser },
    { id: 'ai_voice_cloning', name: 'AI Voice Cloning', icon: Settings, enabled: isRootUser },
    { id: 'deepfake_detection', name: 'Deepfake Detection', icon: Shield, enabled: isRootUser },
    { id: 'blockchain_verify', name: 'Blockchain Verification', icon: Lock, enabled: isRootUser },
    { id: 'emotion_analysis', name: 'Emotion Analysis', icon: Brain, enabled: isRootUser },
    { id: 'auto_translation', name: 'Auto Translation', icon: Globe, enabled: isRootUser }
  ];

  useEffect(() => {
    if (isRootUser) {
      fetchAdvancedFeatures();
    }
  }, [userEmail, isRootUser]);

  const fetchAdvancedFeatures = async () => {
    try {
      const response = await fetch('/api/advanced-features', {
        headers: {
          'X-User-Email': userEmail
        }
      });
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Failed to fetch advanced features:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = async (featureId: string) => {
    if (!isRootUser) return;

    try {
      await fetch('/api/advanced-features/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify({
          featureId,
          enabled: !features[featureId]
        })
      });

      setFeatures(prev => ({
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
    <Card className="bg-gradient-to-br from-purple-500/20 to-blue-600/10 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Crown className="w-6 h-6" />
          Advanced Features Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Infinity className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Duration</p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              UNLIMITED
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">AI Level</p>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
              QUANTUM
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Quality</p>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
              8K/IMAX
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Access</p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              MASTER
            </Badge>
          </div>
        </div>

        {/* Individual Feature Controls */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-400">Feature Controls</h3>
          <div className="space-y-2">
            {advancedFeatures.map((feature) => {
              const Icon = feature.icon;
              const isEnabled = features[feature.id] !== false;
              
              return (
                <div key={feature.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">{feature.name}</span>
                    {isEnabled && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        ACTIVE
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => toggleFeature(feature.id)}
                    disabled={!isRootUser}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={() => window.location.reload()}
            className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 flex-1"
          >
            <Zap className="w-4 h-4 mr-2" />
            Apply Changes
          </Button>
          <Button 
            onClick={fetchAdvancedFeatures}
            className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 flex-1"
          >
            <Settings className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
