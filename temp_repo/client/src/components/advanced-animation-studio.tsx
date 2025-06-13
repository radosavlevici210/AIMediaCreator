import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Film, 
  Layers, 
  Palette, 
  Play, 
  Pause,
  RotateCcw,
  Download,
  Settings,
  Zap,
  Target,
  Clock,
  Slider
} from 'lucide-react';

interface AnimationLayer {
  id: string;
  name: string;
  type: 'character' | 'background' | 'effect' | 'text';
  visible: boolean;
  opacity: number;
}

interface Timeline {
  duration: number;
  currentTime: number;
  keyframes: Array<{
    time: number;
    properties: Record<string, any>;
  }>;
}

export default function AdvancedAnimationStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [layers, setLayers] = useState<AnimationLayer[]>([
    { id: '1', name: 'Background', type: 'background', visible: true, opacity: 100 },
    { id: '2', name: 'Main Character', type: 'character', visible: true, opacity: 100 },
    { id: '3', name: 'Effects', type: 'effect', visible: true, opacity: 80 },
    { id: '4', name: 'Text Overlay', type: 'text', visible: false, opacity: 100 }
  ]);

  const [timeline, setTimeline] = useState<Timeline>({
    duration: 30,
    currentTime: 0,
    keyframes: []
  });

  const animationStyles = [
    { id: '2d-cartoon', name: '2D Cartoon', description: 'Classic hand-drawn style' },
    { id: '3d-realistic', name: '3D Realistic', description: 'Photorealistic 3D animation' },
    { id: 'motion-graphics', name: 'Motion Graphics', description: 'Clean geometric animations' },
    { id: 'stop-motion', name: 'Stop Motion', description: 'Frame-by-frame photography' },
    { id: 'anime', name: 'Anime Style', description: 'Japanese animation aesthetic' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean designs' }
  ];

  const generateAnimation = async () => {
    console.log('Generating animation with current settings');
    // Animation generation logic
  };

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="glow-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-primary">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Advanced Animation Studio</CardTitle>
                <CardDescription>Professional animation creation with timeline controls</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
              Pro Animation
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Animation Viewport */}
            <div className="lg:col-span-2 space-y-4">
              <div className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="text-center z-10">
                  <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Animation Canvas</p>
                  <p className="text-sm text-muted-foreground">Your animation will render here</p>
                </div>
                
                {/* Frame indicator */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Frame {currentFrame + 1}
                </div>
              </div>
              
              {/* Animation Controls */}
              <div className="flex items-center justify-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentFrame(currentFrame + 1)}
                >
                  <Play className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{timeline.currentTime.toFixed(1)}s / {timeline.duration}s</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Timeline</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Target className="w-3 h-3 mr-1" />
                      Keyframe
                    </Button>
                    <Button variant="outline" size="sm">
                      <Zap className="w-3 h-3 mr-1" />
                      Auto
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-16 bg-background rounded border">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-2 bg-muted rounded-full mx-4">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(timeline.currentTime / timeline.duration) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Timeline markers */}
                  <div className="absolute bottom-1 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                    <span>0s</span>
                    <span>15s</span>
                    <span>30s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animation Settings & Layers */}
            <div className="space-y-4">
              {/* Animation Style */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Animation Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground">
                    {animationStyles.map(style => (
                      <option key={style.id} value={style.id}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium mb-1 block">Frame Rate</label>
                      <select className="w-full h-8 px-2 rounded-md border border-input bg-background text-sm">
                        <option>24 FPS</option>
                        <option>30 FPS</option>
                        <option>60 FPS</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Quality</label>
                      <select className="w-full h-8 px-2 rounded-md border border-input bg-background text-sm">
                        <option>HD</option>
                        <option>4K</option>
                        <option>8K</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Layers Panel */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Layers</CardTitle>
                    <Button variant="outline" size="sm">
                      <Layers className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {layers.map((layer) => (
                    <div key={layer.id} className="flex items-center space-x-2 p-2 border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => toggleLayer(layer.id)}
                      >
                        {layer.visible ? (
                          <div className="w-3 h-3 bg-primary rounded" />
                        ) : (
                          <div className="w-3 h-3 border border-muted-foreground rounded" />
                        )}
                      </Button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{layer.name}</div>
                        <div className="text-xs text-muted-foreground">{layer.type}</div>
                      </div>
                      
                      <div className="w-16">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={layer.opacity}
                          onChange={(e) => updateLayerOpacity(layer.id, Number(e.target.value))}
                          className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Effects Panel */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Palette className="w-3 h-3 mr-2" />
                    Color Grading
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Zap className="w-3 h-3 mr-2" />
                    Motion Blur
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="w-3 h-3 mr-2" />
                    Lighting
                  </Button>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button 
                className="w-full h-12 glow-primary"
                onClick={generateAnimation}
              >
                <Film className="w-4 h-4 mr-2" />
                Generate Animation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}