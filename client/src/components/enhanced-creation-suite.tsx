import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Music, 
  Mic2, 
  FileText, 
  Wand2, 
  Play, 
  Pause,
  Download,
  Settings,
  Sparkles,
  Film,
  Headphones,
  PenTool,
  Palette,
  Layers,
  Volume2,
  ImageIcon,
  RotateCcw
} from 'lucide-react';

interface CreationProject {
  id: string;
  type: 'video' | 'music' | 'animation' | 'lyrics';
  title: string;
  status: 'draft' | 'generating' | 'completed';
  progress: number;
  duration?: string;
  genre?: string;
}

export default function EnhancedCreationSuite() {
  const [activeCreator, setActiveCreator] = useState('video');
  const [currentProject, setCurrentProject] = useState<CreationProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const creationTypes = [
    { 
      id: 'video', 
      label: 'AI Video Creator', 
      icon: Video, 
      gradient: 'from-purple-500 to-pink-500',
      description: 'Create professional videos with AI'
    },
    { 
      id: 'music', 
      label: 'Music Studio', 
      icon: Music, 
      gradient: 'from-green-500 to-blue-500',
      description: 'Compose and produce music tracks'
    },
    { 
      id: 'animation', 
      label: 'Animation Lab', 
      icon: Film, 
      gradient: 'from-orange-500 to-red-500',
      description: 'Create stunning animations'
    },
    { 
      id: 'lyrics', 
      label: 'Lyrics Generator', 
      icon: FileText, 
      gradient: 'from-blue-500 to-purple-500',
      description: 'Generate and edit song lyrics'
    }
  ];

  const handleGeneration = async (type: string, prompt: string) => {
    setIsGenerating(true);
    const newProject: CreationProject = {
      id: Date.now().toString(),
      type: type as any,
      title: prompt.slice(0, 30) + '...',
      status: 'generating',
      progress: 0
    };
    setCurrentProject(newProject);

    // Simulate generation process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setCurrentProject(prev => prev ? { ...prev, progress: i } : null);
    }

    setCurrentProject(prev => prev ? { ...prev, status: 'completed' } : null);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Creation Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {creationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-300 glow-hover ${
                activeCreator === type.id ? 'ring-2 ring-primary glow-primary' : ''
              }`}
              onClick={() => setActiveCreator(type.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.gradient} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{type.label}</CardTitle>
                    <CardDescription className="text-xs">{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Active Creation Interface */}
      <Card className="glow-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {(() => {
                const activeType = creationTypes.find(t => t.id === activeCreator);
                const Icon = activeType?.icon || Video;
                return (
                  <>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeType?.gradient} flex items-center justify-center glow-primary`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{activeType?.label}</CardTitle>
                      <CardDescription>{activeType?.description}</CardDescription>
                    </div>
                  </>
                );
              })()}
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Pro Features
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCreator} onValueChange={setActiveCreator} className="space-y-6">
            
            {/* Video Creator */}
            <TabsContent value="video" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Video Description</label>
                    <Input 
                      placeholder="Describe your video concept..."
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Style</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Cinematic</option>
                        <option>Animated</option>
                        <option>Documentary</option>
                        <option>Music Video</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quality</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>8K Ultra HD</option>
                        <option>4K Standard</option>
                        <option>1080p HD</option>
                        <option>720p Mobile</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>16:9 Widescreen</option>
                        <option>9:16 Vertical</option>
                        <option>1:1 Square</option>
                        <option>4:3 Classic</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 glow-primary"
                    onClick={() => handleGeneration('video', 'Sample video')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Create Video
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Video preview will appear here</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Add Media
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      Effects
                    </Button>
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-3 h-3 mr-1" />
                      Audio
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Music Studio */}
            <TabsContent value="music" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Music Concept</label>
                    <Input 
                      placeholder="Describe your music style and mood..."
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Genre</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Electronic</option>
                        <option>Rock</option>
                        <option>Classical</option>
                        <option>Jazz</option>
                        <option>Hip Hop</option>
                        <option>Ambient</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tempo</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Slow (60-90 BPM)</option>
                        <option>Medium (90-120 BPM)</option>
                        <option>Fast (120-140 BPM)</option>
                        <option>Very Fast (140+ BPM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>3 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Key</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>C Major</option>
                        <option>D Minor</option>
                        <option>G Major</option>
                        <option>A Minor</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 glow-primary"
                    onClick={() => handleGeneration('music', 'Sample music')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Music...
                      </>
                    ) : (
                      <>
                        <Headphones className="w-4 h-4 mr-2" />
                        Create Music
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Music className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Waveform will appear here</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm">
                      <PenTool className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Animation Lab */}
            <TabsContent value="animation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Animation Concept</label>
                    <Input 
                      placeholder="Describe your animation idea..."
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Style</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>2D Cartoon</option>
                        <option>3D Realistic</option>
                        <option>Motion Graphics</option>
                        <option>Stop Motion</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Frame Rate</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>24 FPS Cinema</option>
                        <option>30 FPS Standard</option>
                        <option>60 FPS Smooth</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 glow-primary"
                    onClick={() => handleGeneration('animation', 'Sample animation')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Creating Animation...
                      </>
                    ) : (
                      <>
                        <Layers className="w-4 h-4 mr-2" />
                        Create Animation
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Film className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Animation preview will appear here</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Palette className="w-3 h-3 mr-1" />
                      Colors
                    </Button>
                    <Button variant="outline" size="sm">
                      <Layers className="w-3 h-3 mr-1" />
                      Layers
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      Timeline
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Lyrics Generator */}
            <TabsContent value="lyrics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Song Theme</label>
                    <Input 
                      placeholder="What's your song about..."
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Genre</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Pop</option>
                        <option>Rock</option>
                        <option>Hip Hop</option>
                        <option>Country</option>
                        <option>R&B</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mood</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Happy</option>
                        <option>Sad</option>
                        <option>Energetic</option>
                        <option>Romantic</option>
                        <option>Motivational</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Structure</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Verse-Chorus-Verse</option>
                        <option>ABABCB</option>
                        <option>AABA</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Length</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Short (2-3 verses)</option>
                        <option>Medium (3-4 verses)</option>
                        <option>Long (4+ verses)</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 glow-primary"
                    onClick={() => handleGeneration('lyrics', 'Sample lyrics')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Writing Lyrics...
                      </>
                    ) : (
                      <>
                        <PenTool className="w-4 h-4 mr-2" />
                        Generate Lyrics
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-64 p-4 bg-muted/50 rounded-lg">
                    <div className="text-center h-full flex items-center justify-center">
                      <div>
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Generated lyrics will appear here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <PenTool className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mic2 className="w-3 h-3 mr-1" />
                      Record
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Generation Progress */}
          {currentProject && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full ai-pulse"></div>
                  <span className="text-sm font-medium">
                    {currentProject.status === 'generating' ? 'Generating' : 'Completed'}: {currentProject.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{currentProject.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProject.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}