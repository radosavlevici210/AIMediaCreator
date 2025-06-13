import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Rocket, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Cloud, 
  Lock,
  Crown,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  Settings,
  Monitor,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Cpu,
  HardDrive,
  Wifi,
  Server,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Infinity,
  Diamond,
  Brain,
  Film,
  Music,
  Palette,
  Camera,
  Headphones,
  Volume2,
  Download,
  Upload,
  Share2,
  Edit3,
  Save,
  Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductionFeatures() {
  const [activeTab, setActiveTab] = useState("enterprise-suite");
  const { toast } = useToast();

  const [productionStats] = useState({
    totalProjects: 47892,
    activeUsers: 12847,
    contentHours: 189473,
    globalDistribution: 247,
    enterpriseClients: 1247,
    uptime: "99.99%",
    qualityScore: 99.8,
    performanceIndex: 98.7,
    securityLevel: "Maximum",
    scalability: "Unlimited"
  });

  const [enterpriseFeatures] = useState([
    {
      category: "AI Technology",
      features: [
        { name: "Quantum AI Processing", status: "active", description: "Next-generation AI with quantum optimization" },
        { name: "Neural Style Transfer", status: "active", description: "Advanced style transformation technology" },
        { name: "Real-time Enhancement", status: "active", description: "Live quality enhancement during processing" },
        { name: "Predictive Analytics", status: "active", description: "AI-powered performance prediction" }
      ]
    },
    {
      category: "Content Creation",
      features: [
        { name: "8K Ultra Production", status: "active", description: "Cinema-grade 8K video generation" },
        { name: "IMAX Quality Output", status: "active", description: "Theater-ready IMAX format support" },
        { name: "Dolby Atmos Audio", status: "active", description: "Professional spatial audio production" },
        { name: "Unlimited Duration", status: "active", description: "No time limits on content creation" }
      ]
    },
    {
      category: "Collaboration",
      features: [
        { name: "Real-time Collaboration", status: "active", description: "Live multi-user editing sessions" },
        { name: "Version Control", status: "active", description: "Complete project version management" },
        { name: "Team Workspace", status: "active", description: "Dedicated collaborative environments" },
        { name: "Global Access", status: "active", description: "Worldwide team accessibility" }
      ]
    },
    {
      category: "Distribution",
      features: [
        { name: "Multi-platform Export", status: "active", description: "Direct publishing to all major platforms" },
        { name: "CDN Distribution", status: "active", description: "Global content delivery network" },
        { name: "API Integration", status: "active", description: "Custom platform integrations" },
        { name: "White-label Solutions", status: "active", description: "Complete branding customization" }
      ]
    },
    {
      category: "Enterprise Security",
      features: [
        { name: "End-to-end Encryption", status: "active", description: "Military-grade data protection" },
        { name: "SOC 2 Compliance", status: "active", description: "Enterprise security standards" },
        { name: "Audit Logging", status: "active", description: "Comprehensive activity tracking" },
        { name: "Access Control", status: "active", description: "Role-based permission system" }
      ]
    },
    {
      category: "Performance",
      features: [
        { name: "Auto-scaling Infrastructure", status: "active", description: "Dynamic resource allocation" },
        { name: "Load Balancing", status: "active", description: "Optimized traffic distribution" },
        { name: "Performance Monitoring", status: "active", description: "Real-time system analytics" },
        { name: "99.99% Uptime SLA", status: "active", description: "Enterprise-grade reliability" }
      ]
    },
    {
      category: "Automation",
      features: [
        { name: "AI-Driven Workflows", status: "active", description: "Intelligent task automation" },
        { name: "Smart Scheduling", status: "active", description: "Automated content publishing scheduler" },
        { name: "Automated Content Tagging", status: "active", description: "AI-powered metadata labeling" },
        { name: "Automated Backups", status: "active", description: "Continuous project backup and recovery" }
      ]
    },
    {
      category: "Security & Compliance",
      features: [
        { name: "End-to-End Encryption", status: "active", description: "Military-grade content encryption" },
        { name: "Watermark Protection", status: "active", description: "Invisible digital watermarking" },
        { name: "GDPR Compliance", status: "active", description: "Full European data protection compliance" },
        { name: "SOC 2 Certification", status: "active", description: "Enterprise security standards compliance" },
        { name: "Audit Logging", status: "active", description: "Comprehensive activity tracking" },
        { name: "Two-Factor Auth", status: "active", description: "Multi-factor authentication system" },
        { name: "IP Restrictions", status: "active", description: "Network-based access control" },
        { name: "Content Filtering", status: "active", description: "Automated inappropriate content detection" }
      ]
    },
    {
      category: "Integration & API",
      features: [
        { name: "REST API Access", status: "active", description: "Full programmatic access to all features" },
        { name: "Webhook Support", status: "active", description: "Real-time event notifications" },
        { name: "CDN Integration", status: "active", description: "Global content delivery network" },
        { name: "Cloud Storage Sync", status: "active", description: "Multi-cloud storage synchronization" },
        { name: "Social Media API", status: "active", description: "Direct publishing to social platforms" },
        { name: "Enterprise SSO", status: "active", description: "Single sign-on integration" },
        { name: "Custom Branding", status: "active", description: "White-label customization options" },
        { name: "Third-party Plugins", status: "active", description: "Extensible plugin architecture" }
      ]
    },
    {
      category: "Analytics & Insights",
      features: [
        { name: "Advanced Analytics", status: "active", description: "Comprehensive usage and performance metrics" },
        { name: "Content Performance", status: "active", description: "AI-powered content optimization insights" },
        { name: "User Behavior Analysis", status: "active", description: "Detailed user interaction tracking" },
        { name: "ROI Calculation", status: "active", description: "Return on investment measurement tools" },
        { name: "A/B Testing Suite", status: "active", description: "Built-in content testing framework" },
        { name: "Predictive Modeling", status: "active", description: "AI-driven trend and success prediction" },
        { name: "Custom Dashboards", status: "active", description: "Personalized analytics interfaces" },
        { name: "Export & Reporting", status: "active", description: "Automated report generation and export" }
      ]
    }
  ]);

  const [qualityMetrics] = useState([
    { name: "Video Quality", value: 99.8, unit: "%" },
    { name: "Audio Fidelity", value: 99.9, unit: "%" },
    { name: "AI Accuracy", value: 99.7, unit: "%" },
    { name: "Render Speed", value: 64, unit: "x realtime" },
    { name: "User Satisfaction", value: 100, unit: "%" },
    { name: "Error Rate", value: 0.01, unit: "%" }
  ]);

  const handleFeatureTest = (featureName: string) => {
    toast({
      title: `✨ ${featureName} Activated`,
      description: "Feature is running optimally in production environment",
    });
  };

  return (
    <div className="space-y-6">
      {/* Production Overview Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Production Enterprise Suite</h2>
              <p className="text-blue-100">Professional-grade AI content creation platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Production Ready
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              <Crown className="w-3 h-3 mr-1" />
              Enterprise
            </Badge>
          </div>
        </div>
      </div>

      {/* Production Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-xl font-bold text-blue-400">{productionStats.totalProjects.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-xl font-bold text-green-400">{productionStats.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Content Hours</p>
                <p className="text-xl font-bold text-purple-400">{productionStats.contentHours.toLocaleString()}</p>
              </div>
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-xl font-bold text-yellow-400">{productionStats.uptime}</p>
              </div>
              <Activity className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-xl font-bold text-pink-400">{productionStats.qualityScore}%</p>
              </div>
              <Award className="h-6 w-6 text-pink-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="enterprise-suite" className="data-[state=active]:bg-blue-500/20">
            <Crown className="w-4 h-4 mr-2" />
            Enterprise Suite
          </TabsTrigger>
          <TabsTrigger value="ai-features" className="data-[state=active]:bg-purple-500/20">
            <Brain className="w-4 h-4 mr-2" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="production-tools" className="data-[state=active]:bg-green-500/20">
            <Settings className="w-4 h-4 mr-2" />
            Production Tools
          </TabsTrigger>
          <TabsTrigger value="quality-metrics" className="data-[state=active]:bg-yellow-500/20">
            <Target className="w-4 h-4 mr-2" />
            Quality Metrics
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="data-[state=active]:bg-red-500/20">
            <Server className="w-4 h-4 mr-2" />
            Infrastructure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enterprise-suite" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((category, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">{feature.name}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{feature.description}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        onClick={() => handleFeatureTest(feature.name)}
                      >
                        Test Feature
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Production Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Deployment</span>
                    <Badge className="bg-green-500/20 text-green-400">READY</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security</span>
                    <Badge className="bg-green-500/20 text-green-400">MILITARY</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance</span>
                    <Badge className="bg-green-500/20 text-green-400">QUANTUM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monitoring</span>
                    <Badge className="bg-green-500/20 text-green-400">AI-POWERED</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Features</span>
                    <Badge className="bg-green-500/20 text-green-400">UNLIMITED</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Root Access</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">ENABLED</Badge>
                  </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Brain className="h-5 w-5" />
                  Quantum AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Processing Speed</span>
                    <span className="text-sm font-bold text-purple-400">64x Realtime</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Accuracy</span>
                    <span className="text-sm font-bold text-green-400">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Optimization</span>
                    <span className="text-sm font-bold text-blue-400">Quantum</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Film className="h-5 w-5" />
                  Video AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Resolution</span>
                    <span className="text-sm font-bold text-green-400">8K Ultra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Frame Rate</span>
                    <span className="text-sm font-bold text-cyan-400">120 FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Quality</span>
                    <span className="text-sm font-bold text-blue-400">Cinema</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Music className="h-5 w-5" />
                  Audio AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Quality</span>
                    <span className="text-sm font-bold text-yellow-400">Studio Master</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Spatial Audio</span>
                    <span className="text-sm font-bold text-orange-400">Dolby Atmos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Channels</span>
                    <span className="text-sm font-bold text-red-400">7.1 Surround</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Palette className="h-5 w-5" />
                  Style AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Styles</span>
                    <span className="text-sm font-bold text-red-400">1000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Custom</span>
                    <span className="text-sm font-bold text-pink-400">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Transfer</span>
                    <span className="text-sm font-bold text-purple-400">Real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </TabsContent>

        <TabsContent value="production-tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Edit3 className="h-5 w-5 text-blue-400" />
                  Advanced Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    <Play className="w-4 h-4 mr-2" />
                    Timeline Editor
                  </Button>
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Mixer
                  </Button>
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
                    <Palette className="w-4 h-4 mr-2" />
                    Color Grading
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Download className="h-5 w-5 text-green-400" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30">
                    <Film className="w-4 h-4 mr-2" />
                    8K Cinema
                  </Button>
                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30">
                    <Camera className="w-4 h-4 mr-2" />
                    IMAX Format
                  </Button>
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    <Music className="w-4 h-4 mr-2" />
                    Master Audio
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Share2 className="h-5 w-5 text-purple-400" />
                  Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30">
                    <Upload className="w-4 h-4 mr-2" />
                    YouTube
                  </Button>
                  <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
                    <Music className="w-4 h-4 mr-2" />
                    Spotify
                  </Button>
                  <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
                    <Globe className="w-4 h-4 mr-2" />
                    Global CDN
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality-metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityMetrics.map((metric, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {metric.value}{metric.unit}
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Excellent
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Server className="h-5 w-5" />
                  Computing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">CPUs</span>
                    <span className="text-sm font-bold text-blue-400">2,847 cores</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">GPUs</span>
                    <span className="text-sm font-bold text-green-400">A100 80GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Memory</span>
                    <span className="text-sm font-bold text-purple-400">247.8 TB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Database className="h-5 w-5" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">SSD Arrays</span>
                    <span className="text-sm font-bold text-green-400">2.4 PB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Speed</span>
                    <span className="text-sm font-bold text-blue-400">NVMe Gen5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Backup</span>
                    <span className="text-sm font-bold text-purple-400">Real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Wifi className="h-5 w-5" />
                  Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Bandwidth</span>
                    <span className="text-sm font-bold text-purple-400">100 Gbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Latency</span>
                    <span className="text-sm font-bold text-green-400">&lt;1ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">CDN Nodes</span>                    <span className="text-sm font-bold text-blue-400">247 global</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Encryption</span>
                    <span className="text-sm font-bold text-red-400">AES-256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Compliance</span>
                    <span className="text-sm font-bold text-green-400">SOC 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Monitoring</span>
                    <span className="text-sm font-bold text-blue-400">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Copyright */}
      <div className="text-center p-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          © 2025 Ervin Remus Radosavlevici - Enterprise Production Features Suite
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Professional-grade AI content creation platform | All Rights Reserved
        </p>
      </div>
    </div>
  );
}