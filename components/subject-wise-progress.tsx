"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"

interface Note {
  id: string
  subject: string
  content: string
  startDate: string
  endDate: string
  createdAt: string
}

interface TopicProgress {
  subject: string
  topic: string
  completed: boolean
}

const subjects = [
  {
    name: "Physics",
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
  },
  {
    name: "Chemistry",
    topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Analytical Chemistry"],
  },
  {
    name: "Mathematics",
    topics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"],
  },
]

export function SubjectWiseProgress() {
  const { profile } = useUser()
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    loadUserData()
  }, []) // Removed profile from dependencies

  const loadUserData = async () => {
    if (!profile.email) return

    const { data: progressData } = await supabase.from("topic_progress").select("*").eq("user_email", profile.email)

    if (progressData) {
      const progressMap = {}
      progressData.forEach((item: TopicProgress) => {
        if (!progressMap[item.subject]) {
          progressMap[item.subject] = {}
        }
        progressMap[item.subject][item.topic] = item.completed
      })
      setProgress(progressMap)
    }
  }

  const handleTopicToggle = async (subject: string, topic: string) => {
    const newProgress = {
      ...progress,
      [subject]: {
        ...progress[subject],
        [topic]: !progress[subject]?.[topic],
      },
    }
    setProgress(newProgress)

    await supabase.from("topic_progress").upsert({
      user_email: profile.email,
      subject,
      topic,
      completed: newProgress[subject][topic],
    })
  }

  const validateDateRange = () => {
    if (!startDate || !endDate) return true
    return new Date(endDate) > new Date(startDate)
  }

  const calculateProgress = (subject: string) => {
    const subjectTopics = progress[subject] || {}
    const completedTopics = Object.values(subjectTopics).filter(Boolean).length
    const totalTopics = subjects.find((s) => s.name === subject)?.topics.length || 1
    return (completedTopics / totalTopics) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-Wise Topic Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                if (new Date(e.target.value) > new Date(startDate)) {
                  setEndDate(e.target.value)
                } else {
                  alert("End date must be after start date")
                }
              }}
              className="w-40"
            />
          </div>
        </div>

        {!validateDateRange() && <p className="text-red-500 mb-4">End date must be after start date</p>}

        <Accordion type="single" collapsible className="w-full">
          {subjects.map((subject) => (
            <AccordionItem key={subject.name} value={subject.name}>
              <AccordionTrigger>{subject.name}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {subject.topics.map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${subject.name}-${topic}`}
                        checked={progress[subject.name]?.[topic] || false}
                        onCheckedChange={() => handleTopicToggle(subject.name, topic)}
                      />
                      <label htmlFor={`${subject.name}-${topic}`}>{topic}</label>
                    </div>
                  ))}
                  <Progress value={calculateProgress(subject.name)} className="w-full" />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8">
          <h4 className="font-medium mb-4">Selected Topics</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Completed Topics</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.name}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.topics.filter((topic) => progress[subject.name]?.[topic]).join(", ")}</TableCell>
                  <TableCell>{calculateProgress(subject.name).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

