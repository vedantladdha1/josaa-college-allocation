"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"

const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Your time is limited, don't waste it living someone else's life.",
]

export function StudyStreaks() {
  const { profile } = useUser()
  const [streak, setStreak] = useState(0)
  const [quote, setQuote] = useState("")
  const [todayStudied, setTodayStudied] = useState(false)

  useEffect(() => {
    loadUserData()
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, []) // Removed unnecessary dependency: profile

  const loadUserData = async () => {
    if (!profile.email) return

    const { data } = await supabase
      .from("study_streaks")
      .select("*")
      .eq("user_email", profile.email)
      .order("date", { ascending: false })
      .limit(1)
      .single()

    if (data) {
      const lastStudyDate = new Date(data.date)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - lastStudyDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        setStreak(data.streak)
      } else if (diffDays > 1) {
        setStreak(0)
      }

      setTodayStudied(diffDays === 0)
    }
  }

  const handleStudyToday = async (checked: boolean) => {
    setTodayStudied(checked)
    if (checked) {
      const newStreak = streak + 1
      setStreak(newStreak)

      await supabase.from("study_streaks").insert({
        user_email: profile.email,
        date: new Date().toISOString().split("T")[0],
        streak: newStreak,
      })
    } else {
      const newStreak = Math.max(0, streak - 1)
      setStreak(newStreak)

      await supabase
        .from("study_streaks")
        .delete()
        .eq("user_email", profile.email)
        .eq("date", new Date().toISOString().split("T")[0])
    }
  }

  const getBadge = (streak: number) => {
    if (streak >= 30) return "🏆 Gold"
    if (streak >= 15) return "🥈 Silver"
    if (streak >= 7) return "🥉 Bronze"
    return "🌱 Seedling"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Streak & Engagement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Current Streak: {streak} days 🔥</span>
          <Badge variant="secondary">{getBadge(streak)}</Badge>
        </div>
        <Progress value={(streak / 30) * 100} className="w-full" />
        <div className="flex items-center space-x-2">
          <Checkbox id="studied-today" checked={todayStudied} onCheckedChange={handleStudyToday} />
          <label
            htmlFor="studied-today"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I studied today
          </label>
        </div>
        <div className="bg-muted p-4 rounded-md">
          <p className="italic">"{quote}"</p>
        </div>
      </CardContent>
    </Card>
  )
}

