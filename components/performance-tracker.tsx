"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudyStreaks } from "./study-streaks"
import { SubjectWiseProgress } from "./subject-wise-progress"
import { DifficultyAnalysis } from "./difficulty-analysis"
import { TestResultsTracker } from "./test-results-tracker"

export function PerformanceTracker() {
  const [activeSection, setActiveSection] = useState("streaks")

  const sections = [
    {
      id: "streaks",
      title: "Study Streaks & Engagement",
      component: StudyStreaks,
      description: "Track your daily study consistency and achievements",
    },
    {
      id: "progress",
      title: "Subject Progress",
      component: SubjectWiseProgress,
      description: "Monitor your progress across different subjects",
    },
    {
      id: "difficulty",
      title: "Topic Difficulty Analysis",
      component: DifficultyAnalysis,
      description: "Analyze and track challenging topics",
    },
    {
      id: "results",
      title: "Test Results",
      component: TestResultsTracker,
      description: "Record and analyze your test performances",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">JEE Performance Tracker</h1>
        <p className="text-muted-foreground">
          Track your JEE preparation progress, analyze performance, and identify areas for improvement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card
            key={section.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeSection === section.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{sections.find((s) => s.id === activeSection)?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {sections.map(
            (section) =>
              activeSection === section.id && (
                <div key={section.id}>
                  <section.component />
                </div>
              ),
          )}
        </CardContent>
      </Card>
    </div>
  )
}

