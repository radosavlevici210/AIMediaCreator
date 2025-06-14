import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Sparkles, 
  BarChart3, 
  Settings, 
  Shield, 
  Users, 
  Crown,
  Zap,
  Rocket,
  Database,
  Network,
  Globe,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface NavigationItem {
  path: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  gradient: string;
}

const navigationItems: NavigationItem[] = [
  {
    path: '/',
    title: 'Home',
    description: 'Professional AI Creative Studio',
    icon: <Sparkles className="w-5 h-5" />,
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    path: '/enhanced-studio',
    title: 'Enhanced AI Studio',
    description: 'Quantum-level AI content creation',
    icon: <Brain className="w-5 h-5" />,
    badge: 'New',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    path: '/dashboard',
    title: 'Real-time Dashboard',
    description: 'Live system metrics and monitoring',
    icon: <BarChart3 className="w-5 h-5" />,
    badge: 'Live',
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    path: '/studio',
    title: 'Classic Studio',
    description: 'Original AI creation interface',
    icon: <Rocket className="w-5 h-5" />,
    gradient: 'from-orange-600 to-red-600'
  },
  {
    path: '/admin',
    title: 'Admin Panel',
    description: 'System administration and controls',
    icon: <Settings className="w-5 h-5" />,
    gradient: 'from-indigo-600 to-purple-600'
  },
  {
    path: '/root',
    title: 'Root Access',
    description: 'Master control and enterprise features',
    icon: <Crown className="w-5 h-5" />,
    badge: 'Pro+',
    gradient: 'from-yellow-600 to-orange-600'
  }
];

export default function EnhancedNavigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-2">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    size="sm"
                    className={`relative ${
                      location === item.path
                        ? `bg-gradient-to-r ${item.gradient} text-white`
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2 hidden xl:inline">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-2 text-xs bg-white/20 text-white"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-black/40 border-white/20 text-white backdrop-blur-lg"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-lg">
          <div className="fixed top-16 right-4 w-80 max-w-[calc(100vw-2rem)]">
            <Card className="bg-black/90 border-white/10 backdrop-blur-lg">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <div
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          location === item.path
                            ? `border-white/30 bg-gradient-to-r ${item.gradient}`
                            : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            <div>
                              <div className="font-semibold text-white">{item.title}</div>
                              <div className="text-xs text-gray-300">{item.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronRight className="w-4 h-4 text-white/60" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-white">AI Online</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="text-white">Connected</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-white">Secure</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}