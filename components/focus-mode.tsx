"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Maximize2, Volume2, VolumeX } from "lucide-react"

export function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [cycles, setCycles] = useState(0)
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds === 0) {
            clearInterval(interval!)
            const audio = new Audio("/notification.mp3")
            if (!isMuted) audio.play()
            if (mode === "focus") {
              setMode("break")
              setSecondsLeft(breakDuration * 60)
              setCycles((c) => c + 1)
            } else {
              setMode("focus")
              setSecondsLeft(focusDuration * 60)
            }
            return 0
          }
          return seconds - 1
        })
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused, mode, focusDuration, breakDuration, isMuted])

  const toggleTimer = () => {
    setIsActive(!isActive)
    setIsPaused(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setMode("focus")
    setSecondsLeft(focusDuration * 60)
    setCycles(0)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Focus Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">{formatTime(secondsLeft)}</h2>
          <p className="text-xl">{mode === "focus" ? "Focus Time" : "Break Time"}</p>
        </div>
        <Progress value={(secondsLeft / (mode === "focus" ? focusDuration * 60 : breakDuration * 60)) * 100} />
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer}>{isActive ? (isPaused ? "Resume" : "Pause") : "Start"}</Button>
          <Button onClick={() => setIsPaused(!isPaused)} disabled={!isActive}>
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button onClick={resetTimer}>Reset</Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Label htmlFor="focusDuration">Focus:</Label>
            <Input
              id="focusDuration"
              type="number"
              min="1"
              max="60"
              value={focusDuration}
              onChange={(e) => setFocusDuration(Number(e.target.value))}
              className="w-16"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="breakDuration">Break:</Label>
            <Input
              id="breakDuration"
              type="number"
              min="1"
              max="30"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="w-16"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            <Maximize2 />
          </Button>
        </div>
        <div className="text-center">
          <p>Completed Cycles: {cycles}</p>
        </div>
      </CardContent>
    </Card>
  )
}

