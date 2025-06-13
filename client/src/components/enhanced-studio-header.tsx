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
    <header className="relative">
      {/* Professional Navigation Bar */}
      <div className="ultra-modern-card mx-6 mt-6 mb-0 rounded-2xl">
        <div className="flex items-center justify-between p-6">
          {/* Professional Branding */}
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-105" 
                   style={{ background: 'var(--gradient-primary)' }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Creative Studio Pro+
              </h1>
              <div className="flex items-center space-x-3">
                <div className="glass-morphism px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-semibold text-xs">PRODUCTION</span>
                  </div>
                </div>
                <div className="glass-morphism px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-xs">ENTERPRISE</span>
                  </div>
                </div>
                <div className="glass-morphism px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-xs">UNLIMITED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                className="glass-morphism px-4 py-2 hover:bg-purple-500/20 transition-all duration-300"
                onClick={() => handleQuickAction('video')}
                disabled={isProcessing}
              >
                <Video className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-white font-medium">Video</span>
              </Button>
              <Button
                className="glass-morphism px-4 py-2 hover:bg-purple-500/20 transition-all duration-300"
                onClick={() => handleQuickAction('music')}
                disabled={isProcessing}
              >
                <Music className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-white font-medium">Music</span>
              </Button>
              <Button
                className="glass-morphism px-4 py-2 hover:bg-purple-500/20 transition-all duration-300"
                onClick={() => handleQuickAction('animation')}
                disabled={isProcessing}
              >
                <Palette className="w-4 h-4 mr-2 text-pink-400" />
                <span className="text-white font-medium">Animation</span>
              </Button>
            </div>

            {/* System Status */}
            <div className="glass-morphism px-4 py-2 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-sm">Online</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">99.9%</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-medium text-sm">1.2k</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              className="glass-morphism px-3 py-2 hover:bg-blue-500/20 transition-all duration-300"
              onClick={() => handleQuickAction('share')}
            >
              <Share2 className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-white font-medium">Share</span>
            </Button>
            <Button
              className="glass-morphism px-3 py-2 hover:bg-green-500/20 transition-all duration-300"
              onClick={() => handleQuickAction('download')}
            >
              <Download className="w-4 h-4 mr-2 text-green-400" />
              <span className="text-white font-medium">Export</span>
            </Button>
            <Button
              className="px-6 py-2 rounded-xl font-medium text-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--gradient-primary)' }}
              onClick={() => handleQuickAction('enhance')}
              disabled={isProcessing}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'AI Enhance'}
            </Button>
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