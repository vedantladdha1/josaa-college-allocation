"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TestResult {
  date: string
  paperName: string
  examType: "JEE Mains" | "JEE Advanced"
  totalMarks: number
  physics: number
  chemistry: number
  mathematics: number
  remarks: string
}

export function TestResultsTracker() {
  const [scores, setScores] = useState({
    physics: "",
    chemistry: "",
    mathematics: "",
  })
  const [paperName, setPaperName] = useState("")
  const [examType, setExamType] = useState<"JEE Mains" | "JEE Advanced">("JEE Mains")
  const [totalMarks, setTotalMarks] = useState(300)
  const [remarks, setRemarks] = useState("")
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const handleScoreChange = (subject: string, value: string) => {
    setScores((prev) => ({ ...prev, [subject]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newResult: TestResult = {
      date: new Date().toISOString().split("T")[0],
      paperName,
      examType,
      totalMarks,
      physics: Number(scores.physics) || 0,
      chemistry: Number(scores.chemistry) || 0,
      mathematics: Number(scores.mathematics) || 0,
      remarks,
    }
    setTestResults([newResult, ...testResults])
    // Reset form
    setScores({ physics: "", chemistry: "", mathematics: "" })
    setPaperName("")
    setRemarks("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paperName">Paper Name</Label>
              <Input id="paperName" value={paperName} onChange={(e) => setPaperName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <Select value={examType} onValueChange={(value: "JEE Mains" | "JEE Advanced") => setExamType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JEE Mains">JEE Mains</SelectItem>
                  <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={scores.totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="physics">Physics Score</Label>
              <Input
                id="physics"
                type="number"
                value={scores.physics}
                onChange={(e) => handleScoreChange("physics", e.target.value)}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="chemistry">Chemistry Score</Label>
              <Input
                id="chemistry"
                type="number"
                value={scores.chemistry}
                onChange={(e) => handleScoreChange("chemistry", e.target.value)}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="mathematics">Mathematics Score</Label>
              <Input
                id="mathematics"
                type="number"
                value={scores.mathematics}
                onChange={(e) => handleScoreChange("mathematics", e.target.value)}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add any comments or observations about your performance"
            />
          </div>
          <Button type="submit">Submit Test Result</Button>
        </form>

        {testResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Test Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Paper Name</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Physics</TableHead>
                  <TableHead>Chemistry</TableHead>
                  <TableHead>Mathematics</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.paperName}</TableCell>
                    <TableCell>{result.examType}</TableCell>
                    <TableCell>{result.totalMarks}</TableCell>
                    <TableCell>{result.physics}</TableCell>
                    <TableCell>{result.chemistry}</TableCell>
                    <TableCell>{result.mathematics}</TableCell>
                    <TableCell>{result.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

