import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const modernButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground shadow-lg hover:shadow-xl hover:shadow-destructive/25 hover:scale-[1.02]",
        outline: "border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-lg",
        secondary: "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-md hover:shadow-lg hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        glass: "bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-xl border border-white/10 text-foreground hover:bg-background/90 hover:border-white/20 shadow-lg hover:shadow-xl",
        glow: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ModernButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modernButtonVariants> {
  asChild?: boolean
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(modernButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ModernButton.displayName = "ModernButton"

export { ModernButton, modernButtonVariants }