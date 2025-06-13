import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Music, 
  Download, 
  Share2, 
  PlayCircle, 
  Settings,
  Zap,
  Sparkles,
  Film,
  Headphones,
  Upload,
  CloudUpload
} from 'lucide-react';

interface MediaProject {
  id: string;
  title: string;
  type: 'video' | 'music';
  status: 'completed' | 'processing' | 'ready';
  duration: string;
  quality: string;
  fileSize: string;
  thumbnail?: string;
}

const sampleProjects: MediaProject[] = [
  {
    id: '1',
    title: 'Epic Action Sequence',
    type: 'video',
    status: 'completed',
    duration: '2:45',
    quality: '4K Ultra HD',
    fileSize: '1.2 GB'
  },
  {
    id: '2',
    title: 'Cinematic Background Music',
    type: 'music',
    status: 'completed',
    duration: '3:30',
    quality: 'Studio Quality',
    fileSize: '45 MB'
  },
  {
    id: '3',
    title: 'Professional Promo Video',
    type: 'video',
    status: 'processing',
    duration: '1:15',
    quality: '1080p HD',
    fileSize: '350 MB'
  }
];

export default function ProductionFeatures() {
  const [activeFeature, setActiveFeature] = useState('generator');

  return (
    <div className="space-y-8">
      {/* Feature Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-xl">
        <Button
          variant={activeFeature === 'generator' ? 'default' : 'ghost'}
          onClick={() => setActiveFeature('generator')}
          className="flex-1 min-w-[140px]"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          AI Generator
        </Button>
        <Button
          variant={activeFeature === 'media' ? 'default' : 'ghost'}
          onClick={() => setActiveFeature('media')}
          className="flex-1 min-w-[140px]"
        >
          <Film className="w-4 h-4 mr-2" />
          Media Library
        </Button>
        <Button
          variant={activeFeature === 'export' ? 'default' : 'ghost'}
          onClick={() => setActiveFeature('export')}
          className="flex-1 min-w-[140px]"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Hub
        </Button>
      </div>

      {/* AI Generator */}
      {activeFeature === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glow-hover">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Video Creator</CardTitle>
                  <CardDescription>Generate professional videos with AI</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">Quality</div>
                  <div className="text-xs text-muted-foreground">Up to 8K Ultra HD</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">Duration</div>
                  <div className="text-xs text-muted-foreground">Up to 43 hours</div>
                </div>
              </div>
              <Button className="w-full glow-primary">
                <PlayCircle className="w-4 h-4 mr-2" />
                Create Video
              </Button>
            </CardContent>
          </Card>

          <Card className="glow-hover">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Music Studio</CardTitle>
                  <CardDescription>Compose professional music tracks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">Quality</div>
                  <div className="text-xs text-muted-foreground">Studio Quality</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">Tracks</div>
                  <div className="text-xs text-muted-foreground">Unlimited</div>
                </div>
              </div>
              <Button className="w-full glow-primary">
                <Headphones className="w-4 h-4 mr-2" />
                Create Music
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Library */}
      {activeFeature === 'media' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Media Projects</h3>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleProjects.map((project) => (
              <Card key={project.id} className="glow-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {project.type === 'video' ? (
                        <Video className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Music className="w-4 h-4 text-green-400" />
                      )}
                      <CardTitle className="text-sm">{project.title}</CardTitle>
                    </div>
                    <Badge
                      variant={project.status === 'completed' ? 'default' : 'secondary'}
                      className={project.status === 'processing' ? 'ai-pulse' : ''}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="w-full h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                    {project.type === 'video' ? (
                      <Film className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <Headphones className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <div className="font-medium">{project.fileSize}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Export Hub */}
      {activeFeature === 'export' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CloudUpload className="w-5 h-5" />
                <span>Professional Export Options</span>
              </CardTitle>
              <CardDescription>
                Export your content in multiple formats for different platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="font-medium">Video Formats</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• MP4 (H.264/H.265)</div>
                    <div>• WebM (VP9/AV1)</div>
                    <div>• MOV (ProRes)</div>
                    <div>• AVI (Uncompressed)</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="font-medium">Audio Formats</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• WAV (Lossless)</div>
                    <div>• MP3 (320kbps)</div>
                    <div>• FLAC (Studio)</div>
                    <div>• AAC (Mobile)</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="font-medium">Quality Options</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• 8K Ultra HD</div>
                    <div>• 4K Standard</div>
                    <div>• 1080p HD</div>
                    <div>• 720p Mobile</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button className="glow-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Batch Export
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Direct Share
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Crown, 
  Infinity, 
  Zap, 
  Shield, 
  Rocket,
  Star,
  Diamond
} from "lucide-react";

export default function ProductionFeatures() {
  const features = [
    {
      title: "Unlimited Creation",
      description: "Create videos, music, and content without limits",
      icon: Infinity,
      gradient: "from-purple-500 to-pink-500",
      badge: "Premium"
    },
    {
      title: "8K Ultra Quality",
      description: "Professional-grade output with cinema quality",
      icon: Crown,
      gradient: "from-yellow-500 to-orange-500",
      badge: "Pro"
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      badge: "Enterprise"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security for your projects",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500",
      badge: "Secure"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className="glow-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
