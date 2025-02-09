"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"

const subjects = ["Physics", "Chemistry", "Mathematics"]
const examTypes = ["JEE Mains", "JEE Advanced"]

const topics = {
  "JEE Mains": {
    Physics: [
      "Mechanics",
      "Thermodynamics",
      "Electromagnetism",
      "Optics",
      "Modern Physics",
      "Kinematics",
      "Fluids",
      "Gravitation",
      "Waves & Sound",
    ],
    Chemistry: [
      "Physical Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Analytical Chemistry",
      "Coordination Chemistry",
      "Chemical Bonding",
      "Electrochemistry",
      "Chemical Kinetics",
    ],
    Mathematics: [
      "Algebra",
      "Calculus",
      "Geometry",
      "Trigonometry",
      "Statistics",
      "Vectors",
      "3D Geometry",
      "Probability",
      "Matrices & Determinants",
    ],
  },
  "JEE Advanced": {
    Physics: [
      "Classical Mechanics",
      "Thermodynamics & Statistical Physics",
      "Electrodynamics",
      "Optics & Modern Physics",
      "Fluids & Waves",
      "Electronics & Experimental Physics",
    ],
    Chemistry: [
      "Physical Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Analytical Chemistry",
      "Coordination Chemistry",
      "Chemical Bonding",
      "Electrochemistry",
      "Chemical Kinetics",
      "Solid State Chemistry",
    ],
    Mathematics: [
      "Algebra",
      "Calculus",
      "Geometry",
      "Trigonometry",
      "Differential Equations",
      "Complex Numbers",
      "Probability",
      "Vectors",
      "3D Geometry",
      "Mathematical Reasoning",
    ],
  },
}

interface DifficultyData {
  subject: string
  topic: string
  difficulty: string
  examType: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function DifficultyAnalysis() {
  const { profile } = useUser()
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [selectedExamType, setSelectedExamType] = useState(examTypes[0])
  const [topicDifficulties, setTopicDifficulties] = useState<Record<string, Record<string, string>>>({})

  useEffect(() => {
    loadUserData()
  }, [profile, selectedExamType])

  const loadUserData = async () => {
    if (!profile.email) return

    const { data } = await supabase
      .from("topic_difficulties")
      .select("*")
      .eq("user_email", profile.email)
      .eq("exam_type", selectedExamType)

    if (data) {
      const difficultiesMap = {}
      data.forEach((item: DifficultyData) => {
        if (!difficultiesMap[item.subject]) {
          difficultiesMap[item.subject] = {}
        }
        difficultiesMap[item.subject][item.topic] = item.difficulty
      })
      setTopicDifficulties(difficultiesMap)
    }
  }

  const handleDifficultyChange = async (topic: string, difficulty: string) => {
    const newDifficulties = {
      ...topicDifficulties,
      [selectedSubject]: {
        ...topicDifficulties[selectedSubject],
        [topic]: difficulty,
      },
    }
    setTopicDifficulties(newDifficulties)

    await supabase.from("topic_difficulties").upsert({
      user_email: profile.email,
      exam_type: selectedExamType,
      subject: selectedSubject,
      topic,
      difficulty,
    })
  }

  const difficultyData = topics[selectedExamType][selectedSubject].map((topic) => ({
    topic,
    difficulty:
      topicDifficulties[selectedSubject]?.[topic] === "Easy"
        ? 1
        : topicDifficulties[selectedSubject]?.[topic] === "Medium"
          ? 2
          : topicDifficulties[selectedSubject]?.[topic] === "Hard"
            ? 3
            : 0,
  }))

  const pieChartData = [
    { name: "Easy", value: difficultyData.filter((d) => d.difficulty === 1).length },
    { name: "Medium", value: difficultyData.filter((d) => d.difficulty === 2).length },
    { name: "Hard", value: difficultyData.filter((d) => d.difficulty === 3).length },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Difficulty-Level Rating & Adaptive Weakness Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          defaultValue={selectedExamType}
          onValueChange={(value) => setSelectedExamType(value as (typeof examTypes)[number])}
        >
          <TabsList className="grid w-full grid-cols-2">
            {examTypes.map((examType) => (
              <TabsTrigger key={examType} value={examType}>
                {examType}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-2">
          {topics[selectedExamType][selectedSubject].map((topic) => (
            <div key={topic} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="mb-2 sm:mb-0">{topic}</span>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant={topicDifficulties[selectedSubject]?.[topic] === "Easy" ? "default" : "outline"}
                  onClick={() => handleDifficultyChange(topic, "Easy")}
                >
                  Easy
                </Button>
                <Button
                  size="sm"
                  variant={topicDifficulties[selectedSubject]?.[topic] === "Medium" ? "default" : "outline"}
                  onClick={() => handleDifficultyChange(topic, "Medium")}
                >
                  Medium
                </Button>
                <Button
                  size="sm"
                  variant={topicDifficulties[selectedSubject]?.[topic] === "Hard" ? "default" : "outline"}
                  onClick={() => handleDifficultyChange(topic, "Hard")}
                >
                  Hard
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="difficulty" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {difficultyData.map((data) => (
              <TableRow key={data.topic}>
                <TableCell>{data.topic}</TableCell>
                <TableCell>{data.difficulty === 1 ? "Easy" : data.difficulty === 2 ? "Medium" : "Hard"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

