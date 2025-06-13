import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  Volume2,
  Download,
  Share2,
  Settings,
  Maximize2,
  Minimize2,
  Zap,
  Layers,
  Activity,
  Film,
  Mic,
  Camera,
  Edit,
  Palette,
  Music,
  Video
} from "lucide-react";

interface WorkspaceProps {
  type?: 'video' | 'music' | 'animation';
}

export default function UniversalWorkspace({ type = 'video' }: WorkspaceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(65);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getWorkspaceConfig = () => {
    switch (type) {
      case 'video':
        return {
          title: 'Video Creator Studio',
          icon: Video,
          color: 'text-blue-400',
          tools: ['Timeline', 'Effects', 'Audio', 'Export'],
          formats: ['MP4', 'AVI', 'MOV', 'WebM']
        };
      case 'music':
        return {
          title: 'Music Production Studio',
          icon: Music,
          color: 'text-purple-400',
          tools: ['Mixer', 'Synthesizer', 'Effects', 'Master'],
          formats: ['MP3', 'WAV', 'FLAC', 'OGG']
        };
      case 'animation':
        return {
          title: 'Animation Studio',
          icon: Palette,
          color: 'text-green-400',
          tools: ['Timeline', 'Layers', 'Keyframes', 'Render'],
          formats: ['GIF', 'MP4', 'WebM', 'SVG']
        };
    }
  };

  const config = getWorkspaceConfig();
  const Icon = config.icon;

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{config.title}</h2>
            <p className="text-sm text-muted-foreground">Professional-grade creation tools</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            Ready
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Preview Area */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Preview</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {type === 'video' ? '1920x1080' : type === 'music' ? '44.1kHz' : '60fps'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {config.formats[0]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              {/* Preview Canvas */}
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-4">
                <div className="text-center space-y-2">
                  <Icon className={`h-12 w-12 mx-auto ${config.color} opacity-50`} />
                  <p className="text-sm text-muted-foreground">
                    {type === 'video' ? 'Video preview will appear here' :
                     type === 'music' ? 'Waveform visualization' :
                     'Animation preview canvas'}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" size="sm">
                    <SkipForward className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Square className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2 ml-4">
                    <Volume2 className="h-4 w-4" />
                    <div className="w-20">
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>00:00</span>
                    <span>Duration: 02:30</span>
                  </div>
                  <Progress value={progress} className="h-3 cursor-pointer" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tools */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {config.tools.map((tool, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {tool}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Properties */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality</label>
                <Progress value={90} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Draft</span>
                  <span>Ultra HD</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Processing Speed</label>
                <Progress value={75} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quality</span>
                  <span>Speed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {config.formats.map((format, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                  >
                    {format}
                  </Button>
                ))}
              </div>
              <div className="pt-2 space-y-2">
                <Button className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Workspace Tabs */}
      <Card>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="p-4">
            <div className="h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <div className="text-center">
                <Layers className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Timeline view</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="p-4">
            <div className="space-y-2">
              {['Background', 'Main Content', 'Effects', 'Audio'].map((layer, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">{layer}</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="effects" className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {['Blur', 'Sharpen', 'Color', 'Noise', 'Vintage', 'Glow'].map((effect, index) => (
                <Button key={index} variant="outline" size="sm" className="h-16 flex-col">
                  <Zap className="h-4 w-4 mb-1" />
                  <span className="text-xs">{effect}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="library" className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="aspect-square bg-muted/20 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Asset {index + 1}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}