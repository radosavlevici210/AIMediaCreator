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
  Shield,
  Globe,
  Activity,
  Menu,
  X
} from "lucide-react";

interface EnterpriseHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function EnterpriseHeader({ onMenuToggle, isMenuOpen }: EnterpriseHeaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = (action: string) => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">Creative Studio</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Enterprise
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v2.0.0
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction('video')}>
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction('music')}>
            <Music className="h-4 w-4 mr-2" />
            Music
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction('animation')}>
            <Palette className="h-4 w-4 mr-2" />
            Animation
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Status Indicators - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-3 mr-4">
            <div className="flex items-center space-x-1 text-xs">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">Online</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span>Global</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary/80"
              onClick={() => handleAction('enhance')}
              disabled={isProcessing}
            >
              <Zap className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'AI Enhance'}
            </Button>
          </div>

          {/* Settings */}
          <div className="flex items-center space-x-1 ml-2 border-l pl-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse" />
      )}
    </header>
  );
}