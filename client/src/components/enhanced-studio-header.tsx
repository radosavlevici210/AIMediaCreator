import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Video, 
  Music, 
  Palette, 
  Settings, 
  Download, 
  Share2,
  Zap,
  Crown,
  Rocket,
  BarChart3,
  Users,
  Globe,
  Shield,
  Sparkles
} from "lucide-react";

export default function EnhancedStudioHeader() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickAction = (action: string) => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <header className="relative bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10"></div>
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Modern Logo & Branding */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl glow-primary animate-float">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white status-online"></div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Creative Studio
              </h1>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 text-xs px-3 py-1">
                  <Rocket className="w-3 h-3 mr-1" />
                  PRODUCTION
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 text-xs px-3 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO+
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 text-xs px-3 py-1">
                  <Zap className="w-3 h-3 mr-1" />
                  UNLIMITED
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="nav-item hover-lift"
              onClick={() => handleQuickAction('video')}
              disabled={isProcessing}
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="nav-item hover-lift"
              onClick={() => handleQuickAction('music')}
              disabled={isProcessing}
            >
              <Music className="w-4 h-4 mr-2" />
              Music
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="nav-item hover-lift"
              onClick={() => handleQuickAction('animation')}
              disabled={isProcessing}
            >
              <Palette className="w-4 h-4 mr-2" />
              Animation
            </Button>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <BarChart3 className="w-3 h-3" />
                <span>99.9%</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>1.2k</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="btn-outline"
                onClick={() => handleQuickAction('share')}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="btn-outline"
                onClick={() => handleQuickAction('download')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                className="btn-gradient-primary"
                size="sm"
                onClick={() => handleQuickAction('enhance')}
                disabled={isProcessing}
              >
                <Zap className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'AI Enhance'}
              </Button>
            </div>

            {/* Settings & Theme */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Bar */}
        <div className="hidden lg:flex items-center justify-between py-2 border-t border-border/20">
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center space-x-2 text-green-400">
              <Shield className="w-3 h-3" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Globe className="w-3 h-3" />
              <span>Global CDN</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Zap className="w-3 h-3" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-400">
              <Rocket className="w-3 h-3" />
              <span>Production Ready</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>v2.0.0</span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-pulse">
          <div className="h-full bg-gradient-to-r from-primary to-purple-600 animate-glow"></div>
        </div>
      )}
    </header>
  );
}