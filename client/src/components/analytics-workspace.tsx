import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Download, 
  Clock,
  Users,
  Heart,
  Share2
} from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  totalDownloads: number;
  avgRating: number;
  totalShares: number;
  processingTime: string;
  popularContent: string;
}

interface ProjectMetric {
  name: string;
  type: 'video' | 'music' | 'animation';
  views: number;
  downloads: number;
  rating: number;
  trend: 'up' | 'down' | 'stable';
}

export default function AnalyticsWorkspace() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 15420,
    totalDownloads: 3240,
    avgRating: 4.7,
    totalShares: 1850,
    processingTime: "2.3 min",
    popularContent: "AI Revolution Movie"
  });

  const [projectMetrics] = useState<ProjectMetric[]>([
    { name: "AI Revolution Movie", type: "video", views: 8500, downloads: 1200, rating: 4.8, trend: "up" },
    { name: "Digital Dreams Album", type: "music", views: 4200, downloads: 950, rating: 4.6, trend: "up" },
    { name: "Space Adventure", type: "animation", views: 2720, downloads: 580, rating: 4.5, trend: "stable" },
    { name: "Jazz Collection", type: "music", views: 1800, downloads: 310, rating: 4.4, trend: "down" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 5),
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-purple-500/20 text-purple-400';
      case 'music': return 'bg-blue-500/20 text-blue-400';
      case 'animation': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-yellow-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Production Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-2xl font-bold text-white">{analytics.totalViews.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-400">Total Views</div>
                <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-400 text-xs">
                  +12% this week
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-white">{analytics.totalDownloads.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-400">Downloads</div>
                <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-400 text-xs">
                  +8% this week
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">{analytics.avgRating}</span>
                </div>
                <div className="text-sm text-gray-400">Avg Rating</div>
                <Badge variant="secondary" className="mt-1 bg-yellow-500/20 text-yellow-400 text-xs">
                  +0.2 this month
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-2xl font-bold text-white">{analytics.processingTime}</span>
                </div>
                <div className="text-sm text-gray-400">Avg Processing</div>
                <Badge variant="secondary" className="mt-1 bg-blue-500/20 text-blue-400 text-xs">
                  -15% faster
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card className="bg-black/20 border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-green-400">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white mb-2">Most Popular Content</h4>
                  <p className="text-gray-300">{analytics.popularContent}</p>
                  <Badge className="mt-1 bg-purple-500/20 text-purple-400">Trending</Badge>
                </div>
                <div>
                  <h4 className="text-white mb-2">Peak Usage Time</h4>
                  <p className="text-gray-300">2:00 PM - 4:00 PM UTC</p>
                  <Badge className="mt-1 bg-orange-500/20 text-orange-400">+45% activity</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Performance Table */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-blue-400">Project Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectMetrics.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <Badge className={getTypeColor(project.type)}>
                        {project.type}
                      </Badge>
                      <div>
                        <div className="font-medium text-white">{project.name}</div>
                        <div className="text-sm text-gray-400">Rating: {project.rating}/5</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-medium">{project.views.toLocaleString()}</div>
                        <div className="text-gray-400">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{project.downloads.toLocaleString()}</div>
                        <div className="text-gray-400">Downloads</div>
                      </div>
                      <div className="flex items-center">
                        {getTrendIcon(project.trend)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Real-time Statistics */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Real-time Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">{analytics.totalShares.toLocaleString()}</div>
              <div className="text-gray-400 flex items-center justify-center gap-1">
                <Share2 className="w-4 h-4" />
                Total Shares
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                System Uptime
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">12</div>
              <div className="text-gray-400 flex items-center justify-center gap-1">
                <Users className="w-4 h-4" />
                Active Users
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}