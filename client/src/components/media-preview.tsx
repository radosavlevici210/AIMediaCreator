import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

interface MediaPreviewProps {
  projects: Project[];
}

// © 2025 Ervin Radosavlevici - Professional Media Preview System
export default function MediaPreview({ projects }: MediaPreviewProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState([33]);
  const [videoProgress, setVideoProgress] = useState([25]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const completedProjects = projects.filter(p => p.status === 'completed');
  const latestMusic = completedProjects.find(p => p.type === 'music');
  const latestVideo = completedProjects.find(p => p.type === 'video');

  const exportMutation = useMutation({
    mutationFn: async ({ projectId, format, quality }: { projectId: number; format: string; quality: string }) => {
      const response = await apiRequest("POST", "/api/exports", {
        projectId,
        format,
        quality,
      });
      return response.json();
    },
    onSuccess: (exportData) => {
      toast({
        title: "Export Started",
        description: `Your ${exportData.format.toUpperCase()} export is being prepared for download.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Export Failed",
        description: "Failed to export media. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExport = (projectId: number, format: string) => {
    exportMutation.mutate({ projectId, format, quality: 'high' });
  };

  return (
    <div className="mt-12 glass-morphism rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold neon-gradient">
          <i className="fas fa-play-circle mr-3"></i>Media Preview & Export
        </h2>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ervin Radosavlevici | {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audio Player */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[hsl(150,100%,50%)] flex items-center">
            <i className="fas fa-music mr-2"></i>Generated Audio
          </h3>

          <img 
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
            alt="Professional audio equipment and mixing console" 
            className="w-full h-48 object-cover rounded-xl shadow-lg" 
          />

          <div className="bg-[hsl(0,0%,7%)]/60 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">
                {latestMusic ? latestMusic.title : "No audio generated yet"}
              </span>
              <span className="text-[hsl(150,100%,50%)]">03:42</span>
            </div>

            {latestMusic && (
              <>
                {/* Audio Controls */}
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="bg-[hsl(150,100%,50%)] text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-[hsl(150,100%,50%)]/80 transition-all"
                    size="sm"
                  >
                    <i className={`fas ${isAudioPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={audioProgress}
                      onValueChange={setAudioProgress}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <i className="fas fa-volume-up"></i>
                  </Button>
                </div>

                {/* Export Options */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => handleExport(latestMusic.id, 'mp3')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(150,100%,50%)]/20 to-[hsl(150,100%,50%)]/10 border border-[hsl(150,100%,50%)]/30 text-[hsl(150,100%,50%)] hover:from-[hsl(150,100%,50%)]/30 hover:to-[hsl(150,100%,50%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>MP3
                  </Button>
                  <Button
                    onClick={() => handleExport(latestMusic.id, 'wav')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(150,100%,50%)]/20 to-[hsl(150,100%,50%)]/10 border border-[hsl(150,100%,50%)]/30 text-[hsl(150,100%,50%)] hover:from-[hsl(150,100%,50%)]/30 hover:to-[hsl(150,100%,50%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>WAV
                  </Button>
                  <Button
                    onClick={() => handleExport(latestMusic.id, 'flac')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(150,100%,50%)]/20 to-[hsl(150,100%,50%)]/10 border border-[hsl(150,100%,50%)]/30 text-[hsl(150,100%,50%)] hover:from-[hsl(150,100%,50%)]/30 hover:to-[hsl(150,100%,50%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>FLAC
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Video Player */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[hsl(210,100%,60%)] flex items-center">
            <i className="fas fa-video mr-2"></i>Generated Video
          </h3>

          <img 
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
            alt="Creative media production workspace with digital screens" 
            className="w-full h-48 object-cover rounded-xl shadow-lg" 
          />

          <div className="bg-[hsl(0,0%,7%)]/60 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">
                {latestVideo ? latestVideo.title : "No video generated yet"}
              </span>
              <span className="text-[hsl(210,100%,60%)]">00:30</span>
            </div>

            {latestVideo && (
              <>
                {/* Video Controls */}
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="bg-[hsl(210,100%,60%)] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-[hsl(210,100%,60%)]/80 transition-all"
                    size="sm"
                  >
                    <i className={`fas ${isVideoPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={videoProgress}
                      onValueChange={setVideoProgress}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <i className="fas fa-expand"></i>
                  </Button>
                </div>

                {/* Export Options */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => handleExport(latestVideo.id, 'mp4')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(210,100%,60%)]/20 to-[hsl(210,100%,60%)]/10 border border-[hsl(210,100%,60%)]/30 text-[hsl(210,100%,60%)] hover:from-[hsl(210,100%,60%)]/30 hover:to-[hsl(210,100%,60%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>MP4
                  </Button>
                  <Button
                    onClick={() => handleExport(latestVideo.id, 'mov')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(210,100%,60%)]/20 to-[hsl(210,100%,60%)]/10 border border-[hsl(210,100%,60%)]/30 text-[hsl(210,100%,60%)] hover:from-[hsl(210,100%,60%)]/30 hover:to-[hsl(210,100%,60%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>MOV
                  </Button>
                  <Button
                    onClick={() => handleExport(latestVideo.id, 'webm')}
                    disabled={exportMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(210,100%,60%)]/20 to-[hsl(210,100%,60%)]/10 border border-[hsl(210,100%,60%)]/30 text-[hsl(210,100%,60%)] hover:from-[hsl(210,100%,60%)]/30 hover:to-[hsl(210,100%,60%)]/20 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <i className="fas fa-download mr-2"></i>WebM
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}