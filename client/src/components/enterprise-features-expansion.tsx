
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Eye, 
  Zap, 
  Shield, 
  Globe, 
  Lock,
  Star,
  Infinity,
  Crown,
  Diamond,
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Headphones,
  Camera,
  Mic,
  FileVideo,
  Music,
  Palette,
  Settings,
  BarChart3,
  Users,
  Award
} from 'lucide-react';

export default function EnterpriseFeaturesExpansion({ userEmail }: { userEmail: string }) {
  const [activeFeatures, setActiveFeatures] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const rootUsers = [
    'ervin210@icloud.com',
    'radosavlevici210@icloud.com', 
    'radosavlevici.ervin@gmail.com'
  ];

  const isRootUser = rootUsers.includes(userEmail);

  const additionalFeatures = {
    'Neural Processing': [
      { id: 'emotion_ai', name: 'Emotion AI Analysis', icon: Brain, level: 'Quantum' },
      { id: 'scene_understanding', name: 'Scene Understanding', icon: Eye, level: 'Advanced' },
      { id: 'motion_prediction', name: 'Motion Prediction', icon: Zap, level: 'Professional' },
      { id: 'content_optimization', name: 'Content Optimization', icon: Star, level: 'Enterprise' }
    ],
    'Creative Suite': [
      { id: 'holographic_rendering', name: 'Holographic Rendering', icon: Diamond, level: 'Quantum' },
      { id: 'voice_synthesis', name: 'Voice Synthesis', icon: Mic, level: 'Studio' },
      { id: 'style_transfer', name: 'Neural Style Transfer', icon: Palette, level: 'Advanced' },
      { id: 'motion_capture', name: 'AI Motion Capture', icon: Camera, level: 'Professional' }
    ],
    'Security & Compliance': [
      { id: 'blockchain_verify', name: 'Blockchain Verification', icon: Shield, level: 'Military' },
      { id: 'deepfake_detection', name: 'Deepfake Detection', icon: Lock, level: 'Advanced' },
      { id: 'content_fingerprinting', name: 'Content Fingerprinting', icon: Eye, level: 'Enterprise' },
      { id: 'audit_compliance', name: 'Audit Compliance', icon: Award, level: 'SOC 2' }
    ],
    'Global Infrastructure': [
      { id: 'edge_computing', name: 'Edge Computing', icon: Globe, level: 'Worldwide' },
      { id: 'quantum_cloud', name: 'Quantum Cloud', icon: Cloud, level: 'Next-Gen' },
      { id: 'real_time_sync', name: 'Real-time Sync', icon: Zap, level: 'Instant' },
      { id: 'cdn_optimization', name: 'CDN Optimization', icon: Database, level: 'Global' }
    ]
  };

  useEffect(() => {
    if (isRootUser) {
      fetchAdditionalFeatures();
    }
  }, [userEmail, isRootUser]);

  const fetchAdditionalFeatures = async () => {
    try {
      const response = await fetch('/api/enterprise-features-expansion', {
        headers: { 'X-User-Email': userEmail }
      });
      const data = await response.json();
      setActiveFeatures(data);
    } catch (error) {
      console.error('Failed to fetch additional features:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isRootUser) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <Crown className="w-6 h-6" />
          Enterprise Features Expansion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="neural" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="neural" className="text-white">Neural</TabsTrigger>
            <TabsTrigger value="creative" className="text-white">Creative</TabsTrigger>
            <TabsTrigger value="security" className="text-white">Security</TabsTrigger>
            <TabsTrigger value="infrastructure" className="text-white">Global</TabsTrigger>
          </TabsList>

          {Object.entries(additionalFeatures).map(([category, features], index) => (
            <TabsContent key={category} value={Object.keys(additionalFeatures)[index]?.toLowerCase().split(' ')[0] || 'neural'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={feature.id} className="bg-black/20 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-indigo-400" />
                            <span className="text-white font-medium">{feature.name}</span>
                          </div>
                          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                            {feature.level}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-black/30 rounded-full">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Status: Active</span>
                            <span>Performance: 100%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Feature Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Infinity className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Processing Power</p>
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs">
              QUANTUM
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Access Level</p>
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
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Reach</p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              GLOBAL
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-3">
          <Button className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/30 flex-1">
            <Zap className="w-4 h-4 mr-2" />
            Activate All
          </Button>
          <Button className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
