import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useGesture } from "@use-gesture/react"

interface FloatingCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function FloatingCard({ children, onSwipeLeft, onSwipeRight }: FloatingCardProps) {
  const handlers = useGesture({
    onSwipeLeft: onSwipeLeft,
    onSwipeRight: onSwipeRight,
  })

  return (
    <div className="relative w-full max-w-md mx-auto" {...handlers()}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}

