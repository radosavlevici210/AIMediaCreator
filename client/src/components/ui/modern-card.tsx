import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ModernCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "glass" | "gradient" | "elevated"
  hover?: boolean
  glow?: boolean
}

const variants = {
  default: "bg-card/80 border-border/50",
  glass: "bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-white/10",
  gradient: "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20",
  elevated: "bg-card/90 border-border/30 shadow-2xl shadow-background/20"
}

export function ModernCard({ 
  children, 
  className, 
  variant = "default", 
  hover = true, 
  glow = false 
}: ModernCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500 ease-out",
        variants[variant],
        hover && "hover:scale-[1.02] hover:shadow-xl hover:border-primary/30",
        glow && "shadow-lg shadow-primary/10 hover:shadow-primary/20",
        className
      )}
    >
      {children}
    </div>
  )
}

interface ModernCardHeaderProps {
  children: ReactNode
  className?: string
}

export function ModernCardHeader({ children, className }: ModernCardHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  )
}

interface ModernCardContentProps {
  children: ReactNode
  className?: string
}

export function ModernCardContent({ children, className }: ModernCardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  )
}

interface ModernCardTitleProps {
  children: ReactNode
  className?: string
  gradient?: boolean
}

export function ModernCardTitle({ children, className, gradient = false }: ModernCardTitleProps) {
  return (
    <h3 className={cn(
      "text-xl font-semibold tracking-tight",
      gradient && "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
      className
    )}>
      {children}
    </h3>
  )
}

interface ModernCardDescriptionProps {
  children: ReactNode
  className?: string
}

export function ModernCardDescription({ children, className }: ModernCardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground/80 mt-1", className)}>
      {children}
    </p>
  )
}