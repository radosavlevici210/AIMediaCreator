import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function VideoCreator() {
  const [concept, setConcept] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [quality, setQuality] = useState("4k");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateVideoMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/projects", {
        title: `Video Creation - ${new Date().toLocaleTimeString()}`,
        type: "video",
        content: concept,
        settings: JSON.stringify({ style, quality }),
        status: "pending",
      });
      return response.json();
    },
    onSuccess: (project) => {
      toast({
        title: "Video Generation Started",
        description: `Project "${project.title}" is now being processed.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Failed to start video generation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!concept.trim()) {
      toast({
        title: "Missing Concept",
        description: "Please enter a video concept to generate video.",
        variant: "destructive",
      });
      return;
    }
    generateVideoMutation.mutate();
  };

  return (
    <div className="glass-morphism rounded-2xl p-8 border border-white/10 hover:border-[hsl(210,100%,60%)]/50 transition-all duration-300 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <i className="fas fa-video text-4xl text-[hsl(210,100%,60%)] mr-4"></i>
          <div>
            <h2 className="text-2xl font-bold">Video Creator</h2>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ervin Radosavlevici | {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <img 
        src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
        alt="Professional video editing workspace" 
        className="w-full h-48 object-cover rounded-xl mb-6 shadow-lg" 
      />
      
      <div className="space-y-4">
        <div>
          <label className="block text-[hsl(210,100%,60%)] font-semibold mb-2">Video Concept:</label>
          <Textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[hsl(210,100%,60%)] focus:ring-2 focus:ring-[hsl(210,100%,60%)]/30 transition-all"
            rows={4}
            placeholder="Describe your video concept...

Example:
A futuristic cityscape at night, neon lights reflecting off wet streets. 
Camera slowly pans across the skyline while AI-generated music plays.
Style: Cyberpunk, cinematic, high contrast lighting."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[hsl(210,100%,60%)] font-semibold mb-2">Style:</label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 text-white focus:border-[hsl(210,100%,60%)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cinematic">Cinematic</SelectItem>
                <SelectItem value="music-video">Music Video</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-[hsl(210,100%,60%)] font-semibold mb-2">Quality:</label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger className="w-full bg-[hsl(0,0%,7%)]/80 border border-white/20 text-white focus:border-[hsl(210,100%,60%)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4k">4K Ultra HD</SelectItem>
                <SelectItem value="1080p">1080p Full HD</SelectItem>
                <SelectItem value="720p">720p HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Production Timeline */}
        <div className="bg-[hsl(0,0%,7%)]/60 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Timeline</span>
            <span className="text-sm text-[hsl(210,100%,60%)]">00:30</span>
          </div>
          <div className="relative bg-gray-700 h-6 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[hsl(210,100%,60%)] to-[hsl(320,100%,50%)] w-3/4 rounded-lg"></div>
            <div className="absolute top-0 h-full w-1 bg-white animate-timeline-scan"></div>
          </div>
        </div>
        
        <Button
          onClick={handleGenerate}
          disabled={generateVideoMutation.isPending}
          className="w-full bg-gradient-to-r from-[hsl(210,100%,60%)] to-[hsl(320,100%,50%)] hover:from-[hsl(210,100%,60%)]/80 hover:to-[hsl(320,100%,50%)]/80 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <i className="fas fa-play mr-2"></i>
          {generateVideoMutation.isPending ? "Creating..." : "Create Video"}
        </Button>
      </div>
    </div>
  );
}
