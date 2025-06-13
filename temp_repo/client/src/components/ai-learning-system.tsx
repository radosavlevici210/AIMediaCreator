import { useState, useEffect } from "react";
import { Brain, Zap, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface LearningMetrics {
  intelligenceLevel: number;
  learningSpeed: number;
  optimizationScore: number;
  activeModels: number;
  contentGenerated: number;
  qualityScore: number;
}

export default function AILearningSystem() {
  const [metrics, setMetrics] = useState<LearningMetrics>({
    intelligenceLevel: 85,
    learningSpeed: 1.5,
    optimizationScore: 97,
    activeModels: 12,
    contentGenerated: 0,
    qualityScore: 89
  });

  const [isLearning, setIsLearning] = useState(true);

  useEffect(() => {
    if (!isLearning) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        intelligenceLevel: Math.min(100, prev.intelligenceLevel + Math.random() * 0.5),
        optimizationScore: Math.min(100, prev.optimizationScore + Math.random() * 0.3),
        qualityScore: Math.min(100, prev.qualityScore + Math.random() * 0.2),
        contentGenerated: prev.contentGenerated + Math.floor(Math.random() * 3)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLearning]);

  return (
    <Card className="mb-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-green-400">
          <Brain className="w-6 h-6" />
          Enhanced AI Self-Learning System
        </CardTitle>
        <p className="text-sm text-gray-400">
          Advanced AI with multi-model selection, real-time optimization, and collaborative learning
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Learning Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Learning Progress</span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Quantum Mode
              </Badge>
            </div>
            <Progress 
              value={metrics.optimizationScore} 
              className="h-3 bg-white/10"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-green-400">
                <Zap className="w-4 h-4" />
                <span className="text-lg font-bold">{metrics.learningSpeed.toFixed(1)}x</span>
              </div>
              <div className="text-xs text-gray-400">Learning Speed</div>
            </div>
            
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-blue-400">
                <Brain className="w-4 h-4" />
                <span className="text-lg font-bold">{Math.round(metrics.intelligenceLevel)}%</span>
              </div>
              <div className="text-xs text-gray-400">Intelligence</div>
            </div>
            
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-purple-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg font-bold">{metrics.activeModels}</span>
              </div>
              <div className="text-xs text-gray-400">Active Models</div>
            </div>
            
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-orange-400">
                <Target className="w-4 h-4" />
                <span className="text-lg font-bold">{Math.round(metrics.qualityScore)}%</span>
              </div>
              <div className="text-xs text-gray-400">Quality Score</div>
            </div>
          </div>

          {/* Status Information */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              Advanced+
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              Real-time Optimization
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              Multi-Model Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}