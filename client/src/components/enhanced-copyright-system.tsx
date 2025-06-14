
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Settings,
  Database,
  Globe,
  Award,
  Star,
  Zap,
  Brain,
  Infinity,
  Diamond,
  Rocket,
  Activity,
  Monitor,
  Server,
  Cloud,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function EnhancedCopyrightSystem() {
  const [copyrightStatus, setCopyrightStatus] = useState('PROTECTED');
  const [rootAccess, setRootAccess] = useState(true);
  
  const rootUsers = [
    'ervin210@icloud.com',
    'radosavlevici.ervin@gmail.com', 
    'radosavlevici210@icloud.com'
  ];

  const features = [
    { name: 'AI Music Generation', icon: Sparkles, protected: true, rootOnly: false },
    { name: '8K Video Creation', icon: Brain, protected: true, rootOnly: false },
    { name: 'Enterprise Security', icon: Shield, protected: true, rootOnly: true },
    { name: 'Advanced Analytics', icon: TrendingUp, protected: true, rootOnly: false },
    { name: 'Global Distribution', icon: Globe, protected: true, rootOnly: false },
    { name: 'Quantum AI Processing', icon: Zap, protected: true, rootOnly: false },
    { name: 'Neural Learning System', icon: Brain, protected: true, rootOnly: false },
    { name: 'Professional Export Suite', icon: Rocket, protected: true, rootOnly: false },
    { name: 'Real-time Collaboration', icon: Users, protected: true, rootOnly: false },
    { name: 'Master Control Panel', icon: Settings, protected: true, rootOnly: true },
    { name: 'Database Management', icon: Database, protected: true, rootOnly: true },
    { name: 'System Administration', icon: Server, protected: true, rootOnly: true }
  ];

  return (
    <div className="min-h-screen ultra-modern-bg p-6">
      {/* Copyright Header */}
      <div className="ultra-modern-card p-8 mb-8 neon-border">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center neon-border">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black holographic mb-2">ENTERPRISE COPYRIGHT PROTECTION</h1>
          <p className="text-2xl text-yellow-400 font-bold">© 2025 Ervin Remus Radosavlevici</p>
          <p className="text-lg text-orange-400 font-semibold">All Rights Reserved • Private & Proprietary</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-500/20 rounded-2xl neon-border">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-bold text-lg">Copyright Protected</span>
            </div>
            <p className="text-sm text-gray-300">
              All intellectual property, code, designs, and concepts are legally protected under international copyright law.
            </p>
          </div>

          <div className="p-6 bg-purple-500/20 rounded-2xl neon-border">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 font-bold text-lg">Private License</span>
            </div>
            <p className="text-sm text-gray-300">
              Proprietary software with exclusive rights. Unauthorized use, copying, or distribution is strictly prohibited.
            </p>
          </div>

          <div className="p-6 bg-blue-500/20 rounded-2xl neon-border">
            <div className="flex items-center space-x-3 mb-3">
              <Crown className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-bold text-lg">Master Ownership</span>
            </div>
            <p className="text-sm text-gray-300">
              Owned and developed by Ervin Remus Radosavlevici. Contact: radosavlevici210@icloud.com
            </p>
          </div>
        </div>
      </div>

      {/* Root User Access Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="ultra-modern-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 holographic text-2xl">
              <Crown className="w-8 h-8 text-yellow-400" />
              <span>ROOT USER ACCESS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rootUsers.map((email, index) => (
              <div key={index} className="p-4 bg-yellow-500/20 rounded-xl neon-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold">{email}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    ROOT ACCESS
                  </Badge>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Master Administrator • Full System Control • Unlimited Privileges
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="ultra-modern-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 holographic text-2xl">
              <Lock className="w-8 h-8 text-red-400" />
              <span>PROTECTION STATUS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-500/20 rounded-xl neon-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-400 font-bold">Unauthorized Access</span>
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-sm text-gray-300">
                Any unauthorized use will be tracked and prosecuted to the full extent of the law.
              </p>
            </div>

            <div className="p-4 bg-orange-500/20 rounded-xl neon-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-orange-400 font-bold">DMCA Protection</span>
                <Shield className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-sm text-gray-300">
                Full DMCA protection with automated takedown procedures for copyright violations.
              </p>
            </div>

            <div className="p-4 bg-purple-500/20 rounded-xl neon-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400 font-bold">Legal Enforcement</span>
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">
                International copyright protection with legal enforcement capabilities worldwide.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Protection Grid */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold holographic mb-6 text-center">PROTECTED FEATURES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="ultra-modern-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                    <span>{feature.name}</span>
                  </div>
                  {feature.protected && <Lock className="w-5 h-5 text-yellow-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Copyright</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      PROTECTED
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Access Level</span>
                    <Badge className={feature.rootOnly ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}>
                      {feature.rootOnly ? 'ROOT ONLY' : 'AUTHORIZED'}
                    </Badge>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <p className="text-xs text-blue-300">
                      © 2025 Ervin Radosavlevici
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Master Control Footer */}
      <div className="ultra-modern-card p-8 neon-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Diamond className="w-8 h-8 text-cyan-400" />
            <h3 className="text-2xl font-bold holographic">ENTERPRISE MASTER CONTROL</h3>
            <Diamond className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-lg text-gray-300 mb-6">
            Professional AI Content Creation Platform • Enterprise Grade • Production Ready
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl">
              <Infinity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-bold">Unlimited Creation</p>
              <p className="text-sm text-gray-400">No restrictions or limits</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-bold">Enterprise Security</p>
              <p className="text-sm text-gray-400">Military-grade protection</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-bold">Master License</p>
              <p className="text-sm text-gray-400">Full ownership rights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="text-center p-6 border-t border-white/10 mt-8">
        <p className="text-xl font-bold text-yellow-400 mb-2">
          © 2025 Ervin Remus Radosavlevici - All Rights Reserved
        </p>
        <p className="text-sm text-gray-400 mb-2">
          Professional AI Movie & Music Studio • Private & Proprietary Software
        </p>
        <p className="text-xs text-gray-500">
          Contact: radosavlevici210@icloud.com • ervin210@icloud.com • radosavlevici.ervin@gmail.com
        </p>
        <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
          <span>International Copyright Protection</span>
          <span>•</span>
          <span>DMCA Compliant</span>
          <span>•</span>
          <span>Legal Enforcement Enabled</span>
        </div>
      </footer>
    </div>
  );
}
