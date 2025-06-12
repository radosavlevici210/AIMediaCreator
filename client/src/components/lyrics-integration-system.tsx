import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Music, 
  Video, 
  Mic, 
  Play, 
  Pause,
  Download,
  Upload,
  PenTool,
  Headphones,
  Film,
  Wand2,
  RefreshCw,
  Share2,
  Save,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

interface LyricsProject {
  id: string;
  title: string;
  lyrics: string;
  structure: string[];
  genre: string;
  mood: string;
  status: 'draft' | 'completed';
  createdAt: string;
  associatedMedia?: {
    type: 'music' | 'video';
    id: string;
    title: string;
  };
}

interface LyricsLine {
  id: string;
  text: string;
  section: string;
  timestamp?: number;
  rhymeScheme?: string;
}

export default function LyricsIntegrationSystem() {
  const [activeTab, setActiveTab] = useState('create');
  const [currentLyrics, setCurrentLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<LyricsProject | null>(null);
  const [showRhymeScheme, setShowRhymeScheme] = useState(false);

  const sampleProjects: LyricsProject[] = [
    {
      id: '1',
      title: 'Summer Dreams',
      lyrics: `[Verse 1]\nWalking down the golden street\nFeel the sunshine on my feet\nEvery moment feels so sweet\nSummer dreams that can't be beat\n\n[Chorus]\nOh these summer dreams\nNothing's quite what it seems\nDancing in the moonlight beams\nLiving life like movie scenes`,
      structure: ['Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus'],
      genre: 'Pop',
      mood: 'Happy',
      status: 'completed',
      createdAt: '2025-01-12',
      associatedMedia: {
        type: 'music',
        id: 'music-1',
        title: 'Summer Dreams - Instrumental'
      }
    },
    {
      id: '2',
      title: 'City Lights',
      lyrics: `[Verse 1]\nNeon signs illuminate the night\nCity streets are burning bright\nLost in crowds but feeling right\nUrban dreams take their flight`,
      structure: ['Verse 1', 'Chorus', 'Verse 2'],
      genre: 'Electronic',
      mood: 'Energetic',
      status: 'draft',
      createdAt: '2025-01-11'
    }
  ];

  const generateLyrics = async (theme: string, genre: string, mood: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedLyrics = `[Verse 1]
In the depths of ${theme.toLowerCase()}, I find my way
Through the shadows and the light of day
Every heartbeat tells a story untold
In this journey, I am brave and bold

[Chorus]
Rising up, breaking free
This is who I'm meant to be
${theme} calls my name
Nothing will ever be the same

[Verse 2]
Through the storms and through the rain
I will rise above the pain
Every step leads me closer to my dreams
Life is more than what it seems

[Chorus]
Rising up, breaking free
This is who I'm meant to be
${theme} calls my name
Nothing will ever be the same

[Bridge]
When the world seems dark and cold
I remember stories told
Of heroes who stood tall and true
Now it's time for me to choose

[Final Chorus]
Rising up, breaking free
This is who I'm meant to be
${theme} calls my name
I'll never be the same`;

    setCurrentLyrics(generatedLyrics);
    setIsGenerating(false);
  };

  const associateWithMedia = (mediaType: 'music' | 'video', mediaId: string) => {
    console.log(`Associating lyrics with ${mediaType} ${mediaId}`);
    // Implementation for media association
  };

  return (
    <div className="space-y-6">
      <Card className="glow-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center glow-primary">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Lyrics Integration System</CardTitle>
                <CardDescription>Create, edit, and sync lyrics with your media projects</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRhymeScheme(!showRhymeScheme)}
              >
                {showRhymeScheme ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                Rhyme Scheme
              </Button>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Pro Lyrics
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="sync">Sync Media</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            {/* Create Lyrics */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Song Theme</label>
                    <Input 
                      placeholder="Enter the main theme or story..."
                      className="h-12"
                      id="theme-input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Genre</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground">
                        <option>Pop</option>
                        <option>Rock</option>
                        <option>Hip Hop</option>
                        <option>Country</option>
                        <option>R&B</option>
                        <option>Electronic</option>
                        <option>Folk</option>
                        <option>Jazz</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mood</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground">
                        <option>Happy</option>
                        <option>Sad</option>
                        <option>Energetic</option>
                        <option>Romantic</option>
                        <option>Motivational</option>
                        <option>Melancholic</option>
                        <option>Aggressive</option>
                        <option>Peaceful</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Structure</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground">
                        <option>V-C-V-C-B-C</option>
                        <option>ABABCB</option>
                        <option>AABA</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="h-12 glow-primary"
                      onClick={() => {
                        const themeInput = document.getElementById('theme-input') as HTMLInputElement;
                        generateLyrics(themeInput?.value || 'Dreams', 'Pop', 'Happy');
                      }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Lyrics
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="h-12">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Lyrics
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Save className="w-3 h-3 mr-1" />
                      Save Draft
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Lyrics</label>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {currentLyrics.split('\n').filter(line => line.trim()).length} lines
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ~{Math.ceil(currentLyrics.length / 20)} words
                      </Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={currentLyrics}
                      onChange={(e) => setCurrentLyrics(e.target.value)}
                      placeholder="Your generated lyrics will appear here..."
                      className="w-full h-80 p-4 bg-muted/50 rounded-lg border border-input resize-none font-mono text-sm leading-relaxed"
                    />
                    {showRhymeScheme && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-2 rounded border text-xs">
                        <div className="font-medium mb-1">Rhyme Scheme:</div>
                        <div className="space-y-1">
                          <div><span className="text-red-400">A</span> - street, feet, sweet, beat</div>
                          <div><span className="text-blue-400">B</span> - dreams, seems, beams, scenes</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Lyrics Library */}
            <TabsContent value="library" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Lyrics Library</h3>
                <Button size="sm">
                  <PenTool className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleProjects.map((project) => (
                  <Card key={project.id} className="cursor-pointer glow-hover" onClick={() => setSelectedProject(project)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{project.title}</CardTitle>
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {project.genre} • {project.mood}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-xs text-muted-foreground line-clamp-3">
                        {project.lyrics.substring(0, 100)}...
                      </div>
                      
                      {project.associatedMedia && (
                        <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded text-xs">
                          {project.associatedMedia.type === 'music' ? (
                            <Music className="w-3 h-3 text-green-400" />
                          ) : (
                            <Video className="w-3 h-3 text-purple-400" />
                          )}
                          <span className="truncate">{project.associatedMedia.title}</span>
                        </div>
                      )}
                      
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <PenTool className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sync with Media */}
            <TabsContent value="sync" className="space-y-6">
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto glow-primary">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sync Lyrics with Media</h3>
                <p className="text-muted-foreground mb-6">
                  Connect your lyrics with music tracks or video projects for perfect timing
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button className="h-16 flex flex-col items-center justify-center space-y-1" onClick={() => associateWithMedia('music', 'sample-music')}>
                    <Headphones className="w-6 h-6" />
                    <span className="text-sm">Sync with Music</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1" onClick={() => associateWithMedia('video', 'sample-video')}>
                    <Film className="w-6 h-6" />
                    <span className="text-sm">Sync with Video</span>
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Sync Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Music className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-sm font-medium">Summer Dreams</div>
                          <div className="text-xs text-muted-foreground">Synced with instrumental track</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="text-sm font-medium">City Lights</div>
                          <div className="text-xs text-muted-foreground">Ready for video sync</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Film className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Options */}
            <TabsContent value="export" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Lyrics</CardTitle>
                  <CardDescription>Export your lyrics in various formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">Plain Text</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">LRC Format</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">PDF</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <Download className="w-6 h-6" />
                      <span className="text-sm">All Formats</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}