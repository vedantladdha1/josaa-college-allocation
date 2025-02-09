import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type MasteryLevel = "Weak" | "Needs Revision" | "Mastered"
type Subject = "Physics" | "Chemistry" | "Mathematics"

interface SubjectData {
  topics: string[]
  masteryLevels: Record<string, MasteryLevel>
}

const initialSubjectsData: Record<Subject, SubjectData> = {
  Physics: {
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
    masteryLevels: {},
  },
  Chemistry: {
    topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Analytical Chemistry"],
    masteryLevels: {},
  },
  Mathematics: {
    topics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"],
    masteryLevels: {},
  },
}

export function JeeSubjectMasteryTracker() {
  const [subjectsData, setSubjectsData] = useState<Record<Subject, SubjectData>>(initialSubjectsData)

  const handleMasteryUpdate = (subject: Subject, topic: string, level: MasteryLevel) => {
    setSubjectsData((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        masteryLevels: {
          ...prev[subject].masteryLevels,
          [topic]: level,
        },
      },
    }))
  }

  const calculateProgress = (subject: Subject): number => {
    const topicCount = subjectsData[subject].topics.length
    const masteredCount = Object.values(subjectsData[subject].masteryLevels).filter(
      (level) => level === "Mastered",
    ).length
    return (masteredCount / topicCount) * 100
  }

  const getProgressColor = (progress: number): string => {
    if (progress < 33) return "bg-red-500"
    if (progress < 66) return "bg-orange-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">JEE Subject Mastery Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(subjectsData).map(([subject, data]) => (
          <div key={subject} className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{subject}</h3>
            <Progress
              value={calculateProgress(subject as Subject)}
              className={`w-full h-2 mb-4 ${getProgressColor(calculateProgress(subject as Subject))}`}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Mastery Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topics.map((topic) => (
                  <TableRow key={topic}>
                    <TableCell>{topic}</TableCell>
                    <TableCell>
                      <Select
                        value={data.masteryLevels[topic] || "Weak"}
                        onValueChange={(value) => handleMasteryUpdate(subject as Subject, topic, value as MasteryLevel)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select mastery level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weak">Weak 🟥</SelectItem>
                          <SelectItem value="Needs Revision">Needs Revision 🟧</SelectItem>
                          <SelectItem value="Mastered">Mastered 🟩</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

