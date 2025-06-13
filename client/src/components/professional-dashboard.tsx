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
      <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-500/50">
                <Crown className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Professional Studio - All Features Unlocked</h3>
                <p className="text-sm text-gray-300">Production-ready multimedia creation platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                <Sparkles className="h-3 w-3 mr-1" />
                PRO ACTIVE
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                <TrendingUp className="h-3 w-3 mr-1" />
                UNLIMITED
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      {feature.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                <Progress value={100} className="h-2 mb-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Fully Unlocked</span>
                  <span>100%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Status */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-green-400" />
              <div>
                <h4 className="text-lg font-semibold text-green-400">Production Environment Active</h4>
                <p className="text-sm text-gray-300">All professional features enabled • Global deployment ready</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-400">System Performance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}