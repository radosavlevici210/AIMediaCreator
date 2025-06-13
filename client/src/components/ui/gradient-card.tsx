import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GradientCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  gradient?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"
  glowEffect?: boolean
}

const gradientClasses = {
  primary: "bg-gradient-to-br from-purple-500/10 to-blue-600/10 border-purple-500/20",
  secondary: "bg-gradient-to-br from-gray-700/10 to-gray-900/10 border-gray-600/20",
  accent: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20",
  success: "bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20",
  warning: "bg-gradient-to-br from-orange-500/10 to-yellow-600/10 border-orange-500/20",
  error: "bg-gradient-to-br from-red-500/10 to-pink-600/10 border-red-500/20"
}

const glowClasses = {
  primary: "shadow-[0_0_40px_rgba(139,92,246,0.15)]",
  secondary: "shadow-[0_0_40px_rgba(75,85,99,0.15)]",
  accent: "shadow-[0_0_40px_rgba(6,182,212,0.15)]",
  success: "shadow-[0_0_40px_rgba(16,185,129,0.15)]",
  warning: "shadow-[0_0_40px_rgba(245,158,11,0.15)]",
  error: "shadow-[0_0_40px_rgba(239,68,68,0.15)]"
}

export function GradientCard({ 
  title, 
  description, 
  children, 
  className, 
  gradient = "primary",
  glowEffect = false 
}: GradientCardProps) {
  return (
    <Card className={cn(
      "backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
      gradientClasses[gradient],
      glowEffect && glowClasses[gradient],
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default GradientCard