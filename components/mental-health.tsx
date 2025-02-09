import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function MentalHealth() {
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [quote, setQuote] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const handleStartTimer = () => {
    setIsTimerRunning(true)
    setTimerSeconds(0)
  }

  const handleStopTimer = () => {
    setIsTimerRunning(false)
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const quotes = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ]

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Mental Health & Motivation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Pomodoro Timer</h3>
          <div className="flex items-center space-x-4 mb-2">
            <Button onClick={handleStartTimer} disabled={isTimerRunning}>
              Start
            </Button>
            <Button onClick={handleStopTimer} disabled={!isTimerRunning}>
              Stop
            </Button>
            <span className="text-2xl font-bold">{formatTime(timerSeconds)}</span>
          </div>
          <Progress value={(timerSeconds % 1500) / 15} className="w-full" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Breathing Exercise</h3>
          <p>Try this 4-7-8 breathing technique:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Exhale completely through your mouth</li>
            <li>Close your mouth and inhale quietly through your nose to a mental count of 4</li>
            <li>Hold your breath for a count of 7</li>
            <li>Exhale completely through your mouth to a count of 8</li>
            <li>Repeat this cycle 3-4 times</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Motivational Quote</h3>
          <blockquote className="italic border-l-4 border-gray-300 pl-4">"{quote}"</blockquote>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">JEE Topper's Story</h3>
          <p className="mb-2">Anushka Samant, AIR 5 in JEE Advanced, shares her journey:</p>
          <p>
            "I focused on understanding concepts deeply rather than memorizing. Regular practice and staying consistent
            were key. Remember, it's not about studying 14 hours a day, but about the quality of your study time. Take
            breaks, stay healthy, and believe in yourself!"
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

