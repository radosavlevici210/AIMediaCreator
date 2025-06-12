import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Music, 
  Play, 
  Download, 
  Settings, 
  Volume2,
  Mic,
  Waveform,
  Heart
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface MusicSettings {
  genre: string;
  tempo: number;
  duration: number;
  mood: string[];
  instruments: string[];
  voiceType: string;
  quality: string;
}

export default function EnhancedMusicGenerator() {
  const [lyrics, setLyrics] = useState("");
  const [albumConcept, setAlbumConcept] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<MusicSettings>({
    genre: "electronic",
    tempo: 120,
    duration: 240,
    mood: ["uplifting"],
    instruments: ["synth", "drums"],
    voiceType: "female",
    quality: "studio"
  });

  const genres = [
    "Electronic", "Pop", "Rock", "Classical", "Jazz", "Ambient", 
    "Hip Hop", "Country", "Folk", "R&B", "Reggae", "Blues"
  ];

  const moods = [
    "Uplifting", "Melancholic", "Energetic", "Peaceful", "Dramatic", 
    "Romantic", "Mysterious", "Hopeful", "Nostalgic", "Epic"
  ];

  const instruments = [
    "Piano", "Guitar", "Violin", "Drums", "Bass", "Synth", 
    "Saxophone", "Flute", "Cello", "Trumpet", "Harp", "Orchestra"
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedMusic("/api/generated-music.mp3");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleGenerateAlbum = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate album generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 800);
  };

  const toggleMood = (mood: string) => {
    setSettings(prev => ({
      ...prev,
      mood: prev.mood.includes(mood)
        ? prev.mood.filter(m => m !== mood)
        : [...prev.mood, mood]
    }));
  };

  const toggleInstrument = (instrument: string) => {
    setSettings(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Music Generation */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Music className="w-6 h-6" />
            Enhanced Music Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lyrics Input */}
          <div>
            <Label className="text-green-400 font-semibold">Song Lyrics & Concept</Label>
            <Textarea
              placeholder="Write your song lyrics here...

Example:
[Verse 1]
In the digital age we rise
Through the code and neon lights
AI dreams and human hearts
Together we'll reach the stars

[Chorus]
Binary hearts beating as one
In this world that we've begun
Technology and soul combined
In harmony we'll always find

[Bridge]
Electric pulses, human emotions
Creating musical devotions..."
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="min-h-[200px] bg-black/40 border-white/20 text-white resize-none"
            />
          </div>

          {/* Music Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-blue-400">Genre</Label>
              <Select value={settings.genre} onValueChange={(value) => setSettings(prev => ({ ...prev, genre: value }))}>
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-blue-400">Voice Type</Label>
              <Select value={settings.voiceType} onValueChange={(value) => setSettings(prev => ({ ...prev, voiceType: value }))}>
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female Voice</SelectItem>
                  <SelectItem value="male">Male Voice</SelectItem>
                  <SelectItem value="choir">Choir</SelectItem>
                  <SelectItem value="instrumental">Instrumental Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-blue-400">Audio Quality</Label>
              <Select value={settings.quality} onValueChange={(value) => setSettings(prev => ({ ...prev, quality: value }))}>
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Demo Quality</SelectItem>
                  <SelectItem value="radio">Radio Ready</SelectItem>
                  <SelectItem value="studio">Studio Quality</SelectItem>
                  <SelectItem value="master">Master Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-yellow-400">Tempo: {settings.tempo} BPM</Label>
              <Slider
                value={[settings.tempo]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, tempo: value[0] }))}
                min={60}
                max={180}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-yellow-400">Duration: {Math.floor(settings.duration / 60)}:{(settings.duration % 60).toString().padStart(2, '0')}</Label>
              <Slider
                value={[settings.duration]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, duration: value[0] }))}
                min={30}
                max={600}
                step={15}
                className="mt-2"
              />
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <Label className="text-pink-400 mb-3 block">Mood & Emotion</Label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Badge
                  key={mood}
                  variant={settings.mood.includes(mood.toLowerCase()) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    settings.mood.includes(mood.toLowerCase())
                      ? "bg-pink-500 text-white"
                      : "border-pink-500/50 text-pink-400 hover:bg-pink-500/20"
                  }`}
                  onClick={() => toggleMood(mood.toLowerCase())}
                >
                  {mood}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instrument Selection */}
          <div>
            <Label className="text-green-400 mb-3 block">Instruments</Label>
            <div className="flex flex-wrap gap-2">
              {instruments.map((instrument) => (
                <Badge
                  key={instrument}
                  variant={settings.instruments.includes(instrument.toLowerCase()) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    settings.instruments.includes(instrument.toLowerCase())
                      ? "bg-green-500 text-white"
                      : "border-green-500/50 text-green-400 hover:bg-green-500/20"
                  }`}
                  onClick={() => toggleInstrument(instrument.toLowerCase())}
                >
                  {instrument}
                </Badge>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !lyrics.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
          >
            {isGenerating ? (
              <>
                <Waveform className="w-5 h-5 mr-2 animate-pulse" />
                Generating Music...
              </>
            ) : (
              <>
                <Music className="w-5 h-5 mr-2" />
                Generate Enhanced Music
              </>
            )}
          </Button>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Processing...</span>
                <span className="text-purple-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Generated Music Player */}
          {generatedMusic && (
            <Card className="bg-black/30 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-green-400 font-semibold">Generated Music</h4>
                  <Badge className="bg-green-500/20 text-green-400">Ready</Badge>
                </div>
                <audio controls className="w-full mb-4">
                  <source src={generatedMusic} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400">
                    <Heart className="w-4 h-4 mr-2" />
                    Save to Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Album Generation */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Volume2 className="w-6 h-6" />
            Complete Album Production
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-blue-400 font-semibold">Album Concept & Track List</Label>
            <Textarea
              placeholder="Describe your complete album...

Example:
ALBUM: Digital Dreams Evolved
ARTIST: AI Studio Production
THEME: Technology meets humanity
GENRE: Electronic Pop with orchestral elements

TRACK 1: 'Binary Hearts' (Electronic Pop, 4:30)
TRACK 2: 'Neural Networks Symphony' (Orchestral Electronic, 6:45)
TRACK 3: 'Code and Dreams' (Ambient Pop, 5:15)
TRACK 4: 'Digital Revolution' (Upbeat Electronic, 3:45)
TRACK 5: 'Human.exe' (Experimental, 7:20)

PRODUCTION NOTES:
- High-quality studio production
- Real-time collaboration features
- Market analysis optimization
- Multiple format exports"
              value={albumConcept}
              onChange={(e) => setAlbumConcept(e.target.value)}
              className="min-h-[200px] bg-black/40 border-white/20 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-cyan-400">Album Length</Label>
              <Select defaultValue="12">
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Tracks (EP)</SelectItem>
                  <SelectItem value="8">8 Tracks (Short Album)</SelectItem>
                  <SelectItem value="12">12 Tracks (Full Album)</SelectItem>
                  <SelectItem value="15">15 Tracks (Extended)</SelectItem>
                  <SelectItem value="20">20 Tracks (Double Album)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-cyan-400">Production Mode</Label>
              <Select defaultValue="ai-human">
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Production</SelectItem>
                  <SelectItem value="band">Band Collaboration</SelectItem>
                  <SelectItem value="producer">Producer Assisted</SelectItem>
                  <SelectItem value="ai-human">AI-Human Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-cyan-400">Mastering Quality</Label>
              <Select defaultValue="streaming-optimized">
                <SelectTrigger className="bg-black/40 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio-ready">Radio Ready</SelectItem>
                  <SelectItem value="streaming-optimized">Streaming Optimized</SelectItem>
                  <SelectItem value="vinyl-master">Vinyl Master</SelectItem>
                  <SelectItem value="audiophile">Audiophile Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerateAlbum}
            disabled={isGenerating || !albumConcept.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3"
          >
            {isGenerating ? (
              <>
                <Settings className="w-5 h-5 mr-2 animate-spin" />
                Producing Album...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Create Complete Album
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}