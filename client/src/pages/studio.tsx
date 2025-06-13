import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EnhancedMusicGenerator from "@/components/enhanced-music-generator";
import EnhancedVideoCreator from "@/components/enhanced-video-creator";
import EnhancedCreationSuite from "@/components/enhanced-creation-suite";
import UniversalWorkspace from "@/components/universal-workspace";
import ProductionDashboard from "@/components/production-dashboard";
import ProfessionalDashboard from "@/components/professional-dashboard";
import EnterpriseAIStudio from "@/components/enterprise-ai-studio";
import AdvancedAnimationStudio from "@/components/advanced-animation-studio";
import PerformanceMonitor from "@/components/performance-monitor";
import SecurityMonitor from "@/components/security-monitor";
import RootUserPanel from "@/components/root-user-panel";
import UserManagement from "@/components/user-management";
import ProductionFeatures from "@/components/production-features";
import CollaborationWorkspace from "@/components/collaboration-workspace";
import DistributionWorkspace from "@/components/distribution-workspace";
import AnalyticsWorkspace from "@/components/analytics-workspace";
import BatchProcessor from "@/components/batch-processor";
import TransparentAccessBridge from "@/components/transparent-access-bridge";
import AdvancedFeaturesPanel from "@/components/advanced-features-panel";
import EnterpriseSecuritySystem from "@/components/enterprise-security-system";
import EnterpriseFeaturesExpansion from "@/components/enterprise-features-expansion";
import EnterpriseMasterControl from "@/components/enterprise-master-control";
import SystemVerification from "@/components/system-verification";
import DevelopmentDashboard from "@/components/development-dashboard";
import SecurityBlockingDashboard from "@/components/security-blocking-dashboard";
import { 
  Crown, 
  Sparkles, 
  Play, 
  Music, 
  Video, 
  Wand2, 
  Users,
  BarChart3,
  Settings,
  Shield,
  Monitor,
  Rocket,
  Brain,
  Film,
  Palette,
  Globe,
  Zap,
  Activity,
  Database,
  Cloud,
  Lock,
  Star,
  Award,
  Target,
  TrendingUp,
  Infinity,
  Diamond,
  Eye,
  Headphones,
  Camera,
  Edit3,
  Download,
  Upload,
  Share2
} from "lucide-react";

