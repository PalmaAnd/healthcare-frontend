"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onChange={(e) => setChecked(e.target.checked)}
          {...props}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center text-primary-foreground",
            checked ? "opacity-100" : "opacity-0"
          )}
        >
          <Check className="h-3 w-3" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }