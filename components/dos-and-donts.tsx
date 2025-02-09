import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function DosAndDonts() {
  const [activeTab, setActiveTab] = useState("mental-health")
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [dailyTip, setDailyTip] = useState("")

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

  const productivityTips = [
    "Break large tasks into smaller, manageable chunks.",
    "Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately.",
    "Set specific goals for each study session.",
    "Eliminate distractions by putting your phone on silent and using website blockers.",
    "Take regular breaks to maintain focus and prevent burnout.",
    "Use active recall techniques like flashcards or practice tests.",
    "Teach concepts to others to reinforce your understanding.",
    "Create a dedicated study space to minimize distractions.",
    "Use mnemonic devices to remember complex information.",
    "Review your notes within 24 hours of taking them to improve retention.",
  ]

  useEffect(() => {
    setDailyTip(productivityTips[Math.floor(Math.random() * productivityTips.length)])
  }, [])

  const topperStories = [
    {
      name: "Aman Bansal",
      rank: "AIR 1",
      year: "2016",
      story:
        "Aman focused on understanding concepts deeply and solving a variety of problems. He emphasized the importance of regular revision and mock tests.",
    },
    {
      name: "Sarvesh Mehtani",
      rank: "AIR 1",
      year: "2017",
      story:
        "Sarvesh attributed his success to consistent study habits and a balanced approach to all subjects. He stressed the importance of NCERT textbooks for building a strong foundation.",
    },
    {
      name: "Pranav Goyal",
      rank: "AIR 1",
      year: "2018",
      story:
        "Pranav believed in quality study time over quantity. He focused on analyzing his mistakes and working on his weak areas consistently.",
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Do's and Don'ts for JEE Aspirants</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
            <TabsTrigger value="topper-stories">Topper Stories</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
          </TabsList>
          <TabsContent value="mental-health">
            <h3 className="text-lg font-semibold mb-4">Stress Management for JEE Aspirants</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Breathing Exercise</h4>
                <p>Try this 4-7-8 breathing technique:</p>
                <ol className="list-decimal list-inside">
                  <li>Exhale completely through your mouth</li>
                  <li>Close your mouth and inhale quietly through your nose to a mental count of 4</li>
                  <li>Hold your breath for a count of 7</li>
                  <li>Exhale completely through your mouth to a count of 8</li>
                  <li>Repeat this cycle 3-4 times</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2">Pomodoro Technique</h4>
                <p className="mb-2">Use this technique to manage your study time effectively:</p>
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
                <p className="text-sm mt-2">
                  Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="topper-stories">
            <h3 className="text-lg font-semibold mb-4">Inspiring Stories of JEE Toppers</h3>
            <div className="space-y-4">
              {topperStories.map((topper, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium">
                    {topper.name} - {topper.rank} ({topper.year})
                  </h4>
                  <p>{topper.story}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="productivity">
            <h3 className="text-lg font-semibold mb-4">Daily Motivation & Productivity Tips</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Tip of the Day</h4>
                <p className="italic">&quot;{dailyTip}&quot;</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Habit Tracker</h4>
                <p>
                  Implement a habit tracker here to help students maintain consistency in their studies and routines.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

