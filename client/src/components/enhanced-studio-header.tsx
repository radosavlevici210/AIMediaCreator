import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Crown, Settings, User, Zap } from 'lucide-react';
import { Link } from 'wouter';

export default function EnhancedStudioHeader() {
  return (
    <header className="relative bg-card/50 backdrop-blur-xl border-b border-border/50 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background ai-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Creative Studio Pro+
            </h1>
            <p className="text-sm text-muted-foreground">Professional Media Generation Platform</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full ai-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Production Ready</span>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-blue-400 font-medium">Pro License</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="glow-hover">
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </Link>
          
          <Button variant="outline" size="sm" className="glow-hover">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}