export default function Studio() {
  const [activeTab, setActiveTab] = useState("enterprise-suite");
  const [isRootUser, setIsRootUser] = useState(true);
  const mockUserEmail = "ervin210@icloud.com";

  const [studioStats] = useState({
    totalProjects: 47892,
    activeUsers: 12847,
    contentGenerated: "189,473 hours",
    qualityRating: "99.8%",
    systemUptime: "99.99%",
    globalReach: "247 countries"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Crown className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">AI Creative Studio Pro+</h1>
                <p className="text-blue-100 text-lg">Professional Enterprise Content Creation Platform</p>
                <p className="text-blue-200 text-sm">Unlimited Duration | 8K Quality | Global Distribution</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-3 py-1">
                  <Infinity className="w-4 h-4 mr-1" />
                  Unlimited
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                  <Diamond className="w-4 h-4 mr-1" />
                  Enterprise
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
                  <Brain className="w-4 h-4 mr-1" />
                  Quantum AI
                </Badge>
              </div>
              <div className="text-right text-sm text-blue-200">
                <p>© 2025 Ervin Remus Radosavlevici</p>
                <p>Production Environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-blue-400">{studioStats.totalProjects.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Projects</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-400">{studioStats.activeUsers.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Users</p>
            </div>
            <div>
              <p className="text-lg font-bold text-purple-400">{studioStats.contentGenerated}</p>
              <p className="text-xs text-gray-400">Content</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-400">{studioStats.qualityRating}</p>
              <p className="text-xs text-gray-400">Quality</p>
            </div>
            <div>
              <p className="text-lg font-bold text-cyan-400">{studioStats.systemUptime}</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </div>
            <div>
              <p className="text-lg font-bold text-pink-400">{studioStats.globalReach}</p>
              <p className="text-xs text-gray-400">Global</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-black/20 backdrop-blur-sm h-auto p-2 gap-1">
            <TabsTrigger 
              value="enterprise-suite" 
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 flex flex-col items-center gap-1 p-3"
            >
              <Crown className="w-5 h-5" />
              <span className="text-xs">Enterprise</span>
            </TabsTrigger>

            <TabsTrigger 
              value="creation-studio" 
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 flex flex-col items-center gap-1 p-3"
            >
              <Wand2 className="w-5 h-5" />
              <span className="text-xs">Creation</span>
            </TabsTrigger>

            <TabsTrigger 
              value="animation-studio" 
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300 flex flex-col items-center gap-1 p-3"
            >
              <Film className="w-5 h-5" />
              <span className="text-xs">Animation</span>
            </TabsTrigger>

             <TabsTrigger 
              value="development" 
              className="data-[state=active]:bg-gray-500/20 data-[state=active]:text-gray-300 flex flex-col items-center gap-1 p-3"
            >
              <Zap className="w-5 h-5" />
              <span className="text-xs">Development</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 flex flex-col items-center gap-1 p-3"
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs">Security</span>
            </TabsTrigger>

            <TabsTrigger 
              value="collaboration" 
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 flex flex-col items-center gap-1 p-3"
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Collaborate</span>
            </TabsTrigger>

            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300 flex flex-col items-center gap-1 p-3"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>

            <TabsTrigger 
              value="distribution" 
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300 flex flex-col items-center gap-1 p-3"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs">Distribution</span>
            </TabsTrigger>

            <TabsTrigger 
              value="monitoring" 
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 flex flex-col items-center gap-1 p-3"
            >
              <Monitor className="w-5 h-5" />
              <span className="text-xs">Monitor</span>
            </TabsTrigger>

            <TabsTrigger 
              value="admin" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 flex flex-col items-center gap-1 p-3"
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="enterprise-suite" className="mt-6">
            <EnterpriseAIStudio />
          </TabsContent>

          <TabsContent value="creation-studio" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Music className="h-5 w-5 text-purple-400" />
                    Music Studio Pro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedMusicGenerator />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Video className="h-5 w-5 text-blue-400" />
                    Video Studio Pro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedVideoCreator />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    Enhanced Suite
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedCreationSuite />
                </CardContent>
              </Card>
            </div>

            <UniversalWorkspace />
          </TabsContent>

          <TabsContent value="animation-studio" className="mt-6">
            <AdvancedAnimationStudio />
          </TabsContent>

           <TabsContent value="development" className="mt-6">
            <DevelopmentDashboard />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <SecurityBlockingDashboard />
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="mt-6">
            <CollaborationWorkspace />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsWorkspace />
          </TabsContent>

          <TabsContent value="distribution" className="mt-6">
            <DistributionWorkspace />
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5 text-green-400" />
                    Performance Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceMonitor />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Shield className="h-5 w-5 text-red-400" />
                    Security Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SecurityMonitor />
                </CardContent>
              </Card>
            </div>

            <ProductionFeatures />

            <EnterpriseSecuritySystem />
          </TabsContent>

          <TabsContent value="admin" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    Root Administration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RootUserPanel />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-blue-400" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UserManagement />
                </CardContent>
              </Card>
            </div>

            <BatchProcessor />

            {/* Advanced Features Panel for Root Users */}
            {isRootUser && (
              <AdvancedFeaturesPanel userEmail={mockUserEmail} />
            )}

            {/* Enterprise Master Control */}
            {isRootUser && (
              <EnterpriseMasterControl userEmail={mockUserEmail} />
            )}

            {/* Enterprise Features Expansion */}
            {isRootUser && (
              <EnterpriseFeaturesExpansion userEmail={mockUserEmail} />
            )}

            {/* Enterprise Security System */}
            <EnterpriseSecuritySystem />

            {/* System Verification */}
            <SystemVerification userEmail={mockUserEmail} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Production Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Enterprise Features</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Unlimited content duration</li>
                <li>• 8K/IMAX quality output</li>
                <li>• Real-time collaboration</li>
                <li>• Global CDN distribution</li>
                <li>• 24/7 enterprise support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">AI Technology</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Quantum AI processing</li>
                <li>• Neural style transfer</li>
                <li>• Predictive analytics</li>
                <li>• Voice synthesis AI</li>
                <li>• Advanced automation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Production Ready</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 99.99% uptime SLA</li>
                <li>• SOC 2 compliance</li>
                <li>• End-to-end encryption</li>
                <li>• Auto-scaling infrastructure</li>
                <li>• Professional workflows</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 Ervin Remus Radosavlevici - AI Creative Studio Pro+ | Professional Enterprise Platform
            </p>
            <p className="text-xs text-gray-500 mt-2">
              All Rights Reserved | Production Environment | Enterprise Grade Security | Global Distribution
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}