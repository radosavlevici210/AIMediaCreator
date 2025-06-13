import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GraduationCap, 
  Music, 
  Brain, 
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Headphones,
  Mic,
  Piano,
  Guitar,
  Drum,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Star,
  Clock,
  BarChart3
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import GradientCard from "./ui/gradient-card";

interface LearningModule {
  id: string;
  title: string;
  category: 'theory' | 'composition' | 'production' | 'performance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  completed: boolean;
  progress: number;
  skills: string[];
  description: string;
}

interface LearningProgress {
  totalModules: number;
  completedModules: number;
  currentStreak: number;
  totalPracticeTime: number;
  skillLevels: {
    theory: number;
    composition: number;
    production: number;
    performance: number;
  };
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface PracticeSession {
  id: string;
  type: 'ear-training' | 'rhythm' | 'composition' | 'improvisation';
  difficulty: number;
  score: number;
  completed: boolean;
}

export default function AIMusicLearningSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  
  const { toast } = useToast();

  // Mock data - in production, this would come from your learning system API
  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: 'Music Theory Fundamentals',
      category: 'theory',
      difficulty: 'beginner',
      duration: 45,
      completed: true,
      progress: 100,
      skills: ['scales', 'intervals', 'chord theory'],
      description: 'Learn the basic building blocks of music theory including scales, intervals, and chord progressions.'
    },
    {
      id: '2',
      title: 'Advanced Harmony',
      category: 'theory',
      difficulty: 'advanced',
      duration: 90,
      completed: false,
      progress: 30,
      skills: ['extended chords', 'voice leading', 'modulation'],
      description: 'Explore complex harmonic concepts and advanced chord progressions.'
    },
    {
      id: '3',
      title: 'Melody Composition',
      category: 'composition',
      difficulty: 'intermediate',
      duration: 60,
      completed: false,
      progress: 65,
      skills: ['melodic contour', 'motif development', 'phrase structure'],
      description: 'Master the art of creating memorable and engaging melodies.'
    },
    {
      id: '4',
      title: 'Digital Audio Production',
      category: 'production',
      difficulty: 'intermediate',
      duration: 120,
      completed: false,
      progress: 15,
      skills: ['DAW workflow', 'mixing', 'mastering'],
      description: 'Learn professional audio production techniques and DAW mastery.'
    },
    {
      id: '5',
      title: 'Piano Performance Basics',
      category: 'performance',
      difficulty: 'beginner',
      duration: 75,
      completed: true,
      progress: 100,
      skills: ['fingering', 'scales', 'basic repertoire'],
      description: 'Develop fundamental piano technique and performance skills.'
    }
  ];

  const learningProgress: LearningProgress = {
    totalModules: learningModules.length,
    completedModules: learningModules.filter(m => m.completed).length,
    currentStreak: 7,
    totalPracticeTime: 45.5,
    skillLevels: {
      theory: 85,
      composition: 60,
      production: 25,
      performance: 75
    },
    achievements: [
      {
        id: '1',
        title: 'Theory Master',
        description: 'Complete 5 theory modules',
        icon: 'graduation-cap',
        unlocked: true,
        unlockedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Composer',
        description: 'Create your first composition',
        icon: 'music',
        unlocked: true,
        unlockedAt: new Date('2024-01-20')
      },
      {
        id: '3',
        title: 'Practice Streak',
        description: 'Practice for 7 consecutive days',
        icon: 'target',
        unlocked: false
      }
    ]
  };

  const practiceExercises = [
    {
      id: '1',
      type: 'ear-training' as const,
      title: 'Interval Recognition',
      description: 'Identify musical intervals by ear',
      difficulty: 3,
      estimatedTime: 15
    },
    {
      id: '2',
      type: 'rhythm' as const,
      title: 'Rhythm Patterns',
      description: 'Practice complex rhythmic patterns',
      difficulty: 4,
      estimatedTime: 20
    },
    {
      id: '3',
      type: 'composition' as const,
      title: 'Chord Progression Builder',
      description: 'Create effective chord progressions',
      difficulty: 5,
      estimatedTime: 30
    },
    {
      id: '4',
      type: 'improvisation' as const,
      title: 'Scale Improvisation',
      description: 'Improvise melodies over backing tracks',
      difficulty: 6,
      estimatedTime: 25
    }
  ];

  const filteredModules = learningModules.filter(module => {
    const categoryMatch = selectedCategory === 'all' || module.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const startModule = (module: LearningModule) => {
    setCurrentModule(module);
    toast({
      title: "Module Started",
      description: `Starting "${module.title}" - ${module.difficulty} level`,
    });
  };

  const startPracticeSession = (exercise: any) => {
    const session: PracticeSession = {
      id: Date.now().toString(),
      type: exercise.type,
      difficulty: exercise.difficulty,
      score: 0,
      completed: false
    };
    setCurrentSession(session);
    setPracticeMode(true);
    toast({
      title: "Practice Session Started",
      description: `Starting ${exercise.title}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'composition': return <Music className="w-4 h-4" />;
      case 'production': return <Headphones className="w-4 h-4" />;
      case 'performance': return <Piano className="w-4 h-4" />;
      default: return <GraduationCap className="w-4 h-4" />;
    }
  };

  const overallProgress = (learningProgress.completedModules / learningProgress.totalModules) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              AI Music Learning System
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalized music education powered by artificial intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Brain className="w-3 h-3 mr-1" />
              AI Adaptive
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GradientCard
            title="Overall Progress"
            gradient="primary"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-3">
              <div className="text-3xl font-bold">
                {Math.round(overallProgress)}%
              </div>
              <Progress value={overallProgress} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {learningProgress.completedModules} of {learningProgress.totalModules} modules
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Practice Streak"
            gradient="success"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {learningProgress.currentStreak}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Target className="w-4 h-4 mr-1" />
                days
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Practice Time"
            gradient="accent"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">
                {learningProgress.totalPracticeTime}h
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                total
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Achievements"
            gradient="warning"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {learningProgress.achievements.filter(a => a.unlocked).length}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-1" />
                unlocked
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border">
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Modules
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="composition">Composition</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Learning Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <Card key={module.id} className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(module.category)}
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      {module.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {module.duration}min
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {module.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => startModule(module)}
                      className="w-full"
                      variant={module.completed ? "outline" : "default"}
                    >
                      {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceExercises.map((exercise) => (
                <GradientCard
                  key={exercise.id}
                  title={exercise.title}
                  description={exercise.description}
                  gradient="accent"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        Difficulty: {exercise.difficulty}/10
                      </Badge>
                      <Badge variant="outline">
                        ~{exercise.estimatedTime}min
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Type:</span>
                      <span className="capitalize">{exercise.type.replace('-', ' ')}</span>
                    </div>

                    <Button
                      onClick={() => startPracticeSession(exercise)}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice
                    </Button>
                  </div>
                </GradientCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GradientCard
                title="Skill Levels"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  {Object.entries(learningProgress.skillLevels).map(([skill, level]) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{skill}</span>
                        <span>{level}%</span>
                      </div>
                      <Progress value={level} className="h-2" />
                    </div>
                  ))}
                </div>
              </GradientCard>

              <GradientCard
                title="Recent Activity"
                gradient="secondary"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Completed "Music Theory Fundamentals"</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Started "Advanced Harmony"</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Practiced interval recognition</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>7-day practice streak achieved</span>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningProgress.achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`backdrop-blur-sm border-border/50 transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20' 
                      : 'bg-card/50 opacity-60'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Award className={`w-6 h-6 ${
                          achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-muted-foreground">
                            Unlocked {achievement.unlockedAt.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">
                        <Star className="w-3 h-3 mr-1" />
                        Achieved
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}