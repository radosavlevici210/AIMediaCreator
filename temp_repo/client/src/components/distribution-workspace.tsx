import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Share2, 
  Upload, 
  Download, 
  Globe, 
  Youtube, 
  Instagram,
  Twitter,
  Music,
  FileVideo,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  quality: string;
  size: string;
  platforms: string[];
}

interface DistributionPlatform {
  id: string;
  name: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'pending';
  lastSync?: string;
}

export default function DistributionWorkspace() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const exportFormats: ExportFormat[] = [
    {
      id: 'mp4-4k',
      name: 'MP4 4K Ultra HD',
      description: 'High quality for premium platforms',
      quality: '4K (3840x2160)',
      size: '~500MB/min',
      platforms: ['YouTube', 'Vimeo', 'Netflix']
    },
    {
      id: 'mp4-1080p',
      name: 'MP4 1080p Full HD',
      description: 'Standard quality for most platforms',
      quality: '1080p (1920x1080)',
      size: '~100MB/min',
      platforms: ['YouTube', 'Instagram', 'TikTok']
    },
    {
      id: 'webm',
      name: 'WebM Optimized',
      description: 'Web-optimized format',
      quality: '1080p',
      size: '~80MB/min',
      platforms: ['Web', 'Streaming']
    },
    {
      id: 'mp3-320',
      name: 'MP3 320kbps',
      description: 'High quality audio',
      quality: '320kbps',
      size: '~2.4MB/min',
      platforms: ['Spotify', 'Apple Music', 'SoundCloud']
    },
    {
      id: 'flac',
      name: 'FLAC Lossless',
      description: 'Studio quality audio',
      quality: 'Lossless',
      size: '~30MB/min',
      platforms: ['Audiophile', 'Mastering']
    }
  ];

  const platforms: DistributionPlatform[] = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, status: 'connected', lastSync: '2 hours ago' },
    { id: 'spotify', name: 'Spotify', icon: Music, status: 'connected', lastSync: '1 day ago' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, status: 'pending' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, status: 'disconnected' },
    { id: 'tiktok', name: 'TikTok', icon: FileVideo, status: 'connected', lastSync: '6 hours ago' },
    { id: 'soundcloud', name: 'SoundCloud', icon: Music, status: 'connected', lastSync: '3 hours ago' }
  ];

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleExport = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'disconnected': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'border-green-500/30 bg-green-500/10';
      case 'pending': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'disconnected': return 'border-red-500/30 bg-red-500/10';
      default: return 'border-white/10 bg-black/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Export & Distribution */}
      <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Share2 className="w-6 h-6" />
            Export & Distribution Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Export Formats */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Export Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exportFormats.map((format) => (
                <Card 
                  key={format.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedFormats.includes(format.id)
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 bg-black/20 hover:bg-white/5'
                  }`}
                  onClick={() => handleFormatToggle(format.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{format.name}</h4>
                      {selectedFormats.includes(format.id) && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{format.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Quality:</span>
                        <span className="text-white">{format.quality}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Size:</span>
                        <span className="text-white">{format.size}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Compatible platforms:</div>
                      <div className="flex flex-wrap gap-1">
                        {format.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Controls */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-black/30 p-4 rounded-lg">
              <div>
                <div className="text-white font-medium">
                  {selectedFormats.length} format{selectedFormats.length !== 1 ? 's' : ''} selected
                </div>
                <div className="text-sm text-gray-400">
                  Ready for export and distribution
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-white/20"
                  disabled={selectedFormats.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500"
                  onClick={handleExport}
                  disabled={selectedFormats.length === 0 || isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Export & Distribute
                </Button>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-medium">Exporting Content...</span>
                  <span className="text-blue-400">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Platform Connections */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Platform Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Card key={platform.id} className={`${getStatusColor(platform.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-white" />
                        <span className="font-semibold text-white">{platform.name}</span>
                      </div>
                      {getStatusIcon(platform.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <Badge 
                        variant="secondary" 
                        className={platform.status === 'connected' ? 'bg-green-500/20 text-green-400' : 
                                 platform.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                 'bg-red-500/20 text-red-400'}
                      >
                        {platform.status}
                      </Badge>
                      
                      {platform.lastSync && (
                        <div className="text-xs text-gray-400">
                          Last sync: {platform.lastSync}
                        </div>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full mt-3"
                      variant={platform.status === 'connected' ? 'outline' : 'default'}
                    >
                      {platform.status === 'connected' ? 'Manage' : 'Connect'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Quick Distribution Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Social Media</h4>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                  <Youtube className="w-4 h-4 mr-2" />
                  Upload to YouTube
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500">
                  <Instagram className="w-4 h-4 mr-2" />
                  Share to Instagram
                </Button>
                <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600">
                  <Twitter className="w-4 h-4 mr-2" />
                  Post to Twitter
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-medium">Music Platforms</h4>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <Music className="w-4 h-4 mr-2" />
                  Distribute to Spotify
                </Button>
                <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                  <Music className="w-4 h-4 mr-2" />
                  Upload to SoundCloud
                </Button>
                <Button className="w-full justify-start bg-gray-800 hover:bg-gray-900">
                  <Music className="w-4 h-4 mr-2" />
                  Submit to Apple Music
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}