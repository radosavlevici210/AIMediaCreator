import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Crown, 
  Shield, 
  Globe, 
  Rocket,
  Star,
  Sparkles,
  Infinity,
  Award,
  TrendingUp
} from "lucide-react";

export default function ProfessionalDashboard() {
  const [unlocked] = useState(true); // Always unlocked for production

  const proFeatures = [
    {
      icon: Crown,
      title: "Unlimited Creation",
      description: "Create unlimited videos, music, and animations",
      status: "active",
      color: "text-yellow-400"
    },
    {
      icon: Rocket,
      title: "8K Ultra HD Video",
      description: "Professional cinema-quality video generation",
      status: "active", 
      color: "text-blue-400"
    },
    {
      icon: Star,
      title: "Studio Quality Audio",
      description: "Dolby Atmos and professional mixing",
      status: "active",
      color: "text-purple-400"
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Export to 10+ professional formats",
      status: "active",
      color: "text-green-400"
    },
    {
      icon: Infinity,
      title: "Quantum AI Processing", 
      description: "Advanced AI with unlimited processing power",
      status: "active",
      color: "text-cyan-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced protection and monitoring",
      status: "active",
      color: "text-red-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pro Status Banner */}
      <Card className="ultra-modern-card production-ready">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg glow-primary">
                <Crown className="h-6 w-6 text-white animate-float" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">Professional Studio - All Features Unlocked</h3>
                <p className="text-sm text-muted-foreground">Production-ready multimedia creation platform</p>
                <p className="text-xs text-muted-foreground mt-1">© 2025 Ervin Remus Radosavlevici - ervin210@icloud.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="success-state">
                <Sparkles className="h-3 w-3 mr-1" />
                PRO ACTIVE
              </Badge>
              <Badge className="premium-feature">
                <TrendingUp className="h-3 w-3 mr-1" />
                UNLIMITED
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Features Grid */}
      <div className="modern-grid">
        {proFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="premium-feature hover-lift glass-morphism">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                    <span>{feature.title}</span>
                  </div>
                  <Badge className="success-state">ACTIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <Progress value={100} className="w-full mr-3" />
                  <span className="text-xs text-green-400 font-medium">100%</span>
                </div>
                <div className="text-xs text-muted-foreground border-t border-border/30 pt-2">
                  © 2025 Ervin Remus Radosavlevici - ervin210@icloud.com
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Copyright and Production Credits */}
      <Card className="ultra-modern-card production-ready">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-gradient">Production Credits</span>
            </div>
            <p className="text-sm font-medium text-primary">© 2025 Ervin Remus Radosavlevici</p>
            <p className="text-xs text-muted-foreground">ervin210@icloud.com | radosavlevici.ervin@gmail.com</p>
            <p className="text-xs text-muted-foreground">AI Creative Studio Pro+ | Enterprise Production Ready | All Rights Reserved</p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Badge className="production-ready">
                <Shield className="w-3 h-3 mr-1" />
                ENTERPRISE
              </Badge>
              <Badge className="premium-feature">
                <Sparkles className="w-3 h-3 mr-1" />
                UNLIMITED
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Rocket className="w-3 h-3 mr-1" />
                PRODUCTION
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}