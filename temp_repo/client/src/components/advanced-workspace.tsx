import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Music, 
  Box, 
  Rocket, 
  Star, 
  Image, 
  Palette,
  Play,
  Settings,
  Cog
} from "lucide-react";

export default function AdvancedWorkspace() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [batchQueue, setBatchQueue] = useState<string[]>([]);

  const aiModels = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Enhanced creativity and reasoning',
      icon: Rocket,
      color: 'text-green-400',
      category: 'text'
    },
    {
      id: 'claude-3-opus',
      name: 'Claude-3 Opus',
      description: 'Advanced analysis and writing',
      icon: Star,
      color: 'text-blue-400',
      category: 'text'
    },
    {
      id: 'dall-e-3',
      name: 'DALL-E 3',
      description: 'Advanced image generation',
      icon: Image,
      color: 'text-pink-400',
      category: 'image'
    },
    {
      id: 'midjourney-v6',
      name: 'Midjourney V6',
      description: 'Artistic image creation',
      icon: Palette,
      color: 'text-orange-400',
      category: 'image'
    },
    {
      id: 'suno-ai',
      name: 'Suno AI',
      description: 'Advanced music generation',
      icon: Music,
      color: 'text-cyan-400',
      category: 'audio'
    },
    {
      id: 'runway-gen3',
      name: 'Runway Gen-3',
      description: 'Video generation and editing',
      icon: Video,
      color: 'text-red-400',
      category: 'video'
    }
  ];

  const editors = [
    {
      name: 'Video Editor',
      icon: Video,
      features: ['Multi-track timeline', 'Real-time effects', 'AI-powered editing suggestions', 'Collaborative editing'],
      color: 'bg-purple-500/20 border-purple-500/30'
    },
    {
      name: 'Audio Editor',
      icon: Music,
      features: ['Professional mixing console', 'AI noise reduction', 'Real-time effects', 'Spatial audio support'],
      color: 'bg-blue-500/20 border-blue-500/30'
    },
    {
      name: '3D Scene Editor',
      icon: Box,
      features: ['Real-time 3D rendering', 'Physics simulation', 'AI-assisted modeling', 'VR/AR preview'],
      color: 'bg-green-500/20 border-green-500/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Production Tools */}
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Enhanced Production Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Advanced Editors */}
          <div className="mb-6">
            <h3 className="text-purple-400 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Advanced Multi-Media Editor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {editors.map((editor) => {
                const Icon = editor.icon;
                return (
                  <Card key={editor.name} className={`${editor.color} backdrop-blur-sm`}>
                    <CardContent className="p-4">
                      <h5 className="text-purple-400 mb-3 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {editor.name}
                      </h5>
                      <Button 
                        className="w-full mb-3 bg-gradient-to-r from-green-500 to-blue-500"
                        onClick={() => console.log(`Opening ${editor.name}`)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Launch {editor.name}
                      </Button>
                      <ul className="text-sm space-y-1">
                        {editor.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-300">• {feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* AI Model Selector */}
          <div className="mb-6">
            <h3 className="text-green-400 mb-4 text-center flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Advanced AI Model Selection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aiModels.map((model) => {
                const Icon = model.icon;
                const isSelected = selectedModel === model.id;
                return (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected 
                        ? 'border-green-500/50 bg-green-500/10' 
                        : 'border-white/10 bg-black/20 hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${model.color}`} />
                      <h4 className="font-semibold text-white mb-1">{model.name}</h4>
                      <p className="text-xs text-gray-400">{model.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {model.category}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Batch Processing */}
          <div>
            <h3 className="text-orange-400 mb-4 flex items-center gap-2">
              <Cog className="w-5 h-5" />
              Batch Processing Engine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-4">
                  <h5 className="text-orange-400 mb-3">Batch Video Processing</h5>
                  <div className="space-y-2 mb-3">
                    <div className="text-sm text-gray-300">Processing Queue:</div>
                    <div className="bg-black/40 p-2 rounded text-xs space-y-1">
                      <div>• AI Revolution Movie</div>
                      <div>• Space Adventure</div>
                      <div>• Drama Series EP1</div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                    <Play className="w-4 h-4 mr-2" />
                    Start Batch Processing
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-4">
                  <h5 className="text-orange-400 mb-3">Batch Audio Processing</h5>
                  <div className="space-y-2 mb-3">
                    <div className="text-sm text-gray-300">Audio Queue:</div>
                    <div className="bg-black/40 p-2 rounded text-xs space-y-1">
                      <div>• Digital Dreams Album</div>
                      <div>• Jazz Collection</div>
                      <div>• Podcast Series</div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Play className="w-4 h-4 mr-2" />
                    Start Audio Batch
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}