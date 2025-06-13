import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  Waves, 
  Mic,
  Volume2,
  Settings,
  Sparkles,
  Brain,
  Headphones,
  Repeat,
  Shuffle,
  SkipForward,
  SkipBack
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import GradientCard from "./ui/gradient-card";

interface MusicGenerationRequest {
  prompt: string;
  style: string;
  duration: number;
  tempo: number;
  key: string;
  mood: string;
  instruments: string[];
  vocals: boolean;
  lyrics?: string;
}

interface GeneratedTrack {
  id: string;
  title: string;
  duration: number;
  style: string;
  audioUrl: string;
  waveformData: number[];
  metadata: {
    bpm: number;
    key: string;
    mood: string;
    instruments: string[];
  };
}

export default function MusicGenerationStudio() {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("pop");
  const [duration, setDuration] = useState([180]); // 3 minutes
  const [tempo, setTempo] = useState([120]); // 120 BPM
  const [selectedKey, setSelectedKey] = useState("C Major");
  const [selectedMood, setSelectedMood] = useState("upbeat");
  const [includeVocals, setIncludeVocals] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [currentTrack, setCurrentTrack] = useState<GeneratedTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([75]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const musicStyles = [
    "pop", "rock", "jazz", "classical", "electronic", "hip-hop", 
    "country", "blues", "reggae", "folk", "ambient", "cinematic"
  ];

  const moods = [
    "upbeat", "melancholic", "energetic", "peaceful", "dramatic", 
    "romantic", "mysterious", "epic", "playful", "nostalgic"
  ];

  const keys = [
    "C Major", "G Major", "D Major", "A Major", "E Major", "B Major",
    "F# Major", "C# Major", "F Major", "Bb Major", "Eb Major", "Ab Major",
    "Db Major", "Gb Major", "Cb Major", "A Minor", "E Minor", "B Minor",
    "F# Minor", "C# Minor", "G# Minor", "D# Minor", "A# Minor", "D Minor",
    "G Minor", "C Minor", "F Minor", "Bb Minor", "Eb Minor", "Ab Minor"
  ];

  const instruments = [
    "piano", "guitar", "violin", "drums", "bass", "synthesizer",
    "saxophone", "trumpet", "flute", "cello", "organ", "harp"
  ];

  const generateMusicMutation = useMutation({
    mutationFn: async (request: MusicGenerationRequest) => {
      // Simulate API call - in real implementation, this would call your AI music generation service
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const track: GeneratedTrack = {
        id: Date.now().toString(),
        title: `Generated Track - ${request.style}`,
        duration: request.duration,
        style: request.style,
        audioUrl: "/api/generated-music/" + Date.now(), // Placeholder URL
        waveformData: Array.from({ length: 100 }, () => Math.random() * 100),
        metadata: {
          bpm: request.tempo,
          key: request.key,
          mood: request.mood,
          instruments: request.instruments
        }
      };
      
      return track;
    },
    onSuccess: (track) => {
      setCurrentTrack(track);
      toast({
        title: "Music Generated Successfully",
        description: `Your ${track.style} track "${track.title}" is ready to play.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate music. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your music.",
        variant: "destructive",
      });
      return;
    }

    const request: MusicGenerationRequest = {
      prompt,
      style: selectedStyle,
      duration: duration[0],
      tempo: tempo[0],
      key: selectedKey,
      mood: selectedMood,
      instruments: selectedInstruments,
      vocals: includeVocals,
      lyrics: includeVocals ? lyrics : undefined
    };

    generateMusicMutation.mutate(request);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleInstrumentToggle = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              AI Music Generation Studio
            </h1>
            <p className="text-muted-foreground mt-1">
              Create professional music with advanced AI technology
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generation Controls */}
          <div className="lg:col-span-2 space-y-6">
            <GradientCard
              title="Music Generation"
              description="Describe your musical vision"
              gradient="primary"
              glowEffect={true}
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium">
                    Music Description
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the music you want to create... (e.g., 'Uplifting pop song with energetic drums and soaring melodies')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Style</Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {musicStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Mood</Label>
                    <Select value={selectedMood} onValueChange={setSelectedMood}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {moods.map((mood) => (
                          <SelectItem key={mood} value={mood}>
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Key</Label>
                    <Select value={selectedKey} onValueChange={setSelectedKey}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {keys.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Duration: {Math.floor(duration[0] / 60)}:{(duration[0] % 60).toString().padStart(2, '0')}
                    </Label>
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      min={30}
                      max={600}
                      step={30}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Tempo: {tempo[0]} BPM
                    </Label>
                    <Slider
                      value={tempo}
                      onValueChange={setTempo}
                      min={60}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Instruments</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {instruments.map((instrument) => (
                      <Button
                        key={instrument}
                        variant={selectedInstruments.includes(instrument) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInstrumentToggle(instrument)}
                        className="text-xs"
                      >
                        {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="vocals"
                      checked={includeVocals}
                      onChange={(e) => setIncludeVocals(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="vocals" className="text-sm font-medium">
                      Include Vocals
                    </Label>
                  </div>

                  {includeVocals && (
                    <div>
                      <Label htmlFor="lyrics" className="text-sm font-medium">
                        Lyrics (Optional)
                      </Label>
                      <Textarea
                        id="lyrics"
                        placeholder="Enter your lyrics here..."
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={generateMusicMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {generateMusicMutation.isPending ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Generating Music...
                    </>
                  ) : (
                    <>
                      <Music className="w-4 h-4 mr-2" />
                      Generate Music
                    </>
                  )}
                </Button>

                {generateMusicMutation.isPending && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Processing</span>
                      <span>Please wait...</span>
                    </div>
                    <Progress value={33} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Our advanced AI is composing your unique track...
                    </p>
                  </div>
                )}
              </div>
            </GradientCard>
          </div>

          {/* Player & Controls */}
          <div className="space-y-6">
            <GradientCard
              title="Music Player"
              gradient="accent"
              glowEffect={currentTrack !== null}
            >
              {currentTrack ? (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">{currentTrack.title}</h3>
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline">{currentTrack.style}</Badge>
                      <Badge variant="outline">{currentTrack.metadata.mood}</Badge>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="h-16 bg-background/50 rounded-lg flex items-end justify-center gap-1 px-4">
                    {currentTrack.waveformData.slice(0, 50).map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-purple-600 to-pink-400 w-1 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button onClick={togglePlayback} size="sm">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        min={0}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>BPM:</span>
                      <span>{currentTrack.metadata.bpm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Key:</span>
                      <span>{currentTrack.metadata.key}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{Math.floor(currentTrack.duration / 60)}:{(currentTrack.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Track
                  </Button>

                  <audio ref={audioRef} src={currentTrack.audioUrl} />
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Headphones className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No track loaded</p>
                  <p className="text-sm">Generate your first AI music track</p>
                </div>
              )}
            </GradientCard>

            <GradientCard
              title="Quick Tips"
              gradient="success"
            >
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Be specific in your descriptions for better results</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Experiment with different instrument combinations</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Try various moods to match your project needs</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Use vocals for more dynamic compositions</p>
                </div>
              </div>
            </GradientCard>
          </div>
        </div>
      </div>
    </div>
  );
}