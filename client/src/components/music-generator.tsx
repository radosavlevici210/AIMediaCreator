import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import WaveformVisualizer from "./waveform-visualizer";

export default function MusicGenerator() {
  const [lyrics, setLyrics] = useState("");
  const [genre, setGenre] = useState("electronic-pop");
  const [duration, setDuration] = useState("3:30");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateMusicMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/projects", {
        title: `Music from Lyrics - ${new Date().toLocaleTimeString()}`,
        type: "music",
        content: lyrics,
        settings: JSON.stringify({ genre, duration }),
        status: "pending",
      });
      return response.json();
    },
    onSuccess: (project) => {
      toast({
        title: "Music Generation Started",
        description: `Project "${project.title}" is now being processed.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Failed to start music generation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!lyrics.trim()) {
      toast({
        title: "Missing Lyrics",
        description: "Please enter lyrics to generate music.",
        variant: "destructive",
      });
      return;
    }
    generateMusicMutation.mutate();
  };

  return (
    <div className="glass-morphism rounded-2xl p-8 border border-white/10 hover:border-[hsl(150,100%,50%)]/50 transition-all duration-300 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <i className="fas fa-music text-4xl text-[hsl(150,100%,50%)] mr-4"></i>
          <div>
            <h2 className="text-2xl font-bold">Music Generator</h2>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ervin Radosavlevici | {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <img 
        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
        alt="Professional music production studio" 
        className="w-full h-48 object-cover rounded-xl mb-6 shadow-lg" 
      />
      
      <div className="space-y-4">
        <div>
          <label className="block text-[hsl(150,100%,50%)] font-semibold mb-2">Lyrics Input:</label>
          <Textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[hsl(150,100%,50%)] focus:ring-2 focus:ring-[hsl(150,100%,50%)]/30 transition-all"
            rows={4}
            placeholder="Enter your song lyrics here...

Example:
In the digital age we rise
Through the code and neon lights
AI dreams and human hearts  
Together we'll reach the stars..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[hsl(150,100%,50%)] font-semibold mb-2">Genre:</label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 text-white focus:border-[hsl(150,100%,50%)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronic-pop">Electronic Pop</SelectItem>
                <SelectItem value="synthwave">Synthwave</SelectItem>
                <SelectItem value="ambient">Ambient</SelectItem>
                <SelectItem value="lo-fi-hip-hop">Lo-Fi Hip Hop</SelectItem>
                <SelectItem value="cinematic">Cinematic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-[hsl(150,100%,50%)] font-semibold mb-2">Duration:</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 text-white focus:border-[hsl(150,100%,50%)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3:30">3:30 minutes</SelectItem>
                <SelectItem value="4:00">4:00 minutes</SelectItem>
                <SelectItem value="5:00">5:00 minutes</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <WaveformVisualizer isActive={generateMusicMutation.isPending} />
        
        <Button
          onClick={handleGenerate}
          disabled={generateMusicMutation.isPending}
          className="w-full bg-gradient-to-r from-[hsl(150,100%,50%)] to-[hsl(210,100%,60%)] hover:from-[hsl(150,100%,50%)]/80 hover:to-[hsl(210,100%,60%)]/80 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <i className="fas fa-magic mr-2"></i>
          {generateMusicMutation.isPending ? "Generating..." : "Generate Music"}
        </Button>
      </div>
    </div>
  );
}
