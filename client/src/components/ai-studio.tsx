import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Video, 
  Palette, 
  Brain, 
  Sparkles, 
  Play, 
  Download,
  Wand2,
  Loader2,
  Camera,
  Headphones
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface MusicConcept {
  title: string;
  genre: string;
  mood: string;
  lyrics: string;
  structure: string;
}

interface VideoConcept {
  title: string;
  description: string;
  scenes: string[];
  style: string;
  duration: string;
}

interface CoverArt {
  url: string;
}

export default function AIStudio() {
  const [musicPrompt, setMusicPrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [coverPrompt, setCoverPrompt] = useState('');
  const [musicResult, setMusicResult] = useState<MusicConcept | null>(null);
  const [videoResult, setVideoResult] = useState<VideoConcept | null>(null);
  const [coverResult, setCoverResult] = useState<CoverArt | null>(null);
  
  const { toast } = useToast();

  // Music generation mutation
  const musicMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch('/api/ai/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate music concept');
      }
      
      const data = await response.json();
      return data.data as MusicConcept;
    },
    onSuccess: (data) => {
      setMusicResult(data);
      toast({
        title: "Music Concept Generated",
        description: `Created "${data.title}" in ${data.genre} style`
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Video generation mutation
  const videoMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate video concept');
      }
      
      const data = await response.json();
      return data.data as VideoConcept;
    },
    onSuccess: (data) => {
      setVideoResult(data);
      toast({
        title: "Video Concept Generated",
        description: `Created "${data.title}" concept`
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Cover art generation mutation
  const coverMutation = useMutation({
    mutationFn: async (description: string) => {
      const response = await fetch('/api/ai/generate-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate cover art');
      }
      
      const data = await response.json();
      return data.data as CoverArt;
    },
    onSuccess: (data) => {
      setCoverResult(data);
      toast({
        title: "Cover Art Generated",
        description: "Your custom artwork is ready"
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI Studio Pro+
          </h1>
          <p className="text-xl text-slate-300">
            Professional AI-powered music and video creation
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Music Generation */}
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Music className="w-6 h-6" />
                AI Music Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="music-prompt" className="text-slate-300">
                  Describe your music concept
                </Label>
                <Textarea
                  id="music-prompt"
                  placeholder="e.g., An upbeat electronic dance track with ethereal vocals and cosmic themes"
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={() => musicMutation.mutate(musicPrompt)}
                disabled={!musicPrompt.trim() || musicMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {musicMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="w-4 h-4 mr-2" /> Generate Music</>
                )}
              </Button>

              {musicResult && (
                <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-purple-500/20">
                  <h3 className="font-bold text-purple-300 mb-2">{musicResult.title}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                      {musicResult.genre}
                    </Badge>
                    <Badge variant="outline" className="border-pink-500/50 text-pink-300">
                      {musicResult.mood}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Structure:</strong> {musicResult.structure}
                  </p>
                  <div className="text-sm text-slate-300">
                    <strong>Lyrics Preview:</strong>
                    <div className="mt-1 p-2 bg-slate-800/50 rounded text-xs">
                      {musicResult.lyrics.substring(0, 150)}...
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Generation */}
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Video className="w-6 h-6" />
                AI Video Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-prompt" className="text-slate-300">
                  Describe your video concept
                </Label>
                <Textarea
                  id="video-prompt"
                  placeholder="e.g., A cinematic music video featuring neon-lit cityscapes and dynamic camera movements"
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={() => videoMutation.mutate(videoPrompt)}
                disabled={!videoPrompt.trim() || videoMutation.isPending}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                {videoMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Camera className="w-4 h-4 mr-2" /> Generate Video</>
                )}
              </Button>

              {videoResult && (
                <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                  <h3 className="font-bold text-cyan-300 mb-2">{videoResult.title}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-300">
                      {videoResult.style}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                      {videoResult.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">
                    {videoResult.description}
                  </p>
                  <div className="text-sm text-slate-300">
                    <strong>Scene Breakdown:</strong>
                    <ul className="mt-1 space-y-1">
                      {videoResult.scenes.slice(0, 3).map((scene, index) => (
                        <li key={index} className="text-xs bg-slate-800/50 p-1 rounded">
                          {index + 1}. {scene}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cover Art Generation */}
          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-400">
                <Palette className="w-6 h-6" />
                AI Cover Art
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cover-prompt" className="text-slate-300">
                  Describe your cover art
                </Label>
                <Textarea
                  id="cover-prompt"
                  placeholder="e.g., Abstract digital art with vibrant colors and futuristic elements"
                  value={coverPrompt}
                  onChange={(e) => setCoverPrompt(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={() => coverMutation.mutate(coverPrompt)}
                disabled={!coverPrompt.trim() || coverMutation.isPending}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                {coverMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Generate Art</>
                )}
              </Button>

              {coverResult && (
                <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-pink-500/20">
                  <div className="aspect-square w-full bg-slate-800 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={coverResult.url} 
                      alt="Generated cover art"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-pink-500/50 text-pink-300 hover:bg-pink-500/10"
                    onClick={() => window.open(coverResult.url, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-green-500/50 text-green-300 px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              GPT-4o Powered
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-300 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              DALL-E 3 Integration
            </Badge>
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-300 px-4 py-2">
              <Headphones className="w-4 h-4 mr-2" />
              Professional Quality
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}