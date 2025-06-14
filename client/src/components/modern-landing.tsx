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
    <div className="min-h-screen relative overflow-hidden ultra-modern-container cyber-grid">
      {/* Cyberpunk animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/30 to-cyan-400/30 rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 8,
            top: mousePosition.y / 8,
            transition: 'all 0.2s ease-out',
            animation: 'neonPulse 3s infinite'
          }}
        />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-none blur-2xl floating-animation cyber-border" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400/25 to-blue-500/25 blur-3xl floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-full blur-2xl" style={{ animation: 'rotate3d 10s linear infinite' }} />

        {/* Digital rain effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 bg-gradient-to-b from-green-400 to-transparent"
              style={{
                left: `${i * 5}%`,
                height: '100%',
                animation: `shimmer ${2 + Math.random() * 3}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Cyberpunk Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-none cyber-border flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-black header-gradient tracking-wider">AI STUDIO PRO+</h1>
          </div>
          <Link href="/studio">
            <Button className="btn-neon text-lg px-8 py-3">
              LAUNCH STUDIO <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </nav>
      </header>

      {/* Cyberpunk Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="card-neon inline-block mb-12 px-8 py-4">
            <div className="flex items-center justify-center">
              <Star className="w-6 h-6 mr-3 text-yellow-400 pulse-glow" />
              <span className="text-gradient text-lg font-black tracking-widest">ALL FEATURES UNLOCKED • NO RESTRICTIONS</span>
              <Star className="w-6 h-6 ml-3 text-yellow-400 pulse-glow" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 leading-none tracking-wider transform hover:scale-105 transition-transform duration-500">
            <span className="holographic block">QUANTUM AI</span>
            <span className="holographic block mt-4">NEURAL STUDIO</span>
          </h1>

          <p className="text-xl md:text-2xl text-cyan-300 mb-16 max-w-4xl mx-auto leading-relaxed font-medium neon-glow px-8 py-4">
            QUANTUM-POWERED CONTENT CREATION • NEURAL MUSIC SYNTHESIS • HOLOGRAPHIC VIDEO RENDERING
            <br />
            <span className="text-pink-400 font-bold">UNLIMITED ACCESS • ALL FEATURES VISIBLE • NO RESTRICTIONS</span>
            <br />
            <span className="text-green-400 font-bold">FULL VISIBILITY MODE • ENTERPRISE GRADE • PRODUCTION READY</span>
          </p>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-24">
            <Link href="/studio">
              <button className="quantum-button text-xl px-16 py-8 min-w-[280px] tracking-widest neon-border">
                <Rocket className="w-6 h-6 mr-3 inline" />
                INITIATE QUANTUM
              </button>
            </Link>
            <button className="quantum-button text-xl px-16 py-8 min-w-[250px] tracking-widest neon-border">
              <Play className="w-6 h-6 mr-3 inline" />
              NEURAL DEMO
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`card-modern text-center transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1 + 0.5}s` }}
              >
                <div className="flex items-center justify-center mb-3 text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold header-gradient mb-8">
            Unlimited Creative Power
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Professional-grade AI tools designed for creators, studios, and enterprises who demand excellence.
            Experience the future of content creation with quantum-level optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`ultra-modern-card group cursor-pointer transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${feature.delay + 1}s` }}
            >
              <div className="p-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="ultra-modern-card text-center p-16 neon-border max-w-4xl mx-auto neural-grid">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold header-gradient mb-8">
            Ready to Create the Future?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of creators using AI Studio Pro+ to push the boundaries of digital content creation.
            Experience unlimited possibilities with enterprise-grade security and quantum AI optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/studio">
              <button className="quantum-button text-xl px-12 py-6 min-w-[220px] neon-border">
                <Palette className="w-6 h-6 mr-2 inline" />
                Launch Quantum Studio
              </button>
            </Link>
            <button className="quantum-button text-xl px-12 py-6 min-w-[200px] neon-border">
              <Shield className="w-6 h-6 mr-2 inline" />
              Neural Security
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold header-gradient">AI Studio Pro+</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Professional AI-powered content creation platform with enterprise-grade security 
                and unlimited creative possibilities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center"><Music className="w-4 h-4 mr-2 text-purple-400" /> AI Music Generation</li>
                <li className="flex items-center"><Video className="w-4 h-4 mr-2 text-blue-400" /> 8K Video Creation</li>
                <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-green-400" /> Real-time Collaboration</li>
                <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-red-400" /> Enterprise Security</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quality</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-yellow-400" /> IMAX Quality</li>
                <li className="flex items-center"><Globe className="w-4 h-4 mr-2 text-cyan-400" /> Global Distribution</li>
                <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-orange-400" /> Quantum AI</li>
                <li className="flex items-center"><Brain className="w-4 h-4 mr-2 text-indigo-400" /> Neural Processing</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 text-center">
            <p className="text-slate-500 mb-4">
              &copy; 2025 AI Creative Studio Pro+. Professional AI-powered content creation platform.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-slate-400">
              <span className="flex items-center"><Shield className="w-4 h-4 mr-1" /> Enterprise-grade Security</span>
              <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1" /> Unlimited Creation</span>
              <span className="flex items-center"><Zap className="w-4 h-4 mr-1" /> Quantum AI Optimization</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}