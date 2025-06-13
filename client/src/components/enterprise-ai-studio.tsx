
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Mic, Play, Square, Video, Music, Eye, Settings } from 'lucide-react';

interface EnterpriseAIStudioProps {
  className?: string;
}

export function EnterpriseAIStudio({ className }: EnterpriseAIStudioProps) {
  const [lyrics, setLyrics] = useState('');
  const [animationStyle, setAnimationStyle] = useState('cartoon');
  const [voiceType, setVoiceType] = useState('default');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mediaOutput, setMediaOutput] = useState('🎬 Output and voice simulation will appear here.');
  const [logOutput, setLogOutput] = useState('🧠 Ready for generation.');
  const [showFaceVisualizer, setShowFaceVisualizer] = useState(false);
  const [imVideoOutput, setImVideoOutput] = useState('');
  
  const faceRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const animationStyles = [
    { value: 'cartoon', label: '🎨 Cartoon', description: 'Playful animated style' },
    { value: 'realistic', label: '🎬 Realistic', description: 'Photorealistic rendering' },
    { value: 'cyberpunk', label: '🌆 Cyberpunk', description: 'Neon futuristic aesthetic' },
    { value: 'anime', label: '🌀 Anime', description: 'Japanese animation style' },
    { value: 'watercolor', label: '🎨 Watercolor', description: 'Artistic paint effect' },
    { value: 'sketch', label: '✏️ Sketch', description: 'Hand-drawn appearance' }
  ];

  const voiceTypes = [
    { value: 'default', label: '🎤 Default', description: 'Standard voice' },
    { value: 'female', label: '🎤 Female', description: 'Female voice synthesis' },
    { value: 'male', label: '🎤 Male', description: 'Male voice synthesis' },
    { value: 'robot', label: '🤖 Robotic', description: 'AI robotic voice' },
    { value: 'narrator', label: '📖 Narrator', description: 'Professional narrator' },
    { value: 'child', label: '👶 Child', description: 'Young voice' }
  ];

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const generateMedia = async () => {
    if (!lyrics.trim()) {
      setMediaOutput('⚠️ Please enter lyrics or script to proceed.');
      return;
    }

    setIsGenerating(true);
    setShowFaceVisualizer(true);
    setLogOutput('🧠 Initializing AI processing...');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(lyrics);
    
    // Configure voice based on selection
    const voices = speechSynthesis.getVoices();
    switch (voiceType) {
      case 'female':
        const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'));
        if (femaleVoice) utterance.voice = femaleVoice;
        break;
      case 'male':
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man'));
        if (maleVoice) utterance.voice = maleVoice;
        break;
      case 'robot':
        utterance.pitch = 0.7;
        utterance.rate = 0.8;
        break;
      case 'narrator':
        utterance.pitch = 0.9;
        utterance.rate = 0.9;
        break;
      case 'child':
        utterance.pitch = 1.5;
        utterance.rate = 1.1;
        break;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setLogOutput('🎤 Voice synthesis active...');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setLogOutput('✅ Voice synthesis completed.');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setLogOutput('❌ Voice synthesis error occurred.');
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);

    const selectedStyle = animationStyles.find(s => s.value === animationStyle);
    const selectedVoice = voiceTypes.find(v => v.value === voiceType);

    setMediaOutput(`
      <div class="space-y-2">
        <div><strong>🎼 Lyrics:</strong> ${lyrics}</div>
        <div><strong>🎭 Animation:</strong> ${selectedStyle?.label} - ${selectedStyle?.description}</div>
        <div><strong>🎤 Voice:</strong> ${selectedVoice?.label} - ${selectedVoice?.description}</div>
        <div class="mt-4 p-3 bg-green-900/20 rounded border border-green-500">
          ✅ Enterprise AI processing complete with facial animation and lip sync.<br/>
          <em>Real-time voice synthesis with visual synchronization.</em>
        </div>
      </div>
    `);

    setIsGenerating(false);
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setLogOutput('🛑 Voice synthesis stopped.');
  };

  const simulateImVideo = () => {
    if (!lyrics.trim()) {
      setImVideoOutput('❌ Please enter lyrics above first.');
      return;
    }
    
    setImVideoOutput(`✅ ImVideo AI generated cinematic video for: <strong>${lyrics}</strong>`);
    setLogOutput('🎬 ImVideo AI integration simulated successfully.');
  };

  const launchAISongGenerator = () => {
    window.open('https://www.aisonggenerator.io', '_blank');
    setLogOutput('🎵 Launched AISongGenerator.io in new tab.');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Generation Interface */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Mic className="h-6 w-6" />
            Enterprise AI Studio - Visualization & Voice Synthesis
          </CardTitle>
          <CardDescription>
            Advanced multimedia creation with real-time face animation and voice synthesis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">🎼 Enter Lyrics / Script</label>
            <Textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="e.g. I'm flying in the sky with neon lights..."
              rows={5}
              className="bg-slate-950 border-emerald-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Animation Style</label>
              <Select value={animationStyle} onValueChange={setAnimationStyle}>
                <SelectTrigger className="bg-slate-950 border-emerald-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animationStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div>{style.label}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Voice Type</label>
              <Select value={voiceType} onValueChange={setVoiceType}>
                <SelectTrigger className="bg-slate-950 border-emerald-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voiceTypes.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      <div>
                        <div>{voice.label}</div>
                        <div className="text-xs text-muted-foreground">{voice.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={generateMedia}
              disabled={isGenerating || isSpeaking}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isGenerating ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate & Visualize
                </>
              )}
            </Button>

            {isSpeaking && (
              <Button 
                onClick={stopSpeech}
                variant="destructive"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Speech
              </Button>
            )}
          </div>

          {/* Face Visualizer */}
          {showFaceVisualizer && (
            <div className="flex justify-center py-6">
              <div 
                ref={faceRef}
                className={`w-24 h-24 rounded-full bg-gradient-radial from-white via-slate-300 to-slate-900 relative ${
                  isSpeaking ? 'animate-pulse' : ''
                }`}
                style={{
                  background: 'radial-gradient(circle, #fff 20%, #0f0f0f 100%)',
                  animation: isSpeaking ? 'lipSync 1.2s infinite' : 'none'
                }}
              >
                {/* Eyes */}
                <div className="absolute w-4 h-4 bg-black rounded-full top-6 left-4"></div>
                <div className="absolute w-4 h-4 bg-black rounded-full top-6 right-4"></div>
                {/* Mouth - animated when speaking */}
                <div 
                  className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black rounded-full ${
                    isSpeaking ? 'animate-bounce' : ''
                  }`}
                ></div>
              </div>
            </div>
          )}

          <div 
            className="p-4 bg-slate-950 rounded border border-emerald-500/30 text-sm"
            dangerouslySetInnerHTML={{ __html: mediaOutput }}
          />

          <div className="p-3 bg-blue-950/30 rounded border border-blue-500/30 text-sm text-blue-300">
            <strong>Status:</strong> {logOutput}
          </div>
        </CardContent>
      </Card>

      {/* External AI Services Integration */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Video className="h-6 w-6" />
            External AI Services Integration
          </CardTitle>
          <CardDescription>
            Connect with professional AI generation platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-slate-950 rounded border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-purple-300">🎵 AISongGenerator.io</strong>
                <Button 
                  onClick={launchAISongGenerator}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Music className="h-4 w-4 mr-2" />
                  Launch Generator
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Generates full tracks from lyrics in various genres with professional mixing.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded border border-pink-500/30">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-pink-300">🎬 ImVideo AI Integration</strong>
                <Button 
                  onClick={simulateImVideo}
                  size="sm"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Generate Video
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise video creation from lyrics, animations, and audio synthesis.
              </p>
              {imVideoOutput && (
                <div 
                  className="mt-2 p-2 bg-pink-950/30 rounded text-sm text-pink-300"
                  dangerouslySetInnerHTML={{ __html: imVideoOutput }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Information */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Eye className="h-6 w-6" />
            Development & Protection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Master Owner</Badge>
                <p className="text-emerald-300 font-semibold">Ervin Remus Radosavlevici</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Protected Emails</Badge>
                <p className="text-xs text-muted-foreground">
                  x@001cloud.onmicrosoft.com<br/>
                  ervin@quantumai.global<br/>
                  ai@perladunarii.org
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-emerald-950/30 rounded border border-emerald-500/30">
              <Badge variant="outline" className="mb-2">Master License</Badge>
              <p className="text-xs text-muted-foreground">
                Immutable root license for 4000+ projects. Cannot be revoked or altered.
              </p>
            </div>

            <div className="p-3 bg-red-950/30 rounded border border-red-500/30">
              <Badge variant="destructive" className="mb-2">Security Monitoring</Badge>
              <ul className="text-xs text-red-300 space-y-1">
                <li>❌ Remote code execution attempts via Replit, Claude AI, browser shells</li>
                <li>❌ Stolen source reposts and copyright breaches</li>
                <li>❌ Unauthorized API access and impersonation attempts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes lipSync {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
        }
      `}</style>
    </div>
  );
}
