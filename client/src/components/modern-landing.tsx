import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Music, 
  Video, 
  Zap, 
  Star, 
  ChevronRight,
  Play,
  Users,
  Shield,
  Rocket,
  Brain,
  Palette,
  Globe,
  Award
} from 'lucide-react';
import { Link } from 'wouter';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const features: FeatureCard[] = [
  {
    icon: <Music className="w-8 h-8" />,
    title: "AI Music Generation",
    description: "Create professional music with AI-powered composition, lyrics integration, and studio-quality production.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "8K Video Creation",
    description: "Generate stunning videos with IMAX quality, advanced animation, and professional post-production effects.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Quantum AI Optimization",
    description: "Next-generation AI models with quantum-level optimization for unprecedented creative possibilities.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.2
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly with live editing, instant synchronization, and team management tools.",
    gradient: "from-orange-500 to-yellow-500",
    delay: 0.3
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Military-grade security with comprehensive audit logs, access controls, and data protection.",
    gradient: "from-red-500 to-rose-500",
    delay: 0.4
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Distribution",
    description: "Deploy and distribute content worldwide with CDN optimization and multi-platform support.",
    gradient: "from-indigo-500 to-purple-500",
    delay: 0.5
  }
];

const stats = [
  { number: "43+", label: "Hours of Content", icon: <Play className="w-5 h-5" /> },
  { number: "8K", label: "IMAX Quality", icon: <Award className="w-5 h-5" /> },
  { number: "∞", label: "Unlimited Creation", icon: <Sparkles className="w-5 h-5" /> },
  { number: "24/7", label: "AI Processing", icon: <Zap className="w-5 h-5" /> }
];

export default function ModernLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold header-gradient">AI Studio Pro+</h1>
          </div>
          <Link href="/studio">
            <Button className="btn-gradient-primary">
              Launch Studio <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Badge variant="secondary" className="mb-6 glass-morphism px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Enterprise Production Ready
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="header-gradient">Professional AI</span>
            <br />
            <span className="text-white">Creative Studio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create stunning music, videos, and multimedia content with quantum-level AI optimization. 
            Professional-grade tools for unlimited creative possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/studio">
              <Button size="lg" className="btn-gradient-primary text-lg px-8 py-4 neon-glow">
                <Rocket className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass-morphism text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`card-modern text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1 + 0.5}s` }}
              >
                <div className="flex items-center justify-center mb-2 text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold header-gradient mb-6">
            Unlimited Creative Power
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Professional-grade AI tools designed for creators, studios, and enterprises who demand excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`card-modern group cursor-pointer transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${feature.delay + 1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="card-modern text-center p-12 neon-glow">
          <h2 className="text-4xl font-bold header-gradient mb-6">
            Ready to Create the Future?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators using AI Studio Pro+ to push the boundaries of digital content creation.
          </p>
          <Link href="/studio">
            <Button size="lg" className="btn-gradient-primary text-xl px-12 py-6 pulse-glow">
              <Palette className="w-6 h-6 mr-2" />
              Launch Studio Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-slate-800">
        <div className="text-center text-slate-400">
          <p>&copy; 2025 AI Creative Studio Pro+. Professional AI-powered content creation.</p>
          <p className="mt-2">Enterprise-grade • Unlimited Creation • Quantum AI Optimization</p>
        </div>
      </footer>
    </div>
  );
}