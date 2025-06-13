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
    <header className="nav-modern border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Creative Studio</h1>
                <div className="flex items-center space-x-2">
                  <Badge className="production-ready text-xs px-2 py-1">
                    <Rocket className="w-3 h-3 mr-1" />
                    PRODUCTION
                  </Badge>
                  <Badge className="premium-feature text-xs px-2 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO+
                  </Badge>
                </div>
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